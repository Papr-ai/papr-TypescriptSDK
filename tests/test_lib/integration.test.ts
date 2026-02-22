/**
 * End-to-end integration tests for the SDK builder API.
 *
 * Tests full node/schema definition → buildSchemaParams → API-compatible output flow.
 * Mirrors Python SDK's test_integration.py.
 */

import {
  Or,
  And,
  Not,
  Auto,
  edge,
  node,
  prop,
  exact,
  lookup,
  schema,
  upsert,
  resolve,
  semantic,
  constraint,
  buildLinkTo,
  buildMemoryPolicy,
  buildSchemaParams,
  serializeSetValues,
  PropertyRef,
  NodeMetadata,
  SchemaMetadata,
  PropDescriptor,
  SearchMode,
  EdgeDescriptor,
  fuzzy,
} from '@papr/memory/lib';

describe('DeepTrust-style Security Schema', () => {
  const TacticDef = node(
    'TacticDef',
    {
      id: prop({ search: exact() }),
      name: prop({ required: true, search: semantic(0.90) }),
      description: prop(),
    },
    lookup(),
  );

  const SecurityBehavior = node(
    'SecurityBehavior',
    {
      description: prop({ required: true, search: semantic(0.85) }),
      severity: prop({ enum_values: ['low', 'medium', 'high', 'critical'] }),
    },
    upsert(),
  );

  const Alert = node(
    'Alert',
    {
      alert_id: prop({ search: exact() }),
      title: prop({ required: true, search: semantic(0.85) }),
      severity: prop(),
    },
    upsert(),
    constraint({
      when: { severity: 'critical' },
      set: { flagged: true, reviewed_by: new Auto() },
    }),
  );

  const RequiredTactic = node(
    'RequiredTactic',
    {
      id: prop({ search: exact() }),
    },
    resolve({ onMiss: 'error' }),
  );

  const SecuritySchema = schema('security_monitoring', {
    nodes: [TacticDef, SecurityBehavior, Alert, RequiredTactic],
    edges: [
      edge(SecurityBehavior, TacticDef, {
        name: 'mitigates',
        search: [TacticDef.id.exact(), TacticDef.name.semantic(0.90)],
        create: 'lookup',
      }),
      edge(SecurityBehavior, Alert, {
        name: 'triggers',
        search: [Alert.alert_id.exact()],
        create: 'upsert',
      }),
    ],
    description: 'DeepTrust security schema',
  });

  const params = buildSchemaParams(SecuritySchema);

  test('schema name and metadata', () => {
    expect(params.name).toBe('security_monitoring');
    expect(params.description).toBe('DeepTrust security schema');
    expect(params.status).toBe('active');
  });

  test('all node types present', () => {
    const nodeTypes = params.node_types!;
    expect('TacticDef' in nodeTypes).toBe(true);
    expect('SecurityBehavior' in nodeTypes).toBe(true);
    expect('Alert' in nodeTypes).toBe(true);
    expect('RequiredTactic' in nodeTypes).toBe(true);
  });

  test('TacticDef is lookup', () => {
    const tactic = params.node_types!['TacticDef']! as any;
    expect(tactic.constraint.create).toBe('lookup');
    expect(tactic.resolution_policy).toBe('lookup');
    const searchProps = tactic.constraint.search.properties;
    expect(searchProps).toHaveLength(2);
  });

  test('SecurityBehavior is upsert with enum', () => {
    const behavior = params.node_types!['SecurityBehavior']! as any;
    expect(behavior.constraint.create).toBe('upsert');
    expect(behavior.resolution_policy).toBe('upsert');
    expect(behavior.required_properties).toEqual(['description']);
    expect(behavior.properties['severity'].enum_values).toEqual([
      'low', 'medium', 'high', 'critical',
    ]);
  });

  test('Alert has constraint with when/set', () => {
    const alert = params.node_types!['Alert']! as any;
    expect(alert.constraint.when).toEqual({ severity: 'critical' });
    expect(alert.constraint.set).toEqual({
      flagged: true,
      reviewed_by: { mode: 'auto' },
    });
  });

  test('RequiredTactic has resolve with on_miss=error', () => {
    const req = params.node_types!['RequiredTactic']! as any;
    expect(req.constraint.create).toBe('lookup');
    expect(req.constraint.on_miss).toBe('error');
  });

  test('mitigates edge', () => {
    const rels = params.relationship_types!;
    expect('MITIGATES' in rels).toBe(true);
    const mit = rels['MITIGATES']! as any;
    expect(mit.allowed_source_types).toEqual(['SecurityBehavior']);
    expect(mit.allowed_target_types).toEqual(['TacticDef']);
    expect(mit.constraint.create).toBe('lookup');
    expect(mit.constraint.search.properties).toHaveLength(2);
  });

  test('triggers edge', () => {
    const rels = params.relationship_types!;
    expect('TRIGGERS' in rels).toBe(true);
    const trig = rels['TRIGGERS']! as any;
    expect(trig.allowed_source_types).toEqual(['SecurityBehavior']);
    expect(trig.allowed_target_types).toEqual(['Alert']);
    expect(trig.constraint.create).toBe('upsert');
  });

  test('buildLinkTo single', () => {
    const result = buildLinkTo(Alert.title);
    expect(result).toBe('Alert:title');
  });

  test('buildLinkTo multiple', () => {
    const result = buildLinkTo(Alert.title, TacticDef.name);
    expect(result).toEqual(['Alert:title', 'TacticDef:name']);
  });

  test('buildLinkTo with exact value', () => {
    const result = buildLinkTo(Alert.alert_id.exact('ALERT-001'));
    expect(result).toBe('Alert:alert_id=ALERT-001');
  });

  test('buildLinkTo with semantic value', () => {
    const result = buildLinkTo(
      TacticDef.name.semantic(0.90, 'credential access'),
    );
    expect(result).toBe('TacticDef:name~credential access');
  });
});

describe('Conversation Schema', () => {
  const Customer = node(
    'Customer',
    {
      email: prop({ search: exact() }),
      name: prop({ required: true, search: semantic(0.85) }),
    },
    upsert(),
  );

  const Conversation = node(
    'Conversation',
    {
      call_id: prop({ search: exact() }),
      topic: prop({ search: semantic(0.85) }),
      sentiment: prop({ enum_values: ['positive', 'neutral', 'negative'] }),
    },
    upsert(),
  );

  const Product = node(
    'Product',
    {
      sku: prop({ search: exact() }),
      name: prop({ search: semantic(0.90) }),
    },
    lookup(),
  );

  const ConvSchema = schema('conversations', {
    nodes: [Customer, Conversation, Product],
    edges: [
      edge(Customer, Conversation, { name: 'participates_in', create: 'upsert' }),
      edge(Conversation, Product, { name: 'discusses', create: 'lookup' }),
    ],
  });

  const params = buildSchemaParams(ConvSchema);

  test('all nodes present', () => {
    const nodeNames = new Set(Object.keys(params.node_types!));
    expect(nodeNames).toEqual(new Set(['Customer', 'Conversation', 'Product']));
  });

  test('all edges present', () => {
    const relNames = new Set(Object.keys(params.relationship_types!));
    expect(relNames).toEqual(new Set(['PARTICIPATES_IN', 'DISCUSSES']));
  });

  test('customer properties', () => {
    const cust = params.node_types!['Customer']! as any;
    expect('email' in cust.properties).toBe(true);
    expect('name' in cust.properties).toBe(true);
    expect(cust.required_properties).toEqual(['name']);
  });

  test('product is lookup', () => {
    const prod = params.node_types!['Product']! as any;
    expect(prod.constraint.create).toBe('lookup');
  });

  test('buildLinkTo integration', () => {
    const link = buildLinkTo(
      Customer.email.exact('john@example.com'),
      Conversation.topic,
    );
    expect(link).toEqual([
      'Customer:email=john@example.com',
      'Conversation:topic',
    ]);
  });
});

describe('Complex Conditions', () => {
  test('complex when round trip', () => {
    const Incident = node(
      'Incident',
      {
        title: prop({ search: semantic(0.85) }),
        severity: prop(),
        status: prop(),
      },
      upsert(),
      constraint({
        when: new And(
          new Or({ severity: 'high' }, { severity: 'critical' }),
          new Not({ status: 'resolved' }),
          { team: 'security' },
        ),
        set: { needs_review: true, summary: new Auto() },
      }),
    );

    const s = schema('test', { nodes: [Incident] });
    const params = buildSchemaParams(s);
    const inc = params.node_types!['Incident']! as any;

    expect(inc.constraint.when).toEqual({
      _and: [
        { _or: [{ severity: 'high' }, { severity: 'critical' }] },
        { _not: { status: 'resolved' } },
        { team: 'security' },
      ],
    });
    expect(inc.constraint.set).toEqual({
      needs_review: true,
      summary: { mode: 'auto' },
    });
  });
});

describe('Memory Policy Integration', () => {
  test('full policy', () => {
    const policy = buildMemoryPolicy({
      schemaId: 'sec_monitoring_v1',
      mode: 'manual',
      nodeConstraints: [
        {
          node_type: 'Alert',
          create: 'upsert',
          search: {
            properties: [{ name: 'alert_id', mode: 'exact' }],
          },
          set: serializeSetValues({ summary: new Auto(), status: 'open' }),
        },
      ],
      edgeConstraints: [
        {
          relationship_type: 'TRIGGERS',
          create: 'upsert',
        },
      ],
    });

    expect(policy.schema_id).toBe('sec_monitoring_v1');
    expect(policy.mode).toBe('manual');
    expect(policy.node_constraints).toHaveLength(1);
    expect((policy.node_constraints![0]! as any).set).toEqual({
      summary: { mode: 'auto' },
      status: 'open',
    });
    expect(policy.edge_constraints).toHaveLength(1);
  });
});

describe('Auto("prompt") Integration', () => {
  test('constraint with auto prompt', () => {
    const Alert = node(
      'Alert',
      { title: prop({ search: semantic(0.85) }), severity: prop() },
      upsert(),
      constraint({
        when: { severity: 'critical' },
        set: {
          flagged: true,
          summary: new Auto('Summarize the security incident in 1-2 sentences'),
        },
      }),
    );

    const s = schema('test', { nodes: [Alert] });
    const params = buildSchemaParams(s);
    const alertConstraint = (params.node_types!['Alert']! as any).constraint;

    expect(alertConstraint.set).toEqual({
      flagged: true,
      summary: {
        mode: 'auto',
        prompt: 'Summarize the security incident in 1-2 sentences',
      },
    });
  });

  test('memory policy with auto prompt', () => {
    const policy = buildMemoryPolicy({
      schemaId: 'my_schema',
      nodeConstraints: [
        {
          node_type: 'Task',
          create: 'upsert',
          set: serializeSetValues({
            summary: new Auto('Summarize briefly'),
            status: 'open',
          }),
        },
      ],
    });

    expect((policy.node_constraints![0]! as any).set).toEqual({
      summary: { mode: 'auto', prompt: 'Summarize briefly' },
      status: 'open',
    });
  });
});

describe('Import Verification', () => {
  test('all public imports are available', () => {
    // Verify they're the right types
    expect(typeof schema).toBe('function');
    expect(typeof node).toBe('function');
    expect(typeof lookup).toBe('function');
    expect(typeof upsert).toBe('function');
    expect(typeof resolve).toBe('function');
    expect(typeof constraint).toBe('function');
    expect(typeof prop).toBe('function');
    expect(typeof edge).toBe('function');
    expect(typeof exact).toBe('function');
    expect(typeof semantic).toBe('function');
    expect(typeof fuzzy).toBe('function');
    expect(typeof buildLinkTo).toBe('function');
    expect(typeof buildSchemaParams).toBe('function');
    expect(typeof buildMemoryPolicy).toBe('function');
    expect(typeof serializeSetValues).toBe('function');

    // Classes
    expect(new Auto()).toBeInstanceOf(Auto);
    expect(new PropertyRef('T', 'p')).toBeInstanceOf(PropertyRef);
    expect(new And({ a: 1 })).toBeInstanceOf(And);
    expect(new Or({ a: 1 })).toBeInstanceOf(Or);
    expect(new Not({ a: 1 })).toBeInstanceOf(Not);
    expect(new PropDescriptor()).toBeInstanceOf(PropDescriptor);
    expect(new SearchMode('exact')).toBeInstanceOf(SearchMode);
    expect(new NodeMetadata('Test')).toBeInstanceOf(NodeMetadata);
    expect(new SchemaMetadata('Test')).toBeInstanceOf(SchemaMetadata);
  });
});

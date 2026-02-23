import {
  buildLinkTo,
  buildSchemaParams,
  buildMemoryPolicy,
  serializeSetValues,
  Auto,
  PropertyRef,
  node,
  schema,
  lookup,
  upsert,
  resolve,
  constraint,
  prop,
  edge,
  exact,
  semantic,
} from '@papr/memory/lib';

describe('buildLinkTo()', () => {
  test('single ref returns string', () => {
    const ref = new PropertyRef('Task', 'title');
    expect(buildLinkTo(ref)).toBe('Task:title');
  });

  test('multiple refs return array', () => {
    const refs = [new PropertyRef('Task', 'title'), new PropertyRef('Person', 'email')];
    expect(buildLinkTo(...refs)).toEqual(['Task:title', 'Person:email']);
  });

  test('with exact value', () => {
    const ref = new PropertyRef('Task', 'id', 'exact', undefined, 'TASK-123');
    expect(buildLinkTo(ref)).toBe('Task:id=TASK-123');
  });

  test('with semantic value', () => {
    const ref = new PropertyRef('Task', 'title', 'semantic', 0.85, 'auth bug');
    expect(buildLinkTo(ref)).toBe('Task:title~auth bug');
  });

  test('mixed values', () => {
    const result = buildLinkTo(
      new PropertyRef('Alert', 'alert_id', 'exact', undefined, 'ALERT-001'),
      new PropertyRef('TacticDef', 'name', 'semantic', 0.9, 'credential access'),
    );
    expect(result).toEqual(['Alert:alert_id=ALERT-001', 'TacticDef:name~credential access']);
  });
});

describe('buildSchemaParams()', () => {
  test('basic schema', () => {
    const Person = node(
      'Person',
      {
        email: prop({ search: exact() }),
        name: prop({ required: true, search: semantic(0.9) }),
      },
      lookup(),
    );

    const Task = node(
      'Task',
      {
        title: prop({ required: true, search: semantic(0.85) }),
        status: prop({ enum_values: ['open', 'done'] }),
      },
      upsert(),
    );

    const s = schema('test_schema', {
      nodes: [Person, Task],
      edges: [edge(Person, Task, { name: 'works_on', create: 'upsert' })],
      description: 'Test description',
    });

    const params = buildSchemaParams(s);

    expect(params.name).toBe('test_schema');
    expect(params.description).toBe('Test description');
    expect(params.status).toBe('active');
  });

  test('node type properties', () => {
    const Task = node(
      'Task',
      {
        title: prop({ required: true, search: semantic(0.85) }),
        status: prop({ enum_values: ['open', 'done'] }),
      },
      upsert(),
    );

    const s = schema('test', { nodes: [Task] });
    const params = buildSchemaParams(s);
    const taskType = params.node_types!['Task']!;

    expect(taskType.name).toBe('Task');
    expect(taskType.label).toBe('Task');
    expect(taskType.properties!['title']).toEqual({
      type: 'string',
      required: true,
    });
    expect(taskType.properties!['status']).toEqual({
      type: 'string',
      enum_values: ['open', 'done'],
    });
    expect(taskType.required_properties).toEqual(['title']);
  });

  test('lookup constraint', () => {
    const Ref = node(
      'Ref',
      {
        id: prop({ search: exact() }),
      },
      lookup(),
    );

    const s = schema('test', { nodes: [Ref] });
    const params = buildSchemaParams(s);
    const refType = params.node_types!['Ref']! as any;

    expect(refType.constraint.create).toBe('lookup');
    expect(refType.resolution_policy).toBe('lookup');
  });

  test('resolve with on_miss', () => {
    const Req = node(
      'Req',
      {
        id: prop({ search: exact() }),
      },
      resolve({ onMiss: 'error' }),
    );

    const s = schema('test', { nodes: [Req] });
    const params = buildSchemaParams(s);
    const reqType = params.node_types!['Req']! as any;

    expect(reqType.constraint.create).toBe('lookup');
    expect(reqType.constraint.on_miss).toBe('error');
  });

  test('constraint with when and set', () => {
    const Alert = node(
      'Alert',
      { title: prop(), severity: prop() },
      upsert(),
      constraint({
        when: { severity: 'critical' },
        set: { flagged: true, reviewed_by: new Auto() },
      }),
    );

    const s = schema('test', { nodes: [Alert] });
    const params = buildSchemaParams(s);
    const alertType = params.node_types!['Alert']! as any;

    expect(alertType.constraint.when).toEqual({ severity: 'critical' });
    expect(alertType.constraint.set).toEqual({
      flagged: true,
      reviewed_by: { mode: 'auto' },
    });
  });

  test('search properties', () => {
    const Task = node('Task', {
      id: prop({ search: exact() }),
      title: prop({ search: semantic(0.85) }),
    });

    const s = schema('test', { nodes: [Task] });
    const params = buildSchemaParams(s);
    const taskType = params.node_types!['Task']! as any;

    const searchProps = taskType.constraint.search.properties;
    expect(searchProps).toHaveLength(2);
    expect(searchProps[0]).toEqual({ name: 'id', mode: 'exact' });
    expect(searchProps[1]).toEqual({ name: 'title', mode: 'semantic', threshold: 0.85 });
  });

  test('relationship types', () => {
    const A = node('A', { x: prop() });
    const B = node('B', { y: prop() });

    const s = schema('test', {
      nodes: [A, B],
      edges: [edge(A, B, { name: 'relates_to', create: 'upsert', cardinality: 'one-to-many' })],
    });

    const params = buildSchemaParams(s);
    const rel = params.relationship_types!['RELATES_TO']! as any;

    expect(rel.name).toBe('RELATES_TO');
    expect(rel.label).toBe('Relates To');
    expect(rel.allowed_source_types).toEqual(['A']);
    expect(rel.allowed_target_types).toEqual(['B']);
    expect(rel.cardinality).toBe('one-to-many');
    expect(rel.constraint.create).toBe('upsert');
  });

  test('edge with search properties', () => {
    const TacticDef = node(
      'TacticDef',
      {
        id: prop({ search: exact() }),
        name: prop({ search: semantic(0.9) }),
      },
      lookup(),
    );

    const Behavior = node('Behavior', {
      desc: prop(),
    });

    const s = schema('test', {
      nodes: [TacticDef, Behavior],
      edges: [
        edge(Behavior, TacticDef, {
          name: 'mitigates',
          search: [TacticDef.id.exact(), TacticDef.name.semantic(0.9)],
          create: 'lookup',
        }),
      ],
    });

    const params = buildSchemaParams(s);
    const rel = params.relationship_types!['MITIGATES']! as any;

    expect(rel.constraint.create).toBe('lookup');
    expect(rel.constraint.search.properties).toHaveLength(2);
    expect(rel.constraint.search.properties[0]).toEqual({
      name: 'id',
      mode: 'exact',
    });
    expect(rel.constraint.search.properties[1]).toEqual({
      name: 'name',
      mode: 'semantic',
      threshold: 0.9,
    });
  });
});

describe('buildMemoryPolicy()', () => {
  test('empty policy', () => {
    expect(buildMemoryPolicy()).toEqual({});
  });

  test('with schemaId', () => {
    expect(buildMemoryPolicy({ schemaId: 'abc' })).toEqual({
      schema_id: 'abc',
    });
  });

  test('with mode', () => {
    expect(buildMemoryPolicy({ mode: 'manual' })).toEqual({
      mode: 'manual',
    });
  });

  test('with node constraints', () => {
    const policy = buildMemoryPolicy({
      schemaId: 'test',
      nodeConstraints: [
        {
          node_type: 'Task',
          create: 'upsert',
        },
      ],
    });
    expect(policy.schema_id).toBe('test');
    expect(policy.node_constraints).toHaveLength(1);
  });

  test('with edge constraints', () => {
    const policy = buildMemoryPolicy({
      edgeConstraints: [
        {
          edge_type: 'MITIGATES',
          create: 'lookup',
        },
      ],
    });
    expect(policy.edge_constraints).toHaveLength(1);
  });

  test('full policy', () => {
    const policy = buildMemoryPolicy({
      schemaId: 'sec_v1',
      mode: 'auto',
      nodeConstraints: [{ node_type: 'Alert', create: 'upsert' }],
      edgeConstraints: [{ edge_type: 'TRIGGERS', create: 'upsert' }],
    });
    expect(policy.schema_id).toBe('sec_v1');
    expect(policy.mode).toBe('auto');
    expect(policy.node_constraints).toHaveLength(1);
    expect(policy.edge_constraints).toHaveLength(1);
  });
});

describe('serializeSetValues()', () => {
  test('plain values pass through', () => {
    expect(serializeSetValues({ status: 'done', count: 5 })).toEqual({
      status: 'done',
      count: 5,
    });
  });

  test('Auto() replaced with mode dict', () => {
    expect(serializeSetValues({ status: new Auto() })).toEqual({
      status: { mode: 'auto' },
    });
  });

  test('Auto(prompt) replaced with mode+prompt dict', () => {
    expect(serializeSetValues({ summary: new Auto('Summarize briefly') })).toEqual({
      summary: { mode: 'auto', prompt: 'Summarize briefly' },
    });
  });

  test('mixed values', () => {
    expect(
      serializeSetValues({
        status: 'open',
        flagged: true,
        summary: new Auto(),
        priority: new Auto('Rate urgency as high/medium/low'),
      }),
    ).toEqual({
      status: 'open',
      flagged: true,
      summary: { mode: 'auto' },
      priority: { mode: 'auto', prompt: 'Rate urgency as high/medium/low' },
    });
  });
});

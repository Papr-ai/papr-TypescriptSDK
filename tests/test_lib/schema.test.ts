import {
  schema,
  node,
  lookup,
  upsert,
  resolve,
  constraint,
  prop,
  edge,
  exact,
  semantic,
  Auto,
  PropertyRef,
  NodeMetadata,
  SchemaMetadata,
  And,
  Or,
  Not,
} from '@papr/memory/lib';

describe('Policy factory functions', () => {
  test('lookup()', () => {
    expect(lookup()).toEqual({ type: 'lookup' });
  });

  test('upsert()', () => {
    expect(upsert()).toEqual({ type: 'upsert' });
  });

  test('resolve() default on_miss', () => {
    const p = resolve();
    expect(p).toEqual({ type: 'resolve', onMiss: 'error' });
  });

  test('resolve() custom on_miss', () => {
    const p = resolve({ onMiss: 'ignore' });
    expect(p).toEqual({ type: 'resolve', onMiss: 'ignore' });
  });

  test('constraint() with when and set', () => {
    const p = constraint({
      when: { priority: 'high' },
      set: { flagged: true },
    });
    expect(p.type).toBe('constraint');
    expect((p as any).when).toEqual({ priority: 'high' });
    expect((p as any).set).toEqual({ flagged: true });
  });

  test('constraint() serializes And/Or/Not in when', () => {
    const p = constraint({
      when: new And({ a: 1 }, new Not({ b: 2 })),
    });
    expect((p as any).when).toEqual({
      _and: [{ a: 1 }, { _not: { b: 2 } }],
    });
  });

  test('constraint() serializes Auto() in set', () => {
    const p = constraint({
      set: { status: new Auto(), summary: new Auto('Brief summary') },
    });
    expect((p as any).set).toEqual({
      status: { mode: 'auto' },
      summary: { mode: 'auto', prompt: 'Brief summary' },
    });
  });
});

describe('node()', () => {
  test('creates NodeMetadata correctly', () => {
    const Task = node('Task', {
      title: prop({ required: true }),
      status: prop(),
    });
    const meta = Task.__papr_node__;
    expect(meta).toBeInstanceOf(NodeMetadata);
    expect(meta.name).toBe('Task');
    expect(meta.label).toBe('Task');
    expect(meta.properties.size).toBe(2);
    expect(meta.properties.has('title')).toBe(true);
    expect(meta.properties.has('status')).toBe(true);
  });

  test('sets property names on descriptors', () => {
    const Task = node('Task', {
      title: prop(),
    });
    const titleDesc = Task.__papr_node__.properties.get('title')!;
    expect(titleDesc._name).toBe('title');
    expect(titleDesc._ownerName).toBe('Task');
  });

  test('default policy is upsert', () => {
    const Task = node('Task', { title: prop() });
    expect(Task.__papr_node__.createPolicy).toBe('upsert');
  });

  test('applies lookup policy', () => {
    const Ref = node('Ref', { id: prop() }, lookup());
    expect(Ref.__papr_node__.createPolicy).toBe('lookup');
  });

  test('applies upsert policy', () => {
    const Task = node('Task', { id: prop() }, upsert());
    expect(Task.__papr_node__.createPolicy).toBe('upsert');
  });

  test('applies resolve policy with on_miss=error', () => {
    const Req = node('Req', { id: prop() }, resolve({ onMiss: 'error' }));
    expect(Req.__papr_node__.createPolicy).toBe('lookup');
    expect(Req.__papr_node__.onMiss).toBe('error');
  });

  test('applies constraint policy', () => {
    const Task = node(
      'Task',
      { status: prop() },
      upsert(),
      constraint({
        when: { severity: 'critical' },
        set: { flagged: true, reviewed_by: new Auto() },
      }),
    );
    expect(Task.__papr_node__.when).toEqual({ severity: 'critical' });
    expect(Task.__papr_node__.set).toEqual({
      flagged: true,
      reviewed_by: { mode: 'auto' },
    });
  });

  test('Proxy returns PropertyRef on property access', () => {
    const Task = node('Task', {
      title: prop({ search: semantic(0.85) }),
      id: prop({ search: exact() }),
    });
    const titleRef = Task.title;
    expect(titleRef).toBeInstanceOf(PropertyRef);
    expect(titleRef._nodeType).toBe('Task');
    expect(titleRef._propName).toBe('title');
  });

  test('Proxy returns PropertyRef with chaining', () => {
    const Task = node('Task', { id: prop() });
    const ref = Task.id.exact('T-123');
    expect(ref).toBeInstanceOf(PropertyRef);
    expect(ref._mode).toBe('exact');
    expect(ref._value).toBe('T-123');
  });

  test('__papr_node__ access returns metadata', () => {
    const Task = node('Task', { x: prop() });
    expect(Task.__papr_node__).toBeInstanceOf(NodeMetadata);
    expect(Task.__papr_node__.name).toBe('Task');
  });

  test('multiple policies stack', () => {
    const Alert = node(
      'Alert',
      { title: prop(), severity: prop() },
      upsert(),
      constraint({
        when: { severity: 'critical' },
        set: { flagged: true },
      }),
    );
    expect(Alert.__papr_node__.createPolicy).toBe('upsert');
    expect(Alert.__papr_node__.when).toEqual({ severity: 'critical' });
    expect(Alert.__papr_node__.set).toEqual({ flagged: true });
  });
});

describe('schema()', () => {
  test('collects nodes', () => {
    const Person = node('Person', { name: prop() }, lookup());
    const Task = node('Task', { title: prop() }, upsert());
    const s = schema('test', { nodes: [Person, Task] });
    expect(s).toBeInstanceOf(SchemaMetadata);
    expect(s.name).toBe('test');
    expect(s.nodeTypes.size).toBe(2);
    expect(s.nodeTypes.has('Person')).toBe(true);
    expect(s.nodeTypes.has('Task')).toBe(true);
  });

  test('sets description', () => {
    const s = schema('test', {
      nodes: [],
      description: 'My schema',
    });
    expect(s.description).toBe('My schema');
  });

  test('collects edges', () => {
    const A = node('A', { x: prop() });
    const B = node('B', { y: prop() });
    const s = schema('test', {
      nodes: [A, B],
      edges: [edge(A, B, { name: 'links_to', create: 'upsert' })],
    });
    expect(s.edges.size).toBe(1);
    expect(s.edges.has('links_to')).toBe(true);
  });

  test('generates edge name if not provided', () => {
    const A = node('A', { x: prop() });
    const B = node('B', { y: prop() });
    const s = schema('test', {
      nodes: [A, B],
      edges: [edge(A, B)],
    });
    expect(s.edges.size).toBe(1);
    expect(s.edges.has('a_b')).toBe(true);
  });
});

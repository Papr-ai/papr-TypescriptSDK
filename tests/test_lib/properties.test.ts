import {
  Auto,
  SearchMode,
  exact,
  semantic,
  fuzzy,
  PropertyRef,
  PropDescriptor,
  prop,
  EdgeDescriptor,
  edge,
  node,
  lookup,
} from '@papr/memory/lib';

describe('Auto', () => {
  test('without prompt', () => {
    const a = new Auto();
    expect(a.prompt).toBeUndefined();
    expect(a.toDict()).toEqual({ mode: 'auto' });
  });

  test('with prompt', () => {
    const a = new Auto('Summarize in 1-2 sentences');
    expect(a.prompt).toBe('Summarize in 1-2 sentences');
    expect(a.toDict()).toEqual({
      mode: 'auto',
      prompt: 'Summarize in 1-2 sentences',
    });
  });

  test('toString', () => {
    expect(new Auto().toString()).toBe('Auto()');
    expect(new Auto('test').toString()).toBe('Auto("test")');
  });
});

describe('SearchMode', () => {
  test('exact mode', () => {
    const sm = new SearchMode('exact');
    expect(sm.mode).toBe('exact');
    expect(sm.threshold).toBeUndefined();
    expect(sm.toSearchProperty('id')).toEqual({ name: 'id', mode: 'exact' });
  });

  test('semantic mode with threshold', () => {
    const sm = new SearchMode('semantic', 0.85);
    expect(sm.toSearchProperty('title')).toEqual({
      name: 'title',
      mode: 'semantic',
      threshold: 0.85,
    });
  });

  test('fuzzy mode with value', () => {
    const sm = new SearchMode('fuzzy', 0.8, 'test value');
    expect(sm.toSearchProperty('name')).toEqual({
      name: 'name',
      mode: 'fuzzy',
      threshold: 0.8,
      value: 'test value',
    });
  });
});

describe('exact/semantic/fuzzy helpers', () => {
  test('exact() without value', () => {
    const sm = exact();
    expect(sm.mode).toBe('exact');
    expect(sm.threshold).toBeUndefined();
    expect(sm.value).toBeUndefined();
  });

  test('exact() with value', () => {
    const sm = exact('TASK-123');
    expect(sm.value).toBe('TASK-123');
  });

  test('semantic() default threshold', () => {
    const sm = semantic();
    expect(sm.mode).toBe('semantic');
    expect(sm.threshold).toBe(0.85);
  });

  test('semantic() custom threshold and value', () => {
    const sm = semantic(0.9, 'auth bug');
    expect(sm.threshold).toBe(0.9);
    expect(sm.value).toBe('auth bug');
  });

  test('fuzzy() default threshold', () => {
    const sm = fuzzy();
    expect(sm.mode).toBe('fuzzy');
    expect(sm.threshold).toBe(0.8);
  });
});

describe('PropertyRef', () => {
  test('basic construction', () => {
    const ref = new PropertyRef('Task', 'title');
    expect(ref._nodeType).toBe('Task');
    expect(ref._propName).toBe('title');
    expect(ref._mode).toBeUndefined();
  });

  test('.exact() chaining', () => {
    const ref = new PropertyRef('Task', 'id').exact('TASK-123');
    expect(ref._mode).toBe('exact');
    expect(ref._value).toBe('TASK-123');
    expect(ref._nodeType).toBe('Task');
    expect(ref._propName).toBe('id');
  });

  test('.semantic() chaining', () => {
    const ref = new PropertyRef('Task', 'title').semantic(0.9, 'auth bug');
    expect(ref._mode).toBe('semantic');
    expect(ref._threshold).toBe(0.9);
    expect(ref._value).toBe('auth bug');
  });

  test('.fuzzy() chaining', () => {
    const ref = new PropertyRef('Person', 'name').fuzzy(0.75);
    expect(ref._mode).toBe('fuzzy');
    expect(ref._threshold).toBe(0.75);
  });

  test('toLinkToString() basic', () => {
    expect(new PropertyRef('Task', 'title').toLinkToString()).toBe('Task:title');
  });

  test('toLinkToString() with exact value', () => {
    expect(new PropertyRef('Task', 'id', 'exact', undefined, 'TASK-123').toLinkToString()).toBe(
      'Task:id=TASK-123',
    );
  });

  test('toLinkToString() with semantic value', () => {
    expect(new PropertyRef('Task', 'title', 'semantic', 0.85, 'auth bug').toLinkToString()).toBe(
      'Task:title~auth bug',
    );
  });

  test('toLinkToString() no value even with mode', () => {
    expect(new PropertyRef('Task', 'title', 'exact').toLinkToString()).toBe('Task:title');
  });

  test('toSearchProperty() basic', () => {
    expect(new PropertyRef('Task', 'title').toSearchProperty()).toEqual({
      name: 'title',
    });
  });

  test('toSearchProperty() with mode and threshold', () => {
    expect(new PropertyRef('Task', 'title', 'semantic', 0.85).toSearchProperty()).toEqual({
      name: 'title',
      mode: 'semantic',
      threshold: 0.85,
    });
  });

  test('toSearchProperty() with value', () => {
    expect(new PropertyRef('Task', 'id', 'exact', undefined, 'T-1').toSearchProperty()).toEqual({
      name: 'id',
      mode: 'exact',
      value: 'T-1',
    });
  });
});

describe('PropDescriptor', () => {
  test('default values', () => {
    const pd = new PropDescriptor();
    expect(pd.type).toBe('string');
    expect(pd.required).toBe(false);
    expect(pd.description).toBeUndefined();
    expect(pd.enumValues).toBeUndefined();
    expect(pd.defaultValue).toBeUndefined();
    expect(pd.search).toBeUndefined();
  });

  test('with all options', () => {
    const pd = new PropDescriptor({
      type: 'integer',
      required: true,
      description: 'Test prop',
      enum_values: ['a', 'b', 'c'],
      default: 'a',
      search: exact(),
    });
    expect(pd.type).toBe('integer');
    expect(pd.required).toBe(true);
    expect(pd.description).toBe('Test prop');
    expect(pd.enumValues).toEqual(['a', 'b', 'c']);
    expect(pd.defaultValue).toBe('a');
    expect(pd.search).toBeInstanceOf(SearchMode);
  });

  test('toPropertyDefinition() minimal', () => {
    const pd = new PropDescriptor();
    expect(pd.toPropertyDefinition()).toEqual({ type: 'string' });
  });

  test('toPropertyDefinition() full', () => {
    const pd = new PropDescriptor({
      type: 'string',
      required: true,
      description: 'Desc',
      enum_values: ['a', 'b'],
      default: 'a',
    });
    expect(pd.toPropertyDefinition()).toEqual({
      type: 'string',
      required: true,
      description: 'Desc',
      enum_values: ['a', 'b'],
      default: 'a',
    });
  });

  test('toSearchProperty() with search and name', () => {
    const pd = new PropDescriptor({ search: semantic(0.85) });
    pd._name = 'title';
    expect(pd.toSearchProperty()).toEqual({
      name: 'title',
      mode: 'semantic',
      threshold: 0.85,
    });
  });

  test('toSearchProperty() returns null without search', () => {
    const pd = new PropDescriptor();
    pd._name = 'title';
    expect(pd.toSearchProperty()).toBeNull();
  });

  test('toSearchProperty() returns null without name', () => {
    const pd = new PropDescriptor({ search: exact() });
    expect(pd.toSearchProperty()).toBeNull();
  });
});

describe('prop()', () => {
  test('returns PropDescriptor', () => {
    const pd = prop();
    expect(pd).toBeInstanceOf(PropDescriptor);
  });

  test('passes options through', () => {
    const pd = prop({ required: true, search: exact(), enum_values: ['x'] });
    expect(pd.required).toBe(true);
    expect(pd.search).toBeInstanceOf(SearchMode);
    expect(pd.enumValues).toEqual(['x']);
  });
});

describe('EdgeDescriptor', () => {
  test('basic construction', () => {
    const ed = new EdgeDescriptor({
      sourceType: 'Person',
      targetType: 'Task',
    });
    expect(ed.sourceType).toBe('Person');
    expect(ed.targetType).toBe('Task');
    expect(ed.create).toBe('upsert');
    expect(ed.cardinality).toBe('many-to-many');
    expect(ed.search).toBeUndefined();
    expect(ed._name).toBeUndefined();
  });

  test('with all options', () => {
    const ed = new EdgeDescriptor({
      sourceType: 'A',
      targetType: 'B',
      search: [new PropertyRef('B', 'id')],
      create: 'lookup',
      when: { active: true },
      description: 'Test edge',
      cardinality: 'one-to-many',
    });
    expect(ed.create).toBe('lookup');
    expect(ed.cardinality).toBe('one-to-many');
    expect(ed.description).toBe('Test edge');
    expect(ed.search).toHaveLength(1);
    expect(ed.when).toEqual({ active: true });
  });
});

describe('edge()', () => {
  test('with string node names', () => {
    const ed = edge('Person', 'Task', { name: 'works_on', create: 'upsert' });
    expect(ed).toBeInstanceOf(EdgeDescriptor);
    expect(ed.sourceType).toBe('Person');
    expect(ed.targetType).toBe('Task');
    expect(ed._name).toBe('works_on');
  });

  test('with NodeDef proxies', () => {
    const Person = node('Person', { email: prop({ search: exact() }) }, lookup());
    const Task = node('Task', { title: prop() });
    const ed = edge(Person, Task, { name: 'works_on' });
    expect(ed.sourceType).toBe('Person');
    expect(ed.targetType).toBe('Task');
  });

  test('with single search ref', () => {
    const ref = new PropertyRef('Task', 'id');
    const ed = edge('Person', 'Task', { search: ref });
    expect(ed.search).toHaveLength(1);
    expect(ed.search![0]!._propName).toBe('id');
  });

  test('with multiple search refs', () => {
    const refs = [new PropertyRef('Task', 'id'), new PropertyRef('Task', 'title')];
    const ed = edge('Person', 'Task', { search: refs });
    expect(ed.search).toHaveLength(2);
  });

  test('throws for invalid node ref', () => {
    expect(() => edge(42 as unknown, 'Task')).toThrow(TypeError);
  });
});

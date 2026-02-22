import { And, Or, Not } from '@papr/memory/lib';

describe('And', () => {
  test('single condition', () => {
    const a = new And({ priority: 'high' });
    expect(a.toDict()).toEqual({
      _and: [{ priority: 'high' }],
    });
  });

  test('multiple conditions', () => {
    const a = new And({ priority: 'high' }, { status: 'active' });
    expect(a.toDict()).toEqual({
      _and: [{ priority: 'high' }, { status: 'active' }],
    });
  });

  test('nested Or', () => {
    const a = new And(
      new Or({ status: 'active' }, { status: 'pending' }),
      { team: 'security' },
    );
    expect(a.toDict()).toEqual({
      _and: [
        { _or: [{ status: 'active' }, { status: 'pending' }] },
        { team: 'security' },
      ],
    });
  });
});

describe('Or', () => {
  test('single condition', () => {
    const o = new Or({ status: 'active' });
    expect(o.toDict()).toEqual({
      _or: [{ status: 'active' }],
    });
  });

  test('multiple conditions', () => {
    const o = new Or({ status: 'active' }, { status: 'pending' });
    expect(o.toDict()).toEqual({
      _or: [{ status: 'active' }, { status: 'pending' }],
    });
  });
});

describe('Not', () => {
  test('with dict condition', () => {
    const n = new Not({ status: 'completed' });
    expect(n.toDict()).toEqual({
      _not: { status: 'completed' },
    });
  });

  test('with operator condition', () => {
    const n = new Not(new Or({ a: 1 }, { b: 2 }));
    expect(n.toDict()).toEqual({
      _not: { _or: [{ a: 1 }, { b: 2 }] },
    });
  });
});

describe('Composability', () => {
  test('And(Or(...), Not(...), dict)', () => {
    const condition = new And(
      new Or({ severity: 'high' }, { severity: 'critical' }),
      new Not({ status: 'resolved' }),
      { team: 'security' },
    );
    expect(condition.toDict()).toEqual({
      _and: [
        { _or: [{ severity: 'high' }, { severity: 'critical' }] },
        { _not: { status: 'resolved' } },
        { team: 'security' },
      ],
    });
  });

  test('deep nesting', () => {
    const condition = new Or(
      new And(
        { a: 1 },
        new Not({ b: 2 }),
      ),
      new And(
        { c: 3 },
        new Or({ d: 4 }, { e: 5 }),
      ),
    );
    expect(condition.toDict()).toEqual({
      _or: [
        { _and: [{ a: 1 }, { _not: { b: 2 } }] },
        { _and: [{ c: 3 }, { _or: [{ d: 4 }, { e: 5 }] }] },
      ],
    });
  });
});

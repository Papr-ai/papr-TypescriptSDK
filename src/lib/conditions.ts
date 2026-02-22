/**
 * Logical operators for conditional constraints.
 *
 * Provides And, Or, Not for building `when` conditions
 * with full composability.
 *
 * @example
 * ```typescript
 * import { And, Or, Not } from '@papr/memory/lib';
 *
 * // Simple condition
 * constraint({ when: { priority: "high" } })
 *
 * // Composed conditions
 * constraint({
 *   when: And(
 *     Or({ severity: "high" }, { severity: "critical" }),
 *     Not({ status: "resolved" }),
 *     { team: "security" },
 *   ),
 * })
 * // → { _and: [{ _or: [...] }, { _not: {...} }, { team: "security" }] }
 * ```
 */

export type Condition = Record<string, unknown> | And | Or | Not;

function conditionToDict(condition: Condition): Record<string, unknown> {
  if (condition instanceof And || condition instanceof Or || condition instanceof Not) {
    return condition.toDict();
  }
  return condition as Record<string, unknown>;
}

/**
 * Logical AND for `when` conditions.
 *
 * All conditions must match.
 *
 * @example
 * ```typescript
 * And({ priority: "high" }, { status: "active" })
 * // → { _and: [{ priority: "high" }, { status: "active" }] }
 * ```
 */
export class And {
  public readonly conditions: Condition[];

  constructor(...conditions: Condition[]) {
    this.conditions = conditions;
  }

  toDict(): Record<string, unknown> {
    return { _and: this.conditions.map(conditionToDict) };
  }
}

/**
 * Logical OR for `when` conditions.
 *
 * Any condition must match.
 *
 * @example
 * ```typescript
 * Or({ status: "active" }, { status: "pending" })
 * // → { _or: [{ status: "active" }, { status: "pending" }] }
 * ```
 */
export class Or {
  public readonly conditions: Condition[];

  constructor(...conditions: Condition[]) {
    this.conditions = conditions;
  }

  toDict(): Record<string, unknown> {
    return { _or: this.conditions.map(conditionToDict) };
  }
}

/**
 * Logical NOT for `when` conditions.
 *
 * Negates the condition.
 *
 * @example
 * ```typescript
 * Not({ status: "completed" })
 * // → { _not: { status: "completed" } }
 * ```
 */
export class Not {
  public readonly condition: Condition;

  constructor(condition: Condition) {
    this.condition = condition;
  }

  toDict(): Record<string, unknown> {
    return { _not: conditionToDict(this.condition) };
  }
}

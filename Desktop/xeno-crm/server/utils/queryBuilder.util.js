/**
 * Builds a MongoDB query object from an array of rule objects and a logical operator.
 *
 * @param {Array<{ field: string, operator: string, value: any }>} rules - Array of rule objects, each containing a field, operator, and value.
 * @param {"AND"|"OR"} operator - Logical operator to combine the rules ("AND" for $and, "OR" for $or).
 * @returns {Object} MongoDB query object using $and or $or with the specified conditions.
 *
 * @example
 * // Returns: { $and: [ { age: { $gt: 18 } }, { status: { $eq: "active" } } ] }
 * queryBuilder([
 *   { field: "age", operator: ">", value: 18 },
 *   { field: "status", operator: "==", value: "active" }
 * ], "AND");
 */
export function queryBuilder(rules, operator) {
  const mongodbOperations = {
    ">": "$gt",
    "<": "$lt",
    ">=": "$gte",
    "<=": "$lte",
    "==": "$eq",
    "!=": "$ne",
  };

  const conditions = rules.map((rule) => {
    const mongoOp = mongodbOperations[rule.operator];
    return {
      [rule.field]: {
        [mongoOp]: rule.value,
      },
    };
  });

  const mongoQuery =
    operator === "AND" ? { $and: conditions } : { $or: conditions };
  return mongoQuery;
}

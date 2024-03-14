import { AbstractVisitor } from "./abstractVisitor";
import { Environment } from "./environment";
import {
  Assignment,
  Additive,
  Identifier,
  Multiplicative,
  MeasuredNumber,
  AstNode,
  PhysicalUnitEnum,
  PhysicalUnit,
  GroupExpr,
} from "./types";

export interface EvaluatedResult {
  value: number;
  unit: PhysicalUnit;
}

export class EvaluateVisitor implements AbstractVisitor {
  
  constructor(private env: Environment<EvaluatedResult>) { }

  visit(node: AstNode): EvaluatedResult {
    // 1. Depending on the type of the AST node:
    switch (node.nodeType) {
        
      // 1.1. If it is an assignment statement, then:
      case "AssignmentStatement":
        // 1.1.1. Cast the node to type `Assignment`.
        node = node as Assignment;
        // 1.1.2. Visit the child `expr` of the node, and store the result in a variable.
        let expr = this.visit(node.expr);
        // 1.1.3. Add a variable and the stored evaluation result to the environment.
        // TODO: YOUR CODE HERE
        // 1.1.4. Return the stored evaluation result.
        return expr;

      // 1.2. If it is an identifier, then:
      case "Identifier":
        // 1.2.1. Cast the node to type `Identifier`.
        // TODO: YOUR CODE HERE
        // 1.2.2. Lookup the value of the variable from the environment, and store that value in a variable.
        let lookedUp = /* YOUR CODE HERE */;
        // 1.2.3. If the value is not undefined, then:
        if (lookedUp !== undefined) {
          // 1.2.3.1. Return the value.
          return lookedUp;
        }
        // 1.2.4. Otherwise, i.e., if the value is undefined, report an error.
        throw new Error("Variable " + node.name + "not in environment");

      // 1.3. If it is a group expression, then:
      case "GroupExpr":
        // 1.3.1. Cast the node to type `GroupExpr`.
        // 1.3.2. Return the result of visiting the child `subExpr` of the node.
        // TODO: YOUR CODE HERE

      // 1.4. If it is a measured number, then:
      case "MeasuredNumber":
        // 1.4.1. Cast the node to type `MeasuredNumber`.
        // TODO: YOUR CODE HERE
        // 1.4.2. Depending on the physical unit of the node:
        switch (node.unit.value) {
          // 1.4.2.1. If it is grams:
          case "g":
            // 1.4.2.1.1. Return an object that represents a value and a physical unit:
            return {
              // 1.4.2.1.1.1. The property `value` is the numerical value of the node.
              value: node.numericalValue,
              // 1.4.2.1.1.2. The property `unit` is still the node's unit, but the property `value` is updated to `g`.
              unit: { ...node.unit, value: "g" }, // Remark: the `...` here is TypeScript spread operator. Read more at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals , under "Overriding properties"
            };
          // 1.4.2.2. If it is kilograms:
          case "kg":
            // TODO: YOUR CODE HERE
          // 1.4.2.3. If it is hours:
          case "h":
            // TODO: YOUR CODE HERE
          // 1.4.2._. If it is ???what???:
          case /* TODO: YOUR CODE HERE */:
            // TODO: YOUR CODE HERE
            
          // TODO: YOUR CODE HERE FOR THE OTHER CASES
            
          // 1.4.2.14. Otherwise:
          default:
            // 1.4.2.14.1. Throw an error.
            throw new Error("Invalid unit used!");
        }
        
      // 1.5. If it is an addition-like expression, then:
      case "Additive":
        // 1.5.1. Cast the node to type `Additive`.
        // TODO: YOUR CODE HERE
        // 1.5.2. Visit the `left` child of this node, and store the result in a variable.
        // TODO: YOUR CODE HERE
        // 1.5.3. Visit the `right` child of this node, and store the result in a variable.
        // TODO: YOUR CODE HERE
        // 1.5.4. Depending on the `op` of this node:
        // 1.5.4.1. If it is `+`, then:
        if (node.op.value === "+") {
          // 1.5.4.1.1. Return an object that represents a value and a physical unit:
          return {
            // 1.5.4.1.1.1. The property `value` is the summation of the left and the right child of the node.
            value: /* TODO: YOUR CODE HERE */,
            // 1.5.4.1.1.2. The property `unit` is the unit of the left child of the node.
            // 1.5.4.1.1.2.1. Alternatively, it could have been the value of the right child of the node, as both of them have the same unit.
            unit: additiveLeft.unit,
          };
        // 1.5.4.2. Otherwise, if it is `-`, then:
        } else if (node.op.value === "-") {
          // TODO: YOUR CODE HERE
        }
        // 1.5.4.3. Otherwise, the operation should be prohibited, and an error is reported.
        else {
          throw new Error("System failure");
        }

      // 1.6. If it is a multiplication-like expression, then:
      case "Multiplicative":
        // TODO: YOUR CODE HERE
        
      // 1.7. Otherwise:
      default:
        // 1.7.1. Report an error.
        throw new Error("System failure, How did you do this?");
    }
  }
}

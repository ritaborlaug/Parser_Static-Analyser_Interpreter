import { Environment, newEnv } from "./environment";
import { EvaluateVisitor, EvaluatedResult } from "./evaluateVisitor";
import { parseProgram } from "./parser";
import { Tokenizer } from "./tokenizer";
import { TypeCheckVisitor } from "./typeCheckVisitor";
import { PhysicalUnitEnum, PhysicalUnitValues } from "./types";

export function interpret(program: string): Environment<EvaluatedResult> {
  
  // 1. Initialize a tokenizer for the program written in the PhysicsLang.
  let tokenizer = new Tokenizer(program);
  
  // 2. Tokenize the program and store the result in a variable.
  let tokenized = tokenizer.tokenize();
  
  // 3. Parse the tokenized program, and store the obtained AST in a variable.
  let parsed = parseProgram(tokenized);
  
  // 4. Type-check the AST.
  // 4.1. Initialize a new environment that will store _types_ of variables.
  let typeCheckEnv = newEnv<PhysicalUnitEnum>();
  // 4.2. Initialize a typechecking visitor.
  let typeCheckVisitor = new TypeCheckVisitor(typeCheckEnv);
  // 4.3. For each statement in the AST: 
  for (let statement of parsed) {
    // 4.3.1. Visit it using the typechecking visitor.
      typeCheckVisitor.visit(statement)
  }

  // 5. Evaluate the AST.
  // 5.1. Initialize a new environment that will store _values_ of variables.
  let evaluateEnv = newEnv<EvaluatedResult>();
  // 5.2. Initialize an evaluating visitor.
  let evaluateVisitor = new EvaluateVisitor(evaluateEnv);
  // 5.3. For each statement in the AST:
  // 5.3.1. Visit it using the evaluating visitor.
  for (let statement of parsed) {
    evaluateVisitor.visit(statement)

  }

  // 6. Return the environment that stores the values of variables.
  return evaluateEnv;
}

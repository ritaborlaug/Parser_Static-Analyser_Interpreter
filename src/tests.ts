import { interpret } from "./interpreter";

const tests = {
  testPlus: () => {
    let code = "let a = 1[kg] + 2 [kg]";
    try {
      let resultingEnv = interpret(code);

      console.assert(
        resultingEnv.env.get("a")?.unit.value === "m" &&
          resultingEnv.env.get("a")?.value === 3
      );
    } catch {
      console.log("Failed simple plus statement");
    }
  },
  testMinus: () => {},
  testLeftAssociativity: () => {},
  testParenthesis: () => {},
  testMultiplication: () => {},
  testDivision: () => {},
};

export function runTests() {
  tests.testPlus();
}

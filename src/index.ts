import { Effect } from "effect";

const increment = (x: number) => x + 1;

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b);

const task1 = Effect.promise(() => Promise.resolve(10));

const task2 = Effect.promise(() => Promise.resolve(2));

export const program = Effect.gen(function* (_) {
  console.log("step1");
  const a = yield* _(task1);
  console.log("step2");
  const b = yield* _(task2);
  console.log("step3");

  const n1 = yield* _(divide(a, b));
  const n2 = increment(n1);
  return `Result is: ${n2}`;
});

Effect.runPromise(program).then(console.log);

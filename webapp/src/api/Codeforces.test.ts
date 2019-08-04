import {
  fetchCodeforcesProblems,
  fetchCodeforcesSubmissions
} from "./Codeforces";

test("fetch problems from Codeforces", async () => {
  jest.setTimeout(30 * 1000);
  const problems = await fetchCodeforcesProblems();
  expect(problems.isEmpty()).toBeFalsy();
});

test("fetch submissions from Codeforces", async () => {
  jest.setTimeout(30 * 1000);
  const submissions = await fetchCodeforcesSubmissions("kenkoooo", 1, 2);
  expect(submissions.isEmpty()).toBeFalsy();
});

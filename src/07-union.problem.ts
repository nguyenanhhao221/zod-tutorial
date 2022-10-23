// CODE

import { expect, it } from 'vitest';
import { z } from 'zod';

//The first solution
const Form = z.object({
  repoName: z.string(),
  privacyLevel: z.union([z.literal('private'), z.literal('public')]),
  //              ^ 🕵️‍♂️
});

//Second solution using Enum
//this solution is the same as using union but enum act like a sugar syntax.
const FormEnum = z.object({
  repoName: z.string(),
  privacyLevel: z.enum(['private', 'public']),
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

export const validateFormInputWithEnum = (values: unknown) => {
  const parsedData = FormEnum.parse(values);

  return parsedData;
};
// TESTS
//Test for first solution
it('Should fail if an invalid privacyLevel passed', async () => {
  expect(() =>
    validateFormInput({
      repoName: 'mattpocock',
      privacyLevel: 'something-not-allowed',
    })
  ).toThrowError();
});

it('Should permit valid privacy levels', async () => {
  expect(
    validateFormInput({
      repoName: 'mattpocock',
      privacyLevel: 'private',
    }).privacyLevel
  ).toEqual('private');

  expect(
    validateFormInput({
      repoName: 'mattpocock',
      privacyLevel: 'public',
    }).privacyLevel
  ).toEqual('public');
});

//Test for second solution
it('Should fail if an invalid privacyLevel passed', async () => {
  expect(() =>
    validateFormInputWithEnum({
      repoName: 'mattpocock',
      privacyLevel: 'something-not-allowed',
    })
  ).toThrowError();
});

it('Should permit valid privacy levels', async () => {
  expect(
    validateFormInputWithEnum({
      repoName: 'mattpocock',
      privacyLevel: 'private',
    }).privacyLevel
  ).toEqual('private');

  expect(
    validateFormInputWithEnum({
      repoName: 'mattpocock',
      privacyLevel: 'public',
    }).privacyLevel
  ).toEqual('public');
});

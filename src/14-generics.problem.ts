// CODE

import { it } from 'vitest';
import { Schema, z } from 'zod';
import { Equal, Expect } from './helpers/type-utils';

const genericFetch = <Z extends z.ZodSchema>(
  url: string,
  schema: Z
): Promise<z.infer<typeof schema>> => {
  //                 ^ 🕵️‍♂️
  return fetch(url)
    .then((res) => res.json())
    .then((result) => {
      console.log('🚀 ~ .then ~ schema.parse(result);', schema.parse(result));
      return schema.parse(result);
    });
};

// TESTS

it('Should fetch from the Star Wars API', async () => {
  const result = await genericFetch(
    'https://swapi.dev/api/people/1',
    z.object({
      name: z.string(),
    })
  );

  console.log('🚀 ~ it ~ result', result);
  console.log('🚀 ~ it ~ result', typeof result);
  type cases = [
    // Result should equal { name: string }, not any
    Expect<Equal<typeof result, { name: string }>>
  ];
});

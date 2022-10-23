// CODE

import { expect, it } from 'vitest';
import { z } from 'zod';

//Here we tell zod that the PersonResult will be an object with the key name with string type.

const PersonResult = z.object({
  name: z.string(),
});
//                   ^ 🕵️‍♂️

export const fetchStarWarsPersonName = async (id: string) => {
  //here data is type as any because we don't actually know what type of data will return. But we can always log it out for example and see what we need. Then we specify that key in zod
  const data = await fetch('https://swapi.dev/api/people/' + id).then((res) =>
    res.json()
  );

  //ParsedData will strip all other
  const parsedData = PersonResult.parse(data);
  console.log('🚀 ~ fetchStarWarsPersonName ~ parsedData', parsedData);

  return parsedData.name;
};

// TESTS

it('Should return the name', async () => {
  expect(await fetchStarWarsPersonName('1')).toEqual('Luke Skywalker');
  expect(await fetchStarWarsPersonName('2')).toEqual('C-3PO');
});

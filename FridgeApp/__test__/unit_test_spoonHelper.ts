import {groceryParser} from '../FridgeModel/SpoonHelper'
import {SpoonGrocery, SpoonFailure,} from '../types'

test('groceryParser_success', () => {
  const inst:SpoonGrocery ={
    id: 12345,
    title: "new new product",
    spoonacularScore: 1,
  };
  const output:SpoonGrocery={
    title: "new new product",
    spoon_id: 12345,
    _id:"3",
    expiration: "N/A"
  }
  expect(groceryParser(inst, "3", "")).toStrictEqual(output);
});

test('groceryParser_noCertainattr', () => {
  const inst:SpoonGrocery ={
    id: 12345,
    title: "new new product",
    ingredientCount:3
  };
  const output:SpoonGrocery={
    title: "new new product",
    spoon_id: 12345,
    _id:"3",
    ingredientCount:3,
    expiration: "N/A"
  }
  expect(groceryParser(inst, "3", "")).toStrictEqual(output);
});

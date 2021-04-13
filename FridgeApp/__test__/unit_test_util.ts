import {SpoonGrocery, SpoonFailure,} from '../types'
import {
  isSpoonGrocery, isSpoonFailure
} from '../utils';

const failureMessage:SpoonFailure = {
  status:"Failure",
  message:"Not working!"
};

const groceryInstance:SpoonGrocery ={
  title: "random Apple grocery blabla",
  spoon_id: 12345,
};
test('isSpoonGrocery_undefined', () => {
  const inst = undefined;
  expect(isSpoonGrocery(inst)).toStrictEqual(false);
});

test('isSpoonGrocery_SpoonFailure', () => {

  expect(isSpoonGrocery(failureMessage)).toStrictEqual(false);
});

test('isSpoonGrocery_string', () => {
  const inst:string ="{'spoonId':12345}";
  expect(isSpoonGrocery(inst)).toStrictEqual(false);
});

test('isSpoonGrocery_SpoonGrocery', () => {
  expect(isSpoonGrocery(groceryInstance)).toStrictEqual(true);
});

test('isSpoonFailure_string', () => {
  const inst:string ="{'status':'unreal'}";
  expect(isSpoonFailure(inst)).toStrictEqual(false);
});

test('isSpoonFailure_SpoonFailure', () => {
  expect(isSpoonFailure(failureMessage)).toStrictEqual(true);
});

test('isSpoonFailure_undefined', () => {
  const inst = undefined;
  expect(isSpoonFailure(inst)).toStrictEqual(false);
});

test('isSpoonFailure_SpoonGrocery', () => {
  expect(isSpoonFailure(groceryInstance)).toStrictEqual(false);
});

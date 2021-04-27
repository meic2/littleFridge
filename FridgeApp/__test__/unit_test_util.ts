import {SpoonGrocery, SpoonFailure, Recipe,} from '../types'
import {
  isSpoonGrocery, isSpoonFailure, isRecipe, dateFormate
} from '../utils';

const failureMessage:SpoonFailure = {
  status:"Failure",
  message:"Not working!"
};

const groceryInstance:SpoonGrocery ={
  title: "random Apple grocery blabla",
  spoon_id: 12345,
};

const recipeInstance:Recipe ={
  createDate: "2012-01-02",
  title: "random recipe",
  spoon_id:-1
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

/*
new test for week 3
 */
test('isRecipe_true', () => {
  expect(isRecipe(recipeInstance)).toStrictEqual(true);
});

test('isRecipe_string', () => {
  const inst:string ="{'title':'new recipe'}";
  expect(isRecipe(inst)).toStrictEqual(false);
});

test('isRecipe_undefined', () => {
  expect(isRecipe(undefined)).toStrictEqual(false);
});

test('expire_dateFormat_correct', ()=>{
  expect(dateFormate('2021-01-02')).toStrictEqual(true)
});

test('dateFormat_undefined', ()=>{
  expect(dateFormate('')).toStrictEqual(false)
});

test('dateFormat_wrongFormat', ()=>{
  expect(dateFormate('201-01-02')).toStrictEqual(false)
});

test('expire_dateFormat_wrongDate', ()=>{
  expect(dateFormate('2019-01-02')).toStrictEqual(false)
});

test('create_dateFormat_wrongDate', ()=>{
  expect(dateFormate('2019-01-02')).toStrictEqual(true)
});

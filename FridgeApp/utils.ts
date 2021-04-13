import {SpoonGrocery, SpoonFailure,} from './types'

/**
 * the function cast a type guard to the instance with multiple potential type
 * @param instance a instance with multiple type unions
 */
export function isSpoonGrocery(instance: SpoonGrocery | SpoonFailure | undefined |string)
  : instance is SpoonGrocery {
  if (instance === undefined)
    return false;
  if (typeof instance == "string"){
    try{
      return (JSON.parse(instance) as SpoonGrocery).title !== undefined;
    }catch (e) {
      return false;
    }
  }
  return (instance as SpoonGrocery).title !== undefined;

}

/**
 * the function cast a type guard to the instance with multiple potential type
 * @param instance a instance with multiple type unions
 */
export function isSpoonFailure(instance: SpoonGrocery | SpoonFailure | undefined|string)
  : instance is SpoonGrocery {
  if (instance === undefined)
    return false;
  if (typeof instance == "string"){
    try {
      return (JSON.parse(instance) as SpoonFailure).status !== undefined;
    }catch (e) {
      return false;
    }
  }
  return (instance as SpoonFailure).status !== undefined;
}

import {SpoonGrocery, SpoonFailure,} from './types'


function SpoonTypeHelper(instance:SpoonGrocery | SpoonFailure | undefined|string, type:string):boolean{
  if (instance === undefined)
    return false;
  if (typeof instance == "string") {
    try {
      if (type === "SpoonGrocery") {
        return (JSON.parse(instance) as SpoonGrocery).title !== undefined;
      } else {
        return (JSON.parse(instance) as SpoonFailure).status !== undefined;
      }
    } catch (e) {
      return false;
    }
  }
  return true;
}
/**
 * the function cast a type guard to the instance with multiple potential type
 * @param instance a instance with multiple type unions
 */
export function isSpoonGrocery(instance: SpoonGrocery | SpoonFailure | undefined |string)
  : instance is SpoonGrocery {
  if (SpoonTypeHelper(instance, 'SpoonGrocery')=== false) return false;
  return (instance as SpoonGrocery).title !== undefined;

}

/**
 * the function cast a type guard to the instance with multiple potential type
 * @param instance a instance with multiple type unions
 */
export function isSpoonFailure(instance: SpoonGrocery | SpoonFailure | undefined|string)
  : instance is SpoonGrocery {
  if (SpoonTypeHelper(instance, 'SpoonFailure')=== false) return false;
  return (instance as SpoonFailure).status !== undefined;
}

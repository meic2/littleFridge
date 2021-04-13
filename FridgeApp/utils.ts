import {SpoonGrocery, SpoonFailure,} from './types'

export function isSpoonGrocery(instance: SpoonGrocery | SpoonFailure | undefined |string)
  : instance is SpoonGrocery {
  if (instance === undefined)
    return false;
  if (typeof instance == "string"){
    return (JSON.parse(instance) as SpoonGrocery).spoon_id !== undefined;
  }
  return (instance as SpoonGrocery).spoon_id !== undefined;

}

export function isSpoonFailure(instance: SpoonGrocery | SpoonFailure | undefined|string)
  : instance is SpoonGrocery {
  if (instance === undefined)
    return false;
  if (typeof instance == "string"){
    return (JSON.parse(instance) as SpoonFailure).status !== undefined;
  }
  return (instance as SpoonFailure).status !== undefined;
}

import {SpoonGrocery, SpoonFailure,} from './types'

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

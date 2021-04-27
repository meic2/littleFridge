import {SpoonGrocery, SpoonFailure, Recipe,} from './types'


function SpoonTypeHelper(instance:SpoonGrocery | SpoonFailure | Recipe| undefined|string, type:string):boolean{
  if (instance === undefined)
    return false;
  if (typeof instance == "string") {
    try {
      if (type === "SpoonGrocery") {
        return (JSON.parse(instance) as SpoonGrocery).title !== undefined;
      } else if (type === "SpoonFailure") {
        return (JSON.parse(instance) as SpoonFailure).status !== undefined;
      }else{
        return (JSON.parse(instance) as Recipe).createDate !== undefined;
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
  return (<SpoonGrocery>instance).title !== undefined;

}

/**
 * the function cast a type guard to the instance with multiple potential type
 * @param instance a instance with multiple type unions
 */
export function isSpoonFailure(instance: SpoonGrocery | SpoonFailure | undefined|string)
  : instance is SpoonFailure {
  if (SpoonTypeHelper(instance, 'SpoonFailure')=== false) return false;
  return (<SpoonFailure>instance).status !== undefined;
}

/**
 * the function cast a type guard to the instance with multiple potential type
 * @param instance a instance with multiple type unions
 */
export function isRecipe(instance: Recipe | undefined|string)
  : instance is Recipe {
  if (SpoonTypeHelper(instance, 'Recipe')=== false) return false;
  return (<Recipe> instance).createDate !== undefined;
}



export function dateFormate(dateinput:string, createDate=false):SpoonFailure{
  const items:string[]= dateinput.split('-');
  if (items.length!==3){
    return {status:"400", message:"wrong date format"};
  }
  if (items[0].length!=4 || items[1].length!==2 || items[2].length!==2){
    return {status:"400", message:"wrong date format"};
  }
  try {
    const expireDate = new Date(dateinput);
    const today =new Date();
    if(createDate && expireDate < today){
      return {status:"400", message:"expiration date should not be earlier than today"};
    }
  }catch (e) {
    return {status:"400", message:"wrong date format"};
  }
  return {status:"200", message:"correct"};
}

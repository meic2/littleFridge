# sp21-cs242-project

This is the project for implementing a digital recorder for the refrigerator to remind user about the groceries' expriation date in the fridge.

## External API

* nutritionix API 
  * barcode scanner: react-native-camera https://github.com/react-native-camera/react-native-camera
  
* spoontacular API
  * for fetching the corresponding API
  * we call on searchGrocery, searchRecipe and searchAutoComplete to help standardize our database.  
    
## API
we use Flask to set up our API, and the user will have two collection: 
`recipe` and `grocery`.


### GET
`/grocery?grocery_id=all`

`/grocery?grocery_id=` + one single upc ID

`/recipe?recipe_id=all`

`/grocery?grocery_id=` + one single recipeID

### PUT
`/grocery` with Body input json string

`/recipe`with Body input json string

### POST
`/grocery?grocery_id=`with Body input json string

`/recipe?recipe_id=`with Body input json string

### DELETE
`/grocery?grocery_id=`

`/recipe?recipe_id=`


## test:
at LittleFridge directory, `export PYTHONPATH = .` and then run pytest
ESlint: run `npx eslint . --ext .js,.jsx,.ts,.tsx`


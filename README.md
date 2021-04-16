# sp21-cs242-project
This project is bootstraped with `create-react-native-app`
This is the project for implementing a digital recorder for the refrigerator to remind user about the groceries' expriation date in the fridge.

## External API

* spoontacular API, see documentation here https://spoonacular.com/food-api/docs#Classify-Grocery-Product
  * we call on searchGrocery, searchRecipe and searchAutoComplete to help standardize our database.  
    

## Structure 

There are two parts of the project:

`FridegApp` responsible for front-end construction for IOS app, with Model(`FridgeModel`)-Controller(`screens`)-View(`views`) being separated.

`LittleFridge` responsible for back-end API construction, and the main implementation is to construct a local database with itself. 

    __ root directory
        |__ FridgeApp
           |__ FridgeModel
              |__ FetchGrocery.ts
              |__ SpoonHelper.ts   
           |__ screens
              |__ TabOneScreen.tsx
              |__ ScannerScreen.tsx
           |__ views
              |__ FridgeView.tsx
           |__ navigation       
           |__ __test__
           
        |__ LittleFridge
           |__ flaskr
               |__ __init__.py
               |__ db.py
               |__ grocery.py   
               |__ recipe.py
               |__ auth.py (need further implement)   
           |_pytests

## API
we use Flask to set up our API, and the user will have two collection: 
`recipe` and `grocery`.


#### GET
`/grocery?grocery_id=all`

`/grocery?grocery_id=` + one single upc ID

`/recipe?recipe_id=all`

`/grocery?grocery_id=` + one single recipeID

#### PUT
`/grocery` with Body input json string

`/recipe`with Body input json string

#### POST
`/grocery?grocery_id=`with Body input json string

`/recipe?recipe_id=`with Body input json string

#### DELETE
`/grocery?grocery_id=`

`/recipe?recipe_id=`

## FrontEnd

We use `React-native` to implement the IOS phone app, currently we only use `expo-barcode-scanner` to scan, but it only supports `upc-e, ean-13` on IOS device.


## test:
at LittleFridge directory, `export PYTHONPATH = .` and then run pytest
ESlint: run `npx eslint . --ext .js,.jsx,.ts,.tsx`


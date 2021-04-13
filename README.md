# sp21-cs242-project
This project bootstrapped with the expo `create-react-native-app`.

This project aims for implementing a digital recorder for the refrigerator to remind user about the groceries' expriation date in the fridge.

Right now, this project only implements front-end for IOS device. 

## External API

* we use `spoontacular` API, see documentation here: https://spoonacular.com/food-api/docs#Classify-Grocery-Product
  * this API currently only support searchBY UPC-A barcode, indicating a limited scope of grocery product within USA/Canada can be used.
  
## Structure

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
## Backend API
we use Flask to set up our API, and the user will have two collection: 
`recipe` and `grocery`.

To get running:

    source python_env
    cd LittleFridge
    Flask run 
    
The following is the API request.
#### GET
`/grocery?grocery_id=all`: finding all grocery instance, return string

`/grocery?grocery_id=` + one single upc ID

`/recipe?recipe_id=all`: finding all recipe instance, return string

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

## FridgeApp
Structured with `React-Native` and `Typescript`. 
to run, 

    cd FridgeApp
    expo start

we use `expo-barcode-scanner`, and it currently only functioning on `UPC-E, ENA-13` for IOS device.


## test:
- pytest: at `LittleFridge` directory, `export PYTHONPATH = .` and then run `pytest`

- ESlint: run `npx eslint . --ext .js,.jsx,.ts,.tsx`

- jest: at `FridgeApp` directory, run `npx jest`

see `ManualTest.md` for further test information



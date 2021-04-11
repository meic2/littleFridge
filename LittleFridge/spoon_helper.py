"""
This file is a hleper that will be lated used in the React Native FrontEnd.
When the user entering a name for the grocery/recipe, the app will automatically run on searching the name.
If the user confirms that this is the case, the engine will use the id to search for the complete information
and return to the front end.
"""
import os
import requests
import json
from dotenv import load_dotenv
load_dotenv()

SPOON_KEY = os.getenv("SPOON_APIKEY")
AUTO_COMPLETE_GROCERY = 'https://api.spoonacular.com/food/products/suggest'
STATUS_NORMAL = 200
JSON_HEADER = {"Content-Type": "application/json"}
CLASSIFY_GROCERY_URL = "https://api.spoonacular.com/food/products/classify"
SEARCH_GROCERY_URL = "https://api.spoonacular.com/food/products/search"
RECIPE_FIND_BY_INGRE = "https://api.spoonacular.com/recipes/findByIngredients"


def search_grocery_by_name(usr_input, number=5):
    """

    :param usr_input:
    :param number: default potental related grocery number to be 5
    :return: a list of dictionary with matched grocery
    """
    parameters = {
        "apiKey": SPOON_KEY,
        "query": usr_input,
        "number": number
    }
    response = requests.get(SEARCH_GROCERY_URL, params=parameters, headers=JSON_HEADER)
    if response.status_code == STATUS_NORMAL:
        return response.json()["products"]
    else:
        return response.status_code, response.json()['message']


def autocomplete_search_grocery(usr_input, number=5):
    """
    This helper function helps the user to input and find the kinds of food that they
    like to find
    :param usr_input: input of the ingredients
    :param number: default to be 5. List the autocomplete search results)
    :return: status code, response string
    """
    parameters = {
        "apiKey": SPOON_KEY,
        "query": usr_input,
        "number": number
    }
    response = requests.get(AUTO_COMPLETE_GROCERY, params=parameters, headers=JSON_HEADER)
    print(parameters)
    if response.status_code == STATUS_NORMAL:
        return response.json()["results"]
    else:
        return response.status_code, response.json()['message']


def transit_spoon_ingredients(extended_ingredients):
    """
    This method transform the ingredients in the searched recipes' into correct formats
    # TODO: need to further varify the relationship between ingredients, groceries, recipes
    :param extended_ingredients:
    :return:
    """
    converted_dict = json.loads(extended_ingredients)
    for ing in converted_dict:
        # make sure every id is transformed to spoon_id format
        ing["spoon_id"] = ing["id"]
        del ing["id"]
    return converted_dict[0]


def classify_grocery_by_name(name, upc="", plu_code=""):
    """
    user's input name wiill return back a suggested category
    :param name: user input
    :param upc: grocery's upc code
    :param plu_code: grocery's plu code
    :return: string indicating no matched category or suggested string
    """
    parameters = {
        "apiKey": SPOON_KEY,
    }
    body = {
        "title": name,
        "upc": upc,
        "plu_code": plu_code
    }
    response = requests.post(url=CLASSIFY_GROCERY_URL, params=parameters,
                             json=body, headers=JSON_HEADER)
    if response.status_code != STATUS_NORMAL:
        return "no suggested classification"
    return response.json()["matched"]


def construct_query_find_by_ingre(ingre_list):
    """
    construct the query from a list of ingredients
    :param ingre_list:
    :return:
    """
    query = ''
    for ingre in ingre_list:
        query += ingre
        query += ",+"
    return query[:-2]


def search_recipe_by_ingre(ingre_list, number=5):
    """
    search the matching recipes with the ingredients that needs to be consumed
    :param ingre_list: a list of ingredient name
    :param number: default to be 5
    :return: a list (length = number) of recipe
    """
    parameters = {
        "apiKey": SPOON_KEY,
        "ingredients": construct_query_find_by_ingre(ingre_list),
        "ranking": 1,  # maximize the ingredients
        "number": number
    }
    response = requests.get(url=RECIPE_FIND_BY_INGRE, params=parameters)
    if response.status_code != STATUS_NORMAL:
        return "no suggested classification"
    return response.json()


if __name__ == "__main__":
    print(search_grocery_by_name(["apple"]))


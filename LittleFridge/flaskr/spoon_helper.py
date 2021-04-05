if __package__:
    from .config import SPOON_KEY
else:
    from config import SPOON_KEY
import requests
import json

AUTO_COMPLETE_GROCERY = 'https://api.spoonacular.com/food/products/suggest'
STATUS_NORMAL = 200
JSON_HEADER = {"Content-Type": "application/json"}
CLASSIFY_GROCERY_URL = "https://api.spoonacular.com/food/products/classify"
SEARCH_GROCERY_URL = "https://api.spoonacular.com/food/products/search"


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


def transit_spoon_ingredients(extendedIngredients):
    """
    This method transform the ingredients in the searched recipes' into correct formats
    # TODO: need to further varify the relationship between ingredients, groceries, recipes
    :param extendedIngredients:
    :return:
    """
    converted_dict = json.loads(extendedIngredients)
    for ing in converted_dict:
        # make sure every id is transformed to spoon_id format
        ing["spoon_id"] = ing["id"]
        del ing["id"]
    return converted_dict[0]


def classify_grocery_by_name(name, upc = "", plu_code = ""):
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


def search_recipe(query, number = 5):



if __name__ == "__main__":
    print(classify_grocery_by_name("pineapple"))
    # temp_arr = [{
    #         "id": 20081,
    #         "aisle": "Baking",
    #         "image": "flour.png",
    #         "consistency": "solid",
    #         "name": "flour",
    #         "nameClean": "wheat flour",
    #         "original": "2 tablespoons Flour",
    #         "originalString": "2 tablespoons Flour",
    #         "originalName": "Flour",
    #         "amount": 2.0,
    #         "unit": "tablespoons",
    #         "meta": [],
    #         "metaInformation": [],
    #         "measures": {
    #             "us": {
    #                 "amount": 2.0,
    #                 "unitShort": "Tbsps",
    #                 "unitLong": "Tbsps"
    #             },
    #             "metric": {
    #                 "amount": 2.0,
    #                 "unitShort": "Tbsps",
    #                 "unitLong": "Tbsps"
    #             }
    #         }
    #     },
    #     {
    #         "id": 11291,
    #         "aisle": "Produce",
    #         "image": "spring-onions.jpg",
    #         "consistency": "solid",
    #         "name": "green onions",
    #         "nameClean": "spring onions",
    #         "original": "cup Green Onions, chopped",
    #         "originalString": "cup Green Onions, chopped",
    #         "originalName": "Green Onions, chopped",
    #         "amount": 1.0,
    #         "unit": "cup",
    #         "meta": [
    #             "chopped"
    #         ],
    #         "metaInformation": [
    #             "chopped"
    #         ],
    #         "measures": {
    #             "us": {
    #                 "amount": 1.0,
    #                 "unitShort": "cup",
    #                 "unitLong": "cup"
    #             },
    #             "metric": {
    #                 "amount": 236.588,
    #                 "unitShort": "ml",
    #                 "unitLong": "milliliters"
    #             }
    #         }
    #     },
    #     {
    #         "id": 1085,
    #         "aisle": "Milk, Eggs, Other Dairy",
    #         "image": "milk.jpg",
    #         "consistency": "liquid",
    #         "name": "non-fat milk",
    #         "nameClean": "fat free milk",
    #         "original": "1 1/4 cups Non-Fat Milk",
    #         "originalString": "1 1/4 cups Non-Fat Milk",
    #         "originalName": "Non-Fat Milk",
    #         "amount": 1.25,
    #         "unit": "cups",
    #         "meta": [],
    #         "metaInformation": [],
    #         "measures": {
    #             "us": {
    #                 "amount": 1.25,
    #                 "unitShort": "cups",
    #                 "unitLong": "cups"
    #             },
    #             "metric": {
    #                 "amount": 295.735,
    #                 "unitShort": "ml",
    #                 "unitLong": "milliliters"
    #             }
    #         }
    #     },
    #     {
    #         "id": 4053,
    #         "aisle": "Oil, Vinegar, Salad Dressing",
    #         "image": "olive-oil.jpg",
    #         "consistency": "liquid",
    #         "name": "olive oil",
    #         "nameClean": "olive oil",
    #         "original": "2 tablespoons Olive Oil",
    #         "originalString": "2 tablespoons Olive Oil",
    #         "originalName": "Olive Oil",
    #         "amount": 2.0,
    #         "unit": "tablespoons",
    #         "meta": [],
    #         "metaInformation": [],
    #         "measures": {
    #             "us": {
    #                 "amount": 2.0,
    #                 "unitShort": "Tbsps",
    #                 "unitLong": "Tbsps"
    #             },
    #             "metric": {
    #                 "amount": 2.0,
    #                 "unitShort": "Tbsps",
    #                 "unitLong": "Tbsps"
    #             }
    #         }
    #     },
    #     {
    #         "id": 11282,
    #         "aisle": "Produce",
    #         "image": "brown-onion.png",
    #         "consistency": "solid",
    #         "name": "onion",
    #         "nameClean": "onion",
    #         "original": "2 tablespoons Onion, minced",
    #         "originalString": "2 tablespoons Onion, minced",
    #         "originalName": "Onion, minced",
    #         "amount": 2.0,
    #         "unit": "tablespoons",
    #         "meta": [
    #             "minced"
    #         ],
    #         "metaInformation": [
    #             "minced"
    #         ],
    #         "measures": {
    #             "us": {
    #                 "amount": 2.0,
    #                 "unitShort": "Tbsps",
    #                 "unitLong": "Tbsps"
    #             },
    #             "metric": {
    #                 "amount": 2.0,
    #                 "unitShort": "Tbsps",
    #                 "unitLong": "Tbsps"
    #             }
    #         }
    #     },
    #     {
    #         "id": 1033,
    #         "aisle": "Cheese",
    #         "image": "parmesan.jpg",
    #         "consistency": "solid",
    #         "name": "parmesan cheese",
    #         "nameClean": "parmesan",
    #         "original": "1/4 cup Parmesan Cheese, grated",
    #         "originalString": "1/4 cup Parmesan Cheese, grated",
    #         "originalName": "Parmesan Cheese, grated",
    #         "amount": 0.25,
    #         "unit": "cup",
    #         "meta": [
    #             "grated"
    #         ],
    #         "metaInformation": [
    #             "grated"
    #         ],
    #         "measures": {
    #             "us": {
    #                 "amount": 0.25,
    #                 "unitShort": "cups",
    #                 "unitLong": "cups"
    #             },
    #             "metric": {
    #                 "amount": 59.147,
    #                 "unitShort": "ml",
    #                 "unitLong": "milliliters"
    #             }
    #         }
    #     },
    #     {
    #         "id": 11297,
    #         "aisle": "Produce;Spices and Seasonings",
    #         "image": "parsley.jpg",
    #         "consistency": "solid",
    #         "name": "parsley",
    #         "nameClean": "parsley",
    #         "original": "cup Fresh Parsley or Basil, chopped",
    #         "originalString": "cup Fresh Parsley or Basil, chopped",
    #         "originalName": "Fresh Parsley or Basil, chopped",
    #         "amount": 1.0,
    #         "unit": "cup",
    #         "meta": [
    #             "fresh",
    #             "chopped"
    #         ],
    #         "metaInformation": [
    #             "fresh",
    #             "chopped"
    #         ],
    #         "measures": {
    #             "us": {
    #                 "amount": 1.0,
    #                 "unitShort": "cup",
    #                 "unitLong": "cup"
    #             },
    #             "metric": {
    #                 "amount": 236.588,
    #                 "unitShort": "ml",
    #                 "unitLong": "milliliters"
    #             }
    #         }
    #     },
    #     {
    #         "id": 20420,
    #         "aisle": "Pasta and Rice",
    #         "image": "fusilli.jpg",
    #         "consistency": "solid",
    #         "name": "pasta",
    #         "nameClean": "pasta",
    #         "original": "8 ounces Tubular Pasta",
    #         "originalString": "8 ounces Tubular Pasta",
    #         "originalName": "Tubular Pasta",
    #         "amount": 8.0,
    #         "unit": "ounces",
    #         "meta": [],
    #         "metaInformation": [],
    #         "measures": {
    #             "us": {
    #                 "amount": 8.0,
    #                 "unitShort": "oz",
    #                 "unitLong": "ounces"
    #             },
    #             "metric": {
    #                 "amount": 226.796,
    #                 "unitShort": "g",
    #                 "unitLong": "grams"
    #             }
    #         }
    #     },
    #     {
    #         "id": 11304,
    #         "aisle": "Produce",
    #         "image": "peas.jpg",
    #         "consistency": "solid",
    #         "name": "peas",
    #         "nameClean": "green peas",
    #         "original": "1 cup Frozen Peas, thawed",
    #         "originalString": "1 cup Frozen Peas, thawed",
    #         "originalName": "Frozen Peas, thawed",
    #         "amount": 1.0,
    #         "unit": "cup",
    #         "meta": [
    #             "frozen",
    #             "thawed"
    #         ],
    #         "metaInformation": [
    #             "frozen",
    #             "thawed"
    #         ],
    #         "measures": {
    #             "us": {
    #                 "amount": 1.0,
    #                 "unitShort": "cup",
    #                 "unitLong": "cup"
    #             },
    #             "metric": {
    #                 "amount": 236.588,
    #                 "unitShort": "ml",
    #                 "unitLong": "milliliters"
    #             }
    #         }
    #     },
    #     {
    #         "id": 6168,
    #         "aisle": "Condiments",
    #         "image": "hot-sauce-or-tabasco.png",
    #         "consistency": "liquid",
    #         "name": "pepper sauce",
    #         "nameClean": "hot sauce",
    #         "original": "1 dsh Hot Pepper Sauce",
    #         "originalString": "1 dsh Hot Pepper Sauce",
    #         "originalName": "dsh Hot Pepper Sauce",
    #         "amount": 1.0,
    #         "unit": "",
    #         "meta": [
    #             "hot"
    #         ],
    #         "metaInformation": [
    #             "hot"
    #         ],
    #         "measures": {
    #             "us": {
    #                 "amount": 1.0,
    #                 "unitShort": "",
    #                 "unitLong": ""
    #             },
    #             "metric": {
    #                 "amount": 1.0,
    #                 "unitShort": "",
    #                 "unitLong": ""
    #             }
    #         }
    #     },
    #     {
    #         "id": 15121,
    #         "aisle": "Canned and Jarred",
    #         "image": "canned-tuna.png",
    #         "consistency": "solid",
    #         "name": "water-packed tuna",
    #         "nameClean": "tuna packed in water",
    #         "original": "6 1/2 ounces Can Water-Packed Tuna, drained",
    #         "originalString": "6 1/2 ounces Can Water-Packed Tuna, drained",
    #         "originalName": "Water-Packed Tuna, drained",
    #         "amount": 6.5,
    #         "unit": "ounces",
    #         "meta": [
    #             "drained"
    #         ],
    #         "metaInformation": [
    #             "drained"
    #         ],
    #         "measures": {
    #             "us": {
    #                 "amount": 6.5,
    #                 "unitShort": "oz",
    #                 "unitLong": "ounces"
    #             },
    #             "metric": {
    #                 "amount": 184.272,
    #                 "unitShort": "g",
    #                 "unitLong": "grams"
    #             }
    #         }
    #     }]
    # json_temp = json.dumps(temp_arr)
    # print(transit_spoon_ingredients(json_temp))

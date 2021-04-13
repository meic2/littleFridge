"""
This file implements the local database that store user's information of their fridge grocery
and their stored receipes.
The format of each grocery instance:
{

_id: number (unique, autogenerate by barcode; user will input it if not found)
title: string,
spoon_id: number, (should autogenerate when user input their groceries)
category: string,
expiration: string (format in ISO 8601 dates),
}

The format of each recipe instance:
{

recipe_name: string
_id: number, autogenerate by barcode; user will input it if not found,
spoon_id: number, should autogerante when user input; else is none.
extendedIngredients: list, (named from spoonAPI)
}
"""
from flask import abort
from bson.json_util import dumps
from bson.json_util import loads
if __package__:
    from .extensions import mongo
else:
    from extensions import mongo

database = mongo.get_database('Fridge')
STATUS_NORMAL = 200
STATUS_NOTFOUND = 404
STATUS_UNKNOWN = 500
STATUS_BAD_REQUEST = 400
UPDATE_NORMAL_MESSAGE = "The file is successfully changed accordingly."
NOT_FOUND_MESSAGE = "No such grocery/recipe exist!"
COLLECTION_LIST = ["grocery", "recipe"]


def get_db(collection_name, food_id):
    """
    getter of the CRUD operation
    :param collection_name: grocery or recipe
    :param food_id: identifier
    :return: abnormal response or the overall instance get
    """
    assert collection_name in COLLECTION_LIST
    collection = database[collection_name]
    identifier = "_id"
    food = collection.find_one({identifier: food_id})
    if food is None:
        raise abort(STATUS_NOTFOUND, NOT_FOUND_MESSAGE)
    return food


def get_all_db(collection_name):
    """
    get all the entries of the collection
    :param collection_name: grocery or recipe
    :return: abnormal response or the all instance get in string format
    """
    assert collection_name in COLLECTION_LIST
    collection = database[collection_name]
    foods = list(collection.find({}))
    return dumps(foods)


def put_db(collection_name, instance):
    """
    create/insert new instance into the corresponding collection
    :param collection_name: grocery or recipe
    :param instance: the whole instance being updated
    :return: message saying whether it is normal
    """
    assert collection_name in COLLECTION_LIST
    collection = database[collection_name]
    print(instance)
    try:
        collection.insert_one(instance)
        return UPDATE_NORMAL_MESSAGE
    except Exception as e:
        abort(STATUS_UNKNOWN, str(e))


def delete_db(collection_name, food_id):
    """
    delete one instance of the database
    :param collection_name: grocery or recipe
    :param food_id: identifier
    :return: message saying whether it is normal
    """
    assert collection_name in COLLECTION_LIST
    collection = database[collection_name]
    deleted = collection.delete_many({"_id": food_id})
    return str(deleted.deleted_count) + " number of instances have been deleted"


def post_db(collection_name, food_id, params):
    '''
    single instance being updated
    :param collection_name:
    :param food_id: id of the identifier
    :param params: the content that need to be updated
    :return: a message saying whether it is normal
    '''
    assert collection_name in COLLECTION_LIST
    collection = database[collection_name]
    food = collection.find_one({"_id": food_id})
    if food is None:
        raise abort(STATUS_NOTFOUND, NOT_FOUND_MESSAGE)
    collection.find_one_and_update({"_id": food_id},
                                   {"$set": params}, upsert=True)

    return UPDATE_NORMAL_MESSAGE


def close_db(e=None):
    """
    connect to the database
    :return: the database and the client
    """
    return mongo.close()


if __name__ == "__main__":
    item = [{'_id': 469604, 'title': 'Pleasant Valley Apple Wine', 'image': 'https://spoonacular.com/productImages/469604-312x231.jpg', 'imageType': 'jpg'}, {'id': 428573, 'title': 'NV Georgetown Vineyards Apple Wine', 'image': 'https://spoonacular.com/productImages/428573-312x231.jpg', 'imageType': 'jpg'}, {'id': 469695, 'title': 'Treleaven Sophistocrats Apple Mystique', 'image': 'https://spoonacular.com/productImages/469695-312x231.jpg', 'imageType': 'jpg'}, {'id': 430933, 'title': 'NV Great Shoals Spencerville Hard Apple Wine', 'image': 'https://spoonacular.com/productImages/430933-312x231.jpg', 'imageType': 'jpg'}, {'id': 14636, 'title': 'Dole Fruit Bowls Apples - Diced in 100% Juice', 'image': 'https://spoonacular.com/productImages/14636-312x231.jpg', 'imageType': 'jpg'}]

    print(put_db("grocery", item[0]))

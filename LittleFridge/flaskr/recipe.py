from flask import (Blueprint, request, abort)
from . import db

recipe = Blueprint('recipe', __name__, url_prefix='/recipe')


# a simple page that says hello
@recipe.route('/idx')
def index():
    return "Hello Recipe!"


@recipe.route('', methods=('GET', 'POST', 'DELETE', 'PUT'))
def get_recipe_info():
    """
    get the recipe info via the rout /grocery
    :return: recipe info via json format
    """
    if request.method == "PUT":
        return insert_recipe(request.json)

    # if the recipe id is not presented
    if "recipe_id" not in request.args:
        abort(db.STATUS_BAD_REQUEST, "Grocery ID is not presenting!")
    recipe_id = int(request.args["recipe_id"])
    if request.method == "POST":
        return update_recipe(recipe_id, request.json)
    if request.method == "DELETE":
        return delete_recipe(recipe_id)
    return db.get_db("recipe", recipe_id)


def update_recipe(recipe_id, body):
    """
    single recipe instance being updated's helper
    :param recipe_id: identifier
    :param body: the user's input
    :return: whether updated successfully
    """
    assert type(body) is dict
    # check whether the body self defines _id and remove extra _id
    # if body["_id"] is not None:
    #     del body["_id"]
    return db.post_db("recipe", recipe_id, body)


def delete_recipe(recipe_id):
    """
    delete the recipe instance
    :param recipe_id: identifier
    :return: how many instances have been created
    """
    return db.delete_db("recipe", recipe_id)


def insert_recipe(instance):
    """
    insert the instance
    :param instance: user input
    :return: a message indicating whether it has been successfully inserted
    """
    if not check_required_field_recipe(instance):
        abort(db.STATUS_BAD_REQUEST, "NOT REQUIRED FIELD")
    return db.put_db("recipe", instance)


def check_required_field_recipe(instance):
    """
    check if the input instance fits the standard
    :param instance: instace to be checked
    :return: boolean
    """
    if "recipe_id" not in instance:
        return False
    if "recipe_name" not in instance:
        return False
    return True


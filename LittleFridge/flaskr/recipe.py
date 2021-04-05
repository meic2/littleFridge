from flask import (Blueprint, request, abort)
from . import db
import json

recipe = Blueprint('recipe', __name__, url_prefix='/recipe')


# a simple page that says hello
@recipe.route('/idx')
def index():
    return "Hello Recipe!"


@recipe.route('', methods=('GET', 'POST', 'DELETE', 'PUT'))
def get_recipe_info():
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
    return db.get_db("grocery", recipe_id)


def update_recipe(recipe_id, body):
    """
    single grocery instance being updated's helper
    :param recipe_id:
    :param body:
    :return:
    """
    assert type(body) is dict
    # check whether the body self defines _id and remove extra _id
    if body["_id"] is not None:
        del body["_id"]
    return db.post_db("recipe", recipe_id, body)


def delete_recipe(recipe_id):
    return db.delete_db("recipe_id", recipe_id)


def insert_recipe(instance):
    return db.put_db("recipe", instance)

# TODO: check if body has required field

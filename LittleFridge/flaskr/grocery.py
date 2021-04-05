from flask import (Blueprint, request, abort)
from . import db
import json

grocery = Blueprint('grocery', __name__, url_prefix='/grocery')


# a simple page that says hello
@grocery.route('/idx')
def index():
    return "Hello Grocery"


@grocery.route('', methods=('GET', 'POST', 'DELETE', 'PUT'))
def get_grocery_info():
    if request.method == "PUT":
        return insert_grocery(request.json)

    # if the gorcery id is not presented
    if "grocery_id" not in request.args:
        abort(db.STATUS_BAD_REQUEST, "Grocery ID is not presenting!")
    grocery_id = int(request.args["grocery_id"])
    if request.method == "POST":
        return update_grocery(grocery_id, request.json)
    if request.method == "DELETE":
        return delete_grocery(grocery_id)
    return db.get_db("grocery", grocery_id)


def update_grocery(grocery_id, body):
    """
    single grocery instance being updated's helper
    :param grocery_id:
    :param body:
    :return:
    """
    assert type(body) is dict
    # check whether the body self defines _id and remove extra _id
    # if body["_id"] is not None:
    #     del body["_id"]
    return db.post_db("grocery", grocery_id, body)


def delete_grocery(grocery_id):
    return db.delete_db("grocery", grocery_id)


def insert_grocery(instance):
    if not check_required_field(instance):
        abort(db.STATUS_BAD_REQUEST, "NOT REQUIRED FIELD")
    return db.put_db("grocery", instance)


def check_required_field(instance):
    if "grocery_id" not in instance:
        return False
    if "deadline" not in instance:
        return False
    if "grocery_name" not in instance:
        return False
    return True
# TODO: check if body has required field

import os
import tempfile
import pytest
from flaskr import app
import json


@pytest.fixture
def client():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True

    with app.test_client() as client:
        yield client
    os.close(db_fd)
    os.unlink(app.config['DATABASE'])


def test_put_grocery_info(client):
    instance = {"grocery_id": 124,
                "grocery_name": "beef slice",
                "spoon_id": 124,
                "category": "meat",
                "deadline": "12-2-1",
                "size": "12 oz"
                }
    prefix = "/grocery"
    response = client.put(prefix, json=instance)
    assert response.data == b'The file is successfully changed accordingly.'


def test_put_grocery_info_wrong(client):
    instance = {
        "category": "meat",
        "deadline": "12-2-1",
        "size": "12 oz"
    }
    prefix = "/grocery"
    response = client.put(prefix, json=instance)
    assert response.status_code == 400


def test_post_grocery_info(client):
    instance = {"grocery_id": 124,
                "grocery_name": "beef slice2",
                "spoon_id": 124,
                "category": "meat",
                "deadline": "12-2-1",
                "size": "12 oz"
                }
    prefix = "/grocery?grocery_id=124"
    response = client.post(prefix, json=instance)
    assert response.data == b'The file is successfully changed accordingly.'


def test_post_grocery_info_wrong(client):
    instance = {"grocery_id": 124,
                "grocery_name": "beef slice2",
                "spoon_id": 124,
                "category": "meat",
                "deadline": "12-2-1",
                "size": "12 oz"
                }
    prefix = "/grocery"
    response = client.post(prefix, json=instance)
    assert response.status_code == 400


def test_post_grocery_info_cannot_found(client):
    instance = {"grocery_id": 124,
                "grocery_name": "beef slice2",
                "spoon_id": 124,
                "category": "meat",
                "deadline": "12-2-1",
                "size": "12 oz"
                }
    prefix = "/grocery?grocery_id=1"
    response = client.post(prefix, json=instance)
    assert response.status_code == 404


def test_get_grocery_info(client):
    prefix = "/grocery?grocery_id=124"
    response = client.get(prefix)
    temp_dict = json.loads(response.data)
    assert temp_dict["grocery_id"] == 124


def test_get_grocery_info_wrong(client):
    prefix = "/grocery"
    response = client.get(prefix)
    assert response.status_code == 400


def test_get_grocery_info_cannot_found(client):
    prefix = "/grocery?grocery_id=1"
    response = client.get(prefix)
    assert response.status_code == 404


def test_delete_grocery_info(client):
    prefix = "/grocery?grocery_id=124"
    response = client.delete(prefix)
    assert response.status_code == 200


def test_put_recipe_info(client):
    instance = {"recipe_id": 124,
                "recipe_name": "beef slice",
                "spoon_id": 124,
                "ingredients": []
                }
    prefix = "/recipe"
    response = client.put(prefix, json=instance)
    assert response.data == b'The file is successfully changed accordingly.'


def test_put_recipe_info_wrong(client):
    instance = {
        "spoon_id": 124,
        "ingredients": []
    }
    prefix = "/recipe"
    response = client.put(prefix, json=instance)
    assert response.status_code == 400


def test_post_recipe_info(client):
    instance = {"recipe_id": 124,
                "recipe_name": "beef slice",
                "spoon_id": 124,
                "ingredients": []
                }
    prefix = "/recipe?recipe_id=124"
    response = client.post(prefix, json=instance)
    assert response.data == b'The file is successfully changed accordingly.'


def test_post_grocery_recipe_wrong(client):
    instance = {"recipe_id": 124,
                "recipe_name": "beef slice",
                "spoon_id": 124,
                "ingredients": []
                }
    prefix = "/recipe"
    response = client.post(prefix, json=instance)
    assert response.status_code == 400


def test_post_grocery_recipe_cannot_found(client):
    instance = {"recipe_id": 124,
                "recipe_name": "beef slice",
                "spoon_id": 124,
                "ingredients": []
                }
    prefix = "/recipe?recipe_id=1"
    response = client.post(prefix, json=instance)
    assert response.status_code == 404


def test_get_recipe_info(client):
    prefix = "/recipe?recipe_id=124"
    response = client.get(prefix)
    print(response.data)
    temp_dict = json.loads(response.data)
    assert temp_dict["recipe_id"] == 124


def test_get_recipe_info_wrong(client):
    prefix = "/recipe"
    response = client.get(prefix)
    assert response.status_code == 400


def test_get_recipe_info_cannot_found(client):
    prefix = "/recipe?recipe_id=1"
    response = client.get(prefix)
    assert response.status_code == 404


def test_delete_recipe_info(client):
    prefix = "/recipe?recipe_id=124"
    response = client.delete(prefix)
    assert response.status_code == 200



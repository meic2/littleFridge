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


def test_assert():
    """a default pytest that make sure it is working"""
    assert True


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





import os
from flask import Flask
from .config import MONGO_URI
from .extensions import mongo


def create_app(test_config=None, config_object='flaskr.config'):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(
        config_object
    )
    from . import grocery, recipe
    app.register_blueprint(grocery.grocery)
    app.register_blueprint(recipe.recipe)
    # ensure the instance folder exists
    return app


application = app = create_app()

if __name__ == "__main__":
    app.run(debug=True)

from flask_pymongo import pymongo
if __package__:
    from .config import MONGO_URI
else:
    from config import MONGO_URI

mongo = pymongo.MongoClient(MONGO_URI, maxPoolSize=50, connect=False)
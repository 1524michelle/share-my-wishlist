from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['share_my_wishlist']


def insert_wishlist(wishlist_data):
    db.wishlists.insert_one(wishlist_data)


def get_wishlist_by_uuid(wishlist_uuid):
    return db.wishlists.find_one({'wishlist_uuid': wishlist_uuid})


def update_wishlist_items(wishlist_uuid, items):
    db.wishlists.update_one(
        {'wishlist_uuid': wishlist_uuid},
        {'$set': {'items': items}}
    )

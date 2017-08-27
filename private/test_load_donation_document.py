#!/usr/bin/env python
import sys
import pymongo

mongodb_url = '127.0.0.1'
mongodb_port = '3001'
mongodb_connection_url = 'mongodb://' + mongodb_url + ':' + mongodb_port + '/meteor'

test_mode = False

verbose = True

donation_list = []

db = None

current_max_donation_id = 0

def _get_current_max_donation_id():

    donation_collection = db.garden_app_donations

    global current_max_donation_id

    donations = donation_collection.find({},{"donation_id":1, "_id" : 0}).sort([("donation_id",-1)]).limit(1)

    # for donation in donations:
    #     donation_id = donation['donation_id']
    #     print("Found donation_id %s" % donation_id)
    
    # sys.exit("TEST")

    current_max_donation_id = donations[0]['donation_id']


def _initialize_db():

    # establish a connection to the database
    try:
        connection = pymongo.MongoClient(mongodb_connection_url)
    except Exception as e:
        print("Unexpected error:", type(e), e)


    global db

    # get a handle to the meteor database
    db = connection.meteor


def insert_donation_document(donation):
    
    donations_collection = db.garden_app_donations

    print("Will insert donation document into the donations collection")
    
    if verbose:
        print(donation)

    if not test_mode:

        try:
            result = donations_collection.insert_one(donation)

            if result == None:
                sys.exit("result was not defined")

            inserted_id = result.inserted_id
            acknowledged = result.acknowledged
            print("id is %s" % inserted_id)
            # print("_id is %s" % donation['_id'])

        except Exception as e:
            print("Unexpected error:", type(e), e)


def _create_donation_object():

    global current_max_donation_id

    current_max_donation_id += 1

    donation = {
        'donation_id'      : current_max_donation_id,
        'desc'     : "some donation description",
        'date'      : 'Aug 27, 2017'
    }

    return donation
    # donation_list.append(donation)


if __name__ == '__main__':

    _initialize_db()
    
    _get_current_max_donation_id()

    donation = _create_donation_object()

    insert_donation_document(donation)
#!/usr/bin/env python
import pymongo

mongodb_url = '127.0.0.1'
mongodb_port = '3001'
mongodb_connection_url = 'mongodb://' + mongodb_url + ':' + mongodb_port + '/meteor'


test_mode = False

verbose = False

donations_list = []

def generate_donation_documents():


    for i in range(50):

        string_i = str(i)

        donation_id  = string_i
        desc         = 'donation description ' + string_i
        weight       = 10
        date         = 'Aug 12, 2017'

        donation = {
            "donation_id" : donation_id,
            "desc"        : desc,
            "weight"      : weight,
            "date"        : date
        }

        donations_list.append(donation)



def insert_donation_documents():
    '''
        This function will insert the donation records/documents
        into the donations collection.
    '''

    # establish a connection to the database
    try:
        connection = pymongo.MongoClient(mongodb_connection_url)
    except Exception as e:
        print("Unexpected error:", type(e), e)


    # get a handle to the meteor database
    db = connection.meteor
    
    donations_collection = db.garden_app_donations

    print("Will insert donation documents into the donations collection")
    
    ctr = 0

    for donation in donations_list:

        ctr += 1

        if verbose:
            print(donation)

        if not test_mode:

            try:
                donations_collection.insert_one(donation)

            except Exception as e:
                print("Unexpected error:", type(e), e)


if __name__ == '__main__':

    generate_donation_documents()

    insert_donation_documents()
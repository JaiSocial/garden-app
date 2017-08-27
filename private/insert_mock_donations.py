#!/usr/bin/env python
import pymongo

mongodb_url = '127.0.0.1'
mongodb_port = '3001'
mongodb_connection_url = 'mongodb://' + mongodb_url + ':' + mongodb_port + '/meteor'

MAX_TEAM_NUMBER = 17
MIN_TEAM_NUMBER = 1

test_mode = False

verbose = False

donations_list = []

def generate_donation_documents():

    team_id = MIN_TEAM_NUMBER

    donation_ctr = 1

    for i in range(50):

        string_i = str(i)

        donation_id  = i
        desc         = 'donation description ' + string_i
        weight       = 10
        date         = 'Aug 12, 2017'

        donation = {
            "donation_id" : donation_id,
            "desc"        : desc,
            "weight"      : weight,
            "date"        : date,
            "team_id"     : team_id
        }

        donations_list.append(donation)

        if donation_ctr == 10:
            
            team_id += 1
            
            donation_ctr = 1

            if team_id >= MAX_TEAM_NUMBER:
                team_id = MIN_TEAM_NUMBER
            
        else:
            donation_ctr += 1

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
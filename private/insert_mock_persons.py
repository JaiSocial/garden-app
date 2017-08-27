#!/usr/bin/env python
import pymongo

mongodb_url = '127.0.0.1'
mongodb_port = '3001'
mongodb_connection_url = 'mongodb://' + mongodb_url + ':' + mongodb_port + '/meteor'

## This is the first team number
MIN_TEAM_NUMBER = 1

## This is the last team number
MAX_TEAM_NUMBER = 17

## This is the number of people to mock-up per team
NUMBER_PEOPLE_PER_TEAM = 10

## This is the maximum number of people that need to get mocked-up
MAX_PEOPLE = MAX_TEAM_NUMBER * NUMBER_PEOPLE_PER_TEAM

test_mode = False

verbose = False

persons_list = []

def generate_person_documents():

    team_id = MIN_TEAM_NUMBER

    member_ctr = 1

    for i in range(MAX_PEOPLE):

        string_i = str(i)

        person_id  = i
        first_name = 'first_name_' + string_i
        last_name  = 'last_name_' + string_i
        phone_1    = '1-800-800-8001'
        phone_2    = '1-800-800-8002'
        email      = 'last_name_' + string_i + '@someplace.com'

        if i % 3 == 0:
            role = 'lead'
        else:
            role = 'member'

        person = {
            "person_id"      : person_id,
            "first_name"     : first_name,
            "last_name"      : last_name,
            "phone_number_1" : phone_1,
            "phone_number_2" : phone_2,
            "email_address"  : email,
            "role"           : role,
            "team_id"        : team_id
        }


        persons_list.append(person)

        if member_ctr == 10:

            team_id += 1
            
            member_ctr = 1

            if team_id >= MAX_TEAM_NUMBER:
                team_id = MIN_TEAM_NUMBER

        else:
            member_ctr += 1 



def insert_person_documents():
    '''
        This function will insert the person records/documents
        into the persons collection.
    '''

    # establish a connection to the database
    try:
        connection = pymongo.MongoClient(mongodb_connection_url)
    except Exception as e:
        print("Unexpected error:", type(e), e)


    # get a handle to the meteor database
    db = connection.meteor
    
    persons_collection = db.garden_app_persons

    print("Will insert person documents into the persons collection")
    
    ctr = 0

    for person in persons_list:

        ctr += 1

        if verbose:
            print(person)

        if not test_mode:

            try:
                persons_collection.insert_one(person)

            except Exception as e:
                print("Unexpected error:", type(e), e)


if __name__ == '__main__':

    generate_person_documents()

    insert_person_documents()
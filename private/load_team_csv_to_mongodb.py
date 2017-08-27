#!/usr/bin/env python
import sys
import pymongo
import csv

mongodb_url = '127.0.0.1'
mongodb_port = '3001'
mongodb_connection_url = 'mongodb://' + mongodb_url + ':' + mongodb_port + '/meteor'


FIRST_NAME_IDX     = 0
LAST_NAME_IDX      = 1
PHONE_NUMBER_1_IDX = 2
PHONE_NUMBER_2_IDX = 3
EMAIL_IDX          = 4
ROLE_IDX           = 5


## 1. Need to insert document into teams collection
## 2. Need to append team_id to season.team_ids
## 3. Need to insert new members into persons collection

test_mode = True

verbose = True

persons_list = []

db = None

current_max_person_id = None

current_max_team_id = None

def _get_current_max_person_id():

    person_collection = db.garden_app_persons

    global current_max_person_id

    current_max_person_id = person_collection.find({},{"person_id":1}).sort({"person_id" : -1}).limit(1)


def _get_current_max_team_id():

    team_collection = db.garden_app_teams

    global _get_current_max_team_id

    current_max_team_id = team_collection.find({},{"team_id":1}).sort({"team_id" : -1}).limit(1)


def _initialize_db():

    # establish a connection to the database
    try:
        connection = pymongo.MongoClient(mongodb_connection_url)
    except Exception as e:
        print("Unexpected error:", type(e), e)


    global db

    # get a handle to the meteor database
    db = connection.meteor


def insert_person_document(person):
    
    persons_collection = db.garden_app_persons

    print("Will insert person document into the persons collection")
    
    if verbose:
        print(person)

    if not test_mode:

        try:
            person_id = persons_collection.insert_one(person)

            if person_id == None:
                sys.exit("person_id was not defined")


        except Exception as e:
            print("Unexpected error:", type(e), e)


def _parse_csv_file():

    with open(filename, newline='') as f:

    reader = csv.reader(f)
    
    try:
        for row in reader:

            _create_person_object(row)

    except csv.Error as e:

        sys.exit('file {}, line {}: {}'.format(filename, reader.line_num, e))


def _create_person_object(row):

    global current_max_person_id

    current_max_person_id += 1

    person = {
        person_id      : current_max_person_id
        first_name     : row[FIRST_NAME_IDX],
        last_name      : row[LAST_NAME_IDX],
        phone_number_1 : row[PHONE_NUMBER_1_IDX],
        phone_number_2 : row[PHONE_NUMBER_2_IDX],
        email_address  : row[EMAIL_IDX],
        role           : row[ROLE_IDX]
    }


    person_list.append(person)



def generate_person_documents():


    for i in range(50):

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
            "person_id" : person_id,
            "first_name" : first_name,
            "last_name" : last_name,
            "phone_number_1" : phone_1,
            "phone_number_2" : phone_2,
            "email_address" : email,
            "role" : role
        }


        persons_list.append(person)



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

    _initialize_db()
    
    _get_current_max_team_id()
    
    _get_current_max_person_id()

    _parse_csv_file()

    insert_person_documents()
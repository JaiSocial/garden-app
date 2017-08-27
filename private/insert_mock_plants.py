#!/usr/bin/env python
import pymongo

mongodb_url = '127.0.0.1'
mongodb_port = '3001'
mongodb_connection_url = 'mongodb://' + mongodb_url + ':' + mongodb_port + '/meteor'


test_mode = False

verbose = False

plants_list = []

def generate_plant_documents():

    for i in range(50):

        string_i = str(i)

        plant_id  = i
        name = 'plant name ' + string_i
        desc  = 'plant description ' + string_i
        
        plant = {
            "plant_id" : plant_id,
            "name" : name,
            "desc" : desc,
        }

        plants_list.append(plant)

def insert_plant_documents():
    '''
        This function will insert the plant records/documents
        into the plants collection.
    '''

    # establish a connection to the database
    try:
        connection = pymongo.MongoClient(mongodb_connection_url)
    except Exception as e:
        print("Unexpected error:", type(e), e)


    # get a handle to the meteor database
    db = connection.meteor
    
    plants_collection = db.garden_app_plants

    print("Will insert plant documents into the plants collection")
    
    ctr = 0

    for plant in plants_list:

        ctr += 1

        if verbose:
            print(plant)

        if not test_mode:

            try:
                plants_collection.insert_one(plant)

            except Exception as e:
                print("Unexpected error:", type(e), e)


if __name__ == '__main__':

    generate_plant_documents()

    insert_plant_documents()
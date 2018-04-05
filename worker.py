#!python 3.6.2 or greater
# import all necessary packages
import datetime
import csv
import os
import shutil
import time
import fnmatch
import sys
import json
import traceback
from collections import OrderedDict
from pymongo import MongoClient


# current directory
currentDirectory = os.getcwd()

# ############################## functions ##########################


# check for response csv, if exist copy to current directory for parsing
def add_csv_header_and_put_into_mongodb():

    # add header row
    with open(f'{currentDirectory}\\data\\data.csv', newline='') as f:
        r = csv.reader(f)
        data = [line for line in r]
    with open(f'{currentDirectory}\\data\\data.csv', 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['recordStatus',
                    'lastDateModified',
                    'lastTimeModified',
                    'lastUserToModify',
                    'legDepartureDate',
                    'airlineCode',
                    'identifier',
                    'sequence',
                    'flightOriginDay',
                    'numericFlightDate',
                    'numGMTDate',
                    'STDudt',
                    'STAudt',
                    'tailNumber',
                    'numLastDateModified',
                    'flightStatus',
                    'origin',
                    'STDLocal',
                    'dispatchDesk',
                    'STDGMTVariance',
                    'destination',
                    'STALocal',
                    'STAGMTVariance',
                    'OAGEquipmentType',
                    'ACConfiguration',
                    'serviceType',
                    'originGate',
                    'ETDlocal',
                    'ETDudt',
                    'TAXIutc',
                    'OUTudt',
                    'OFFudt',
                    'destinationGate',
                    'ETAlocal',
                    'ETAudt',
                    'ONudt',
                    'INudt',
                    'previousTailNumber',
                    'ETE',
                    'DCNutc',
                    'ETOutc',
                    'EONutc',
                    'EDTCutc',
                    'flightType',
                    'newDepartureCity',
                    'newArrivalCity',
                    'SchedOAGEquipType',
                    'OAGEquipSubType',
                    'csvFSDailyID',
                    'tailNumBeforeCancel',
                    'CTAUTC',
                    'cancelled',
                    'replaced',
                    'ATCStatus',
                    'scheduledFlightType',
                    'aircraftRouting',
                    'mealService',
                    'hub',
                    'landingRestriction',
                    'headStartFlight',
                    'actualDeparture',
                    'specialFlight',
                    'actualArrival',
                    'scheduledTaxiOut',
                    'scheduledTaxiIn',
                    'STOSetByUser',
                    'STISetByUser',
                    'CTFlightNumber'])
        w.writerows(data)
    with open(f'{local_directory}\\data\\data.csv') as f:
      reader = csv.DictReader(f)
      rows = list(reader)

    with open(f'{local_directory}\\data\\data.json', 'w') as f:
        json.dump(rows, f)



# calling the function
add_csv_header_and_put_into_mongodb()

def csv2mongo(csvfile, database_name,collection_name,delete_collection_before_import, host, port):
    response_dict = OrderedDict()
    try:
        mc = MongoClient(f'mongodb://{host}:{port}/')
        db = mc[database_name]
        collection = db[collection_name]

        if delete_collection_before_import == True:
            db.collection.delete_many({})
        # open the csv file.
        csvhandle = csv.reader(open(csvfile, 'r'), delimiter=',')

        rowindex = 0
        mongoindex = 0
        error_list = []

        for row in csvhandle:

            if rowindex == 0:
                column_headers = row
                cleaned_headers = []
                for c in column_headers:
                    c = c.replace(".", "")
                    c = c.replace("(", "")
                    c = c.replace(")", "")
                    c = c.replace("$", "-")
                    c = c.replace(" ", "_")
                    cleaned_headers.append(c)
            else:

                record = OrderedDict(zip(cleaned_headers, row))
                try:
                    myobjectid = collection.insert(record)
                    mongoindex += 1

                except:
                    error_message = "Error on row " + \
                        str(rowindex) + ". " + str(sys.exc_info())
                    error_list.append(error_message)

            rowindex += 1

        if error_list:
            response_dict['num_rows_imported'] = rowindex
            response_dict['num_rows_errors'] = len(error_list)
            response_dict['errors'] = error_list
            response_dict['code'] = 400
            response_dict['message'] = "Completed with errors"
        else:

            response_dict['num_rows_imported'] = mongoindex
            response_dict['num_csv_rows'] = rowindex
            response_dict['code'] = 200
            response_dict['message'] = "Completed."

    except:
        response_dict['code'] = 500
        response_dict['errors'] = [traceback.print_exc()]

    return response_dict



mc = MongoClient('mongodb://localhost:27017/')
db = mc['Flights']
collection = db["STG3D0"].delete_many({})
print(collection)


# current directory
currentDirectory = os.getcwd()
csv_file = f'{currentDirectory}\\data\\data.csv'
database = 'Flights'
collection = 'STG3'
delete_collection = True
host = 'localhost'
port = 27017

result = csv2mongo(
    csv_file,
    database,
    collection,
    delete_collection,
    host,
    port)
# output the JSON transaction summary
print(json.dumps(result, indent=4))

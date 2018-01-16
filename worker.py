#!python 3.6.2 or greater
# import all necessary packages
import datetime, csv, os, shutil, time, fnmatch, sys, json
import traceback
from collections import OrderedDict
from pymongo import MongoClient


# request drop location
stage3Send = '\\\\gscfile01\\SharedFile\\QA_MVC\\STG3\\adh_receive'

# response file location
stage3Receive = '\\\\gscfile01\\SharedFile\\QA_MVC\\STG3\\adh_send'

# current directory
currentDirectory = os.getcwd()

# it is assumed that all flight origin date is the current day this script is running
# extracting cuurent date in format DDMMMYY
currentDay = datetime.datetime.now().strftime("%d")
currentMonth = datetime.datetime.now().strftime("%b").upper()
currentYear = datetime.datetime.now().strftime("%y")
currentDate = f'{currentDay}{currentMonth}{currentYear}'

# ############################## functions ##########################

# Check if adhoc folders are visible from the current machine
def check_if_folder_exist(location):
    if os.path.exists(location):
        print('[ \\gscfile01\SharedFile\QA_MVC\STG3 ] folder found')
    else:
        print('Could not find [ \\gscfile01\SharedFile\QA_MVC\STG3 ] folder!')
        print('make sure [ \\gscfile01\SharedFile\QA_MVC\STG3 ] is available from this machine!')
        sys.exit("Stopping script .......")

# create adhoc request type 1 on adh_receive folder
# def create_adh4_request_file(send_folder,time_stamp,current_date):
#     request_file = open(f'{send_folder}\\adh004_{time_stamp}.txt', 'w')
#     request_file.write(f'ADH004_{current_date}')
#     adh004String = f'ADH004_{current_date}'
#     request_file.close()
#     print(f' Sending adhoc 4 request using: {adh004String}')
#     time.sleep(10)

# check for response csv, if exist copy to current directory for parsing
def call_adhoc_4_and_check_for_response_csv(receive_folder, send_folder, local_directory, current_date):
    # note that repeat is needed since the adhoc processor sometimes does not return csv.
    # get current timestamp
    timeStamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    request_file = open(f'{send_folder}\\adh004_{timeStamp}.txt', 'w')
    request_file.write(f'ADH004_{current_date}')
    adh004String = f'ADH004_{current_date}'
    pattern = f'adh004_{timeStamp}*.csv'
    request_file.close()
    print(f' Sending adhoc 4 request using: {adh004String}')
    time.sleep(15)
    # check if the file exist
    files = os.listdir(receive_folder)
    # for file in os.listdir(receive_folder):
    # if fnmatch.fnmatch(file, pattern) == True:
    if fnmatch.filter(files, pattern):
        file_name = fnmatch.filter(files, pattern)
        print(file_name[0])
        print(f'csv file for adhoc 4 found')
        # Copy file
        shutil.copy(f'{receive_folder}\\{file_name[0]}', f'{local_directory}\\data\\data.csv')
        print("csv file copied to local folder for parsing")
        os.remove(f'{receive_folder}\\{file_name[0]}')
    # elif fnmatch.filter(files, pattern)[0] == []:
    #     # get current timestamp
    #     timeStamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    #     request_file = open(f'{send_folder}\\adh004_{timeStamp}.txt', 'w')
    #     request_file.write(f'ADH004_{current_date}')
    #     adh004String = f'ADH004_{current_date}'
    #     pattern = f'adh004_{timeStamp}*.csv'
    #     request_file.close()
    #     print(f' Sending adhoc 4 request using: {adh004String}')
    #     time.sleep(10)
    #     # check if the file exist
    #     files = os.listdir(receive_folder)
    #     if fnmatch.filter(files, pattern):
    #         file_name = fnmatch.filter(files, pattern)
    #         print(file_name[0])
    #         print(f'csv file for adhoc 4 found')
    #         # Copy file
    #         shutil.copy(f'{receive_folder}\\{file_name[0]}', f'{local_directory}\\data\\data.csv')
    #         print("csv file copied to local folder for parsing")

        # add header row
        with open(f'{local_directory}\\data\\data.csv',newline='') as f:
            r = csv.reader(f)
            data = [line for line in r]
        with open(f'{local_directory}\\data\\data.csv','w',newline='') as f:
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


    else:
        # if file is not available abort the script
        print(f'Did not find csv file for adhoc 4')
        print('Check if the adhoc processor is down or any process for adhoc is down')
        pass
        # sys.exit("Stopping script ........")
    # # add header row
    # with open(f'{local_directory}\\data\\data.csv',newline='') as f:
    #     r = csv.reader(f)
    #     data = [line for line in r]
    # with open(f'{local_directory}\\data\\data.csv','w',newline='') as f:
    #     w = csv.writer(f)
    #     w.writerow(['recordStatus',
    #                 'lastDateModified',
    #                 'lastTimeModified',
    #                 'lastUserToModify',
    #                 'legDepartureDate',
    #                 'airlineCode',
    #                 'identifier',
    #                 'sequence',
    #                 'flightOriginDay',
    #                 'numericFlightDate',
    #                 'numGMTDate',
    #                 'STDudt',
    #                 'STAudt',
    #                 'tailNumber',
    #                 'numLastDateModified',
    #                 'flightStatus',
    #                 'origin',
    #                 'STDLocal',
    #                 'dispatchDesk',
    #                 'STDGMTVariance',
    #                 'destination',
    #                 'STALocal',
    #                 'STAGMTVariance',
    #                 'OAGEquipmentType',
    #                 'ACConfiguration',
    #                 'serviceType',
    #                 'originGate',
    #                 'ETDlocal',
    #                 'ETDudt',
    #                 'TAXIutc',
    #                 'OUTudt',
    #                 'OFFudt',
    #                 'destinationGate',
    #                 'ETAlocal',
    #                 'ETAudt',
    #                 'ONudt',
    #                 'INudt',
    #                 'previousTailNumber',
    #                 'ETE',
    #                 'DCNutc',
    #                 'ETOutc',
    #                 'EONutc',
    #                 'EDTCutc',
    #                 'flightType',
    #                 'newDepartureCity',
    #                 'newArrivalCity',
    #                 'SchedOAGEquipType',
    #                 'OAGEquipSubType',
    #                 'csvFSDailyID',
    #                 'tailNumBeforeCancel',
    #                 'CTAUTC',
    #                 'cancelled',
    #                 'replaced',
    #                 'ATCStatus',
    #                 'scheduledFlightType',
    #                 'aircraftRouting',
    #                 'mealService',
    #                 'hub',
    #                 'landingRestriction',
    #                 'headStartFlight',
    #                 'actualDeparture',
    #                 'specialFlight',
    #                 'actualArrival',
    #                 'scheduledTaxiOut',
    #                 'scheduledTaxiIn',
    #                 'STOSetByUser',
    #                 'STISetByUser',
    #                 'CTFlightNumber'])
    #     w.writerows(data)
    # with open(f'{local_directory}\\data\\data.csv') as f:
    #   reader = csv.DictReader(f)
    #   rows = list(reader)

    # with open(f'{local_directory}\\data\\data.json', 'w') as f:
    #     json.dump(rows, f)

check_if_folder_exist(stage3Receive)

call_adhoc_4_and_check_for_response_csv(stage3Receive,stage3Send,currentDirectory,currentDate)

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

    # mc = MongoClient(host=host, port=port)
    # db = mc[database_name]
    # collection = db[collection_name]
    # result = db.collection.delete_many({})
    # print(result)


mc = MongoClient('mongodb://localhost:27017/')
db = mc['flights']
collection = db["Flight3s"].delete_many({})
print(collection)


# current directory
currentDirectory = os.getcwd()
csv_file = f'{currentDirectory}\\data\\data.csv'
database = 'flights'
collection = 'Flight3s'
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

#!python 3.6.2 or greater
# import all necessary packages
import datetime, csv, os, shutil, time, fnmatch, sys, json
import glob
from pathlib import Path
import traceback
from collections import OrderedDict
from pymongo import MongoClient
from apscheduler.schedulers.blocking import BlockingScheduler

##################################################################################################################
##################################################################################################################
def STG3D1_job():
    print('Starting Stage 3 day 1 data feed.')
    # mlab remote mongodb location
    uri = 'mongodb://localhost:27017/'

    # request drop location
    stageSend = Path('//gscfile01/SharedFile/QA_MVC/STG3/adh_receive')

    # response file location
    stageReceive = Path('//gscfile01/SharedFile/QA_MVC/STG3/adh_send')

    # current directory
    currentDirectory = Path(os.getcwd())

    # it is assumed that all flight origin date is the current day this script is running
    # extracting cuurent date in format DDMMMYY
    currentDay = datetime.datetime.now().strftime("%d")
    currentMonth = datetime.datetime.now().strftime("%b").upper()
    currentYear = datetime.datetime.now().strftime("%y")
    currentDate = f'{currentDay}{currentMonth}{currentYear}'
    # currentDate = '18APR18'

    # ############################## functions ##########################

    # Check if adhoc folders are visible from the current machine
    def check_if_folder_exist(location):
        if os.path.exists(location):
            print(f'[ {location} ] folder found')
        else:
            print(f'Could not find [ {location} ] folder!')
            print(f'make sure [ {location} ] is available from this machine!')
            sys.exit("Stopping script .......")



    # check for response csv, if exist copy to current directory for parsing
    def call_adhoc_4_and_check_for_response_csv(receive_folder, send_folder, local_directory, current_date):
        # note that repeat is needed since the adhoc processor sometimes does not return csv.
        # get current timestamp
        sendPattern = f'MCEG_STG3D1*.txt'
        timeStamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        sentFiles = os.listdir(send_folder)
        if fnmatch.filter(sentFiles, sendPattern):
          print('There are request files waiting on que, adhoc processor may be down')
        else:
          request_file = open(f'{send_folder}/MCEG_STG3D1_ADHOC4_{timeStamp}.txt', 'w')
          request_file.write(f'ADH004_{current_date}')
          adh004String = f'ADH004_{current_date}'
          request_file.close()
          print(f' Sending adhoc 4 request using: {adh004String}')
          time.sleep(15)
        # check if the file exist
        receivedFiles = os.listdir(receive_folder)
        receivePattern = f'MCEG_STG3D1_ADHOC4_{timeStamp}*.csv'
        # for file in os.listdir(receive_folder):
        # if fnmatch.fnmatch(file, pattern) == True:
        if fnmatch.filter(receivedFiles, receivePattern):
            file_name = fnmatch.filter(receivedFiles, receivePattern)
            print(file_name[0])
            print(f'csv file for adhoc 4 found')
            # Copy file
            shutil.copy(f'{receive_folder}/{file_name[0]}', f'{local_directory}/STG3D1/data.csv')
            print("csv file copied to local folder for parsing")
            # remove all files that was generated by this script.
            for csvfile in os.listdir(receive_folder):
              if fnmatch.fnmatch(csvfile, 'MCEG_STG3D1_ADHOC4*.csv'):
                  os.remove(f'{receive_folder}/{csvfile}')


            # add header row
            with open(f'{local_directory}/STG3D1/data.csv',newline='') as f:
                r = csv.reader(f)
                data = [line for line in r]
            with open(f'{local_directory}/STG3D1/data.csv','w',newline='') as f:
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
            with open(f'{local_directory}/STG3D1/data.csv') as f:
              reader = csv.DictReader(f)
              rows = list(reader)

            with open(f'{local_directory}/STG3D1/data.json', 'w') as f:
                json.dump(rows, f)


        else:
            # if file is not available abort the script
            print(f'Did not find csv file for adhoc 4')
            print('Check if the adhoc processor is down')
            pass

    check_if_folder_exist(stageReceive)

    call_adhoc_4_and_check_for_response_csv(stageReceive,stageSend,currentDirectory,currentDate)

    def csv2mongo(uri_string, csvfile, database_name,collection_name,delete_collection_before_import):
        response_dict = OrderedDict()
        try:
            mc = MongoClient(uri_string)
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



    mc = MongoClient(uri)
    db = mc['MCEG']
    collection = db["STG3D1"].delete_many({})
    # print(collection)


    # current directory
    currentDirectory = Path(os.getcwd())
    csv_file = f'{currentDirectory}/STG3D1/data.csv'
    database = 'MCEG'
    collection = 'STG3D1'
    delete_collection = True

    result = csv2mongo(
        uri,
        csv_file,
        database,
        collection,
        delete_collection)
    # output the JSON transaction summary
    print(json.dumps(result, indent=4))

    print('Finished Stage 3 day 1')

##################################################################################################################
##################################################################################################################
def STG3D2_job():
    print('Starting Stage 3 day 2 data feed.')
    # mlab remote mongodb location
    uri = 'mongodb://localhost:27017/'

    # request drop location
    stageSend = Path('//gscfile01/SharedFile/QA_MVC/STG3/adh_receive')

    # response file location
    stageReceive = Path('//gscfile01/SharedFile/QA_MVC/STG3/adh_send')

    # current directory
    currentDirectory = Path(os.getcwd())

    # it is assumed that all flight origin date is the current day this script is running
    # extracting cuurent date in format DDMMMYY
    currentDay = (datetime.datetime.now() + datetime.timedelta(days=1)).strftime("%d")
    currentMonth = (datetime.datetime.now() + datetime.timedelta(days=1)).strftime("%b").upper()
    currentYear = (datetime.datetime.now() + datetime.timedelta(days=1)).strftime("%y")
    currentDate = f'{currentDay}{currentMonth}{currentYear}'

    # ############################## functions ##########################

    # Check if adhoc folders are visible from the current machine
    def check_if_folder_exist(location):
        if os.path.exists(location):
            print(f'[ {location} ] folder found')
        else:
            print(f'Could not find [ {location} ] folder!')
            print(f'make sure [ {location} ] is available from this machine!')
            sys.exit("Stopping script .......")



    # check for response csv, if exist copy to current directory for parsing
    def call_adhoc_4_and_check_for_response_csv(receive_folder, send_folder, local_directory, current_date):
        # note that repeat is needed since the adhoc processor sometimes does not return csv.
        # get current timestamp
        sendPattern = f'MCEG_STG3D2*.txt'
        timeStamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        sentFiles = os.listdir(send_folder)
        if fnmatch.filter(sentFiles, sendPattern):
          print('There are request files waiting on que, adhoc processor may be down')
        else:
          request_file = open(f'{send_folder}/MCEG_STG3D2_ADHOC4_{timeStamp}.txt', 'w')
          request_file.write(f'ADH004_{current_date}')
          adh004String = f'ADH004_{current_date}'
          request_file.close()
          print(f' Sending adhoc 4 request using: {adh004String}')
          time.sleep(15)
        # check if the file exist
        receivedFiles = os.listdir(receive_folder)
        receivePattern = f'MCEG_STG3D2_ADHOC4_{timeStamp}*.csv'
        # for file in os.listdir(receive_folder):
        # if fnmatch.fnmatch(file, pattern) == True:
        if fnmatch.filter(receivedFiles, receivePattern):
            file_name = fnmatch.filter(receivedFiles, receivePattern)
            print(file_name[0])
            print(f'csv file for adhoc 4 found')
            # Copy file
            shutil.copy(f'{receive_folder}/{file_name[0]}', f'{local_directory}/STG3D2/data.csv')
            print("csv file copied to local folder for parsing")
            # remove all files that was generated by this script.
            for csvfile in os.listdir(receive_folder):
              if fnmatch.fnmatch(csvfile, 'MCEG_STG3D2_ADHOC4*.csv'):
                  os.remove(f'{receive_folder}/{csvfile}')


            # add header row
            with open(f'{local_directory}/STG3D2/data.csv',newline='') as f:
                r = csv.reader(f)
                data = [line for line in r]
            with open(f'{local_directory}/STG3D2/data.csv','w',newline='') as f:
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
            with open(f'{local_directory}/STG3D2/data.csv') as f:
              reader = csv.DictReader(f)
              rows = list(reader)

            with open(f'{local_directory}/STG3D2/data.json', 'w') as f:
                json.dump(rows, f)


        else:
            # if file is not available abort the script
            print(f'Did not find csv file for adhoc 4')
            print('Check if the adhoc processor is down')
            pass

    check_if_folder_exist(stageReceive)

    call_adhoc_4_and_check_for_response_csv(stageReceive,stageSend,currentDirectory,currentDate)

    def csv2mongo(uri_string, csvfile, database_name,collection_name,delete_collection_before_import):
        response_dict = OrderedDict()
        try:
            mc = MongoClient(uri_string)
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



    mc = MongoClient(uri)
    db = mc['MCEG']
    collection = db["STG3D2"].delete_many({})
    # print(collection)


    # current directory
    currentDirectory = Path(os.getcwd())
    csv_file = f'{currentDirectory}/STG3D2/data.csv'
    database = 'MCEG'
    collection = 'STG3D2'
    delete_collection = True

    result = csv2mongo(
        uri,
        csv_file,
        database,
        collection,
        delete_collection)
    # output the JSON transaction summary
    print(json.dumps(result, indent=4))


    print('Finished Stage 3 day 2')

##################################################################################################################
##################################################################################################################
def STG3D3_job():
    print('Starting Stage 3 day 3 data feed.')
    # mlab remote mongodb location
    uri = 'mongodb://localhost:27017/'

    # request drop location
    stageSend = Path('//gscfile01/SharedFile/QA_MVC/STG3/adh_receive')

    # response file location
    stageReceive = Path('//gscfile01/SharedFile/QA_MVC/STG3/adh_send')

    # current directory
    currentDirectory = Path(os.getcwd())

    # it is assumed that all flight origin date is the current day this script is running
    # extracting cuurent date in format DDMMMYY
    currentDay = (datetime.datetime.now() + datetime.timedelta(days=2)).strftime("%d")
    currentMonth = (datetime.datetime.now() + datetime.timedelta(days=2)).strftime("%b").upper()
    currentYear = (datetime.datetime.now() + datetime.timedelta(days=2)).strftime("%y")
    currentDate = f'{currentDay}{currentMonth}{currentYear}'

    # ############################## functions ##########################

    # Check if adhoc folders are visible from the current machine
    def check_if_folder_exist(location):
        if os.path.exists(location):
            print(f'[ {location} ] folder found')
        else:
            print(f'Could not find [ {location} ] folder!')
            print(f'make sure [ {location} ] is available from this machine!')
            sys.exit("Stopping script .......")



    # check for response csv, if exist copy to current directory for parsing
    def call_adhoc_4_and_check_for_response_csv(receive_folder, send_folder, local_directory, current_date):
        # note that repeat is needed since the adhoc processor sometimes does not return csv.
        # get current timestamp
        sendPattern = f'MCEG_STG3D3*.txt'
        timeStamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        sentFiles = os.listdir(send_folder)
        if fnmatch.filter(sentFiles, sendPattern):
          print('There are request files waiting on que, adhoc processor may be down')
        else:
          request_file = open(f'{send_folder}/MCEG_STG3D3_ADHOC4_{timeStamp}.txt', 'w')
          request_file.write(f'ADH004_{current_date}')
          adh004String = f'ADH004_{current_date}'
          request_file.close()
          print(f' Sending adhoc 4 request using: {adh004String}')
          time.sleep(15)
        # check if the file exist
        receivedFiles = os.listdir(receive_folder)
        receivePattern = f'MCEG_STG3D3_ADHOC4_{timeStamp}*.csv'
        # for file in os.listdir(receive_folder):
        # if fnmatch.fnmatch(file, pattern) == True:
        if fnmatch.filter(receivedFiles, receivePattern):
            file_name = fnmatch.filter(receivedFiles, receivePattern)
            print(file_name[0])
            print(f'csv file for adhoc 4 found')
            # Copy file
            shutil.copy(f'{receive_folder}/{file_name[0]}', f'{local_directory}/STG3D3/data.csv')
            print("csv file copied to local folder for parsing")
            # remove all files that was generated by this script.
            for csvfile in os.listdir(receive_folder):
              if fnmatch.fnmatch(csvfile, 'MCEG_STG3D3_ADHOC4*.csv'):
                  os.remove(f'{receive_folder}/{csvfile}')


            # add header row
            with open(f'{local_directory}/STG3D3/data.csv',newline='') as f:
                r = csv.reader(f)
                data = [line for line in r]
            with open(f'{local_directory}/STG3D3/data.csv','w',newline='') as f:
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
            with open(f'{local_directory}/STG3D3/data.csv') as f:
              reader = csv.DictReader(f)
              rows = list(reader)

            with open(f'{local_directory}/STG3D3/data.json', 'w') as f:
                json.dump(rows, f)


        else:
            # if file is not available abort the script
            print(f'Did not find csv file for adhoc 4')
            print('Check if the adhoc processor is down')
            pass

    check_if_folder_exist(stageReceive)

    call_adhoc_4_and_check_for_response_csv(stageReceive,stageSend,currentDirectory,currentDate)

    def csv2mongo(uri_string, csvfile, database_name,collection_name,delete_collection_before_import):
        response_dict = OrderedDict()
        try:
            mc = MongoClient(uri_string)
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



    mc = MongoClient(uri)
    db = mc['MCEG']
    collection = db["STG3D3"].delete_many({})
    # print(collection)


    # current directory
    currentDirectory = Path(os.getcwd())
    csv_file = f'{currentDirectory}/STG3D3/data.csv'
    database = 'MCEG'
    collection = 'STG3D3'
    delete_collection = True

    result = csv2mongo(
        uri,
        csv_file,
        database,
        collection,
        delete_collection)
    # output the JSON transaction summary
    print(json.dumps(result, indent=4))


    print('Finished Stage 3 day 3')

scheduler = BlockingScheduler()
scheduler.add_job(STG3D1_job, 'interval', seconds=20)
scheduler.add_job(STG3D2_job, 'interval', seconds=20)
scheduler.add_job(STG3D3_job, 'interval', seconds=20)
scheduler.start()

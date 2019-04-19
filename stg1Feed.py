
# Getting csv automatically and inserting into mongodb for MVT STG1 via Adhoc processor
def STG1_CSV_TO_MONGO():

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
    import glob
    from pathlib import Path
    import traceback
    from collections import OrderedDict
    import pandas as pd
    import pymongo
    # from apscheduler.schedulers.blocking import BlockingScheduler

    # mongodb location
    uri = 'mongodb://localhost:27017/'

    # This is done from the prospective of adhoc processor. It's receive folder is where we send and its's send folder is where we get csv
    # request drop location.
    stageSend = Path('/mnt/gcsfile01/STG1/adh_receive')
    # response file location
    stageReceive = Path('/mnt/gcsfile01/STG1/adh_send')

    # current directory
    currentDirectory = Path(os.getcwd())

    # need 7 day worth of data. Since local and UTC can be mismatch for a flight we need yesterdays data as well making it total 8 days.
    # extracting date in format DDMMMYY for 8 days including yesterday
    d0 = (datetime.datetime.now() + datetime.timedelta(days=-1)
          ).strftime("%d%b%y").upper()
    d1 = (datetime.datetime.now() + datetime.timedelta(days=0)
          ).strftime("%d%b%y").upper()
    d2 = (datetime.datetime.now() + datetime.timedelta(days=1)
          ).strftime("%d%b%y").upper()
    d3 = (datetime.datetime.now() + datetime.timedelta(days=2)
          ).strftime("%d%b%y").upper()
    d4 = (datetime.datetime.now() + datetime.timedelta(days=3)
          ).strftime("%d%b%y").upper()
    d5 = (datetime.datetime.now() + datetime.timedelta(days=4)
          ).strftime("%d%b%y").upper()
    d6 = (datetime.datetime.now() + datetime.timedelta(days=5)
          ).strftime("%d%b%y").upper()
    d7 = (datetime.datetime.now() + datetime.timedelta(days=6)
          ).strftime("%d%b%y").upper()

    # Static variables
    sendTextFile = bool()
    timeStamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    txtFileNamePatterns = ['MCEG_STG1D0*.txt',
                           'MCEG_STG1D1*.txt',
                           'MCEG_STG1D2*.txt',
                           'MCEG_STG1D3*.txt',
                           'MCEG_STG1D4*.txt',
                           'MCEG_STG1D5*.txt',
                           'MCEG_STG1D6*.txt',
                           'MCEG_STG1D7*.txt']
    csvFileNamePatterns = ['MCEG_STG1D0*.csv',
                           'MCEG_STG1D1*.csv',
                           'MCEG_STG1D2*.csv',
                           'MCEG_STG1D3*.csv',
                           'MCEG_STG1D4*.csv',
                           'MCEG_STG1D5*.csv',
                           'MCEG_STG1D6*.csv',
                           'MCEG_STG1D7*.csv']
    allTxtFileData = [{'fileName': f'MCEG_STG1D0_ADH004_{timeStamp}', 'dateString': f'ADH004_{d0}', 'day': 'D0'},
                      {'fileName': f'MCEG_STG1D1_ADH004_{timeStamp}',
                          'dateString': f'ADH004_{d1}', 'day': 'D1'},
                      {'fileName': f'MCEG_STG1D2_ADH004_{timeStamp}',
                          'dateString': f'ADH004_{d2}', 'day': 'D2'},
                      {'fileName': f'MCEG_STG1D3_ADH004_{timeStamp}',
                          'dateString': f'ADH004_{d3}', 'day': 'D3'},
                      {'fileName': f'MCEG_STG1D4_ADH004_{timeStamp}',
                          'dateString': f'ADH004_{d4}', 'day': 'D4'},
                      {'fileName': f'MCEG_STG1D5_ADH004_{timeStamp}',
                          'dateString': f'ADH004_{d5}', 'day': 'D5'},
                      {'fileName': f'MCEG_STG1D6_ADH004_{timeStamp}',
                          'dateString': f'ADH004_{d6}', 'day': 'D6'},
                      {'fileName': f'MCEG_STG1D7_ADH004_{timeStamp}', 'dateString': f'ADH004_{d7}', 'day': 'D7'}]

    # Check if adhoc folders are visible from the current machine
    if os.path.exists(stageSend):
        sendTextFile = True
    else:
        sendTextFile = False

    # Execute below code only if the the folders are visible from this machine
    # Making sure previous requst text files are not sitting around before sending new ones.
    # If they are sitting around then adhoc processor may be down
    if sendTextFile == True:
        sentFiles = os.listdir(stageSend)
        for namePattern in txtFileNamePatterns:
            if fnmatch.filter(sentFiles, namePattern):
                sendTextFile = False

    # If no problem with adhoc processor proceed with
    if sendTextFile == True:
        for txtFileData in allTxtFileData:
            fileName = txtFileData['fileName']
            dateString = txtFileData['dateString']
            with open(f'{stageSend}/{fileName}.txt', 'w') as tf:
                tf.write(f'{dateString}')
                tf.close()

    ############################ fake data start ###############################
    # creating fake csv files to test the script comment out this code later
    # for txtFileData in allTxtFileData:
    #     fileName = txtFileData['fileName']
    #     dateString = txtFileData['dateString']
    #     with open(f'{stageReceive}/{fileName}.csv', 'w') as tf:
    #         tf.write(f'{dateString}')
    #         tf.close()
    ############################ fake data end ###############################

    # Wait for all the text files to be processed
    time.sleep(30)

    # check if the csv files came through and copy them to local folder
    receivedFiles = os.listdir(stageReceive)
    for txtFileData in allTxtFileData:
        fileName = f"{txtFileData['fileName']}.csv"
        day = txtFileData['day']
        if fnmatch.filter(receivedFiles, fileName):
            foundFile = fnmatch.filter(receivedFiles, fileName)
            shutil.copy(
                f'{stageReceive}/{foundFile[0]}', f"{currentDirectory}/STG1/STG1{day}.csv")

    # After getting all the csv delete the csv files because adhoc processor does not maintain this task
    for csvfile in os.listdir(stageReceive):
        if fnmatch.fnmatch(csvfile, 'MCEG_STG1*.csv'):
            os.remove(f'{stageReceive}/{csvfile}')

    # Append a header row to make it easy to convert into JSON file. Also for debugging purpose
    localFiles = os.listdir(f'{currentDirectory}/STG1')
    for txtFileData in allTxtFileData:
        day = txtFileData['day']
        fileName = f"STG1{day}.csv"

        # Searching local files in case adhoc processor shuts down in the middle and sent only few of the 8 files
        if fnmatch.filter(localFiles, fileName):
            foundFile = fnmatch.filter(localFiles, fileName)
            jsonFileName = f"STG1{day}.json"
            #  Making csv and json version of the file
            with open(f'{currentDirectory}/STG1/{foundFile[0]}', newline='') as f:
                r = csv.reader(f)
                data = [line for line in r]
            with open(f'{currentDirectory}/STG1/{foundFile[0]}', 'w', newline='') as f:
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
            with open(f'{currentDirectory}/STG1/{foundFile[0]}') as f:
                reader = csv.DictReader(f)
                rows = list(reader)

            with open(f'{currentDirectory}/STG1/{jsonFileName}', 'w') as f:
                json.dump(rows, f)

    # Inserting csv data into
    localFiles = os.listdir(f'{currentDirectory}/STG1')
    for txtFileData in allTxtFileData:
        day = txtFileData['day']
        fileName = f"STG1{day}.csv"

        # Searching local files in case adhoc processor shuts down in the middle and sent only few of the 8 files
        if fnmatch.filter(localFiles, fileName):
            foundFile = fnmatch.filter(localFiles, fileName)
            try:
                mng_client = pymongo.MongoClient(uri)
                mng_db = mng_client['MCEG']
                collection_name = f'STG1{day}'
                db_cm = mng_db[collection_name]
                cdir = Path(os.getcwd())
                file_res = f'{cdir}/STG1/STG1{day}.csv'

                data = pd.read_csv(file_res, dtype=str, na_filter=False)
                data_json = json.loads(data.to_json(orient='records'))
                x = db_cm.delete_many({})
                db_cm.insert_many(data_json)
            except:
                pass

    # Delete variables and objects to free up memory
    # del uri,stageSend,stageReceive,currentDirectory,d0,d1,d2,d3,d4,d5,d6,d7,sendTextFile,timeStamp,txtFileNamePatterns,csvFileNamePatterns,allTxtFileData,sendTextFile,
    # sendTextFile,
    # sentFiles,
    # fileName,
    # dateString,
    # fileName,
    # dateString,
    # receivedFiles,
    # fileName,
    # day,
    # localFiles,
    # day,
    # fileName,
    # foundFile,
    # jsonFileName,
    # f,
    # r,
    # data,
    # f,
    # w,
    # rows,
    # localFiles,
    # day,
    # fileName,
    # foundFile,
    # mng_client,
    # mng_db,
    # collection_name,
    # db_cm,
    # cdir,
    # file_res,
    # data,
    # data_json,
    # x,


# Run the function forever using infinite loop
# if memory leaks occur use garbage collection
while True:
    STG1_CSV_TO_MONGO()

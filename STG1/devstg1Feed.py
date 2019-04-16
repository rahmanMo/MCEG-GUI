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
# import pandas as pd
# import pymongo
# from apscheduler.schedulers.blocking import BlockingScheduler


def STG1_CSV_TO_MONGO():

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
    allTxtFileData = [{'fileName': f'MCEG_STG1D0_ADH004_{timeStamp}', 'dateString': f'ADH004_{d0}', 'day':'D0'},
                        {'fileName': f'MCEG_STG1D1_ADH004_{timeStamp}', 'dateString': f'ADH004_{d1}', 'day':'D1'},
                        {'fileName': f'MCEG_STG1D2_ADH004_{timeStamp}', 'dateString': f'ADH004_{d2}', 'day':'D2'},
                        {'fileName': f'MCEG_STG1D3_ADH004_{timeStamp}', 'dateString': f'ADH004_{d3}', 'day':'D3'},
                        {'fileName': f'MCEG_STG1D4_ADH004_{timeStamp}', 'dateString': f'ADH004_{d4}', 'day':'D4'},
                        {'fileName': f'MCEG_STG1D5_ADH004_{timeStamp}', 'dateString': f'ADH004_{d5}', 'day':'D5'},
                        {'fileName': f'MCEG_STG1D6_ADH004_{timeStamp}', 'dateString': f'ADH004_{d6}', 'day':'D6'},
                        {'fileName': f'MCEG_STG1D7_ADH004_{timeStamp}', 'dateString': f'ADH004_{d7}', 'day':'D7'}]

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
    for txtFileData in allTxtFileData:
            fileName = txtFileData['fileName']
            dateString = txtFileData['dateString']
            with open(f'{stageReceive}/{fileName}.csv', 'w') as tf:
                tf.write(f'{dateString}')
                tf.close()
    ############################ fake data end ###############################
    
    # Wait for all the text files to be processed
    time.sleep(25)


    # check if the csv files came through
    receivedFiles = os.listdir(stageReceive)
    for txtFileData in allTxtFileData:
        fileName = f"{txtFileData['fileName']}.csv"
        day = txtFileData['day']
        if fnmatch.filter(receivedFiles, fileName):
            foundFile = fnmatch.filter(receivedFiles, fileName)
            shutil.copy(f'{stageReceive}/{foundFile[0]}', f"{currentDirectory}/STG1{day}.csv")
    for csvfile in os.listdir(stageReceive):
              if fnmatch.fnmatch(csvfile, 'MCEG_STG1D6_ADHOC4*.csv'):
                  os.remove(f'{receive_folder}/{csvfile}')
    """
    # ############################## functions ##########################

    



    # check for response csv, if exist copy to current directory for parsing
    def call_adhoc_4_and_check_for_response_csv(receive_folder, stageSend, local_directory, current_date):
        # note that repeat is needed since the adhoc processor sometimes does not return csv.
        # get current timestamp
        
        
        receivePattern = f'MCEG_STG1D0_ADHOC4_{timeStamp}*.csv'
        # for file in os.listdir(receive_folder):
        # if fnmatch.fnmatch(file, pattern) == True:
        if fnmatch.filter(receivedFiles, receivePattern):
            file_name = fnmatch.filter(receivedFiles, receivePattern)
            print(file_name[0])
            print(f'csv file for adhoc 4 found')
            # Copy file
            shutil.copy(f'{receive_folder}/{file_name[0]}', f'{local_directory}/STG1D0/data.csv')
            print("csv file copied to local folder for parsing")
            # remove all files that was generated by this script.
            for csvfile in os.listdir(receive_folder):
              if fnmatch.fnmatch(csvfile, 'MCEG_STG1D0_ADHOC4*.csv'):
                  os.remove(f'{receive_folder}/{csvfile}')


            # add header row
            with open(f'{local_directory}/STG1D0/data.csv',newline='') as f:
                r = csv.reader(f)
                data = [line for line in r]
            with open(f'{local_directory}/STG1D0/data.csv','w',newline='') as f:
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
            with open(f'{local_directory}/STG1D0/data.csv') as f:
              reader = csv.DictReader(f)
              rows = list(reader)

            with open(f'{local_directory}/STG1D0/data.json', 'w') as f:
                json.dump(rows, f)

            try:
              mng_client = pymongo.MongoClient(uri)
              mng_db = mng_client['MCEG']
              collection_name = 'STG1D0'
              db_cm = mng_db[collection_name]
              cdir = Path(os.getcwd())
              file_res = f'{cdir}/STG1D0/data.csv'

              data = pd.read_csv(file_res,dtype=str,na_filter=False)
              data_json = json.loads(data.to_json(orient='records'))
              x = db_cm.delete_many({})
              db_cm.insert(data_json)
            except Exception as e:
              print("type error: " + str(e))
              print(traceback.format_exc())


        else:
            # if file is not available abort the script
            print(f'Did not find csv file for adhoc 4')
            print('Check if the adhoc processor is down')
            pass

    check_if_folder_exist(stageReceive)

    call_adhoc_4_and_check_for_response_csv(stageReceive,stageSend,currentDirectory,currentDate)

    print('Finished Stage 1 day 0')
    """


STG1_CSV_TO_MONGO()

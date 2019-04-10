# CsvGen (2.0.1)

This project is a helper app for MCEG (Movement Control Event Generator). Use this app to rapidly create csv file with test data for automation script to consume via Jenkins as well as view flight data of 8 days to help testers.
## Prerequisite ()
1. Node = 8.11.1
2. Python = 3.6.2
3. APScheduler = 3.5.3
4. pandas = 0.24.0
5. pymongo = 3.6.1
6. Mongodb = 3.6.4
7. File drop location for Stage 1 and Stage 3 environment Adhoc Processor
#### Make sure on below config
 1. `\\gscfile01\SharedFile\QA_MVC` is available fom the machine this app runs from including all nested sub folders
 2. Python scripts should have permission to delete files from network share `\\gscfile01\SharedFile\QA_MVC`
 3. MongoDB should be localhost without any authentication

 
## Workflow

 - stg*DataFeed.py  pulls data from drop location of stage environment every 30 second for 8 days worth (yesterday + 7 days ahead) which pushes data into local mongodb database.
 - Express backend serves json data to Angular client.
**Note:** Home component can generate csv file that can be fed into jenkins for mass event trigger on flights.



## Development server

Clone repo and do `npm install` or if you are using Yarn run `yarn` command to install dependencies

Run `ng serve` for a dev server on gui only. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
For backend run `ng build` to generate `/dist` folder, then `npm run server`. Open `http://localhost:3000`

## Known Issue
Data is not being refreshed every 30 sec as intended on data feed script.
Reason: All the processing power is directed to data feed script, therefore it takes longer for MongoDb to make changes to database.
Solution: Put MongoDb server on a seperate VM and edit the `/server/route/api.js`. Change `const dbURL` and point it to the VM running MongoDB.

## When shit hits the fan
There have been exception with APScheduler library. May cause the application to fail. 
Find all the process related to stage data feed python files by running `ps -ax`
They look something like this:
`25757 ?        Sl     1:34 python3 stg1DataFeed.py`
`25802 ?        Sl     1:31 python3 stg2DataFeed.py`
`25883 ?        Sl     1:31 python3 stg3DataFeed.py`

Grab all three process id and kill them using kill command. Example: `kill 25757`

Stop Node.js server using `pm2 stop server`

Stop mongodb using `sudo systemctl stop mongod`

All of this will stop all part of the application.

To restart follow the steps described in Prod section

## Prod
Clone repo and do `sudo npm install` or if you are using Yarn run `yarn` command to install dependencies
Use the `sudo ng build --prod` for a production build on gui.
Make sure MongoDB logs are pointed to to `/dev/null` to avoid space running out issue on VM.
Install pm2 `sudo npm install pm2@latest -g` for production process management for Node.js.

`cd STG1` then run `nohup python3 stg1DataFeed.py </dev/null >/dev/null 2>&1 &` for stage 1 data feed.

`cd STG2` then run `nohup python3 stg2DataFeed.py </dev/null >/dev/null 2>&1 &` for stage 2 data feed.

`cd STG3` then run `nohup python3 stg3DataFeed.py </dev/null >/dev/null 2>&1 &` for stage 3 data feed.

`cd ..` to main directory and run `sudo pm2 start server.js -i max`

This should start on port 80 in cluster mode.

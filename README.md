# CsvGen (Alpha 0.015)

This project is a helper app for MCEG (Movement Control Event Generator). Use this app to rapidly create csv file with test data for automation script to consume via Jenkins as well as view flight data of current day to help testers.
## Prerequisite (Only stage 3 works as of alpha 0.015)
1. Node >= 8.0
2. Python >= 3.6.2
3. Mongodb
4. File drop location for target Stage environment Adhoc Processor
#### Make sure on below config
 1. Set Mongodb local with datatbase `Flights` and collection within such as `STG1`, `STG3` etc. Each collection will have 'todays' flight data for specified stage environment. 
 2. In the file `workerSTG3.py` change databas url if the database is remote. Set db and collection name same as local.

 
## Workflow

 - workerSTG*.js   pull data from drop location of stage environment every 16 second, by running a python script (workerSTG*.py) which pushes data into specified mongodb database and collection.
 - Express backend serves json data to Angular client.
**Note:** Home component can generate csv file that can be fed into jenkins for mass event trigger on flights.



## Development server

Clone repo and do `npm install` or if you are using Yarn run `yarn` command to install dependencies

Run `ng serve` for a dev server on gui only. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
For backend run `ng build` to generate `/dist` folder, then `npm run server`. Open `http://localhost:3000`

Use the `ng build --prod` for a production build on gui. 

Run `npm run backend` to serve up rest api + static files from `/dist` folder + data feed from Stage 3

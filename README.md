# CsvGen (1.7)

This project is a helper app for MCEG (Movement Control Event Generator). Use this app to rapidly create csv file with test data for automation script to consume via Jenkins as well as view flight data of current day to help testers.
## Prerequisite ()
1. Node >= 8.11.1
2. Python >= 3.6.2
3. Mongodb
4. File drop location for Stage 1 and Stage 3 environment Adhoc Processor
#### Make sure on below config
 1. `\\gscfile01\SharedFile\QA_MVC` is available fom the machine this app runs from including all nested sub folders
 2. Python scripts should have permission to delete files from network share `\\gscfile01\SharedFile\QA_MVC`
 3. MongoDB should be localhost without any authentication

 
## Workflow

 - workerSTG*.js   pull data from drop location of stage environment every 16 second, by running a python script (workerSTG*.py) which pushes data into specified mongodb database and collection.
 - Express backend serves json data to Angular client.
**Note:** Home component can generate csv file that can be fed into jenkins for mass event trigger on flights.



## Development server

Clone repo and do `npm install` or if you are using Yarn run `yarn` command to install dependencies

Run `ng serve` for a dev server on gui only. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
For backend run `ng build` to generate `/dist` folder, then `npm run server`. Open `http://localhost:3000`

## Prod
Clone repo and do `npm install` or if you are using Yarn run `yarn` command to install dependencies
Use the `ng build --prod` for a production build on gui. 
`cd STG1` then run `node workerSTG1`
`cd STG3` then run `node workerSTG3`
Go back to main directory and run `npm run server` This should start on port 3000.

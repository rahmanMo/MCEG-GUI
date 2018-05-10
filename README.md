# CsvGen (2.0.0)

This project is a helper app for MCEG (Movement Control Event Generator). Use this app to rapidly create csv file with test data for automation script to consume via Jenkins as well as view flight data of 8 days to help testers.
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

 - stg*DataFeed.py  pulls data from drop location of stage environment every 30 second for 8 days worth (yesterday + 7 days ahead) which pushes data into local mongodb database.
 - Express backend serves json data to Angular client.
**Note:** Home component can generate csv file that can be fed into jenkins for mass event trigger on flights.



## Development server

Clone repo and do `npm install` or if you are using Yarn run `yarn` command to install dependencies

Run `ng serve` for a dev server on gui only. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
For backend run `ng build` to generate `/dist` folder, then `npm run server`. Open `http://localhost:3000`

## Prod
Clone repo and do `sudo npm install` or if you are using Yarn run `yarn` command to install dependencies
Use the `sudo ng build --prod` for a production build on gui. 
Install pm2 `sudo npm install pm2@latest -g` for production process management for Node.js. 
`cd STG1` then run `sudo nohup python3 stg1DataFeed.py` for stage 1 data feed
`cd ..`
`cd STG3` then run `sudo nohup python3 stg3DataFeed.py` for stage 3 data feed
`cd ..` to main directory and run `sudo pm2 start server.js -i max` This should start on port 80 in cluster mode.

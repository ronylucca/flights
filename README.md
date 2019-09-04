# flights

Technologies used on this project:


NodeJS: 10.15.3^
Python: 3.7ˆ
DynamoDB(local)


Rest project using nodeJS, Express and Dynamodb. Just run npm install.


to migrate data from csv file, run /src/data/migrate_data.py

  - this action assumes that you have a csv file located on a default dir /tmp. To change it, just set on script.
  
  - to perform the persistance, we used the bulk save, persisting all flights together from csv file.
  
  
  
  to POST a flight follow the pattern:
  
  {
    "from": "Rio De Janeiro",
    "to": "Miami",
    "company": "AMERICAN AIRLINES",
    "departure" : "2016-01-10T02:38:00Z"
  }
 
 

const AWS    = require("aws-sdk")
const Logger = require('../helpers/logger').getLogger('flights-dao')


AWS.config.update({ region: Property.REGION, endpoint: Property.URL_PATH_DYNAMO })
const documentClient = new AWS.DynamoDB.DocumentClient()
const tableFlights = Property.TABLE
const partition = 'flights'

module.exports = class FlightsDAO {


async saveAndUpdate(flight) {
          
    return new Promise((resolve, reject) => {
        documentClient.put(flight.toJson(), function (err, data) {
        if (err) {
          Logger.error("An error occurred persisting new flight ", err);
          reject(err)
        }
        else {
          Logger.info("Success");
          resolve(data)
        }
      });
    })
}

/*
* Method used for search for flights. This method is also ready for auto-complete, 
* once we are using 'begins_with'
*/
async seachFlights(filter) {

    return new Promise((resolve, reject) => {
      const docClient = new AWS.DynamoDB.DocumentClient();

      //TODO Usar begins_with de upperCase de from e to
      const searchingParameters = {
        TableName: tableFlights,
        KeyConditionExpression: "particao = :partition",
        FilterExpression: "begins_with (origin, :origin) and begins_with(destination, :destination) and begins_with (departure, :departure)",
        ExpressionAttributeValues: {
          ":partition": partition,
          ":departure": filter.departure,
          ":origin": this.capitalize(filter.from),
          ":destination": this.capitalize(filter.to)
        }
      }

      docClient.query(searchingParameters, function (err, data) {
        if (err) {
          Logger.error("An error occurred searching for flights ", err)
          reject(err)
        } else {
          Logger.info("Success");
          resolve(data)
        }
      })
    })
  }

  capitalize(text) {
    if (typeof text !== 'string') return ''
    var capitalized = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    return capitalized;
  }

  
}
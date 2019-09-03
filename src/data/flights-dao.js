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

async seachFlights(filter) {

    return new Promise((resolve, reject) => {
      const docClient = new AWS.DynamoDB.DocumentClient();

      //TODO Usar begins_with de upperCase de from e to
      const searchingParameters = {
        TableName: tableFlights,
        KeyConditionExpression: "particao = :partition",
        FilterExpression: "from = :from and to = :to and and begins_with (departure, :departure)",
        ExpressionAttributeValues: {
          ":partition": partition,
          ":departure": filter.departure,
          ":from": filter.from,
          ":to": filter.to
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
}
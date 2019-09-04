const moment = require('moment');
const flightTables = Property.TABLE

//Flight constructor
module.exports = class Flight {
    
    constructor(flightObject) {
        var identifier = flightObject.identifier ? flightObject.identifier : Date.now().toString();
    
        this.flightTB = {
            TableName: flightTables,
            Item: {
                "origin": flightObject.from,
                "destination": flightObject.to,
                "company": flightObject.company,
                "particao": "flights",
                "identificador" : identifier,
                "departure" : flightObject.departure
              }
        }
    }   
    
    getDate(){
        return moment().format();
    }

    toJson(){
        return this.flightTB;
    }
}
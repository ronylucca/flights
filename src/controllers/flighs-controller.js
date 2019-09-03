const FlightsService            = require('../services/flights-service')
const Logger                   = require('../helpers/logger').getLogger('flights-controller')
const Flight                = require('../models/flight')
const moment                   = require('moment');

const flightsService = new FlightsService()

/**
 * Method responsable for register a new flight sent by client
 */
exports.addFlight = async (req, res) => {
    try{
        /* 
        *  Validate requested parameters
        */
        var flightRequest = req.body
        var validationErrors = validate(flightRequest)
        
        if (validationErrors){
            
            var flight = new Flight(flightRequest)
        
            await flightsService.addFlight(flight)
            return res.status(200).send("Data successfully saved")
                            
        }else{
            return res.status(400).send("Bad request")
        }
    }catch(error){
        Logger.error("An error occurred during the process", error)
        return res.status(400).send("An error occurred")
    }
}

/**
 * Method responsable for search for a flight requested by client
 */
exports.searchFlights = async (req, res) => {
    
    try{
        Logger.info("Searching for a flight")
        const response  = await flightsService.searchFlightWithParams(req.params)
        return res.status(response.statusCode).send(response.body)

    }catch(error){
        Logger.error("An erorr occurred during the process", error)
        return res.status(400).send("An error occurred")
    }
}

function validate(flightRequest){
    if(! flightRequest.departure && flightRequest.from && flightRequest.to){
        return false;
    }else{
        return true;
    }
}
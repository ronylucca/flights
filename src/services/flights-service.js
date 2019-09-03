const Logger             = require('../helpers/logger').getLogger('flights-service')
const FlightsDAO = require('../data/flights-dao')

const flightsDAO = new FlightsDAO()

module.exports = class FlightsService{

    
    /* 
    *  Method responsable for persists a new flight 
    */
    async addFlight(flight){
            
        await flightsDAO.saveAndUpdate(flight)
        return

}


    /*
    *  Method responsable for search flights
    */
    async searchFlightWithParams(filter){
        
        const flights = await flightsDAO.seachFlights(filter)
        return flights

    }

}
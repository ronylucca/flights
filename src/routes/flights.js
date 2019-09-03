const FlightsController = require('../controllers/flighs-controller')

module.exports = (app) => {
    
    app.post('/flights', FlightsController.addFlight)

    app.get('/flights/:departure/:from/:to', FlightsController.searchFlights)
};
const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create,
};

function index(req, res){
    // function(err, movies(has to be plural because it has to be an array))
    Flight.find({}, function(err, flights) {
    res.render('flights/index', { flights });
    });
}


function create(req, res) {
  console.log(req.body);
  const flight = new Flight(req.body);
  flight.save(function(err) {
    if (err) return res.redirect('/flights/new');
    console.log(flight);
    res.redirect('/flights');
  });
}

function newFlight(req, res) {
  res.render('flights/new');
}
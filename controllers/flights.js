const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  index,
  show,
  new: newFlight,
  create,
};



function index(req, res) {
  // function(err, flights(has to be plural because it has to be an array))
  Flight.find({}, function (err, flights) {
    res.render('flights/index', { title: 'All Flights', flights });
  });
}

function show(req, res) {
  Flight.findById(req.params.id,
    // .populate('seat')
    function (err, flight) {
      // Mongoose query builder approach...
      // Performer.find({}).where('_id').nin(flight.seat)
      // Native MongoDB approach...
      Ticket.find({ flight: flight._id },
        function (err, tickets) {
          console.log(tickets);
          res.render('flights/show', {
            title: 'Flight Detail',
            flight,
            tickets
          });
        }
      );
    });
}

function newFlight(req, res) {
  res.render('flights/new', { title: 'Add Flight' });
}

function create(req, res) {
  console.log(req.body);
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) return res.redirect('/flights/new');
    console.log(flight);
    // After adding a flight, you want to see it's detail page you change 
    // ('/flights') to (`/flights/${flight._id}`)
    res.redirect(`/flights/${flight._id}`);
  });
}

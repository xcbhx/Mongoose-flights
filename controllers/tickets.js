const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  new: newTicket,
  create,
};



function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  // Fix by either reformatting to "MM-DD-YYYY" or by 
  // appending a "time" fragment like this... 
  const ticket = req.body;
  ticket.flight = req.params.id;
  Ticket.create(ticket, function (err, ticket) {
    res.redirect(`/flights/${req.params.id}`);
  });
}

function newTicket(req, res) {
    // res.render is looking at the view folder
    res.render('tickets/new', {
    title: 'Add Ticket',
    flightId: req.params.id
      });
}
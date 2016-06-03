var express = require('express');
var bodyparser = require('body-parser');
var api = express();
var _ = require('lodash');

var DEFAULT_PORT = 3000;
var contacts = [];

api.get('/', function(req, res, next){
  res.send('Hello world');
});

api.get('/contacts', function(req, res, next){
  res.send(contacts);
});

api.get('/contacts/:name', function(req, res, next){
  res.send(contacts);
});

api.post('/contacts', bodyparser.json(), function(req, res, next){
  var contact = req.body.contact;
  if(typeof contact != 'object')
    res.status(422).send('Unprecessable entity');
  contacts.push(contact);
  res.send(contact);
});

api.put('/contacts/:name/:new', function(req, res, next){
  var count = 0;
  contacts = contacts.map(function(contact){
    if(contact.name === req.params.name){
      contact.name = req.params.new;
    }
    return contact;
  });

  res.send({count: count});
});

api.delete('/contacts/:name', function(req, res, next){
  var count = 0;
  contacts = _.remove(contacts, function(contact){
    if (contact.name !== req.params.name){
      return false;
    }
    count ++;
    return true;
  });

  res.send({count: count});
});

var port = process.env.PORT || DEFAULT_PORT;

console.log('API listening on port 3000');

api.listen(port);

module.exports = api;

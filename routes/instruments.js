var express = require('express');
var router = express.Router();
var Instrument = require('../models/Instrument');

// List all instruments
router.get('/', function(req, res, next) {
  const instruments = Instrument.getAll();
  res.render('instruments/index', { title: 'Instruments', instruments: instruments });
});

// Show form for creating new instrument
router.get('/new', function(req, res, next) {
  res.render('instruments/new', { title: 'New Instrument' });
});

// Create new instrument
router.post('/', function(req, res, next) {
  const data = {
    name: req.body.name,
    symbol: req.body.symbol,
    type: req.body.type,
    description: req.body.description,
    currency: req.body.currency,
    active: req.body.active === 'on'
  };
  
  Instrument.create(data);
  res.redirect('/instruments');
});

// Show single instrument
router.get('/:id', function(req, res, next) {
  const instrument = Instrument.getById(req.params.id);
  if (!instrument) {
    return res.status(404).send('Instrument not found');
  }
  res.render('instruments/show', { title: `Instrument: ${instrument.name}`, instrument: instrument });
});

// Show form for editing instrument
router.get('/:id/edit', function(req, res, next) {
  const instrument = Instrument.getById(req.params.id);
  if (!instrument) {
    return res.status(404).send('Instrument not found');
  }
  res.render('instruments/edit', { title: `Edit Instrument: ${instrument.name}`, instrument: instrument });
});

// Update instrument
router.post('/:id', function(req, res, next) {
  const data = {
    name: req.body.name,
    symbol: req.body.symbol,
    type: req.body.type,
    description: req.body.description,
    currency: req.body.currency,
    active: req.body.active === 'on'
  };
  
  const instrument = Instrument.update(req.params.id, data);
  if (!instrument) {
    return res.status(404).send('Instrument not found');
  }
  res.redirect(`/instruments/${req.params.id}`);
});

// Delete instrument
router.post('/:id/delete', function(req, res, next) {
  const instrument = Instrument.delete(req.params.id);
  if (!instrument) {
    return res.status(404).send('Instrument not found');
  }
  res.redirect('/instruments');
});

module.exports = router;
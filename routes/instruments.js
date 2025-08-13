import { Router } from 'express';
var router = Router();
import { getAll, create, getById, update, deleteInstrument as deleteInstrument } from '../models/Instrument.js';

// List all instruments
router.get('/', function(req, res, next) {
  const instruments = getAll();
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
  
  create(data);
  res.redirect('/instruments');
});

// Show single instrument
router.get('/:id', function(req, res, next) {
  const instrument = getById(req.params.id);
  if (!instrument) {
    return res.status(404).send('Instrument not found');
  }
  res.render('instruments/show', { title: `Instrument: ${instrument.name}`, instrument: instrument });
});

// Show form for editing instrument
router.get('/:id/edit', function(req, res, next) {
  const instrument = getById(req.params.id);
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
  
  const instrument = update(req.params.id, data);
  if (!instrument) {
    return res.status(404).send('Instrument not found');
  }
  res.redirect(`/instruments/${req.params.id}`);
});

// Delete instrument
router.post('/:id/delete', function(req, res, next) {
  const instrument = deleteInstrument(req.params.id);
  if (!instrument) {
    return res.status(404).send('Instrument not found');
  }
  res.redirect('/instruments');
});

export default router;
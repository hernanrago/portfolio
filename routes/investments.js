import express from 'express';
var router = express.Router();
import Investment from '../models/Investment.js';
import Instrument from '../models/Instrument.js';
import Broker from '../models/Broker.js';
import Destination from '../models/Destination.js';

Instrument.seed();
Broker.seed();
Destination.seed();
Investment.seed();

router.get('/', function(req, res, next) {
  const investments = Investment.getAll();
  res.render('investments/index', { title: 'Investments', investments: investments });
});

router.get('/new', function(req, res, next) {
  const brokers = Broker.getAll();
  const destinations = Destination.getAll();
  res.render('investments/new', { title: 'New Investment', brokers: brokers, destinations: destinations });
});

router.post('/', function(req, res, next) {
  const broker = Broker.getById(req.body.broker_id);
  const destination = Destination.getById(req.body.destination_id);
  const investmentData = {
    date: req.body.date,
    broker: broker ? broker.name : '',
    destination: destination ? destination.name : '',
    instrument: req.body.instrument,
    nominals: parseFloat(req.body.nominals) || 0,
    currency: req.body.currency,
    total_purchase: parseFloat(req.body.total_purchase) || 0,
    dollar_purchase_date: parseFloat(req.body.dollar_purchase_date) || 0
  };
  
  Investment.create(investmentData);
  res.redirect('/investments');
});

router.get('/:id', function(req, res, next) {
  const investment = Investment.getById(req.params.id);
  if (!investment) {
    return res.status(404).render('error', { message: 'Investment not found' });
  }
  res.render('investments/show', { title: 'Investment Details', investment: investment });
});

router.get('/:id/edit', function(req, res, next) {
  const investment = Investment.getById(req.params.id);
  if (!investment) {
    return res.status(404).render('error', { message: 'Investment not found' });
  }
  res.render('investments/edit', { title: 'Edit Investment', investment: investment });
});

router.post('/:id', function(req, res, next) {
  const investmentData = {
    date: req.body.date,
    broker: req.body.broker,
    destination: req.body.destination,
    instrument: req.body.instrument,
    nominals: parseFloat(req.body.nominals) || 0,
    currency: req.body.currency,
    total_purchase: parseFloat(req.body.total_purchase) || 0,
    dollar_purchase_date: parseFloat(req.body.dollar_purchase_date) || 0
  };
  
  const updatedInvestment = Investment.update(req.params.id, investmentData);
  if (!updatedInvestment) {
    return res.status(404).render('error', { message: 'Investment not found' });
  }
  res.redirect('/investments/' + req.params.id);
});

router.post('/:id/delete', function(req, res, next) {
  const deletedInvestment = Investment.delete(req.params.id);
  if (!deletedInvestment) {
    return res.status(404).render('error', { message: 'Investment not found' });
  }
  res.redirect('/investments');
});

export default router;
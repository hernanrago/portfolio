import express from 'express';
var router = express.Router();
import Investment from '../models/Investment.js';
import Instrument from '../models/Instrument.js';

Investment.seed();

router.get('/', function(req, res, next) {
  const investments = Investment.getAll();
  res.render('investments/index', { title: 'Investments', investments: investments });
});

router.get('/new', function(req, res, next) {
  const instruments = Instrument.getActive();
  res.render('investments/new', { title: 'New Investment', instruments: instruments });
});

router.post('/', function(req, res, next) {
  const investmentData = {
    sold: req.body.sold === 'on',
    date: req.body.date,
    broker: req.body.broker,
    destination: req.body.destination,
    instrument_id: parseInt(req.body.instrument_id) || null,
    nominals: parseFloat(req.body.nominals) || 0,
    purchase_price: parseFloat(req.body.purchase_price) || 0,
    total_purchase_ARS: parseFloat(req.body.total_purchase_ARS) || 0,
    dollar_MEP_purchase_date: parseFloat(req.body.dollar_MEP_purchase_date) || 0,
    total_purchase_USD: parseFloat(req.body.total_purchase_USD) || 0
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
  const instruments = Instrument.getActive();
  res.render('investments/edit', { title: 'Edit Investment', investment: investment, instruments: instruments });
});

router.post('/:id', function(req, res, next) {
  const investmentData = {
    sold: req.body.sold === 'on',
    date: req.body.date,
    broker: req.body.broker,
    destination: req.body.destination,
    instrument_id: parseInt(req.body.instrument_id) || null,
    nominals: parseFloat(req.body.nominals) || 0,
    purchase_price: parseFloat(req.body.purchase_price) || 0,
    total_purchase_ARS: parseFloat(req.body.total_purchase_ARS) || 0,
    dollar_MEP_purchase_date: parseFloat(req.body.dollar_MEP_purchase_date) || 0,
    total_purchase_USD: parseFloat(req.body.total_purchase_USD) || 0
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
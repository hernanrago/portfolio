import Instrument from './Instrument.js';
import Broker from './Broker.js';
import Destination from './Destination.js';

class Investment {
  constructor(data = {}) {
    this.id = data.id || null;
    this.sold = data.sold || false;
    this.date = data.date || '';
    this.broker = data.broker || '';
    this.destination = data.destination || '';
    this.instrument = data.instrument || '';
    this.nominals = data.nominals || 0;
    this.currency = data.currency || '';
    this.total_purchase = data.total_purchase || 0;
    this.dollar_purchase_date = data.dollar_purchase_date || 0;
  }

  // Auto-calculated properties (getters)
  get current_price() {
    // This should be fetched from market data or set manually
    // For now, return a placeholder or stored value
    return this._current_price || this.purchase_price;
  }

  set current_price(value) {
    this._current_price = value;
  }

  get total_current() {
    return this.nominals * this.current_price;
  }

  get return_amount() {
    return this.total_current - this.total_purchase;
  }

  get return_percentage() {
    if (this.total_purchase === 0) return 0;
    return (this.return_amount / this.total_purchase) * 100;
  }

  getDaysHeld() {
    if (!this.date) return 0;
    const purchaseDate = new Date(this.date);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - purchaseDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }


  static investments = [];
  static nextId = 1;

  static getAll() {
    return this.investments;
  }

  static getById(id) {
    return this.investments.find(investment => investment.id === parseInt(id));
  }

  static create(data) {
    const investment = new Investment(data);
    investment.id = this.nextId++;
    this.investments.push(investment);
    return investment;
  }

  static update(id, data) {
    const index = this.investments.findIndex(investment => investment.id === parseInt(id));
    if (index !== -1) {
      const updatedInvestment = new Investment({ ...this.investments[index], ...data, id: parseInt(id) });
      this.investments[index] = updatedInvestment;
      return updatedInvestment;
    }
    return null;
  }

  static delete(id) {
    const index = this.investments.findIndex(investment => investment.id === parseInt(id));
    if (index !== -1) {
      return this.investments.splice(index, 1)[0];
    }
    return null;
  }

  static seed() {
    const investment = this.create({
      sold: false,
      date: '2024-04-16',
      broker: 'Cocos Capital',
      destination: 'CEDEARS',
      instrument: 'AAPL',
      nominals: 13.00,
      currency: 'ARS',
      total_purchase: 98952.53,
      dollar_purchase_date: 1031.63
    });
    
    // Set current price manually for demonstration
    investment.current_price = 8910.00;
  }
}

export default Investment;
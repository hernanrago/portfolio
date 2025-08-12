const Instrument = require('./Instrument');

class Investment {
  constructor(data = {}) {
    this.id = data.id || null;
    this.sold = data.sold || false;
    this.date = data.date || '';
    this.broker = data.broker || '';
    this.destination = data.destination || '';
    this.instrument_id = data.instrument_id || null;
    this.nominals = data.nominals || 0;
    this.purchase_price = data.purchase_price || 0;
    this.current_price = data.current_price || 0;
    this.total_purchase_ARS = data.total_purchase_ARS || 0;
    this.dollar_MEP_purchase_date = data.dollar_MEP_purchase_date || 0;
    this.total_purchase_USD = data.total_purchase_USD || 0;
    this.total_current_ARS = data.total_current_ARS || 0;
    this.return_ARS = data.return_ARS || 0;
    this.return_percentage_ARS = data.return_percentage_ARS || 0;
    this.tna_ARS = data.tna_ARS || 0;
    this.total_current_USD = data.total_current_USD || 0;
    this.return_USD = data.return_USD || 0;
    this.return_percentage_USD = data.return_percentage_USD || 0;
    this.tna_USD = data.tna_USD || 0;
    this.average_returns = data.average_returns || 0;
  }

  getInstrument() {
    return this.instrument_id ? Instrument.getById(this.instrument_id) : null;
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
    // First seed instruments
    Instrument.seed();
    
    // Find ABEV instrument
    const abevInstrument = Instrument.instruments.find(inst => inst.symbol === 'ABEV');
    
    this.create({
      sold: false,
      date: '2024-04-16',
      broker: 'Balanz',
      destination: 'largo_plazo',
      instrument_id: abevInstrument ? abevInstrument.id : null,
      nominals: 13.00,
      purchase_price: 7611.73,
      current_price: 8910.00,
      total_purchase_ARS: 98952.53,
      dollar_MEP_purchase_date: 1031.63,
      total_purchase_USD: 95.92,
      total_current_ARS: 115830.00,
      return_ARS: 16877.47,
      return_percentage_ARS: 17.06,
      tna_ARS: 12.91594742,
      total_current_USD: 87.19,
      return_USD: -8.73,
      return_percentage_USD: -9.10,
      tna_USD: -6.892239871,
      average_returns: 3.977297312
    });
  }
}

module.exports = Investment;
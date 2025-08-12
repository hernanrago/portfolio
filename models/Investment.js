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
    this.total_purchase_ARS = data.total_purchase_ARS || 0;
    this.dollar_MEP_purchase_date = data.dollar_MEP_purchase_date || 0;
    this.total_purchase_USD = data.total_purchase_USD || 0;
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

  get total_current_ARS() {
    return this.nominals * this.current_price;
  }

  get return_ARS() {
    return this.total_current_ARS - this.total_purchase_ARS;
  }

  get return_percentage_ARS() {
    if (this.total_purchase_ARS === 0) return 0;
    return (this.return_ARS / this.total_purchase_ARS) * 100;
  }

  get tna_ARS() {
    // TNA calculation would need the investment period
    // This is a simplified calculation - you may need to adjust based on your formula
    const daysHeld = this.getDaysHeld();
    if (daysHeld === 0) return 0;
    return (this.return_percentage_ARS / daysHeld) * 365;
  }

  get total_current_USD() {
    // Would need current USD exchange rate
    // For now, using a placeholder calculation
    const currentMEPRate = this.dollar_MEP_purchase_date; // You'd get current MEP rate
    return this.total_current_ARS / currentMEPRate;
  }

  get return_USD() {
    return this.total_current_USD - this.total_purchase_USD;
  }

  get return_percentage_USD() {
    if (this.total_purchase_USD === 0) return 0;
    return (this.return_USD / this.total_purchase_USD) * 100;
  }

  get tna_USD() {
    const daysHeld = this.getDaysHeld();
    if (daysHeld === 0) return 0;
    return (this.return_percentage_USD / daysHeld) * 365;
  }

  get average_returns() {
    return (this.tna_ARS + this.tna_USD) / 2;
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
      broker: 'Balanz',
      destination: 'largo_plazo',
      instrument_id: 1, // Assuming instrument with ID 1 exists
      nominals: 13.00,
      purchase_price: 7611.73,
      total_purchase_ARS: 98952.53,
      dollar_MEP_purchase_date: 1031.63,
      total_purchase_USD: 95.92
    });
    
    // Set current price manually for demonstration
    investment.current_price = 8910.00;
  }
}

export default Investment;
class Instrument {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.symbol = data.symbol || '';
    this.type = data.type || '';
    this.description = data.description || '';
    this.currency = data.currency || 'USD';
    this.active = data.active !== undefined ? data.active : true;
  }

  static instruments = [];
  static nextId = 1;

  static getAll() {
    return this.instruments;
  }

  static getActive() {
    return this.instruments.filter(instrument => instrument.active);
  }

  static getById(id) {
    return this.instruments.find(instrument => instrument.id === parseInt(id));
  }

  static create(data) {
    const instrument = new Instrument(data);
    instrument.id = this.nextId++;
    this.instruments.push(instrument);
    return instrument;
  }

  static update(id, data) {
    const index = this.instruments.findIndex(instrument => instrument.id === parseInt(id));
    if (index !== -1) {
      const updatedInstrument = new Instrument({ ...this.instruments[index], ...data, id: parseInt(id) });
      this.instruments[index] = updatedInstrument;
      return updatedInstrument;
    }
    return null;
  }

  static delete(id) {
    const index = this.instruments.findIndex(instrument => instrument.id === parseInt(id));
    if (index !== -1) {
      return this.instruments.splice(index, 1)[0];
    }
    return null;
  }

  static seed() {
    this.create({
      name: 'Ambev S.A.',
      symbol: 'ABEV',
      type: 'Stock',
      description: 'Brazilian brewing company',
      currency: 'USD',
      active: true
    });
    
    this.create({
      name: 'Apple Inc.',
      symbol: 'AAPL',
      type: 'Stock',
      description: 'Technology company',
      currency: 'USD',
      active: true
    });
    
    this.create({
      name: 'Tesla Inc.',
      symbol: 'TSLA',
      type: 'Stock',
      description: 'Electric vehicle manufacturer',
      currency: 'USD',
      active: true
    });
    
    this.create({
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      type: 'Stock',
      description: 'Software company',
      currency: 'USD',
      active: true
    });
  }
}

// Export individual methods
export const getAll = () => Instrument.getAll();
export const create = (data) => Instrument.create(data);
export const getById = (id) => Instrument.getById(id);
export const update = (id, data) => Instrument.update(id, data);
export const deleteInstrument = (id) => Instrument.delete(id);
export const getActive = () => Instrument.getActive();

export default Instrument;
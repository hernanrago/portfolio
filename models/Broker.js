class Broker {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
  }

  static brokers = [];
  static nextId = 1;

  static getAll() {
    return this.brokers;
  }


  static getById(id) {
    return this.brokers.find(broker => broker.id === parseInt(id));
  }

  static getByName(name) {
    return this.brokers.find(broker => broker.name === name);
  }

  static create(data) {
    const broker = new Broker(data);
    broker.id = this.nextId++;
    this.brokers.push(broker);
    return broker;
  }

  static update(id, data) {
    const index = this.brokers.findIndex(broker => broker.id === parseInt(id));
    if (index !== -1) {
      const updatedBroker = new Broker({ ...this.brokers[index], ...data, id: parseInt(id) });
      this.brokers[index] = updatedBroker;
      return updatedBroker;
    }
    return null;
  }

  static delete(id) {
    const index = this.brokers.findIndex(broker => broker.id === parseInt(id));
    if (index !== -1) {
      return this.brokers.splice(index, 1)[0];
    }
    return null;
  }

  static seed() {
    this.create({
      name: 'Balanz'
    });
    
    this.create({
      name: 'InvertirOnline'
    });
    
    this.create({
      name: 'Cocos Capital'
    });
    
    this.create({
      name: 'PPI'
    });
  }
}

export const getAll = () => Broker.getAll();
export const create = (data) => Broker.create(data);
export const getById = (id) => Broker.getById(id);
export const getByName = (name) => Broker.getByName(name);
export const update = (id, data) => Broker.update(id, data);
export const deleteBroker = (id) => Broker.delete(id);

export default Broker;
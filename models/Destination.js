class Destination {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
  }

  static destinations = [];
  static nextId = 1;

  static getAll() {
    return this.destinations;
  }

  static getById(id) {
    return this.destinations.find(destination => destination.id === parseInt(id));
  }

  static create(data) {
    const destination = new Destination(data);
    destination.id = this.nextId++;
    this.destinations.push(destination);
    return destination;
  }

  static update(id, data) {
    const index = this.destinations.findIndex(destination => destination.id === parseInt(id));
    if (index !== -1) {
      const updatedDestination = new Destination({ ...this.destinations[index], ...data, id: parseInt(id) });
      this.destinations[index] = updatedDestination;
      return updatedDestination;
    }
    return null;
  }

  static delete(id) {
    const index = this.destinations.findIndex(destination => destination.id === parseInt(id));
    if (index !== -1) {
      return this.destinations.splice(index, 1)[0];
    }
    return null;
  }

  static seed() {
    this.create({ name: 'cashflow' });
    this.create({ name: 'long term' });
    this.create({ name: 'liquity' });
    this.create({ name: 'swing' });
  }
}

export default Destination;
class Database {

  constructor({ connectionString }) {
    this.connectionString = connectionString;
  }

  async connect() {
    console.log('---- connecting to the database ----');
    await this.sleep(1000);
    return this;
  }

  async find(query) {
    console.log(`---- [database query]: ${ JSON.stringify(query) } ----`);
    await this.sleep(1000);
    return [
      { name: 'Pedro Portella', t: '123456' }
    ]
  }

  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
  }
}

module.exports = Database;
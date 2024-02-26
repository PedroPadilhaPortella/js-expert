const database = require('../../../database/database.js');

class BaseRepository {
  constructor({ tableName }) {
    this.tableName = tableName;
  }

  async find(itemId) {
    const table = database[this.tableName]

    if (!itemId) return content;

    return table.find((row) => row.id === itemId);
  }
}

module.exports = BaseRepository;
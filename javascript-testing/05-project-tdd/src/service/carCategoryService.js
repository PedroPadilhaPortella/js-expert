const BaseRepository = require('../repository/base/baseRepository');

class CarCategoryService {

  constructor() {
    this.carCategoriesRepository = new BaseRepository({ tableName: 'carCategories' });
  }

  async getCategoryById(categoryId) {
    const carCategory = await this.carCategoriesRepository.find(categoryId);
    return carCategory;
  }
}

module.exports = CarCategoryService;

import HeroesService from '../service/heroesService.js';
import HeroesRepository from '../repository/heroesRepository.js';

export default class HeroesFactory {

  static getInstance() {
    const repository = new HeroesRepository();
    const service = new HeroesService({ repository });
    return service;
  }
}
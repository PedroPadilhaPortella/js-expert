
import VillainsService from '../service/villainsService.js';
import VillainsRepository from '../repository/villainsRepository.js';

export default class VillainsFactory {

  static getInstance() {
    const repository = new VillainsRepository();
    const service = new VillainsService({ repository });
    return service;
  }
}
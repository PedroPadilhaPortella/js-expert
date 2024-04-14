
import PlayersService from '../service/playersService.js';
import PlayersRepository from '../repository/playersRepository.js';

export default class PlayersFactory {

  static getInstance() {
    const repository = new PlayersRepository();
    const service = new PlayersService({ repository });
    return service;
  }
}
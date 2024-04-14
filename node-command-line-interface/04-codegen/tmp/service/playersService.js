
export default class PlayersService {

  constructor({ repository: playersRepository }) {
    this.playersRepository = playersRepository;
  }

  create(data) {
    return this.playersRepository.create(data);
  }

  read(query) {
    return this.playersRepository.read(query);
  }

  update(id, data) {
    return this.playersRepository.update(id, data);
  }

  delete(id) {
    return this.playersRepository.delete(id);
  }
}
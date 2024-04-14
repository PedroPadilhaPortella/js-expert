
export default class HeroesService {

  constructor({ repository: heroesRepository }) {
    this.heroesRepository = heroesRepository;
  }

  create(data) {
    return this.heroesRepository.create(data);
  }

  read(query) {
    return this.heroesRepository.read(query);
  }

  update(id, data) {
    return this.heroesRepository.update(id, data);
  }

  delete(id) {
    return this.heroesRepository.delete(id);
  }
}
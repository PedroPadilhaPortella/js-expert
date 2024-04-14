
export default class VillainsService {

  constructor({ repository: villainsRepository }) {
    this.villainsRepository = villainsRepository;
  }

  create(data) {
    return this.villainsRepository.create(data);
  }

  read(query) {
    return this.villainsRepository.read(query);
  }

  update(id, data) {
    return this.villainsRepository.update(id, data);
  }

  delete(id) {
    return this.villainsRepository.delete(id);
  }
}
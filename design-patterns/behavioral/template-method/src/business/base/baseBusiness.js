import { NotImplementedException } from '../../utils/exceptions.js';

export default class BaseBusiness {

  /* 
   * Padrão do Martin Fowler: Garantir um fluxo de metodos, definindo uma sequencia a ser executada.
   * Função do metodo: Validar campos e salvar no banco de dados.
   */
  create(data) {
    const isValid = this._validateRequiredFields(data);

    if (!isValid) throw new Error(`invalid data`);

    return this._create(data);
  }

  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name);
  }

  _create(data) {
    throw new NotImplementedException(this._create.name);
  }
}
import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import BaseBusiness from '../src/business/base/baseBusiness.js';
import { NotImplementedException } from '../src/utils/exceptions.js';

describe(BaseBusiness.name, () => {

  beforeEach(() => {
    jest.restoreAllMocks();
  })

  test('should throw a NotImplementedException when child class does not implement _validateRequiredFields method', () => {
    class ConcreteClass extends BaseBusiness { }
    const concreteClass = new ConcreteClass();
    const validationError = new NotImplementedException(concreteClass._validateRequiredFields.name);
    expect(() => concreteClass.create({})).toThrow(validationError);
  });

  test('should throw a NotImplementedException when child class does not implement _create method', () => {
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValueOnce(true);
    }
    const concreteClass = new ConcreteClass();
    const createError = new NotImplementedException(concreteClass._create.name);
    expect(() => concreteClass.create({})).toThrow(createError);
  });

  test('should throw an Error when _validateRequiredFields returns false', () => {
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValueOnce(false);
    }
    const concreteClass = new ConcreteClass();
    const validationError = new Error(`invalid data`);
    expect(() => concreteClass.create({})).toThrow(validationError);
  });

  test('should call _validateRequiredFields and _create on create', () => {
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValueOnce(true);
      _create = jest.fn().mockReturnValueOnce(true);
    }
    const concreteClass = new ConcreteClass();
    const createFromBaseClass = jest.spyOn(BaseBusiness.prototype, BaseBusiness.prototype.create.name);
    const result = concreteClass.create({});

    expect(result).toBeTruthy();
    expect(createFromBaseClass).toHaveBeenCalled();
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled();
    expect(concreteClass._create).toHaveBeenCalled();
  });
});
import { expect, describe, test, beforeEach, jest } from '@jest/globals';
import Util from '../../src/util.js';

describe('#Util - Strings', () => {

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('#upperCaseFirstLetter should transform the first letter in uppercase', () => {
    const data = 'component';
    const expected = 'Component';
    const result = Util.upperCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });
  
  test('#lowerCaseFirstLetter should transform the first letter in lowercase', () => {
    const data = 'Component';
    const expected = 'component';
    const result = Util.lowerCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });

  test('#upperCaseFirstLetter given an empty string, it should return empty', () => {
    const data = '';
    const expected = '';
    const result = Util.upperCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });

  test('#lowerCaseFirstLetter given an empty string, it should return empty', () => {
    const data = '';
    const expected = '';
    const result = Util.lowerCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });
});
import {expect} from 'chai';
import resocket from '../src/resocket';

describe('Resocket', () => {
  it('should return false if auth or params is false', () => {
    expect(resocket.connect('localhost', {auth: false})).equal(undefined);
  });
});

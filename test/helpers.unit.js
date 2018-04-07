const { expect } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const { validatePasswords, buildCommon } = require('../lib/helpers');
const passwords = require('./data.json');

describe('Helper functions', () => {
  describe('#validatePasswords()', () => {
    it('should return no errors for valid passwords', () => {
      const errors = validatePasswords(passwords.valid);

      expect(errors.length).to.equal(0);
    });

    it('should return errors for a too short password', () => {
      const errors = validatePasswords(passwords.tooShort);

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal(`${passwords.tooShort} -> Error: Too Short`);
    });

    it('should return errors for a too long password', () => {
      const errors = validatePasswords(passwords.tooLong);

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal(`${passwords.tooLong} -> Error: Too Long`);
    });

    it('should return errors for a password with invalid characters', () => {
      const errors = validatePasswords(passwords.invalidChars);

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal('***heresnonascii** -> Error: Invalid Characters');
    });

    it('should should return errors for a common password', () => {
      const errors = validatePasswords(passwords.common);

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal(`${passwords.common} -> Error: Too Common`);
    });

    it('should return errors for passwords failing in > 1 way', () => {
      const errors = validatePasswords(passwords.multipleInOne);

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal('abc* -> Error: Too Short, Invalid Characters');
    });

    it('should return errors for multiple different passwords', () => {
      const errors = validatePasswords(passwords.list);

      expect(errors.length).to.equal(4);
      expect(errors[0]).to.equal('aaa -> Error: Too Short');
      expect(errors[1]).to.equal('password1 -> Error: Too Common');
    });
  });

  describe('#handleCommonFile()', () => {
    it('should return false when no path is provided', () => {
      expect(buildCommon()).to.be.undefined;
    });

    it('should build a password manifest when a file is provided', () => {
      sinon.stub(fs, 'readFileSync').returns(passwords.commonFile);

      const common = buildCommon('some/path');
      expect(common).to.deep.equal({
        123456: true,
        aaa: true,
        password1: true,
        password2: true,
      });
    });
  });
});

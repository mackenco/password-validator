const { expect } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const { buildErrors, buildCommon } = require('../lib/helpers');
const passwords = require('./data.json');

describe('Helper functions', () => {
  describe('#buildErrors()', () => {
    it('should return no errors for valid passwords', () => {
      const errors = buildErrors(passwords.valid);

      expect(errors.length).to.equal(0);
    });

    it('should return errors for a too short password', () => {
      const errors = buildErrors(passwords.tooShort);

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal(`${passwords.tooShort} -> Error: Too Short`);
    });

    it('should return errors for a too long password', () => {
      const errors = buildErrors(passwords.tooLong);

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal(`${passwords.tooLong} -> Error: Too Long`);
    });

    it('should return errors for a password with invalid characters', () => {
      const errors = buildErrors(passwords.invalidChars);

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal('***heresnonascii** -> Error: Invalid Characters');
    });

    it('should should return errors for a common password', () => {
      const errors = buildErrors(passwords.common);

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal(`${passwords.common} -> Error: Too Common`);
    });

    it('should return errors for passwords failing in > 1 way', () => {
      const errors = buildErrors(passwords.multipleInOne);

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal('abc* -> Error: Too Short, Invalid Characters');
    });

    it('should return errors for multiple different passwords', () => {
      const errors = buildErrors(passwords.list);

      expect(errors.length).to.equal(4);
      expect(errors[0]).to.equal('aaa -> Error: Too Short');
      expect(errors[1]).to.equal('password1 -> Error: Too Common');
    });
  });

  describe('#handleCommonFile()', () => {
    it('should return false when no path is provided', () => {
      const common = buildCommon();

      expect(common).to.be.an('object');
      expect(common.password1).to.be.true;
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

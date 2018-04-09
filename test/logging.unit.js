const { expect } = require('chai');
const sinon = require('sinon');
const { warn, error, success } = require('../lib/logging');

const sandbox = sinon.sandbox.create();

describe('Logging functions', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = sandbox.stub(console, 'log');
  });

  afterEach(() => {
    sandbox.restore();
  });

  [warn, error, success].forEach((fn) => {
    describe(`#${fn}()`, () => {
      it('should call console.log', () => {
        fn(['one', 'two']);
        expect(consoleSpy.calledTwice).to.equal(true);
      });
    });
  });
});

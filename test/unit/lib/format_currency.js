<<<<<<< HEAD:test/lib/format_currency.js
import {expect} from 'chai';
import formatCurrency from '../../lib/format_currency';
=======
import expect from 'expect';
import formatCurrency from '../../../lib/format_currency';
>>>>>>> refactor folder structure of tests and added circle ci e2e:test/unit/lib/format_currency.js

describe('formatCurrency', () => {

  it('should return $12.34', () => {
    expect(formatCurrency(12.34)).to.equal('$ 12.34');
  });

  it('should return $12,345.67', () => {
    expect(formatCurrency(12345.67)).to.equal('$ 12,345.67');
  });

  it('should return £12.34', () => {
    expect(formatCurrency(12.34, 'GBP')).to.equal('£ 12.34');
  });

  it('should return 12.34', () => {
    expect(formatCurrency(12.34, 'SEK')).to.equal('kr 12,34');
  });

  it('should return €12.34', () => {
    expect(formatCurrency(12.34,'EUR')).to.equal('€ 12,34');
  });

  it('should return €12 345.67', () => {
    expect(formatCurrency(12345.67,'EUR')).to.equal('€ 12 345,67');
  });

  it('should return -€12.34', () => {
    expect(formatCurrency(-12.34,'EUR')).to.equal('-€ 12,34');
  });

});

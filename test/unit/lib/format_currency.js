import {expect} from 'chai';
import formatCurrency from '../../../lib/format_currency';

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

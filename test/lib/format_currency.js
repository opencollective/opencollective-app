import expect from 'expect';
import formatCurrency from '../../lib/format_currency';

describe('formatCurrency', () => {

  it('should return $12.34', () => {
    expect(formatCurrency(12.34), '$12.34');
  });

  it('should return $12,345.67', () => {
    expect(formatCurrency(12.34), '$12,345.67');
  });

  it('should return £12.34', () => {
    expect(formatCurrency(12.34, 'GBP'), '£12.34');
  });

  it('should return €12.34', () => {
    expect(formatCurrency(12.34,'EUR'), '€12.34');
  });

  it('should return €12 345.67', () => {
    expect(formatCurrency(12.34,'EUR'), '€12 345.67');
  });

  it('should return -€12.34', () => {
    expect(formatCurrency(-12.34,'EUR'), '-€12.34');
  });

});

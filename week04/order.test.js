const { calculateOrderTotal } = require('../order');

describe('Order Total Calculation', () => {
  it('should calculate total without discount', () => {
    const result = calculateOrderTotal(200, 0);
    expect(result).toBe(200);
  });

  it('should apply discount correctly', () => {
    const result = calculateOrderTotal(200, 20);
    expect(result).toBe(180);
  });

  it('should handle edge case where amount is 100', () => {
    const result = calculateOrderTotal(100, 0);
    expect(result).toBe(100);
  });

  it('should return error for invalid input', () => {
    expect(() => calculateOrderTotal(-50, 10)).toThrow('Invalid input');
  });

  it('should return total as zero when no amount provided', () => {
    const result = calculateOrderTotal(0, 0);
    expect(result).toBe(0);
  });
});
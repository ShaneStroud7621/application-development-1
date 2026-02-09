// week04/order.js
// Fixed implementation with logging and original-error comment.
//
// Original buggy line (from the file you provided):
//   return total - discount;
// Error explanation added immediately after this line as a comment below:
//
// Error Type: ReferenceError: discount is not defined
// Line: the line above (return total - discount;) — Node would report a ReferenceError
// Root cause: The variable `discount` was referenced but never declared or initialized.
//              Accessing an undeclared identifier causes Node to throw a ReferenceError.
//
// The original bug caused Node to abort when applyDiscount tried to use an undefined identifier.
// The fix below defines an explicit discount value and validates inputs.

function calculateTotal(price, quantity) {
  // Validate inputs: ensure numbers, non-negative
  if (typeof price !== 'number' || typeof quantity !== 'number') {
    console.error('Invalid input types: price and quantity must be numbers.');
    throw new TypeError('price and quantity must be numbers');
  }
  if (price < 0 || quantity < 0) {
    console.error('Invalid input values: price and quantity must be non-negative.');
    throw new RangeError('price and quantity must be non-negative');
  }

  const total = price * quantity;
  return total;
}

function applyDiscount(total) {
  // Define discount explicitly. Based on the provided test expectation:
  // for price=25 and quantity=5 (total=125) expected discounted total is 115 => discount = 10
  const DISCOUNT_THRESHOLD = 100;
  const DISCOUNT_AMOUNT = 10;

  if (total > DISCOUNT_THRESHOLD) {
    // Log that a discount is about to be applied (the caller handles structured logging).
    const newTotal = total - DISCOUNT_AMOUNT;
    return {
      total: newTotal,
      discountApplied: true,
      discountAmount: DISCOUNT_AMOUNT
    };
  }

  return {
    total,
    discountApplied: false,
    discountAmount: 0
  };
}

function processOrder(price, quantity) {
  console.info('Program startup: processing an order.');

  console.info(`Input values received — price: ${price}, quantity: ${quantity}`);

  const total = calculateTotal(price, quantity);
  console.info(`Calculated total before discount: ${total.toFixed(2)}`);

  const discountResult = applyDiscount(total);

  if (discountResult.discountApplied) {
    console.warn(
      `Discount applied: ${discountResult.discountAmount.toFixed(2)} off (threshold exceeded).`
    );
  } else {
    console.info('No discount applied (threshold not exceeded).');
  }

  const finalTotal = discountResult.total;
  console.info(`Final result (after discount if any): ${finalTotal.toFixed(2)}`);

  // Return a string matching the tests: fixed to 2 decimal places
  return finalTotal.toFixed(2);
}

// Export functions for tests
module.exports = {
  calculateTotal,
  applyDiscount,
  processOrder
};

// If run directly, show example output
if (require.main === module) {
  try {
    // Example input from the assignment
    const examplePrice = 25;
    const exampleQuantity = 5;
    const result = processOrder(examplePrice, exampleQuantity);
    console.log('processOrder result:', result);
  } catch (err) {
    // Only log error here; tests will handle thrown errors themselves
    console.error('An error occurred while processing the order:', err.message);
    process.exit(1);
  }
}
/**
 * ProductId: should be between two and twenty characters
 * Name: should be only words
 * Price: should be from zero to a thousand
 * Category: should be electronic or organic
 */

function productValidator(product) {
  const errors = [];

  if (!(product.id.length >= 2 && product.id.length <= 20)) {
    errors.push(
      `id: invalid length, current ${product.id.length} expected to be between 2 and 20`,
    );
  }

  if (/(\W|\d)/g.test(product.name)) {
    errors.push(
      `name: invalid value, current ${product.name} expected a name without numbers`,
    );
  }

  if (!(product.price > 0 && product.price <= 1000)) {
    errors.push(
      `price: invalid price, current ${product.price} expected a price between 0 and 1000`,
    );
  }

  if (!(product.category === 'electronic' || product.category === 'organic')) {
    errors.push(
      `category: invalid category, current ${product.category} expected a category electronic or organic`,
    );
  }

  return {
    result: errors.length === 0,
    errors,
  };
}

module.exports = { productValidator };

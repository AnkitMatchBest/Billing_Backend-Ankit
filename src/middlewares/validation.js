export const validatePaymentRequest = (req, res, next) => {
  const { amount, currency, paymentMethod, customer } = req.body;

  // Validate required fields
  if (!amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Valid amount is required'
    });
  }

  if (!paymentMethod || typeof paymentMethod !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'Valid payment method is required'
    });
  }

  if (!customer || !customer.email || !customer.name) {
    return res.status(400).json({
      success: false,
      error: 'Valid customer information is required'
    });
  }

  // Validate currency
  const validCurrencies = ['usd', 'eur', 'gbp', 'cad', 'aud', 'inr'];
  if (currency && !validCurrencies.includes(currency.toLowerCase())) {
    return res.status(400).json({
      success: false,
      error: 'Invalid currency'
    });
  }

  next();
};

export const validatePaymentConfirmation = (req, res, next) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({
      success: false,
      error: 'Payment intent ID is required'
    });
  }

  next();
};


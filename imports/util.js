const currencyFormat = new Intl.NumberFormat('en-US',
  {
    style: 'currency',
    currency: 'USD'
  }
);

export const formatCurrency = (amount) => currencyFormat.format(amount);

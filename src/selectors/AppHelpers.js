export const normalizeCurrencyRecord = record => ({
  date: record.$.Date,
  nominal: parseInt(record.Nominal, 10),
  value: parseFloat(record.Value.replace(',', '.')),
});

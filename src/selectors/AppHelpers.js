export const normalizeCurrencyRecord = record => ({
  date: record.$.Date,
  nominal: parseInt(record.Nominal, 10),
  value: parseFloat(record.Value.replace(',', '.')),
});

export const makeHistoryRequestUrl = (dateStart, dateEnd, currencyCode) => (
  'https://cbr-gate.herokuapp.com/XML_dynamic.asp?' +
    `date_req1=${dateStart.format('DD/MM/YYYY')}&` +
    `date_req2=${dateEnd.format('DD/MM/YYYY')}&` +
    `VAL_NM_RQ=${currencyCode}`
);

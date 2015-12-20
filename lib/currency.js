import Numeral from 'numeral';
 
Numeral.language('fr', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '€'
    }
});

Numeral.language('en-gb', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        var b = number % 10;
        return (~~ (number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
    },
    currency: {
        symbol: '£'
    }
});

export default (value, currency) => {

  let lang = 'en';
  switch(currency) {
    case 'EUR': lang = 'fr'; break;
    case 'GBP': lang = 'en-gb'; break;
  }

  Numeral.language(lang);

  const number = Numeral(value);
  const formatted = number.format('$ 0,0.00');

  return formatted;
};

import Numbro from 'numbro';
import 'numbro/dist/languages'

export default (value = 0, currency = 'USD', precision = 2) => {

  let lang = 'en-US';
  switch(currency) {
    case 'EUR': lang = 'fr-FR'; break;
    case 'SEK': lang = 'sv-SE'; break;
    case 'GBP': lang = 'en-GB'; break;
  }

  Numbro.culture(lang);

  const number = Numbro(value);
  const formatted = (precision === 0) ? number.format('$ 0,0') : number.format('$ 0,0.00');

  return formatted;
};
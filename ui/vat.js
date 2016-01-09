/**
 * Static data the for the transaction form
 */

export default function(groupid) {
  if(typeof groupid == "string")
    groupid = parseInt(groupid, 10);

  let vat = [];
  switch (groupid) {
    // Women Who Code
    case 1:
    case 3:
    case 4:
      vat = [
        {label: '5.5%', value: '0.055'},
        {label: '10%', value: '0.10'},
        {label: '20%', value: '0.20'}
      ];
      break;

    default: 
      vat = [];
  }
  return vat;
}

/**
 * Static data the for the transaction form
 */

export default function(groupid) {
  if(typeof groupid == "string")
    groupid = parseInt(groupid, 10);

  let vat = false;
  switch (groupid) {
    // Women Who Code
    case 1:
    case 5:
    case 4:
      vat = true;
      break;

    default: 
      vat = false;
  }
  return vat;
}

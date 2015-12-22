/**
 * Static data the for the transaction form
 */

export default function(groupid) {
  if(typeof groupid == "string")
    groupid = parseInt(groupid, 10);

  let tags = [];
  switch (groupid) {
    // Women Who Code
    case 2:
    case 3:
    case 4:
      tags = [
        'Donation',
        'Event Refreshments',
        'Event Travel',
        'Event Prizes',
        'Event Facilities',
        'Network supplies',
        'Other Program Expense'
      ];
      break;
    default: 
      tags = [
        'Communications',
        'Design',
        'Donation',
        'Engineering',
        'Food & Beverage',
        'Marketing',
        'Legal',
        'Supplies & materials',
        'Travel',
        'Team',
        'Office',
        'Other',
        'Web services'
      ];
  }
  return tags.sort();
}

import { SET_DONATION_AMOUNT } from '../../constants/form';

/**
 * Set the amount to donate
 */

export default (amount) => {
  return {
    type: SET_DONATION_AMOUNT,
    amount,
  };
};


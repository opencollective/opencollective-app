import { SET_DONATION_CUSTOM } from '../../constants/form';

/**
 * Set isCustomMode for donate form
 */

export default (isCustomMode) => {
  return {
    type: SET_DONATION_CUSTOM,
    isCustomMode,
  };
};


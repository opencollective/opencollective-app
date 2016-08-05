import * as constants from '../../constants/form';
import fundIsValid from '../../validators/fund';

/**
 * Validate fund form
 */

export default (newFund) => {
  return dispatch => {
    dispatch(request(newFund));

    return fundIsValid(newFund)
    .then(fund => dispatch(success(fund)))
    .catch(error => {
      dispatch(failure(error));
      throw new Error(error.details[0].message);
    });
  };
};

function request(fund) {
  return {
    type: constants.VALIDATE_FUND_REQUEST,
    fund
  };
}

function success(fund) {
  return {
    type: constants.VALIDATE_FUND_SUCCESS,
    fund
  };
}

function failure(error) {
  return {
    type: constants.VALIDATE_FUND_FAILURE,
    error
  };
}

import expect from 'expect';
import resetTransactionForm from '../../../actions/form/reset_transaction';
import appendTransactionForm from '../../../actions/form/append_transaction';
import setEditMode from '../../../actions/form/set_edit_mode_profile';
import appendDonation from '../../../actions/form/append_donation';
import * as constants from '../../../constants/form';

describe('form actions', () => {

  it('should create an action to reset the transaction form', () => {
    expect(resetTransactionForm()).toEqual({
      type: constants.RESET_TRANSACTION_FORM,
    });
  });

  it('should create an action to append a fields to the transaction form', () => {
    const attributes = { amount: 0 };

    expect(appendTransactionForm(attributes)).toEqual({
      type: constants.APPEND_TRANSACTION_FORM,
      attributes
    });
  });

  it('should set isEditMode variable', () => {
    expect(setEditMode(true)).toEqual({
      type: constants.SET_EDIT_MODE_PROFILE,
      isEditMode: true
    });
    expect(setEditMode(false)).toEqual({
      type: constants.SET_EDIT_MODE_PROFILE,
      isEditMode: false
    });
  });

  describe('donation', function () {
    it('should set append a field to the donation form', () => {
      const attributes = { amount: 10 };

      expect(appendDonation(attributes)).toEqual({
        type: constants.APPEND_DONATION_FORM,
        attributes
      });
    });

  });

});

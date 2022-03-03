/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  WEB_ACCOUNT_CONNECTED, WEB_ACCOUNT_DISCONNECTED
} from 'src/actions/webAccountActions';

const initialState = {

};

const webExtensionReducer = (state = initialState, action) => {
  switch (action.type) {
    case WEB_ACCOUNT_CONNECTED: {
      return produce(state, (draft) => {
        draft.account = action.payload;
      });
    }

    case WEB_ACCOUNT_DISCONNECTED: {
      return produce(state, (draft) => {
        draft.account = undefined;
      });
    }

    default: {
      return state;
    }
  }
};

export default webExtensionReducer;

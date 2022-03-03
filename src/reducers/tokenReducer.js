/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_PDEX_TOKENS
} from 'src/actions/pDEXTokensActions';

const initialState = {
  tokens: []
};

const tokensReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PDEX_TOKENS: {
      const tokens = action.payload;

      return produce(state, (draft) => {
        draft.tokens = tokens;
      });
    }

    default: {
      return state;
    }
  }
};

export default tokensReducer;

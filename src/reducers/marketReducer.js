/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_MARKET
} from 'src/actions/marketActions';

const initialState = {
  market: {}
};

const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MARKET: {
      const market = action.payload;

      return produce(state, (draft) => {
        draft.market = market;
      });
    }

    default: {
      return state;
    }
  }
};

export default marketReducer;

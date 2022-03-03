/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import {
  GET_TRADING_PAIRS
} from 'src/actions/pairsActions';
import { GET_CUSTOM_TRADING_PAIRS } from '../actions/pairsActions';

const initialState = {
  pairs: [],
  customPairs: []
};

const pairReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRADING_PAIRS: {
      const pairs = action.payload;

      return produce(state, (draft) => {
	      draft.pairs = _.orderBy(pairs);
      });
    }

    case GET_CUSTOM_TRADING_PAIRS: {
      const pairs = action.payload;

      return produce(state, (draft) => {
        draft.customPairs = _.orderBy(pairs);
      });
    }

    default: {
      return state;
    }
  }
};

export default pairReducer;

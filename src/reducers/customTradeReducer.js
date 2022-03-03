/* eslint-disable no-param-reassign */
import produce from 'immer';
import { GET_CUSTOM_TRADES_BY_PAIR, GET_CUSTOM_TRADES } from '../actions/tradesActions';

const initialState = {
  completeTrades: undefined,
  tradesCount: 0,
  tradesByPair: {
    byId: {}
  },
  tradesByPairCount: 0
};

const tradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOM_TRADES: {
      const { result, count } = action.payload;

      return produce(state, (draft) => {
        draft.completeTrades = result;
        draft.tradesCount = count;
      });
    }

    case GET_CUSTOM_TRADES_BY_PAIR: {
      const { trades, count, pair } = action.payload;

      return produce(state, (draft) => {
        draft.tradesByPair.byId[pair] = trades;
        draft.tradesByPairCount = count;
      });
    }

    default: {
      return state;
    }
  }
};

export default tradeReducer;

/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_TRADES,
  GET_LAST_TRADES, GET_TRADES_BY_PAIR
} from 'src/actions/tradesActions';

const initialState = {
  completeTrades: undefined,
  tradesCount: 0,
  lastTrades: [],
  tradesByPair: {
    byId: {}
  },
  tradesByPairCount: 0
};

const tradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LAST_TRADES: {
      const trades = action.payload;

      return produce(state, (draft) => {
        draft.lastTrades = trades;
      });
    }

    case GET_TRADES: {
      const { result, count } = action.payload;

      return produce(state, (draft) => {
        draft.completeTrades = result;
        draft.tradesCount = count;
      });
    }

    case GET_TRADES_BY_PAIR: {
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

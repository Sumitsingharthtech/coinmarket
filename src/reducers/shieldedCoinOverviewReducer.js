/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_SHIELDED_COIN_AGGREGATED_USD_AMOUNT,
  GET_SHIELDED_COIN_OVERVIEW,
  GET_SHIELDED_COIN_COIN_SUMMARY
} from 'src/actions/shieldedCoinOverviewActions';

const initialState = {
  aggregatedUsdAmounts: [],
  overview: {}
};

const shieldedCoinOverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHIELDED_COIN_OVERVIEW: {
      const data = action.payload;

      return produce(state, (draft) => {
        draft.overview = data;
      });
    }

    case GET_SHIELDED_COIN_AGGREGATED_USD_AMOUNT: {
      const data = action.payload;

      return produce(state, (draft) => {
        draft.aggregatedUsdAmounts = data;
      });
    }

    case GET_SHIELDED_COIN_COIN_SUMMARY: {
      const data = action.payload;

      return produce(state, (draft) => {
        draft.coinSummary = data;
      });
    }

    default: {
      return state;
    }
  }
};

export default shieldedCoinOverviewReducer;

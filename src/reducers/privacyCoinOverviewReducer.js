/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_PRIVACY_COIN_MARKET_CAP,
  GET_PRIVACY_COIN_OVERVIEW,
  GET_PRIVACY_COIN_USD_EVOLUTION
} from 'src/actions/privacyCoinOverviewActions';

const initialState = {
  marketCap: [],
  overview: {}
};

const privacyCoinOverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRIVACY_COIN_OVERVIEW: {
      const data = action.payload;

      return produce(state, (draft) => {
        draft.overview = data;
      });
    }

    case GET_PRIVACY_COIN_MARKET_CAP: {
      const data = action.payload;

      return produce(state, (draft) => {
        draft.marketCap = data;
      });
    }

    case GET_PRIVACY_COIN_USD_EVOLUTION: {
      const data = action.payload;

      return produce(state, (draft) => {
        draft.priceEvolution = data;
      });
    }

    default: {
      return state;
    }
  }
};

export default privacyCoinOverviewReducer;

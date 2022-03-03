/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_SHIELDED_COINS_HISTORY,
  GET_LAST_SHIELDED_COINS_HISTORY,
  GET_LAST_SHIELDED_COINS_BY_TOKEN,
  GET_SHIELDED_COINS,
  GET_SHIELDED_COIN_EVOLUTION,
  GET_SHIELDED_COIN_USD_EVOLUTION, GET_TOTAL_SHIELDED_COIN,
  GET_SHIELDED_COIN_OVERVIEW
} from 'src/actions/shieldedCoinsActions';

const initialState = {
  shieldedCoinsHistory: [],
  historyCount: 0,
  lastShieldedCoinsHistory: [],
  shieldedCoin: [],
  shieldedCoinByToken: {
    byId: {}
  },
  shieldedCoinByTokenCount: 0,
  shieldedCoinEvolution: {
    byId: {}
  },
  shieldedCoinUsdEvolution: {
    byId: {}
  },
  shieldedCoinOverview: {
    byId: {}
  }
};

const shieldedCoinReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHIELDED_COINS_HISTORY: {
      const { result, count } = action.payload;

      return produce(state, (draft) => {
        draft.shieldedCoinsHistory = result;
        draft.historyCount = count;
      });
    }

    case GET_LAST_SHIELDED_COINS_HISTORY: {
      const history = action.payload;

      return produce(state, (draft) => {
        draft.lastShieldedCoinsHistory = history;
      });
    }

    case GET_LAST_SHIELDED_COINS_BY_TOKEN: {
      const { shieldedCoins, count, token } = action.payload;

      return produce(state, (draft) => {
        draft.shieldedCoinByToken.byId[token] = shieldedCoins;
        draft.shieldedCoinByTokenCount = count;
      });
    }

    case GET_SHIELDED_COINS: {
      const coins = action.payload;

      return produce(state, (draft) => {
        draft.shieldedCoin = coins;
      });
    }

    case GET_SHIELDED_COIN_EVOLUTION: {
      const { token, evolution } = action.payload;

      return produce(state, (draft) => {
        draft.shieldedCoinEvolution.byId[`${token}`] = evolution;
      });
    }

    case GET_SHIELDED_COIN_USD_EVOLUTION: {
      const { token, evolution } = action.payload;

      return produce(state, (draft) => {
        draft.shieldedCoinUsdEvolution.byId[`${token}`] = evolution;
      });
    }

    case GET_TOTAL_SHIELDED_COIN: {
      const { total } = action.payload;
      return produce(state, (draft) => {
        draft.totalShielded = total;
      });
    }

    case GET_SHIELDED_COIN_OVERVIEW: {
      const { token, overview } = action.payload;
      return produce(state, (draft) => {
        draft.shieldedCoinOverview.byId[`${token}`] = overview;
      });
    }

    default: {
      return state;
    }
  }
};

export default shieldedCoinReducer;

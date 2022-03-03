/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_CUSTOM_CANDLES, GET_CUSTOM_LIQUIDITY, GET_CUSTOM_VOLUMES
} from 'src/actions/candlesActions';

const initialState = {
  candles: {
    byId: {}
  },
  liquidity: {
    byId: {}
  },
  volumes: {
    byId: {}
  }
};

const blockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOM_CANDLES: {
      const { pair, granularity, candles } = action.payload;

      return produce(state, (draft) => {
        draft.candles.byId[`${pair}-${granularity}`] = candles;
      });
    }

    case GET_CUSTOM_VOLUMES: {
      const { pair, granularity, volumes } = action.payload;

      return produce(state, (draft) => {
        draft.volumes.byId[`${pair}-${granularity}`] = volumes;
      });
    }

    case GET_CUSTOM_LIQUIDITY: {
      const {
        pair, currency, granularity, liquidity
      } = action.payload;

      return produce(state, (draft) => {
        draft.liquidity.byId[`${pair}-${currency}-${granularity}`] = liquidity;
      });
    }

    default: {
      return state;
    }
  }
};

export default blockReducer;

/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_CANDLES, GET_LIQUIDITY, GET_VOLUMES, GET_VOLUMES_WITHOUT_CROSS_POOL
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
  },
  volumesWithoutCrossPool: {
    byId: {}
  }
};

const blockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CANDLES: {
      const { pair, granularity, candles } = action.payload;

      return produce(state, (draft) => {
        draft.candles.byId[`${pair}-${granularity}`] = candles;
      });
    }

    case GET_VOLUMES: {
      const { pair, granularity, volumes } = action.payload;

      return produce(state, (draft) => {
        draft.volumes.byId[`${pair}-${granularity}`] = volumes;
      });
    }

    case GET_VOLUMES_WITHOUT_CROSS_POOL: {
      const { pair, granularity, volumes } = action.payload;

      return produce(state, (draft) => {
        draft.volumesWithoutCrossPool.byId[`${pair}-${granularity}`] = volumes;
      });
    }

    case GET_LIQUIDITY: {
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

/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_TRANSACTIONS_STATS,
  GET_SHARD_BLOCKS_STATS
} from 'src/actions/globalStatsActions';

const initialState = {
  stats: {}
};

const statReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_STATS: {
      const stats = action.payload;

      return produce(state, (draft) => {
        draft.stats.lastHourTransactionCount = stats.lastHourTransactionCount;
      });
    }

    case GET_SHARD_BLOCKS_STATS: {
      const stats = action.payload;

      return produce(state, (draft) => {
        draft.stats.lastHourBlockCount = stats.lastHourBlockCount;
      });
    }

    default: {
      return state;
    }
  }
};

export default statReducer;

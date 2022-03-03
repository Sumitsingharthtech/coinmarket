/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_PRIVACY_COIN_TOTAL_STAKED,
  GET_PRIVACY_COIN_TOTAL_SUPPLY,
  GET_PRIVACY_COIN_TOTAL_LOCKED_IN_PDEX
} from 'src/actions/privacyCoinSupplyActions';

const initialState = {
  totalSupply: {
    byId: {}
  },
  totalStaked: {
    byId: {}
  },
  totalLockedInPDex: {
    byId: {}
  }
};

const privacyCoinSupplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRIVACY_COIN_TOTAL_SUPPLY: {
      const { granularity, data } = action.payload;

      return produce(state, (draft) => {
        draft.totalSupply.byId[granularity] = data;
      });
    }

    case GET_PRIVACY_COIN_TOTAL_STAKED: {
      const { granularity, data } = action.payload;

      return produce(state, (draft) => {
        draft.totalStaked.byId[granularity] = data;
      });
    }

    case GET_PRIVACY_COIN_TOTAL_LOCKED_IN_PDEX: {
      const { granularity, data } = action.payload;

      return produce(state, (draft) => {
        draft.totalLockedInPDex.byId[granularity] = data;
      });
    }

    default: {
      return state;
    }
  }
};

export default privacyCoinSupplyReducer;

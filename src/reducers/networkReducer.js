/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_STAKING_NODES_EVOLUTION,
  GET_LAST_STAKING_NODES_HISTORY,
  GET_TOTAL_STAKING_NODES,
  GET_CURRENT_COMMITTEES
} from 'src/actions/networkActions';

const initialState = {
  lastStakingNodeHistory: [],
  stakingNodeEvolution: [],
  lastStakingNodeHistoryCount: 0,
  currentCommittees: []
};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LAST_STAKING_NODES_HISTORY: {
      const { result, count } = action.payload;

      return produce(state, (draft) => {
        draft.lastStakingNodeHistory = result;
        draft.lastStakingNodeHistoryCount = count;
      });
    }

    case GET_STAKING_NODES_EVOLUTION: {
      const evolution = action.payload;

      return produce(state, (draft) => {
        draft.stakingNodeEvolution = evolution;
      });
    }

    case GET_TOTAL_STAKING_NODES: {
      const { total } = action.payload;

      return produce(state, (draft) => {
        draft.totalStakingNodes = total;
      });
    }

    case GET_CURRENT_COMMITTEES: {
      const { total } = action.payload;

      return produce(state, (draft) => {
        draft.currentCommittees = total;
      });
    }

    default: {
      return state;
    }
  }
};

export default networkReducer;

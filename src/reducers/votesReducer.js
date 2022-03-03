/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_LATEST_VOTES,
  GET_OVERVIEW_VOTES,
  GET_COINS_RANK_VOTES,
  GET_PAIRS_RANK_VOTES
} from 'src/actions/voteActions';

const initialState = {
  latest: {},
  overview: {},
  coinsRank: [],
  pairsRank: []
};

const votesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LATEST_VOTES: {
      return produce(state, (draft) => {
        draft.latest.value = action.payload;
      });
    }

    case GET_OVERVIEW_VOTES: {
      return produce(state, (draft) => {
        draft.overview.value = action.payload;
      });
    }

    case GET_COINS_RANK_VOTES: {
      return produce(state, (draft) => {
        draft.coinsRank = action.payload;
      });
    }

    case GET_PAIRS_RANK_VOTES: {
      return produce(state, (draft) => {
        draft.pairsRank = action.payload;
      });
    }

    default: {
      return state;
    }
  }
};

export default votesReducer;

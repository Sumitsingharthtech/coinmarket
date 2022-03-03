/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import {
  GET_BLOCKCHAIN, GET_BLOCKCHAIN_OVERVIEW, GET_TOKENS, GET_CUSTOM_TOKENS
} from 'src/actions/blockchainActions';
import objFromArray from '../utils/objFromArray';
import { GET_CUSTOM_TOKEN } from '../actions/blockchainActions';

const initialState = {
  blockchain: {},
  tokens: {
    byId: {},
    byTokenId: {},
    allIds: {}
  },
  customTokens: {
    byTokenId: {},
    allIds: [],
    allVerifiedIds: [],
    allVerified: []
  },
  completeCustomTokens: {
    byTokenId: {}
  },
  overview: {}
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOCKCHAIN: {
      const blockchain = action.payload;

      return produce(state, (draft) => {
        draft.blockchain = blockchain;
      });
    }

    case GET_BLOCKCHAIN_OVERVIEW: {
      const blockchain = action.payload;
      return produce(state, (draft) => {
        draft.overview = blockchain;
      });
    }

    case GET_TOKENS: {
      const tokens = action.payload;
      return produce(state, (draft) => {
        draft.tokens.byId = objFromArray(tokens, 'pSymbol');
        draft.tokens.byTokenId = objFromArray(tokens, 'tokenId');
        draft.tokens.allIds = Object.keys(draft.tokens.byId);
      });
    }

    case GET_CUSTOM_TOKENS: {
      const tokens = action.payload;
      return produce(state, (draft) => {
        draft.customTokens.byTokenId = objFromArray(tokens, 'tokenId');
        draft.customTokens.allIds = Object.keys(draft.customTokens.byTokenId);
        draft.customTokens.allVerifiedIds = _.map(_.sortBy(_.filter(tokens, (token) => token.verified), ['name']), (token) => token.tokenId);
        draft.customTokens.allVerified = _.filter(tokens, (token) => token.verified);
      });
    }

    case GET_CUSTOM_TOKEN: {
      const { id, token } = action.payload;
      return produce(state, (draft) => {
        draft.completeCustomTokens.byTokenId[id] = token;
      });
    }

    default: {
      return state;
    }
  }
};

export default blockchainReducer;

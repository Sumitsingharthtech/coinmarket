/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_LAST_TRANSACTIONS,
  GET_COMPLETE_TRANSACTION,
  GET_COMPLETE_MEMPOOL_TRANSACTION,
  GET_TRANSACTIONS,
  GET_MEMPOOL, GET_TRANSACTIONS_BY_SHARD_AND_HEIGHT
} from 'src/actions/transactionActions';
import objFromArray from 'src/utils/objFromArray';

const initialState = {
  transactions: {
    byId: {},
    allIds: []
  },
  transactionsCount: 0,
  completeTransactions: {
    byId: {}
  },
  completeMempoolTransactions: {
    byId: {}
  },
  lastTransactions: {
    byId: {},
    allIds: []
  },
  mempool: {
    byId: {},
    allIds: []
  },
  transactionsByShardHeight: {
    byId: {}
  }
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LAST_TRANSACTIONS: {
      const transactions = action.payload;

      return produce(state, (draft) => {
        draft.lastTransactions.byId = objFromArray(transactions, 'hash');
        draft.lastTransactions.allIds = Object.keys(draft.lastTransactions.byId);
      });
    }

    case GET_TRANSACTIONS: {
      const { result, count } = action.payload;

      return produce(state, (draft) => {
        draft.transactions.byId = objFromArray(result, 'hash');
        draft.transactions.allIds = Object.keys(draft.transactions.byId);
        draft.transactionsCount = count;
      });
    }

    case GET_TRANSACTIONS_BY_SHARD_AND_HEIGHT: {
      const { transactions, shard, height } = action.payload;

      return produce(state, (draft) => {
        draft.transactionsByShardHeight.byId[`${shard}-${height}`] = transactions;
      });
    }

    case GET_COMPLETE_TRANSACTION: {
      const transaction = action.payload;
      return produce(state, (draft) => {
        draft.completeTransactions.byId[transaction.hash] = transaction;
      });
    }

    case GET_COMPLETE_MEMPOOL_TRANSACTION: {
      const transaction = action.payload;
      return produce(state, (draft) => {
        draft.completeMempoolTransactions.byId[transaction.hash] = transaction;
      });
    }

    case GET_MEMPOOL: {
      const transactions = action.payload;

      return produce(state, (draft) => {
        draft.mempool.byId = objFromArray(transactions, 'hash');
        draft.mempool.allIds = Object.keys(draft.mempool.byId);
      });
    }

    default: {
      return state;
    }
  }
};

export default transactionReducer;

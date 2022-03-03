import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_LAST_TRANSACTIONS = '@blockchain/get-last-transactions';
export const GET_TRANSACTIONS = '@blockchain/get-transactions';
export const GET_TRANSACTIONS_BY_SHARD_AND_HEIGHT = '@blockchain/get-transactions-by-shard-and-height';
export const GET_COMPLETE_TRANSACTION = '@blockchain/get-complete-transaction';
export const GET_COMPLETE_MEMPOOL_TRANSACTION = '@blockchain/get-complete-mempool-transaction';
export const GET_MEMPOOL = '@blockchain/get-mempool';

export function getLastTransactions() {
  const request = axios.get(`${API.BASE_URL}/blockchain/transactions?limit=10`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_LAST_TRANSACTIONS,
      payload: response.data.result
    }));
  };
}

export function getTransactions(limit, offset, shardId, from, to, type, metadataType) {
  let url = `${API.BASE_URL}/blockchain/transactions?limit=${limit}&offset=${offset}`;
  if (shardId) {
    url += `&shard=${shardId}`;
  }
  if (from) {
    url += `&from=${from.unix()}`;
  }
  if (to) {
    url += `&to=${to.unix()}`;
  }
  if (type) {
    url += `&type=${type}`;
  }
  if (metadataType) {
    url += `&metadataType=${metadataType}`;
  }
  const request = axios.get(url);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_TRANSACTIONS,
      payload: response.data
    }));
  };
}

export function getTransactionsByShardAndHeight(shard, height) {
  const request = axios.get(`${API.BASE_URL}/blockchain/transactions?shard=${shard}&height=${height}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_TRANSACTIONS_BY_SHARD_AND_HEIGHT,
      payload: { transactions: response.data.result, shard, height }
    }));
  };
}

export function getCompleteTransaction(hash) {
  const request = axios.get(`${API.BASE_URL}/blockchain/transactions/${hash}`);

  return (dispatch) => {
    request.then((response) => {
      if (response.data === {}) {
        return;
      }
      return dispatch({
        type: GET_COMPLETE_TRANSACTION,
        payload: response.data
      });
    });
  };
}

export function getCompleteMempoolTransaction(hash) {
  const request = axios.get(`${API.BASE_URL}/blockchain/mempool-transactions/${hash}`);

  return (dispatch) => {
    request.then((response) => {
      if (response.data === {}) {
        return;
      }
      return dispatch({
        type: GET_COMPLETE_MEMPOOL_TRANSACTION,
        payload: response.data
      });
    });
  };
}

export function getMempoolTransactions() {
  const request = axios.get(`${API.BASE_URL}/blockchain/mempool`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_MEMPOOL,
      payload: response.data
    }));
  };
}

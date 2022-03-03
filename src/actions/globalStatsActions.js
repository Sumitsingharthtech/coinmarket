import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_TRANSACTIONS_STATS = '@stats/get-transactions-stats';
export const GET_SHARD_BLOCKS_STATS = '@stats/get-shard-blocks-stats';

export function getShardBlocksStats() {
  const request = axios.get(`${API.BASE_URL}/stats/shard-blocks/3600`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHARD_BLOCKS_STATS,
      payload: response.data
    }));
  };
}

export function getTransactionsStats() {
  const request = axios.get(`${API.BASE_URL}/stats/transactions/3600`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_TRANSACTIONS_STATS,
      payload: response.data
    }));
  };
}

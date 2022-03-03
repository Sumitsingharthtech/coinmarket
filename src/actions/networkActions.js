import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_STAKING_NODES_EVOLUTION = '@network/get-staking-nodes-evolutions';
export const GET_LAST_STAKING_NODES_HISTORY = '@network/get-last-staking-nodes-history';
export const GET_TOTAL_STAKING_NODES = '@network/get-total-staking-nodes';
export const GET_CURRENT_COMMITTEES = '@network/get-current-committees';

export function getLastStakingNodesHistory(limit, offset) {
  const request = axios.get(`${API.BASE_URL}/network/staking-nodes/history?limit=${limit}&offset=${offset}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_LAST_STAKING_NODES_HISTORY,
      payload: response.data
    }));
  };
}

export function getStakingNodesEvolution(start, end) {
  const request = axios.get(`${API.BASE_URL}/network/staking-nodes/evolution?start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_STAKING_NODES_EVOLUTION,
      payload: response.data
    }));
  };
}

export function getTotalStakingNodes() {
  const request = axios.get(`${API.BASE_URL}/network/staking-nodes/total`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_TOTAL_STAKING_NODES,
      payload: response.data
    }));
  };
}

export function getCurrentCommittees() {
  const request = axios.get(`${API.BASE_URL}/network/current-committees`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CURRENT_COMMITTEES,
      payload: response.data
    }));
  };
}

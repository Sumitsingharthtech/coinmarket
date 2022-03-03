import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_BEACON_BLOCKS = '@blockchain/get-beacon-blocks';
export const GET_BEACON_BLOCK = '@blockchain/get-beacon-block';
export const GET_SHARD_BLOCKS = '@blockchain/get-shard-blocks';
export const GET_SHARD_BLOCK = '@blockchain/get-shard-block';
export const GET_SHARD_BLOCKS_BY_BEACON_HEIGHT = '@blockchain/get-shard-blocks-by-beacon-height';

export function getBeaconBlocks(limit, offset) {
  const request = axios.get(`${API.BASE_URL}/blockchain/beacon-blocks?limit=${limit}&offset=${offset}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_BEACON_BLOCKS,
      payload: response.data
    }));
  };
}

export function getShardBlocks(limit, offset) {
  const request = axios.get(`${API.BASE_URL}/blockchain/shard-blocks?limit=${limit}&offset=${offset}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHARD_BLOCKS,
      payload: response.data
    }));
  };
}

export function getShardBlocksByBeaconHeight(beaconHeight) {
  const request = axios.get(`${API.BASE_URL}/blockchain/shard-blocks?beaconHeight=${beaconHeight}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHARD_BLOCKS_BY_BEACON_HEIGHT,
      payload: { blocks: response.data.result, beaconHeight }
    }));
  };
}

export function getBeaconBlock(hash) {
  const request = axios.get(`${API.BASE_URL}/blockchain/beacon-blocks/${hash}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_BEACON_BLOCK,
      payload: response.data
    }));
  };
}

export function getShardBlock(hash) {
  const request = axios.get(`${API.BASE_URL}/blockchain/shard-blocks/${hash}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHARD_BLOCK,
      payload: response.data
    }));
  };
}

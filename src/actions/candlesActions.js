import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_CANDLES = '@pdex/get-candles';
export const GET_LIQUIDITY = '@pdex/get-liquidity';
export const GET_VOLUMES = '@pdex/get-volumes';
export const GET_VOLUMES_WITHOUT_CROSS_POOL = '@pdex/get-volumes-without-cross-pool';
export const GET_CUSTOM_CANDLES = '@pdex/get-custom-candles';
export const GET_CUSTOM_LIQUIDITY = '@pdex/get-custom-liquidity';
export const GET_CUSTOM_VOLUMES = '@pdex/get-custom-volumes';

export function getCandles(pair, granularity, start, end, reversedMode) {
  const request = axios.get(`${API.BASE_URL}/pdex/candles/${pair}?granularity=${granularity}&start=${start}&end=${end}&reversed=${reversedMode}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CANDLES,
      payload: {
        pair,
        granularity,
        candles: response.data
      }
    }));
  };
}

export function getCrossPoolCandles(pair, granularity, start, end, reversedMode) {
  const request = axios.get(`${API.BASE_URL}/pdex/cross-pool-candles/${pair}?granularity=${granularity}&start=${start}&end=${end}&reversed=${reversedMode}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CANDLES,
      payload: {
        pair,
        granularity,
        candles: response.data
      }
    }));
  };
}

export function getCustomCandles(pair, granularity, start, end, reversedMode) {
  const request = axios.get(`${API.BASE_URL}/pdex/candles-custom/${pair}?granularity=${granularity}&start=${start}&end=${end}&reversed=${reversedMode}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CUSTOM_CANDLES,
      payload: {
        pair,
        granularity,
        candles: response.data
      }
    }));
  };
}

export function getCustomCrossPoolCandles(pair, granularity, start, end, reversedMode) {
  const request = axios.get(`${API.BASE_URL}/pdex/candles-custom-cross-pool/${pair}?granularity=${granularity}&start=${start}&end=${end}&reversed=${reversedMode}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CUSTOM_CANDLES,
      payload: {
        pair,
        granularity,
        candles: response.data
      }
    }));
  };
}


export function getVolumes(pair, granularity, start, end, reversedMode) {
  const request = axios.get(`${API.BASE_URL}/pdex/volumes/${pair}?granularity=${granularity}&start=${start}&end=${end}&reversed=${reversedMode}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_VOLUMES,
      payload: {
        pair,
        granularity,
        volumes: response.data
      }
    }));
  };
}

export function getVolumesWithoutCrossPool(pair, granularity, start, end, reversedMode) {
  const request = axios.get(`${API.BASE_URL}/pdex/volumes-without-cross-pool/${pair}?granularity=${granularity}&start=${start}&end=${end}&reversed=${reversedMode}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_VOLUMES_WITHOUT_CROSS_POOL,
      payload: {
        pair,
        granularity,
        volumes: response.data
      }
    }));
  };
}

export function getCrossPoolVolumes(pair, granularity, start, end, reversedMode) {
  const request = axios.get(`${API.BASE_URL}/pdex/cross-pool-volumes/${pair}?granularity=${granularity}&start=${start}&end=${end}&reversed=${reversedMode}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_VOLUMES,
      payload: {
        pair,
        granularity,
        volumes: response.data
      }
    }));
  };
}

export function getCustomVolumes(pair, granularity, start, end, reversedMode) {
  const request = axios.get(`${API.BASE_URL}/pdex/volumes-custom/${pair}?granularity=${granularity}&start=${start}&end=${end}&reversed=${reversedMode}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CUSTOM_VOLUMES,
      payload: {
        pair,
        granularity,
        volumes: response.data
      }
    }));
  };
}

export function getCustomCrossPoolVolumes(pair, granularity, start, end, reversedMode) {
  const request = axios.get(`${API.BASE_URL}/pdex/volumes-custom-cross-pool/${pair}?granularity=${granularity}&start=${start}&end=${end}&reversed=${reversedMode}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CUSTOM_VOLUMES,
      payload: {
        pair,
        granularity,
        volumes: response.data
      }
    }));
  };
}

export function getLiquidity(pair, currency, granularity, start, end) {
  const request = axios.get(`${API.BASE_URL}/pdex/liquidity/${pair}/${currency}?granularity=${granularity}&start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_LIQUIDITY,
      payload: {
        pair,
        currency,
        granularity,
        liquidity: response.data
      }
    }));
  };
}

export function getCustomLiquidity(pair, currency, granularity, start, end) {
  const request = axios.get(`${API.BASE_URL}/pdex/liquidity-custom/${pair}/${currency}?granularity=${granularity}&start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CUSTOM_LIQUIDITY,
      payload: {
        pair,
        currency,
        granularity,
        liquidity: response.data
      }
    }));
  };
}

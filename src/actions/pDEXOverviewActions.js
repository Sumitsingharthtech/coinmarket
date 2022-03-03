import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_PDEX_OVERVIEW = '@pdex/get-overview';
export const GET_PDEX_AGGREGATED_USD_VOLUMES = '@pdex/get-aggregated-usd-volumes';
export const GET_PDEX_AGGREGATED_USD_SIMPLE_VOLUMES = '@pdex/get-aggregated-usd-simple-volumes';
export const GET_PDEX_AGGREGATED_USD_LIQUIDITY = '@pdex/get-aggregated-usd-liquidity';
export const GET_PDEX_TOTAL_VOLUME = '@pdex/get-total-volume';
export const GET_PDEX_TOTAL_24H_VOLUME = '@pdex/get-total-24h-volume';
export const GET_PDEX_TOTAL_LIQUIDITY = '@pdex/get-total-liquidity';
export const GET_PDEX_TOTAL_LIQUIDITY_WITH_PKYBER = '@pdex/get-total-liquidity-with-pkyber';
export const GET_PDEX_PAIR_SUMMARY = '@pdex/get-custom-pair-summary';

export function getPDEXOverview() {
  const request = axios.get(`${API.BASE_URL}/pdex/overview`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PDEX_OVERVIEW,
      payload: response.data
    }));
  };
}

export function getPDEXTotalVolume() {
  const request = axios.get(`${API.BASE_URL}/pdex/total-volume`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PDEX_TOTAL_VOLUME,
      payload: response.data
    }));
  };
}

export function getPDEXTotal24hVolume() {
  const request = axios.get(`${API.BASE_URL}/pdex/total-24h-volume`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PDEX_TOTAL_24H_VOLUME,
      payload: response.data
    }));
  };
}

export function getPDEXTotalLiquidity() {
  const request = axios.get(`${API.BASE_URL}/pdex/total-liquidity`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PDEX_TOTAL_LIQUIDITY,
      payload: response.data
    }));
  };
}

export function getPDEXTotalLiquidityWithPKyber() {
  const request = axios.get(`${API.BASE_URL}/pdex/total-liquidity-with-external-dexes`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PDEX_TOTAL_LIQUIDITY_WITH_PKYBER,
      payload: response.data
    }));
  };
}

export function getPDEXAggregatedUsdVolumes(start, end) {
  const request = axios.get(`${API.BASE_URL}/pdex/usd-volumes?start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PDEX_AGGREGATED_USD_VOLUMES,
      payload: response.data
    }));
  };
}

export function getPDEXAggregatedUsdSimpleVolumes(start, end) {
  const request = axios.get(`${API.BASE_URL}/pdex/usd-simple-volumes?start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PDEX_AGGREGATED_USD_SIMPLE_VOLUMES,
      payload: response.data
    }));
  };
}

export function getPDEXAggregatedUsdLiquidity(start, end) {
  const request = axios.get(`${API.BASE_URL}/pdex/usd-liquidity?start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PDEX_AGGREGATED_USD_LIQUIDITY,
      payload: response.data
    }));
  };
}

export function getPairSummary(pair, custom, customTokenId1, customTokenId2) {
  let url = `${API.BASE_URL}/pdex/pair-summary/${pair}?custom=${custom}`;
  if (customTokenId1) {
    url += `&customId1=${customTokenId1}`;
  }
  if (customTokenId2) {
    url += `&customId2=${customTokenId2}`;
  }
  const request = axios.get(url);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PDEX_PAIR_SUMMARY,
      payload: response.data
    }));
  };
}

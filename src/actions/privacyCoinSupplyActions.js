import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_PRIVACY_COIN_TOTAL_SUPPLY = '@privacy-coin/get-total-supply';
export const GET_PRIVACY_COIN_TOTAL_STAKED = '@privacy-coin/get-total-staked';
export const GET_PRIVACY_COIN_TOTAL_LOCKED_IN_PDEX = '@privacy-coin/get-total-locked-in-pdex';

export function getPrivacyCoinTotalSupply(granularity, start, end) {
  const request = axios.get(`${API.BASE_URL}/privacy-coin/total-supply?granularity=${granularity}&start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PRIVACY_COIN_TOTAL_SUPPLY,
      payload: { granularity, data: response.data }
    }));
  };
}

export function getPrivacyCoinTotalStaked(granularity, start, end) {
  const request = axios.get(`${API.BASE_URL}/privacy-coin/total-staked?granularity=${granularity}&start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PRIVACY_COIN_TOTAL_STAKED,
      payload: { granularity, data: response.data }
    }));
  };
}

export function getPrivacyCoinTotalLockedInPDEX(granularity, start, end) {
  const request = axios.get(`${API.BASE_URL}/privacy-coin/total-locked-in-pdex?granularity=${granularity}&start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PRIVACY_COIN_TOTAL_LOCKED_IN_PDEX,
      payload: { granularity, data: response.data }
    }));
  };
}

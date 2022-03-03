import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_LATEST_VOTES = '@vote/get-latest';
export const GET_OVERVIEW_VOTES = '@vote/get-overview';
export const GET_COINS_RANK_VOTES = '@vote/get-coins-rank';
export const GET_PAIRS_RANK_VOTES = '@vote/get-pairs-rank';

export function getLatestVotes(year, month, limit, offset) {
  const request = axios.get(`${API.BASE_URL}/incscan-votes/latest?limit=${limit}&offset=${offset}&year=${year}&month=${month}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_LATEST_VOTES,
      payload: response.data
    }));
  };
}

export function getAllTimeVotes(limit, offset) {
  const request = axios.get(`${API.BASE_URL}/incscan-votes/latest?limit=${limit}&offset=${offset}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_LATEST_VOTES,
      payload: response.data
    }));
  };
}


export function getOverviewVotes(year, month) {
  const request = axios.get(`${API.BASE_URL}/incscan-votes/overview?year=${year}&month=${month}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_OVERVIEW_VOTES,
      payload: response.data
    }));
  };
}

export function getOverviewAllTimeVotes() {
  const request = axios.get(`${API.BASE_URL}/incscan-votes/overview`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_OVERVIEW_VOTES,
      payload: response.data
    }));
  };
}


export function getCoinsRankVote(year, month) {
  const request = axios.get(`${API.BASE_URL}/incscan-votes/coins-rank?year=${year}&month=${month}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_COINS_RANK_VOTES,
      payload: response.data.topCoins
    }));
  };
}

export function getAllTimeCoinsRankVote() {
  const request = axios.get(`${API.BASE_URL}/incscan-votes/coins-rank`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_COINS_RANK_VOTES,
      payload: response.data.topCoins
    }));
  };
}

export function getPairsRankVote(year, month) {
  const request = axios.get(`${API.BASE_URL}/incscan-votes/pairs-rank?year=${year}&month=${month}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PAIRS_RANK_VOTES,
      payload: response.data.topPairs
    }));
  };
}

export function getAllTimePairsRankVote() {
  const request = axios.get(`${API.BASE_URL}/incscan-votes/pairs-rank`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PAIRS_RANK_VOTES,
      payload: response.data.topPairs
    }));
  };
}

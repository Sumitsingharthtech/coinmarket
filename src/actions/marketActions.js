import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_MARKET = '@market/get-market';

export function getMarket() {
  const request = axios.get(`${API.BASE_URL}/pdex/market`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_MARKET,
      payload: response.data
    }));
  };
}

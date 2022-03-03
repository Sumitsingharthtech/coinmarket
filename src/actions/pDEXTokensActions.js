import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_PDEX_TOKENS = '@pdex/get-tokens';

export function getPDEXTokens() {
  const request = axios.get(`${API.BASE_URL}/pdex/tokens`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PDEX_TOKENS,
      payload: response.data
    }));
  };
}

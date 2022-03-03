export const WEB_ACCOUNT_CONNECTED = '@web-account/connected';
export const WEB_ACCOUNT_DISCONNECTED = '@web-account/disconnected';

export function webAccountConnected(account) {
  return (dispatch) => {
    dispatch({
      type: WEB_ACCOUNT_CONNECTED,
      payload: account
    });
  };
}

export function webAccountDisconnected() {
  return (dispatch) => {
    dispatch({
      type: WEB_ACCOUNT_DISCONNECTED
    });
  };
}

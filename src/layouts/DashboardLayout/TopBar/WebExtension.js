import _ from 'lodash';
import React, { useEffect } from 'react';
import {
  IconButton,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import webSDK from 'incognito-extension-sdk';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { webAccountConnected, webAccountDisconnected } from '../../../actions/webAccountActions';
import { addNotification } from '../../../actions/notificationActions';


const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 500,
    maxWidth: '100%'
  },
  walletButton: {
    color: theme.topBarColor
  }
}));

const EXTENSION_CONSTANTS = webSDK.RECEIVE_ACTIONS_NAME;
const EXTENSION_EVENT = {
  CONNECT_TO_ACCOUNT_SUCCESS: EXTENSION_CONSTANTS.CONNECT_TO_ACCOUNT_SUCCESS,
  CONNECT_TO_ACCOUNT_ERROR: EXTENSION_CONSTANTS.CONNECT_TO_ACCOUNT_ERROR,
  DISCONNECT_ACCOUNT: EXTENSION_CONSTANTS.DISCONNECT_ACCOUNT,
  SEND_TX_FINISH: EXTENSION_CONSTANTS.SEND_TX_FINISH,
  CANCEL_SEND_TX: EXTENSION_CONSTANTS.CANCEL_SEND_TX,
};

const onExtensionEvent = (actionName, data, dispatch) => {
  switch (actionName) {
    case EXTENSION_EVENT.CONNECT_TO_ACCOUNT_SUCCESS: {
      dispatch(webAccountConnected(data));
      break;
    }
    case EXTENSION_EVENT.DISCONNECT_ACCOUNT: {
      // Todo: handle when account disconnected
      dispatch(webAccountDisconnected(data));
      break;
    }
    // request send transaction finish
    case EXTENSION_EVENT.SEND_TX_FINISH: {
      // if error === null, request send transaction success with data `txInfo` and and vice versa.
      const { error, txInfo } = data;
      if (!error) {
        dispatch(addNotification('Thanks for your vote!', `${txInfo.amount} ${txInfo.symbol} sent`));
      }
      break;
    }
    case EXTENSION_EVENT.CANCEL_SEND_TX: {
      break;
    }
    default: {
      break;
    }
  }
};

const connectAccount = async () => {
  const account = await webSDK.checkConnectAccount();
  if (!account) {
    await webSDK.connectAccount();
  }
};

const incscanBalance = (account) => {
  const incscan = _.find(account.tokens, (token) => token.symbol === 'INCSCAN');
  return incscan ? incscan.amount : 0;
};

function WebExtension() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.webAccount);
  useEffect(() => {
    webSDK.storage.implement({
      setMethod: async (key, data) => localStorage.setItem(key, data),
      getMethod: async (key) => localStorage.getItem(key),
      removeMethod: async (key) => localStorage.removeItem(key),
      namespace: 'INCSCAN_IO',
    });
    setTimeout(async () => {
      webSDK.listenEvent((actionName, data) => {
        onExtensionEvent(actionName, data, dispatch);
      });
      const checkedAccount = await webSDK.checkConnectAccount();
      if (checkedAccount) {
        dispatch(webAccountConnected(checkedAccount));
      }
    }, 1000);
  }, [dispatch]);

  const handleOpen = async () => {
    await connectAccount();
  };

  return (
    <>
      <Tooltip title={account ? `${incscanBalance(account)} INCSCAN available` : 'Connect web extension'}>
        <IconButton
          onClick={handleOpen}
          className={classes.walletButton}
        >
          <AccountBalanceWalletIcon fontSize="small" />
          {account && (
          <Typography>
            {account.name}
          </Typography>
          )}
        </IconButton>
      </Tooltip>
    </>
  );
}

export default WebExtension;

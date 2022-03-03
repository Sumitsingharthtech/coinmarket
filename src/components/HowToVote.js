import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import SDK from 'papp-sdk';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogActions, DialogContent, DialogContentText, makeStyles
} from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useSelector } from 'react-redux';
import webSDK from 'incognito-extension-sdk';
import { VOTE } from '../constants';

const useStyles = makeStyles((theme) => ({
  info: {
    textAlign: 'center'
  },
  qr: {
    marginTop: '10px'
  },
  textArea: {
    ...theme.typography.body1,
    marginTop: '10px',
    backgroundColor: theme.textAreaBg,
    color: theme.palette.text.primary,
    fontSize: 13,
    padding: '5px',
    border: 'none',
    outline: 'none',
    resize: 'none',
    width: '100%'
  },
  value: {
    fontWeight: 'bold'
  },
  webExtension: {
    textAlign: 'center'
  }
}));

const voteAddress = (type) => {
  return type === 'coin'
    ? '12RrfBKahL9sSofvtHCHcyLRS5YcpYS8i5jZr6DrYeBVvyGqhjnKrvuPtY8RC6TfSPYNCP2m8QJTLNL8jFtmmg29d45X3eboEKN8Hnt'
    : '12RvsytDxpm2YAnTwQHsmfTPgX6dFSnEv79eSJCadhrGC2t7Gc9cncaeDWhRcww3w8p2bpVwN5f57f6d21vhwobp5zPVFm5SKda1c5q';
};

function HowToVoteDialog({
  onClose, withWebExtension, onWebExtensionVote, open, type, value
}) {
  const classes = useStyles();

  const handleWebExtensionVote = () => {
    onWebExtensionVote();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        How to vote for
        {` ${value}`}
        ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Send INCSCAN tokens to the address displayed below with a memo containing the value:
          {' '}
          <span className={classes.value}>{value}</span>
        </DialogContentText>
        <div className={classes.info}>
          <img className={classes.qr} src={`/static/${type}_qr.png`} alt="qr code" />
          <TextareaAutosize
            rowsMax={4}
            className={classes.textArea}
            value={voteAddress(type)}
          />
        </div>
        {withWebExtension && <div className={classes.webExtension}>
          <Button autoFocus onClick={handleWebExtensionVote} color="primary">
            Vote with web extension
          </Button>
        </div>}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

HowToVoteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onWebExtensionVote: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  withWebExtension: PropTypes.bool
};

export default function HowToVote({ type, value }) {
  const [open, setOpen] = React.useState(false);
  const { account } = useSelector((state) => state.webAccount);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWebExtensionVote = async () => {
    setOpen(false);
    webSDK.requestSendTx({
      accountName: account.name,
      toAddress: voteAddress(type),
      amount: '1',
      memo: value,
      tokenId: VOTE.INCSCAN_TOKEN_ID
    });
  };

  if (SDK.checkSDKCompatible()) return (<span />);

  return (
    <span>
      <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
        Vote
      </Button>
      <HowToVoteDialog value={value} type={type} open={open} onClose={handleClose} withWebExtension={account !== undefined} onWebExtensionVote={handleWebExtensionVote} />
    </span>
  );
}

HowToVote.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string
};

import { Button } from '@material-ui/core';
import React from 'react';
import pappSDK from 'papp-sdk';
import PropTypes from 'prop-types';
import { VOTE } from '../constants';
import HowToVote from './HowToVote';

function VoteButton({
  type, address, value, count, text
}) {
  const vote = async () => {
    pappSDK.changePrivacyTokenById(VOTE.INCSCAN_TOKEN_ID);
    try {
      await pappSDK.requestSingleSendTx(address, count, value);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  if (!pappSDK.checkSDKCompatible()) {
    return (<HowToVote type={type} value={value} />);
  }
  return (<Button size="small" variant="outlined" color="primary" onClick={() => vote()}>{text}</Button>);
}

VoteButton.propTypes = {
  address: PropTypes.string,
  value: PropTypes.string,
  count: PropTypes.number,
  text: PropTypes.string,
  type: PropTypes.string
};

VoteButton.defaultProps = {
  text: 'Vote'
};

export default VoteButton;

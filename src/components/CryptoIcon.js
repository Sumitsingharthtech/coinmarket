import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginTop: -3,
    width: 20,
    height: 20,
    marginRight: 3,
    verticalAlign: 'middle'
  }
}));

const addDefaultSrc = (ev) => {
  ev.target.src = '/static/default_token_icon.png';
};

const findCustomNyName = (verified, currency) => _.find(verified, (token) => token.symbol === currency);

function CryptoIcon({
  currency,
  customVerifiedByName
}) {
  const classes = useStyles();
  const { customTokens } = useSelector((state) => state.blockchain);
  if (!currency) {
    return (<img alt="" src="/static/default_token_icon.png" className={classes.icon} />);
  }
  if (customTokens.byTokenId[currency]) {
    return (
      <img alt="" onError={addDefaultSrc} src={customTokens.byTokenId[currency].image} className={classes.icon} />
    );
  }
  if (customVerifiedByName && findCustomNyName(customTokens.allVerified, currency)) {
    const token = findCustomNyName(customTokens.allVerified, currency);
    return (
      <img alt="" onError={addDefaultSrc} src={token.image} className={classes.icon} />
    );
  }
  let value = currency.toLowerCase();
  if (value !== 'prv') {
    value = value.slice(1, value.length);
  }
  const url = `https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/${value}@2x.png`;
  return (
    <img alt="" onError={addDefaultSrc} src={url} className={classes.icon} />
  );
}

CryptoIcon.propTypes = {
  currency: PropTypes.string,
  customVerifiedByName: PropTypes.bool
};

export default CryptoIcon;

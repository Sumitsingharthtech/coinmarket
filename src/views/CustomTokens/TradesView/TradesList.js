import React from 'react';
import PropTypes from 'prop-types';
import Label from 'src/components/Label';
import {
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import { useHistory } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import CryptoIcon from '../../../components/CryptoIcon';

const useStyles = makeStyles((theme) => ({
  clickable: {
    cursor: 'pointer'
  },
  link: {
    color: theme.palette.primary
  }
}));

const base = (pair, tokens) => {
  const token = pair.split('-')[0];
  const customToken = _.find(tokens, (token1) => token1.symbol === token);
  if (customToken) {
    return customToken.tokenId;
  }
  return token;
};

const quote = (pair, tokens) => {
  const token = pair.split('-')[1];
  const customToken = _.find(tokens, (token1) => token1.symbol === token);
  if (customToken) {
    return customToken.tokenId;
  }
  return token;
};

function TradesList({
  trades,
  fullVersion,
  showPair
}) {
  const classes = useStyles();
  const history = useHistory();
  const { customTokens } = useSelector((state) => state.blockchain);
  const tokens = customTokens.allVerifiedIds.map((tokenId) => customTokens.byTokenId[tokenId]);
  const onClick = (event, pair) => {
    history.push(`/pdex/markets-custom-token/${pair}`);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            { fullVersion
          && (
          <TableCell>
            Date
          </TableCell>
          )}
            { showPair && (
            <TableCell>
              Pair
            </TableCell>
            ) }
            <TableCell>
              Side
            </TableCell>
            <TableCell>
              Base amount
            </TableCell>
            <TableCell>
              Quote amount
            </TableCell>
            { fullVersion
        && (
        <TableCell>
          Unit price
        </TableCell>
        )}
            { fullVersion
        && <TableCell>Actions</TableCell>}
            { !fullVersion
          && (
          <TableCell>
            Date
          </TableCell>
          )}
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade, index) => (
            <TableRow
              hover
              key={index}
            >
              {fullVersion
          && (
          <TableCell>
            {moment(trade.time).format('YYYY/MM/DD hh:mm:ss A')}
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {moment(trade.time).fromNow()}
            </Typography>
          </TableCell>
          )}
              { showPair && (
              <TableCell>
                <span className={classes.clickable} onClick={(event) => onClick(event, trade.pair)}>{trade.pair}</span>
              </TableCell>
              ) }
              <TableCell>
                { trade.buyOrSell === 'buy' && (
                <Label
                  className={classes.label}
                  color="success"
                >
                  {trade.buyOrSell}
                </Label>
                )}
                { trade.buyOrSell === 'sell' && (
                <Label
                  className={classes.label}
                  color="error"
                >
                  {trade.buyOrSell}
                </Label>
                )}
              </TableCell>
              <TableCell>
                <CryptoIcon currency={base(trade.pair, tokens)} />
                {' '}
                {trade.baseAmount}
              </TableCell>
              <TableCell>
                <CryptoIcon currency={quote(trade.pair, tokens)} />
                {' '}
                {trade.quoteAmount}
              </TableCell>
              { fullVersion && (
              <TableCell>
                <CryptoIcon currency={quote(trade.pair, tokens)} />
                {' '}
                {trade.price}
              </TableCell>
              )}
              { fullVersion && (
              <TableCell>
                <Link href={`/pdex/markets-custom-token/${trade.pair}`} target="_blank"><ExternalLinkIcon className={classes.link} size={16} /></Link>
              </TableCell>
              )}
              { !fullVersion
          && (
          <TableCell>
            <Label
              className={classes.label}
              color="primary"
            >
              {moment(trade.time).utc().fromNow()}
            </Label>
          </TableCell>
          )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TradesList.propTypes = {
  trades: PropTypes.array,
  fullVersion: PropTypes.bool,
  showPair: PropTypes.bool
};

TradesList.defaultProps = {
  showPair: true
};

export default TradesList;

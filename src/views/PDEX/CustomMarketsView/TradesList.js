import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Label from 'src/components/Label';
import {
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import CryptoIcon from '../../../components/CryptoIcon';

const useStyles = makeStyles((theme) => ({
  clickable: {
    cursor: 'pointer'
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
  trades
}) {
  const classes = useStyles();
  const { customTokens } = useSelector((state) => state.blockchain);
  const tokens = customTokens.allVerifiedIds.map((tokenId) => customTokens.byTokenId[tokenId]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Date
            </TableCell>
            <TableCell>
              Side
            </TableCell>
            <TableCell>
              Base amount
            </TableCell>
            <TableCell>
              Quote amount
            </TableCell>
            <TableCell>
              Unit price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade, index) => (
            <TableRow
              hover
              key={index}
            >
              <TableCell>
                {moment(trade.time).format('YYYY/MM/DD hh:mm A')}
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {moment(trade.time).fromNow()}
                </Typography>
              </TableCell>
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
              <TableCell>
                <CryptoIcon currency={quote(trade.pair, tokens)} />
                {' '}
                {trade.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TradesList.propTypes = {
  trades: PropTypes.array
};

export default TradesList;

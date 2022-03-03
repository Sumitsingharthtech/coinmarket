import React from 'react';
import PropTypes from 'prop-types';
import Label from 'src/components/Label';
import {
  makeStyles, Table, TableBody, TableCell, TableRow
} from '@material-ui/core';
import moment from 'moment';
import CryptoIcon from '../../../components/CryptoIcon';

const useStyles = makeStyles((theme) => ({
}));

const base = (pair) => pair.split('-')[0];

const quote = (pair) => pair.split('-')[1];

function TinyTradesList({
  trades
}) {
  const classes = useStyles();

  return (
    <Table>
      <TableBody>
        {trades.map((trade, index) => (
          <TableRow
            hover
            key={index}
          >
            <TableCell size="small">
              <CryptoIcon currency={base(trade.pair)} />
              {' '}
              {trade.baseAmount}
            </TableCell>
            <TableCell size="small">
              <CryptoIcon currency={quote(trade.pair)} />
              {' '}
              {trade.quoteAmount}
            </TableCell>
            <TableCell size="small" align="right">
              <Label
                className={classes.label}
                color={trade.buyOrSell === 'sell' ? 'error' : 'success'}
              >
                {moment(trade.time).fromNow()}
              </Label>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

TinyTradesList.propTypes = {
  trades: PropTypes.array
};

export default TinyTradesList;

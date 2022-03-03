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
import CryptoIcon from '../../../components/CryptoIcon';

const useStyles = makeStyles((theme) => ({
  clickable: {
    cursor: 'pointer'
  },
  failed: {
    textDecoration: 'line-through'
  },
  link: {
    color: theme.palette.primary
  }
}));

const base = (pair) => pair.split('-')[0];

const quote = (pair) => pair.split('-')[1];

function TradesList({
  trades,
  fullVersion,
  showPair,
  failedTrades
}) {
  const classes = useStyles();
  const history = useHistory();

  const onClick = (event, pair) => {
    history.push(`/pdex/markets/${pair}`);
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
            { !fullVersion
            && (
              <TableCell>
                Date
              </TableCell>
            )}
            <TableCell/>
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
                  className={failedTrades ? classes.failed : classes.label}
                  color="success"
                >
                  {trade.buyOrSell}
                </Label>
                )}
                { trade.buyOrSell === 'sell' && (
                <Label
                  className={failedTrades ? classes.failed : classes.label}
                  color="error"
                >
                  {trade.buyOrSell}
                </Label>
                )}
              </TableCell>
              <TableCell>
                <CryptoIcon currency={base(trade.pair)} />
                {' '}
                {trade.baseAmount}
              </TableCell>
              <TableCell>
                <CryptoIcon currency={quote(trade.pair)} />
                {' '}
                {trade.quoteAmount}
              </TableCell>
              { fullVersion && (
              <TableCell>
                <CryptoIcon currency={quote(trade.pair)} />
                {' '}
                {trade.price}
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
              <TableCell>
                {trade.responseTxId && trade.responseTxId !== 'empty' && trade.responseTxId.length > 8 &&
                  <Link href={`/tx/${trade.responseTxId}`} target="_blank"><ExternalLinkIcon className={classes.link} size={16} /></Link>
                }
              </TableCell>
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
  showPair: PropTypes.bool,
  failedTrades: PropTypes.bool
};

TradesList.defaultProps = {
  showPair: true,
  failedTrades: false
};

export default TradesList;

import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from '@material-ui/core';
import moment from 'moment';
import TableContainer from '@material-ui/core/TableContainer';
import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import Link from '@material-ui/core/Link';
import ellipsis from '../../../utils/ellipsis';
import TransactionType from './Type';

const useStyles = makeStyles((theme) => ({
  clickable: {
    cursor: 'pointer'
  },
  link: {
    color: theme.palette.primary
  }
}));

function TransactionList({
  transactions,
  mined
}) {
  const classes = useStyles();
  const history = useHistory();

  const onRowClick = (event, hash) => {
    history.push(`/tx/${hash}`);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            { mined && (
            <TableCell>
              Date
            </TableCell>
            ) }
            <TableCell>
              Hash
            </TableCell>
            <TableCell>
              Height
            </TableCell>
            <TableCell>
              Shard
            </TableCell>
            <TableCell>
              Type
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.allIds.length === 0 && (
          <TableRow>
            <TableCell colSpan={mined ? 6 : 5}>No transaction</TableCell>
          </TableRow>
          )}
          {transactions.allIds.map((transactionHash) => {
            const transaction = transactions.byId[transactionHash];
            return (
              <TableRow
                hover
                key={transaction.hash}
              >
                { mined && (
                <TableCell onClick={(event) => onRowClick(event, transaction.hash)} className={classes.clickable}>
                  {moment(transaction.timestamp).format('YYYY/MM/DD hh:mm:ss A')}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {moment(transaction.timestamp).fromNow()}
                  </Typography>
                </TableCell>
                ) }
                <TableCell onClick={(event) => onRowClick(event, transaction.hash)} className={classes.clickable}>
                  <Typography
                    variant="body2"
                  >
                    {ellipsis(transaction.hash, 8)}
                  </Typography>
                </TableCell>
                <TableCell>
                  {transaction.blockHeight}
                </TableCell>
                <TableCell>
                  {transaction.shard}
                </TableCell>
                <TableCell>
                  <TransactionType type={transaction.type} metadataType={transaction.metadataType} />
                </TableCell>
                <TableCell>
                  <Link href={`/tx/${transaction.hash}`} target="_blank"><ExternalLinkIcon className={classes.link} size={16} /></Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.object,
  mined: PropTypes.bool
};

TransactionList.defaultProps = {
  mined: true
};

export default TransactionList;

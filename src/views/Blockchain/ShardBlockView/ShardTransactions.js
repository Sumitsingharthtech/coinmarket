import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Label from 'src/components/Label';
import {
  Box, Card,
  CardHeader,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import TransactionType from 'src/views/Blockchain/Transaction/Type';
import moment from 'moment';
import clsx from 'clsx';
import ellipsis from '../../../utils/ellipsis';

const useStyles = makeStyles((theme) => ({
  root: {},
  clickable: {
    cursor: 'pointer'
  }
}));

function ShardTransactions({
  className,
  transactions,
  ...rest
}) {
  const classes = useStyles();
  const history = useHistory();

  const onRowClick = (event, hash) => {
    history.push(`/tx/${hash}`);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Transactions"
      />
      <Divider />
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Hash
              </TableCell>
              <TableCell>
                Type
              </TableCell>
              <TableCell>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions && transactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>No transaction</TableCell>
            </TableRow>
            )}
            {transactions && transactions.map((transaction) => (
              <TableRow
                onClick={(event) => onRowClick(event, transaction.hash)}
                hover
                key={transaction.hash}
                className={classes.clickable}
              >
                <TableCell>
                  <Typography
                    variant="body2"
                  >
                    {ellipsis(transaction.hash, 8)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TransactionType type={transaction.type} metadataType={transaction.metadataType} />
                </TableCell>
                <TableCell>
                  <Label
                    className={classes.label}
                    color="primary"
                  >
                    {moment(parseInt(transaction.timestamp)).fromNow()}
                  </Label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}

ShardTransactions.propTypes = {
  transactions: PropTypes.array
};

export default ShardTransactions;

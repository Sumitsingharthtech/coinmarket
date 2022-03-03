import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card, Divider,
  makeStyles, TextField
} from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import TransactionsList from '../Transaction/TransactionsList';
import { usefulMetadataTypes, usefulTypes } from '../Transaction/Type';

const useStyles = makeStyles((theme) => ({
  root: {},
  availabilityField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200
  },
  shardField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    flexBasis: 200
  },
  dateField: {
    marginLeft: theme.spacing(2),
    width: 220
  }
}));

function Results({
  className,
  page,
  limit,
  transactions,
  count,
  shardId,
  from,
  to,
  type,
  metadataType,
  onPageChanged,
  onLimitChanged,
  onShardIdChanged,
  onFromChanged,
  onToChanged,
  onTypeChanged,
  onMetadataTypeChanged,
  ...rest
}) {
  const classes = useStyles();
  const types = usefulTypes();
  const metadataTypes = usefulMetadataTypes();

  const handlePageChange = (event, newPage) => {
    onPageChanged(newPage);
  };

  const handleLimitChange = (event) => {
    onLimitChanged(event.target.value);
  };

  const handleShardIdChanged = (event) => {
    event.persist();
    let value = null;

    if (event.target.value !== 'All') {
      value = event.target.value;
    }
    onShardIdChanged(value);
  };

  const handleFromChanged = (date) => {
    onFromChanged(date);
  };

  const handleToChanged = (date) => {
    onToChanged(date);
  };

  const handleTypeChanged = (event) => {
    event.persist();
    let value = null;

    if (event.target.value !== 'All') {
      value = event.target.value;
    }
    onTypeChanged(value);
  };

  const handleMetadataTypeChanged = (event) => {
    event.persist();
    let value = null;

    if (event.target.value !== 'All') {
      value = event.target.value;
    }
    onMetadataTypeChanged(value);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <Box>
          <Box
            mt={1}
            mb={1}
            display="flex"
            alignItems="center"
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                className={classes.dateField}
                inputVariant="outlined"
                label="From"
                name="from"
                value={from}
                disableFuture
                clearable
                onChange={handleFromChanged}
              />
              <DateTimePicker
                className={classes.dateField}
                inputVariant="outlined"
                label="To"
                name="to"
                value={to}
                disableFuture
                clearable
                onChange={handleToChanged}
              />
            </MuiPickersUtilsProvider>
            <TextField
              className={classes.availabilityField}
              label="Type"
              name="type"
              onChange={handleTypeChanged}
              select
              SelectProps={{ native: true }}
              value={type || 'All'}
              variant="outlined"
            >
              {[{ key: 'All', text: 'All' }].concat(types).map((tokenOption) => (
                <option
                  key={tokenOption.key}
                  value={tokenOption.key}
                >
                  {tokenOption.text}
                </option>
              ))}
            </TextField>
            <TextField
              className={classes.availabilityField}
              label="Metadata type"
              name="metadataType"
              onChange={handleMetadataTypeChanged}
              select
              SelectProps={{ native: true }}
              value={metadataType || 'All'}
              variant="outlined"
            >
              {[{ key: 'All', text: 'All' }].concat(metadataTypes).map((tokenOption) => (
                <option
                  key={tokenOption.key}
                  value={tokenOption.key}
                >
                  {tokenOption.text}
                </option>
              ))}
            </TextField>
            <TextField
              className={classes.shardField}
              label="Shard id"
              name="shardId"
              onChange={handleShardIdChanged}
              select
              SelectProps={{ native: true }}
              value={shardId || 'All'}
              variant="outlined"
            >
              {['All', '0', '1', '2', '3', '4', '5', '6', '7'].map((tokenOption) => (
                <option
                  key={tokenOption}
                  value={tokenOption}
                >
                  {tokenOption}
                </option>
              ))}
            </TextField>
          </Box>
        </Box>
        <Divider />
        <Box>
          <TransactionsList transactions={transactions} />
        </Box>
        <Box>
          <TablePagination
            component="div"
            count={count}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[10, 25, 50, 100]}
            labelRowsPerPage="Rows:"
          />
        </Box>
      </Card>
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  transactions: PropTypes.object,
  onPageChanged: PropTypes.func,
  onLimitChanged: PropTypes.func,
  onShardIdChanged: PropTypes.func,
  onFromChanged: PropTypes.func,
  onToChanged: PropTypes.func,
  onTypeChanged: PropTypes.func,
  onMetadataTypeChanged: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number,
  shardId: PropTypes.string,
  from: PropTypes.object,
  to: PropTypes.object,
  type: PropTypes.string,
  metadataType: PropTypes.string
};

export default Results;

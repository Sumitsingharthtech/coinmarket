import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box, Button,
  Card,
  Divider,
  makeStyles, TextField
} from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TradesList from '../Trade/TradesList';

const useStyles = makeStyles((theme) => ({
  root: {},
  hideField: {
    marginLeft: theme.spacing(1),
    '& > .MuiFormControlLabel-label': {
      fontSize: '0.875rem'
    }
  },
  availabilityField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200
  },
  switchButton: {
    marginLeft: 'auto'
  }
}));

function Results({
  className, page, limit, trades, count, hideSmallTrades, failedTrades, tokens, token, pairs, pair, onPageChanged, onLimitChanged, onHideSmallTradesChanged, onFailedTradesChanged, onTokenChanged, onPairChanged, ...rest
}) {
  const classes = useStyles();

  const handlePageChange = (event, newPage) => {
    onPageChanged(newPage);
  };

  const handleLimitChange = (event) => {
    onLimitChanged(event.target.value);
  };

  const handleHideSmallTradesChanged = (event) => {
    onHideSmallTradesChanged(event.target.checked);
  };

  const handleFailedTradesChanged = () => {
    onFailedTradesChanged(!failedTrades);
  };

  const handleTokenChanged = (event) => {
    event.persist();
    let value = null;

    if (event.target.value !== 'All') {
      value = event.target.value;
    }
    onTokenChanged(value);
  };

  const handlePairChanged = (event) => {
    event.persist();
    let value = null;

    if (event.target.value !== 'All') {
      value = event.target.value;
    }
    onPairChanged(value);
  };

  return (
    <Box
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
            <TextField
              className={classes.availabilityField}
              label="Token"
              name="token"
              onChange={handleTokenChanged}
              select
              SelectProps={{ native: true }}
              value={token || 'All'}
              variant="outlined"
            >
              {[{token: 'All'}].concat(tokens).map((tokenOption) => (
                <option
                  key={tokenOption.token}
                  value={tokenOption.token}
                >
                  {tokenOption.token}
                </option>
              ))}
            </TextField>
            <TextField
              className={classes.availabilityField}
              label="Pair"
              name="pair"
              onChange={handlePairChanged}
              select
              SelectProps={{ native: true }}
              value={pair || 'All'}
              variant="outlined"
            >
              {['All'].concat(pairs).map((tokenOption) => (
                <option
                  key={tokenOption}
                  value={tokenOption}
                >
                  {tokenOption}
                </option>
              ))}
            </TextField>
            <FormControlLabel
              className={classes.hideField}

              control={(
                <Checkbox
                  checked={hideSmallTrades}
                  onChange={handleHideSmallTradesChanged}
                  name="hideSmallTrades"
                />
              )}
              label="Hide small trades"
            />
            <Button onClick={handleFailedTradesChanged} className={classes.switchButton}>
              {`Switch to ${failedTrades ? '' : 'failed '}trades`}
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box>
          <TradesList fullVersion trades={trades} failedTrades={failedTrades} />
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
    </Box>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  trades: PropTypes.array,
  onPageChanged: PropTypes.func,
  onLimitChanged: PropTypes.func,
  onHideSmallTradesChanged: PropTypes.func,
  onFailedTradesChanged: PropTypes.func,
  onTokenChanged: PropTypes.func,
  onPairChanged: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number,
  hideSmallTrades: PropTypes.bool,
  failedTrades: PropTypes.bool,
  token: PropTypes.string,
  tokens: PropTypes.array,
  pair: PropTypes.string,
  pairs: PropTypes.array
};

export default Results;

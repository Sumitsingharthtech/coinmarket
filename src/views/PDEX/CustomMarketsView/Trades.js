import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card, Divider,
  makeStyles
} from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TradesList from './TradesList';

const useStyles = makeStyles((theme) => ({
  root: {},
  hideField: {
    marginLeft: theme.spacing(1),
    '& > .MuiFormControlLabel-label': {
      fontSize: '0.875rem'
    }
  }
}));

function Trades({
  className, page, limit, trades, count, hideSmallTrades, onPageChanged, onLimitChanged, pair, onHideSmallTradesChanged, ...rest
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

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <Box
          display="flex"
          alignItems="center"
        >
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
          <Box flexGrow={1} />
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
        <Divider />
        <Box>
          { trades && <TradesList trades={trades} /> }
        </Box>
      </Card>
    </div>
  );
}

Trades.propTypes = {
  className: PropTypes.string,
  trades: PropTypes.array,
  pair: PropTypes.string,
  onPageChanged: PropTypes.func,
  onLimitChanged: PropTypes.func,
  onHideSmallTradesChanged: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number,
  hideSmallTrades: PropTypes.bool
};

export default Trades;

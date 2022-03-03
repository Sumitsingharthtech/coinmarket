import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  makeStyles
} from '@material-ui/core';
import TokensList from './TokensList';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Results({ className, tokens, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <Box>
          <TokensList tokens={tokens} />
        </Box>
      </Card>
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  tokens: PropTypes.array
};

export default Results;

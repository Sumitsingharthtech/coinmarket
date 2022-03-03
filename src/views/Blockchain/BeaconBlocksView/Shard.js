import React from 'react';
import {
  useSelector
} from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Typography,
  makeStyles
} from '@material-ui/core';
import AttachStorageIcon from '@material-ui/icons/Storage';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  }
}));

function Shard({ className, ...rest }) {
  const classes = useStyles();
  const { blockchain } = useSelector((state) => state.blockchain);

  if (!blockchain.activeShards) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          Active shards
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            variant="h3"
            color="textPrimary"
          >
            {blockchain.activeShards}
          </Typography>
        </Box>
      </Box>
      <Avatar className={classes.avatar}>
        <AttachStorageIcon />
      </Avatar>
    </Card>
  );
}

Shard.propTypes = {
  className: PropTypes.string
};

export default Shard;

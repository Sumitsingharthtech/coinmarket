import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import BarChartIcon from '@material-ui/icons/BarChart';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccessTime from '@material-ui/icons/AccessTime';
import CryptoIcon from '../../../components/CryptoIcon';

const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  pairButton: {
    textTransform: 'none'
  }
}));

const base = (pair) => pair.split('-')[0];

const quote = (pair) => pair.split('-')[1];

function Header({
  className, isCrossPool, pair, pairs, interval, intervals, onPairSelected, onIntervalSelected, ...rest
}) {
  const classes = useStyles();
  const actionRef = useRef(null);
  const action1Ref = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuOpen1, setMenuOpen1] = useState(false);

  const setPair = (value) => {
    setMenuOpen(false);
    onPairSelected(value);
  };

  const setInterval = (value) => {
    setMenuOpen1(false);
    onIntervalSelected(value);
  };

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          <CryptoIcon currency={base(pair)} customVerifiedByName />
          {' '}
          {pair}
          {' '}
          <CryptoIcon currency={quote(pair)} customVerifiedByName />
          {' '}
          {isCrossPool ? 'Cross Pool Market' : 'Market'}
          {/*<VoteButton type="pair" address={VOTE.PAIR_ADDRESS} value={pair} count={1} />*/}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          ref={action1Ref}
          onClick={() => setMenuOpen1(true)}
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <AccessTime />
          </SvgIcon>
          {interval.text}
        </Button>
        <Menu
          anchorEl={action1Ref.current}
          onClose={() => setMenuOpen1(false)}
          open={isMenuOpen1}
          PaperProps={{ className: classes.menu }}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {intervals.map((t) => (
            <MenuItem
              key={t.value}
              onClick={() => setInterval(t)}
            >
              {t.text}
            </MenuItem>
          ))}
        </Menu>
        <Button
          ref={actionRef}
          onClick={() => setMenuOpen(true)}
          className={classes.pairButton}
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <BarChartIcon />
          </SvgIcon>
          {pair}
        </Button>
        <Menu
          anchorEl={actionRef.current}
          onClose={() => setMenuOpen(false)}
          open={isMenuOpen}
          PaperProps={{ className: classes.menu }}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {pairs.map((t) => (
            <MenuItem
              key={t}
              onClick={() => setPair(t)}
            >
              {t}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  isCrossPool: PropTypes.bool,
  pair: PropTypes.string,
  pairs: PropTypes.array,
  onPairSelected: PropTypes.func
};

export default Header;

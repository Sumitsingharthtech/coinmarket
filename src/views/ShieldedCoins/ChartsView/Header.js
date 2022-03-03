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

function Header({
  className, token, tokens, onTokenSelected, ...rest
}) {
  const classes = useStyles();
  const actionRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const setToken = (value) => {
    setMenuOpen(false);
    onTokenSelected(value);
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
          <CryptoIcon currency={token} />
          {' '}
          {token}
          {' '}
          Shielded Coin
          {/*<VoteButton type="coin" address={VOTE.COIN_ADDRESS} value={token} count={1} />*/}
        </Typography>
      </Grid>
      <Grid item>
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
          {token}
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
          {tokens.map((t) => (
            <MenuItem
              key={t.token}
              onClick={() => setToken(t.token)}
            >
              {t.token}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  token: PropTypes.string,
  tokens: PropTypes.array,
  onTokenSelected: PropTypes.func
};

export default Header;

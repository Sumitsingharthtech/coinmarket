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

function Header({
  className, interval, intervals, onIntervalSelected, ...rest
}) {
  const classes = useStyles();
  const action1Ref = useRef(null);
  const [isMenuOpen1, setMenuOpen1] = useState(false);

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
          <CryptoIcon currency="PRV" />
          {' '}
          Privacy Coin Supply
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
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;

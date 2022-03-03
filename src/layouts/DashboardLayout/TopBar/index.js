import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  SvgIcon, Typography
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import { THEMES } from 'src/constants';
import Search from './Search';
import Settings from './Settings';
import BeaconStatus from './BeaconStatus';
import Logo from '../../../components/Logo';
import WebExtension from './WebExtension';
import CurrentNetwork from './CurrentNetwork';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...theme.name === THEMES.LIGHT ? {
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main
    } : {},
    ...theme.name === THEMES.ONE_DARK ? {
      backgroundColor: theme.palette.background.default
    } : {},
    ...theme.name === THEMES.DUCKY_MODE ? {
      backgroundColor: theme.palette.background.paper
    } : {}
  },
  toolbar: {
    minHeight: 64
  },
  logo: {
    marginRight: theme.spacing(1),
    width: '28px'
  },
  brand: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  },
  siteName: {
    color: theme.siteNameColor
  },
  hamburger: {
    color: theme.hamburger
  }
}));

function TopBar({
  className,
  onMobileNavOpen,
  ...rest
}) {
  const classes = useStyles();
  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            className={`${classes.menuButton} ${classes.hamburger}`}
            onClick={onMobileNavOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <RouterLink to="/">
          <Logo className={classes.logo} />
        </RouterLink>
        <Hidden mdDown>
          <Typography
            variant="h6"
            className={classes.siteName}
          >
            Incognito Network Explorer <CurrentNetwork/>
          </Typography>
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <BeaconStatus />
        <WebExtension />
        <Settings />
        <Search />
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;

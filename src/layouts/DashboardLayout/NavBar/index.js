/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import StorageIcon from '@material-ui/icons/Storage';
import BarChartIcon from '@material-ui/icons/BarChart';
import ComputerIcon from '@material-ui/icons/Computer';
import PieChartIcon from '@material-ui/icons/PieChart';
import { mdiIncognitoCircle, mdiShield, mdiRobber } from '@mdi/js';
import sidebar from '../../../../src/assets/css/sidebar.jpg'


import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import SvgIcon from '@material-ui/core/SvgIcon';
import NavItem from './NavItem';

const navConfig = [
  {
    subheader: 'Explore',
    items: [
      {
        title: 'Dashboard',
        href: '/',
        icon: PieChartIcon,
        items: [
          {
            title: 'Simple',
            href: '/'
          },
          {
            title: 'Advanced',
            href: '/dashboard/advanced'
          }
        ]
      },
      {
        title: 'Blockchain',
        href: '/blockchain',
        icon: StorageIcon,
        items: [
          {
            title: 'Overview',
            href: '/blockchain'
          },
          {
            title: 'Beacon Chain',
            href: '/blockchain/beacon-chain'
          },
          {
            title: 'Shard Blocks',
            href: '/blockchain/shard-blocks'
          },
          {
            title: 'Transactions',
            href: '/blockchain/transactions'
          },
          {
            title: 'Mempool',
            href: '/blockchain/mempool'
          }
        ]
      },
      {
        title: 'Privacy Coin',
        href: '/privacy-coin',
        icon: ({ className }) => <SvgIcon className={className}><path d={mdiIncognitoCircle} /></SvgIcon>,
        items: [
          {
            title: 'Overview',
            href: '/privacy-coin',
          },
          {
            title: 'Supply',
            href: '/privacy-coin/supply',
          }
        ]
      },
      {
        title: 'Shielded Coins',
        href: '/shielded-coins',
        icon: ({ className }) => <SvgIcon className={className}><path d={mdiShield} /></SvgIcon>,
        items: [
          {
            title: 'Overview',
            href: '/shielded-coins',
          },
          {
            title: 'List',
            href: '/shielded-coins/list',
          },
          {
            title: 'Evolution',
            href: '/shielded-coins/evolution',
          },
          {
            title: 'History',
            href: '/shielded-coins/history',
          }
        ]
      },
      {
        title: 'Custom Tokens',
        href: '/custom-tokens',
        icon: ({ className }) => <SvgIcon className={className}><path d={mdiRobber} /></SvgIcon>,
        items: [
          {
            title: 'List',
            href: '/custom-tokens',
          },
          {
            title: 'Markets',
            href: '/pdex/markets-custom-token',
          },
          {
            title: 'Trades',
            href: '/custom-tokens/trades',
          }
        ]
      },
      {
        title: 'pDEX',
        href: '/pdex',
        icon: BarChartIcon,
        items: [
          {
            title: 'Overview',
            href: '/pdex',
          },
          {
            title: 'Markets',
            href: '/pdex/markets',
          },
          {
            title: 'Trades',
            href: '/pdex/trades',
          },
          {
            title: 'Tokens',
            href: '/pdex/tokens',
          }
        ]
      },
      {
        title: 'Network',
        href: '/network',
        icon: ComputerIcon,
        items: [
          {
            title: 'Validators',
            href: '/network/validators',
          }
        ]
      },
      /*{
        title: 'Votes',
        href: '/votes',
        icon: HowToVoteIcon,
        items: [
          {
            title: 'Current vote',
            href: '/votes'
          },
          {
            title: 'All time',
            href: '/votes/all-time'
          }
        ]
      }*/
    ]
  },
  {
    subheader: 'About',
    href: '/about',
    items: [
      {
        title: 'Incscan',
        href: '/about/us'
      }
    ]
  }
];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
        important={item.important}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
        important={item.important}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  brand: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  },
  appDownloadText: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  appDownloadImage: {
    maxWidth: '95px'
  },
  appQuest: {
    maxWidth: '100%'
  },
  topList: {
    lineHeight: '32px'
  }
}));

function NavBar({ openMobile, onMobileClose, }) {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/" className={classes.brand}>
              <Typography
                variant="h5"
              >
                Incognito Network Explorer
              </Typography>
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                  className={classes.topList}
                >
                  {config.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <img src={sidebar} alt="sidebar"  style={{height:"222px",width:"222px" }} />
          <Box
            p={2}
            borderRadius="borderRadius"
            bgcolor="background.dark"
          >
            <Typography
              variant="h6"
              color="textPrimary"
            >
              Join the community!
            </Typography>
            <Link
              variant="subtitle2"
              color="secondary"
              href="https://we.incognito.org"
              target="_blank"
            >
              Incognito forum
            </Link>
            <Typography
              variant="h6"
              color="textPrimary"
              className={classes.appDownloadText}
            >
              Download the Incognito app
            </Typography>
            <Link
              href="https://incognito.onelink.me/I7zE/walletbraveios"
              target="_blank"
            >
              <img alt="" className={classes.appDownloadImage} src="https://incognito-discourse.s3-us-west-2.amazonaws.com/original/2X/8/875ae6677a404ba24650ba1af777ed215178ad00.png" />
            </Link>
            <Link
              href="https://incognito.onelink.me/I7zE/featuredproducts"
              target="_blank"
            >
              <img alt="" className={classes.appDownloadImage} src="https://incognito-discourse.s3-us-west-2.amazonaws.com/original/2X/3/3e8afcbfc790314022f70cda1e2c2610f1a9bf23.png" />
            </Link>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;

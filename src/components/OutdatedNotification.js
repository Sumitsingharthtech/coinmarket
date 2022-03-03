import React, {
  useState,
  useEffect
} from 'react';
import Cookies from 'js-cookie';
import {
  Box,
  Button,
  Link,
  Portal,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    maxWidth: 600,
    position: 'fixed',
    bottom: 0,
    left: 0,
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    outline: 'none',
    zIndex: 2000
  },
  action: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  }
}));

const cookieName = 'fullnode';

function OutdatedNotification() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    Cookies.set(cookieName, 'true');
    setOpen(false);
  };

  useEffect(() => {
    const consent = Cookies.get(cookieName);

    if (!consent) {
      setOpen(true);
    }
  }, []);

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <div className={classes.root}>
        <Typography
          variant="body1"
          color="inherit"
        >
          ⚠️ Incscan fullnode is out of sync, you won’t see new data until fullnode issue is fixed. Check this
          {' '}
          <Link
            component="a"
            color="inherit"
            underline="always"
            href="https://we.incognito.org/t/network-explorer/2086/339?u=inccry"
            target="_blank"
          >
            thread
          </Link>️
          {' '}
          in the forum to track progress.
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            onClick={handleClose}
            variant="contained"
            className={classes.action}
          >
            Seen
          </Button>
        </Box>
      </div>
    </Portal>
  );
}

export default OutdatedNotification;

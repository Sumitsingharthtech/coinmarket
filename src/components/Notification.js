import React, {
  useState,
  useEffect
} from 'react';
import {
  Paper,
  Portal,
  Typography,
  makeStyles
} from '@material-ui/core';
import { NOTIFICATION } from 'src/constants';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrentNotification } from '../actions/notificationActions';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 420,
    position: 'fixed',
    top: 60,
    right: 0,
    margin: theme.spacing(3),
    outline: 'none',
    zIndex: 2000,
    padding: theme.spacing(2)
  }
}));

function Notification() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const { all } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (all.length > 0) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        dispatch(deleteCurrentNotification());
      }, NOTIFICATION.DELAY * 5000);
    }
  }, [dispatch, all]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <Paper
        className={classes.root}
        elevation={3}
      >
        <Typography
          variant="h4"
          color="textPrimary"
          gutterBottom
        >
          {all[0].title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
        >
          {all[0].content}
        </Typography>
      </Paper>
    </Portal>
  );
}

export default Notification;

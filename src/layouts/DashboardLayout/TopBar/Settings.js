import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  IconButton,
  Popover,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Settings as SettingsIcon } from 'react-feather';
import useSettings from 'src/hooks/useSettings';
import { THEMES } from 'src/constants';

const useStyles = makeStyles((theme) => ({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5
  },
  popover: {
    width: 320,
    padding: theme.spacing(2)
  },
  searchButton: {
    color: theme.topBarColor
  }
}));

const realName = (theme) => {
  if (theme === 'ONE_DARK') {
    return 'Dark';
  }
  if (theme === 'LIGHT') {
    return 'Light';
  }
  if (theme === 'DUCKY_MODE') {
    return '🦆';
  }
};

function Settings() {
  const classes = useStyles();
  const ref = useRef(null);
  const { settings, saveSettings } = useSettings();
  const [isOpen, setOpen] = useState(false);
  const [values, setValues] = useState({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setValues({
      ...values,
      [field]: value
    });
  };

  const handleSave = () => {
    saveSettings(values);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Settings">
        <IconButton
          className={classes.searchButton}
          onClick={handleOpen}
          ref={ref}
        >
          <SvgIcon fontSize="small">
            <SettingsIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Typography
          variant="h4"
          color="textPrimary"
        >
          Settings
        </Typography>
        <Box mt={2}>
          <TextField
            fullWidth
            label="Theme"
            name="theme"
            onChange={(event) => handleChange('theme', event.target.value)}
            select
            SelectProps={{ native: true }}
            value={values.theme}
            variant="outlined"
          >
            {Object.keys(THEMES).map((theme) => (
              <option
                key={theme}
                value={theme}
              >
                {realName(theme)}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSave}
          >
            Save Settings
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default Settings;

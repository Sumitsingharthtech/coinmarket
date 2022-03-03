/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import {
  colors, createMuiTheme, fade, responsiveFontSizes
} from '@material-ui/core';
import typography from './typography';
import { softShadows, strongShadows } from './shadows';
import { THEMES } from '../constants';

const baseConfig = {
  direction: 'ltr',
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden'
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32
      }
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)'
      }
    }
  }
};

const themeConfigs = [
  {
    name: THEMES.LIGHT,
    overrides: {
      MuiInputBase: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: colors.blueGrey[600]
          }
        }
      }
    },
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600]
      },
      background: {
        default: colors.common.white,
        dark: '#f4f6f8',
        paper: colors.common.white
      },
      border: '#dadde9',
      primary: {
        main: '#5995f0'
      },
      secondary: {
        main: '#5995f0'
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600]
      }
    },
    shadows: softShadows,
    topBarColor: '#ffffff',
    siteNameColor: '#ffffff',
    info2Bg: colors.grey[400],
    textAreaBg: colors.grey[200],
    chart: {
      backgroundColor: '#ffffff',
      textColor: colors.blueGrey[900],
      lineColor: colors.blueGrey[400],
      lightGraphColor: colors.grey[600],
      volumeColor: colors.grey[300],
      volumeColorLight: colors.grey[500],
    },
    lightColor: 'white',
    darkColor: 'white',
    hamburger: 'white'
  },
  {
    name: THEMES.ONE_DARK,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      border: 'rgba(255, 255, 255, 0.12)',
      primary: {
        main: '#25CDD6'
      },
      secondary: {
        main: '#25CDD6'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    topBarColor: '#e6e5e8',
    siteNameColor: 'rgb(173, 176, 187)',
    info2Bg: fade(colors.grey['100'], 0.08),
    textAreaBg: '#3a3f4b',
    chart: {
      backgroundColor: '#282C34',
      textColor: '#e6e5e8',
      lineColor: 'rgba(255,255,255,.2)',
      lightGraphColor: '#b2bcc7',
      volumeColor: '#353f4a',
      volumeColorLight: '#6b7f94'
    },
    lightColor: '#282C34',
    darkColor: '#282C34',
    hamburger: '#25CDD6'
  },
  {
    name: THEMES.DUCKY_MODE,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#000',
        dark: '#000',
        paper: '#141414'
      },
      border: 'rgba(255, 255, 255, 0.12)',
      primary: {
        main: '#136d75'
      },
      secondary: {
        main: '#136d75'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    topBarColor: '#e6e5e8',
    siteNameColor: 'rgb(173, 176, 187)',
    info2Bg: fade(colors.grey['100'], 0.08),
    textAreaBg: '#000',
    chart: {
      backgroundColor: '#000',
      textColor: '#e6e5e8',
      lineColor: 'rgba(255,255,255,.2)',
      lightGraphColor: '#b2bcc7',
      volumeColor: '#353f4a',
      volumeColorLight: '#6b7f94'
    },
    lightColor: '#fff',
    darkColor: '#282C34',
    hamburger: '#136d75'
  },
  {
    name: THEMES.UNICORN,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#2a2d3d',
        dark: '#222431',
        paper: '#2a2d3d'
      },
      primary: {
        main: '#a67dff'
      },
      secondary: {
        main: '#a67dff'
      },
      text: {
        primary: '#f6f5f8',
        secondary: '#9699a4'
      }
    },
    shadows: strongShadows
  }
];

export function createTheme(settings = {}) {
  let themeConfig = themeConfigs.find((theme) => theme.name === settings.theme);

  if (!themeConfig) {
    console.warn(new Error(`The theme ${settings.theme} is not valid`));
    [themeConfig] = themeConfigs;
  }

  let theme = createMuiTheme(
    _.merge(
      {},
      baseConfig,
      themeConfig,
      { direction: settings.direction }
    )
  );

  if (settings.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
}

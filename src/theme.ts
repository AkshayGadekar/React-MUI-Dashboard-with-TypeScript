import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const primary = 'rgb(41 176 66)';const secondary = '#19857b';
// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: 'inherit'
        },
        body: {
          "& #nprogress": {
            pointerEvents: 'none',
            "& > div[role=bar]": {
              backgroundColor: secondary,
              position: 'fixed',
              zIndex: '2001',
              top: 0,
              left: 0,
              width: '100%',
              height: '3px'
            }
          },
        },
      },
    },
    MuiLinearProgress: {
      variants: [
        {
          props: { id: "topProgressBar" },
          style: {
            visibility: "hidden",
            position: "fixed",
            width: "100%",
            zIndex: 2000,
            height: '3px'
          }
        }
      ],
      styleOverrides: {
        root: {
          height: '3px'
        }
      }
    },
    MuiListItem: {
      variants: [
        {
          props: { selected: true },
          style: {
            backgroundColor: 'rgba(41, 0, 0, 0.08)'
          }
        }
      ]
    }
  }
});

export default theme;

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import LiquidInterface from './components/LiquidInterface';
import { IconButton, Box, useMediaQuery, CssBaseline } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const createAppTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#10b981' : '#34d399',
      light: mode === 'light' ? '#34d399' : '#6ee7b7',
      dark: mode === 'light' ? '#059669' : '#047857',
    },
    secondary: {
      main: mode === 'light' ? '#f97316' : '#fb923c',
      light: mode === 'light' ? '#fb923c' : '#fdba74',
      dark: mode === 'light' ? '#ea580c' : '#c2410c',
    },
    background: {
      default: mode === 'light' ? '#f8fafc' : '#1a1a1a',
      paper: mode === 'light' ? '#ffffff' : '#2d2d2d',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '10px 20px',
          fontWeight: 600,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
  },
});

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        transition: 'background-color 0.3s ease-in-out',
        position: 'relative'
      }}>
        <IconButton
          onClick={toggleColorMode}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'background.paper',
              transform: 'rotate(180deg)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <LiquidInterface />
      </Box>
    </ThemeProvider>
  );
}

export default App;
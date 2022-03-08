// 3rd party
import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, PaletteMode } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';
// local
import { AppPageRx } from './App';
import { persist, store } from './redux-setup';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
});
const COLOR_MODE_SESSION_STORAGE: string = 'colorMode';

const App = () => {
  const storageMode: PaletteMode = (sessionStorage.getItem(
    COLOR_MODE_SESSION_STORAGE
  ) || 'light') as PaletteMode;
  const baseTheme = createTheme();
  const [mode, setMode] = useState<PaletteMode | undefined>(storageMode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          sessionStorage.setItem(COLOR_MODE_SESSION_STORAGE, newMode);
          return newMode;
        });
      }
    }),
    []
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-input:-webkit-autofill': {
                  boxShadow: `0 0 0 100px ${
                    mode === 'dark'
                      ? baseTheme.palette.grey[900]
                      : baseTheme.palette.common.white
                  } inset`,
                  borderRadius: '0 5px 5px 0'
                }
              }
            }
          }
        }
      }),
    [mode]
  );

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <PersistGate loading={null} persistor={persist}>
              <AppPageRx />
            </PersistGate>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

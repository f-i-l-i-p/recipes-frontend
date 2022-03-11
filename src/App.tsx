import { createTheme, ThemeProvider } from '@material-ui/core';
import { Shadows } from '@mui/material/styles/shadows';
import './App.css';
import Navigation from './features/navigation/Navigation';

const theme = createTheme({
  palette: {
    primary: {
      main: "#9ccc65",
    },
    secondary: {
      main: "#6b9b37",
    },
    info: {
      main: "#00000080",
    }
  },
  shape: {
    borderRadius: 10
  },
  shadows: Array(25).fill("0px 1px 8px 0px #00000005") as Shadows,
  typography: {
    h6: {
      fontWeight: "bold"
    }
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navigation />
      </div>
    </ThemeProvider>
  );
}

export default App;

import { createTheme, ThemeProvider } from '@material-ui/core';
import { Shadows } from '@mui/material/styles/shadows';
import './App.css';
import PageDrawer from './components/navigation/PageDrawer';


const theme = createTheme({
  palette: {
    primary: {
      main: "#9ccc65",
    },
    secondary: {
      main: "#6b9b37",
    },
  },
  shape: {
    borderRadius: 10
  },
  shadows: Array(25).fill("0 4px 20px 0 #0003") as Shadows,
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <PageDrawer />
      </div>
    </ThemeProvider>
  );
}

export default App;

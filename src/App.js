import { ThemeProvider, createTheme } from '@mui/material/styles';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import { DataContextProvider } from './context/DataContext';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <div className="App">
      <DataContextProvider>
        <ThemeProvider theme={darkTheme}>
          <Header></Header>
          <Content></Content>
          <Footer></Footer>
        </ThemeProvider>
      </DataContextProvider>
    </div>
  );
}

export default App;

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import { DataContextProvider } from './context/DataContext';
import 'animate.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from './components/LoadingScreen';



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
          <ToastContainer
            position="bottom-right"
            closeOnClick
            pauseOnFocusLoss={false}
            autoClose={1500}
            pauseOnHover={false}
            theme="colored"
          />
          <LoadingScreen></LoadingScreen>
          <Header></Header>
          <Content></Content>
          <Footer></Footer>
        </ThemeProvider>
      </DataContextProvider>
    </div>
  );
}

export default App;

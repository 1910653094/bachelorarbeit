import { Header } from './components';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { NotFound, Home, Contact } from './pages';
import { ThemeContextProvider } from './context';
import './App.css';

const App = () => {
  return (
    <ThemeContextProvider>
      <div className='App'>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ThemeContextProvider>
  );
}

export default App;

import { Header } from './components';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { NotFound, MyCV, Contact, Login, Home } from './pages';
import { AuthContextProvider, ThemeContextProvider } from './context';
import './App.css';

const App = () => {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <div className='App'>
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<MyCV />} />
              <Route path='/contact' element={<Contact />} />

              <Route path='/login' element={<Login />} />
              <Route path='/account' element={<Home />} />

              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}

export default App;

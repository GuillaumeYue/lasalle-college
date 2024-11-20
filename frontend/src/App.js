import {Container} from 'react-bootstrap'
import{BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='login' element={<LoginScreen/>} />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/' element={<HomeScreen />} exact />
            
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;

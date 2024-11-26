import {Container} from 'react-bootstrap'
import{BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceorderScreen from './screens/PlaceoderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OderListScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/register' element={<RegisterScreen/>} />
            <Route path='/payment' element={<PaymentScreen/>} />
            <Route path='/order/:id' element={<OrderScreen/>} />
            <Route path='/placeorder' element={<PlaceorderScreen/>} />
            <Route path='/shipping' element={<ShippingScreen/>} />
            <Route path='/profile' element={<ProfileScreen/>} />
            <Route path='/login' element={<LoginScreen/>} />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/productlist' element={<ProductListScreen />} exact/>
            <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
            <Route path='/admin/orderList' element={<OrderListScreen />} />
            <Route path='/page/:pageNumber' element={<HomeScreen />} exact />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} exact />
            <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} exact />
            <Route path='/' element={<HomeScreen />} exact />
            
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;

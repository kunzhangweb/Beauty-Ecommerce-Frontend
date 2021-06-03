import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="h-100">
        <Header />

        <Container style={{ height: "100%", width: "100%", margin: "1rem" }}>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/login" component={LoginScreen}></Route>
        </Container>

        <Footer />       
      </div>
    </BrowserRouter>
  );
}

export default App;

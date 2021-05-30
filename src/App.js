import { Container, Navbar } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="h-100">
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/">EverydayBeautyLab</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="mx-2">
                <a href="/cart">Cart</a>
              </Navbar.Text>
              <Navbar.Text>
                <a href="/signin">Sign In</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container style={{ height: "100%", width: "100%", margin: "1rem" }}>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
        </Container>

        {/* Footer */}
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand className="mx-auto">&copy; All right reserved 2021</Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    </BrowserRouter>
  );
}

export default App;

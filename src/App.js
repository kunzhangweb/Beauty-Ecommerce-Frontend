import { Card, Col, Container, Navbar, Row } from "react-bootstrap";
import data from "./data";

function App() {
  return (
    <div class="h-100">
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
        <Row>
          {data.products.map((product) => (
            <Col lg={4} key={product._id}>
              {/* display a single product item */}
              <Card className="m-2">
                <a href={`/product/${product._id}`}>
                  <Card.Img
                    variant="top"
                    src={ product.image }
                    alt={ product.name }
                  />
                </a>
                <Card.Body>
                  <a href={`/product/${product._id}`}>
                    <Card.Title>{ product.name }</Card.Title>
                  </a>
                  <div class="rating">
                    <span>
                      <i class="fa fa-star"></i>
                    </span>
                    <span>
                      <i class="fa fa-star"></i>
                    </span>
                    <span>
                      <i class="fa fa-star"></i>
                    </span>
                    <span>
                      <i class="fa fa-star"></i>
                    </span>
                    <span>
                      <i class="fa fa-star"></i>
                    </span>
                  </div>
                  <Card.Text>${ product.price }</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>&copy; All right reserved 2021</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;

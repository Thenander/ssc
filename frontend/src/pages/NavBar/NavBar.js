import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../ssc_logo.png";
import classes from "./NavBar.module.scss";

function NavBar() {
  return (
    <Navbar
      variant="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary p-0"
    >
      <Container>
        <Navbar.Brand className={classes["logo-wrapper"]}>
          <img src={logo} alt="logo" className={classes.logo} />
        </Navbar.Brand>
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex">
            <Nav className="position-relative">
              <Nav.Link href="/releases" className="p-3">
                Releases
              </Nav.Link>
            </Nav>
            <Nav className="position-relative">
              <Nav.Link href="/tracks" className="p-3">
                Tracks
              </Nav.Link>
            </Nav>
          </div>
          <div>
            <Nav className="position-relative">
              <Nav.Link href="/login" className="p-3">
                Login
              </Nav.Link>
            </Nav>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;

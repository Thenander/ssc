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
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand className={classes["logo-wrapper"]}>
          <img src={logo} alt="logo" className={classes.logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/releases">Releases</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/tracks">Tracks</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

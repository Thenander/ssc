import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../ssc_logo.png";
import { useAuth } from "../../contexts/AuthProvider.js";
import classes from "./NavBar.module.scss";

function NavBar() {
  const auth = useAuth();
  const { user } = auth;

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
            <Nav
              className="position-relative"
              onSelect={(selectedKey) => console.log(selectedKey)}
            >
              <Nav.Link eventKey="releases" href="/releases" className="p-3">
                Releases
              </Nav.Link>
            </Nav>
            <Nav className="position-relative">
              <Nav.Link eventKey="tracks" href="/tracks" className="p-3">
                Tracks
              </Nav.Link>
            </Nav>
          </div>
          <div className={classes["cultivated-bimbo"]}>Cultivated Bimbo</div>
          <div className="d-flex">
            {user && (
              <div className="d-flex align-items-center justify-content-center text-light px-3">{`${user.firstName} ${user.lastName}`}</div>
            )}
            {user ? (
              <Nav className="position-relative">
                <Nav.Link eventKey="login" href="/login" className="p-3">
                  Logout
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="position-relative">
                <Nav.Link
                  href="/login"
                  className="p-3"
                  style={{ color: "#a7a9ab" }}
                >
                  Admin login
                </Nav.Link>
              </Nav>
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;

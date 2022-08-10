import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { CurrentUser } from "../Pages/App";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  const [sessionuser, setSessionUser] = useContext(CurrentUser);
  return (
    <Navbar
      className="navbar navbar-expand-sm navbar-dark bg-black py-0 px-0"
      collapseOnSelect
      expand="lg"
    >
      <Navbar.Brand href="#home">
        <img src="/images/music-festival-icon.jpg" id="logo" />
        &nbsp;&nbsp;&nbsp;LetsBook
      </Navbar.Brand>
      <span className="v-line"></span>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-center">
        <Nav className="navbar-nav">
          <Nav.Item className="nav-item active">
            <Link className="nav-link" eventkey="1" to="/">
              &nbsp; Home &nbsp;
            </Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Link className="nav-link" eventkey="2" to="/">
              &nbsp;Gallery &nbsp;
            </Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Link className="nav-link" eventkey="3" to="/">
              &nbsp; Tips and Tricks &nbsp;
            </Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Link className="nav-link" eventkey="4" to="/">
              &nbsp; About us
            </Link>
          </Nav.Item>
          <div className="right-align">
            <Nav.Item className="nav-item">
              {!sessionuser.id && (
                <Link className="nav-link" eventkey="5" to="/register">
                  Register
                </Link>
              )}
              {sessionuser.id && (
                <NavDropdown title="Welcome" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to={`/profile/${sessionuser.id}`} href="#x">
                      {sessionuser.name}'s Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      setSessionUser({
                        id: null,
                        name: "",
                      });
                    }}
                  >
                    <button>Logout </button>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav.Item>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

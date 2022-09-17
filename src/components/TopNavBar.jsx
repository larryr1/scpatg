import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ArticleSelector from './docs/ArticleSelector';

function TopNavBar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" className='ps-3 pe-3' sticky='top'>
    <Navbar.Brand href="#home">SCPATG</Navbar.Brand>
    <Nav className="me-auto">
    <Button variant="primary" className='btn-sm' onClick={props.show}>Articles</Button>
        </Nav>
        <span className='text-white'>{ props.title ? props.title : "No Article Selected"}</span>
    </Navbar>
  );
}

export default TopNavBar;
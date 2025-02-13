"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navbars({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        // console.log("token",token)
        if (!token) {
            router.push("/login");
        }
    }, []);

    return (
        <>
            {/* Fixed Navbar */}
            <div>
                <Navbar expand="lg" className="bg-dark navbar-dark" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="me-auto" >
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <button style={{ color: 'white' }} onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}>Logout</button>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            {/* Page Content Below Navbar */}
            <div>
                {children}
            </div>
        </>
    );
}








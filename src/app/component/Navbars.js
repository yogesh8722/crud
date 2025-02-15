"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { usePathname } from "next/navigation";

  
export default function Navbars({ children }) {
    const router = useRouter();

    // Navbar ko register or login page se hide krne ke liye
    const pathname = usePathname();
    const hideNavbarOn = ["/login", "/register"];
  
    if (hideNavbarOn.includes(pathname)) {
      return null; 
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        // console.log("token",token)
        if (!token) {
            router.push("/login");
        }
    }, []);

    return (
        <>
            <div>
                <Navbar expand="lg" className="bg-dark navbar-dark" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                    <Navbar.Brand href="/dashboard" style={{width:"400px"}}>CRUD</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="me-auto" >
                            <Nav.Link href="/dashboard" className="active">Home</Nav.Link>      
                            <Nav.Link href="/register">register</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                        <button style={{ color: 'white' }} onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}>Logout</button>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div>
                {children}
            </div>
        </>
    );
}








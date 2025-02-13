"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const perPageStudent = 10


  const router = useRouter();

// Get Api All User Get Krne ke liye
  async function studentList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/student`)
    const student = await res.json()
    // console.log(student);
    setUser(student)
  }
  useEffect(() => {
    studentList()
  }, [])

  // logout se login page redirect krne ke liye
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);


  const filterData = user.filter((item) => item.studentName.toLowerCase().includes(search.toLowerCase()))
  const lastSliceEntry = page * perPageStudent;
  const firstSliceEntry = lastSliceEntry - perPageStudent;
  const pageValue = filterData.slice(firstSliceEntry, lastSliceEntry)

  const handlePrevBtn = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextBtn = () => {
    if (page < Math.ceil(user.length / perPageStudent)) {
      setPage(page + 1)
    }
  }


  // delete ki api
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/student/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setUser(user.filter((student) => student._id !== id));
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  return (
    <>

      <div className="mb-2 mt-2" style={{ justifyItems: "center", display: 'flex', justifyContent: 'space-between', padding: '0px 10px', height: "35px" }}>
        <Link href={'/studentform'} style={{textDecoration:'none',color:'black'}}><button style={{ display: 'flex', background: 'green', padding: '0px 5px', borderRadius: '5px', lineHeight: "35px", gap: '5px' }}><FaPlus style={{ marginTop: '10px' }} />Add Student</button></Link>
        
        <h3>Student List</h3>
        <input style={{ border: '1px solid #e5e7eb', borderRadius: "5px" }} value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="search" />
      </div>
      <div style={{ textAlign: "center", padding: "0px 10px" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>S.NO.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
              <tbody>
                {user.length === 0 ? (
                  // Agar user ka data empty hai to ye chalega
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                      <span>No Data Available</span>
                    </td>
                  </tr>
                ) : pageValue.length > 0 ? (pageValue.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link href={`/dashboard/${item._id}`} style={{ textDecoration: 'none', color: 'black' }}>{item.studentName}</Link></td>
                    <td>{item.mobile}</td>
                    <td>{item.address}</td>
                    <td style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", fontSize: '25px' }}>
                      <button style={{ color: 'red' }} onClick={() => handleDelete(item._id)}><MdDelete /></button>
                      <button style={{ color: 'green' }} ><Link href={`editpage/${item._id}`}><FaRegEdit /></Link></button>
                    </td>
                  </tr>
                ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                      <span>Loading...</span></td>
                  </tr>
                )}
              </tbody>
        </Table>
      </div>
      <div className='p-2'>
        <Button className='m-2' disabled={page === 1} onClick={handlePrevBtn}>Prev</Button>
        <Button className='m-2'>Page{page}</Button>
        <Button className='m-2' disabled={page === Math.ceil(user.length / perPageStudent)} onClick={handleNextBtn}>Next</Button>
      </div>
    </>
  );
}

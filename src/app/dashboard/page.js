"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Link from "next/link";
import AddForm from "../component/AddForm";
import Modal from 'react-bootstrap/Modal';
import EditForm from "../component/EditForm";

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [show, setShow] = useState(false);

  const [updateStudent,setUpdateStudent]=useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    mobile: "",
    address: "",
    city: "",
    district: "",
    rollNo: "",
  })

  const handleChange = (e) => {
    setUpdateStudent({ ...updateStudent, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow =async (id) =>{
    setShow(true)
    try {
      const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/student/${id}`)
      const data=await res.json()
      setUpdateStudent({...data,_id: id})

    } catch (error) {
      throw new Error("Data Update Error",error)
    }
  };

  const perPageStudent = 5
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

  const refreshList = () => {
    studentList();
  };

  // logout se login page redirect krne ke liye
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);


  const filterData = user.filter((item) => item.studentName.toLowerCase().includes(search.toLowerCase()) || item.address.toLowerCase().includes(search.toLowerCase()) || item.mobile.toLowerCase().includes(search.toLocaleLowerCase()))
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Form Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <EditForm updateStudent={updateStudent} handleChange={handleChange}  refreshList={refreshList} handleClose={handleClose} />
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mb-2 mt-2 addForm-btn">

        <AddForm refreshList={refreshList} />



        <h3>Student List</h3>
        <input className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="search" />
      </div>
      <div className="table-mainbody">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>S.NO.</th>
              <th>User Name</th>
              <th>Mobile No.</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.length === 0 ? (
              // Agar user ka data empty hai to ye chalega
              <tr>
                <td colSpan="5" className="table-td">
                  <span>No Data Available</span>
                </td>
              </tr>
            ) : pageValue.length > 0 ? (pageValue.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <Link href={`/dashboard/${item._id}`} className="link-a-text">{item.studentName}</Link></td>
                <td>{item.mobile}</td>
                <td>{item.address}</td>
                <td className="action-column">
                  <button style={{ color: 'red' }} onClick={() => handleDelete(item._id)}><MdDelete /></button>
                  <Button onClick={()=>handleShow(item._id)}  className="editBtn" ><FaRegEdit /></Button>

                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="5" className="table-td">
                  <span>No Data Available Search Input</span></td>
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

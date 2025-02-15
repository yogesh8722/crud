import connectDB from "@/lib/mongodb";
import { Student } from "@/models/Student.Model";
import { NextResponse } from "next/server";

export async function DELETE(req){
await connectDB()
try {
    const id = req.nextUrl.pathname.split("/").pop(); 
    const deletedUser = await Student.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
  }
}

export async function GET(req) {
    await connectDB()
    try {
        const id=req.nextUrl.pathname.split("/").pop();
        const student=await Student.findById(id)
        if(!student){
            return NextResponse.json("User Not Found",{status:401})
        }
        return NextResponse.json(student,{status:200})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
    
}


export async function PUT(req) {
    await connectDB();
    try {
        const id = req.nextUrl.pathname.split("/").pop();
        const body = await req.json();
        const { studentName, fatherName, motherName, mobile, address, city, district, rollNo } = body;

        const updateStudent = await Student.findByIdAndUpdate(
            id,
            { studentName, fatherName, motherName, mobile, address, city, district, rollNo },
            { new: true, runValidators: true }
        );

        if (!updateStudent) {
            return NextResponse.json({ error: "User Not Found" }, { status: 404 });
        }

        return NextResponse.json(updateStudent, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

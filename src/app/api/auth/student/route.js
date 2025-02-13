import connectDB from "@/lib/mongodb";
import { Student } from "@/models/Student.Model";
import { NextResponse } from "next/server";

export async function GET(){
   await connectDB()
    try {
        const user=await Student.find()
        return NextResponse.json(user,{status:200})
    } catch (error) {
        throw new Error("Student is Not Present",{error:message.error})
    }
}

export async function POST(req){
   await connectDB()
    try {
        const {studentName,fatherName,motherName,mobile,address,city,district,rollNo}=await req.json()
        const newStudent=new Student({studentName,fatherName,motherName,mobile,address,city,district,rollNo})
        const savedStudent=await newStudent.save()
        return NextResponse.json(savedStudent,{status:201})
    } catch (error) {
        return NextResponse.json({error:"server error",detail:error.message},{status:400})
    }
}
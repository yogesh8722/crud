"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="mainbody-login">
      <div className="border">
      <h1>Register</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" readOnly onFocus={(e)=>e.target.removeAttribute('readOnly')} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
        <input type="email" placeholder="Email" readOnly onFocus={(e)=>e.target.removeAttribute('readOnly')} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input type="password" placeholder="Password" readOnly onFocus={(e)=>e.target.removeAttribute('readOnly')} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        <button type="submit">Register</button>
        <Link href={'/login'} style={{textDecoration:'none'}}>Login</Link>
      </form>
    </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    }
  };

  return (
    <div className="mainbody-login">
      <div className="border">
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" autoComplete="off" readOnly
          onFocus={(e) => e.target.removeAttribute('readonly')} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input type="password" placeholder="Password" autoComplete="off" readOnly
          onFocus={(e) => e.target.removeAttribute('readonly')} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        <button type="submit">Login</button>
        <Link href={'/register'}>Register ||</Link>
        <Link href={'/'}>Forgotton Password</Link>
      </form>
      </div>
    </div>
  );
}

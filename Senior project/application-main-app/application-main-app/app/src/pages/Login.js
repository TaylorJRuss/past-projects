import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup, checkUserSession } from '../util';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const result = await checkUserSession();
            if (result.success && result.session) {
                navigate("/home");
            }
        };
        checkSession();
    }, [navigate]);

    const handleLogin = async () => {
        const result = await login(email, password);
        console.log(result)
        if (!result.success) {
            alert("Login failed: " + result.message);
        } else {
            localStorage.setItem("user", JSON.stringify(result.session));
            localStorage.setItem("user_email", result.user.email);
            navigate("/home");
        }
    };

    const handleSignUp = async () => {
        const result = await signup(email, password);
        if (!result.success) {
            alert("Sign-up failed: " + result.message);
        } else {
            alert("Account created! Enter login credentials");
        }
    };

    return (
        <div
            style={{
                background: "linear-gradient(to bottom, #87CEEB, #f0f8ff)",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                fontFamily: "'Times New Roman', serif",
                fontSize: "1.2rem"
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "20px",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                    width: "35%",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "2rem",
                        fontWeight: "600",
                        fontSize: "2rem",
                        color: "black"
                    }}
                >
                    Login to your Skyway account
                </h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ fontWeight: "500", fontSize: "1.2rem" }}>
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="janedoe@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.8rem",
                                marginTop: "0.3rem",
                                borderRadius: "10px",
                                border: "1px solid #ccc",
                                fontSize: "1.2rem"
                            }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: "2rem" }}>
                        <label style={{ fontWeight: "500", fontSize: "1.2rem" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.8rem",
                                marginTop: "0.3rem",
                                borderRadius: "10px",
                                border: "1px solid #ccc",
                                fontSize: "1.2rem"
                            }}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "1rem",
                            backgroundColor: "#000",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            fontWeight: "600",
                            fontSize: "2rem",
                            cursor: "pointer",
                            marginBottom: "2rem"
                        }}
                    >
                        Log in
                    </button>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            fontSize: "1.4rem",
                            color: "#555",
                            fontWeight: "600"
                        }}
                    >
                        <span
                            style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                alignItems: "center",
                            }}
                            onClick={handleSignUp}
                        >
                            Create an account
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

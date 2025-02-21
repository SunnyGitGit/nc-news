import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <h1>Page Not Found</h1>
            <p>Please check the URL.</p>
            <button onClick={() => navigate("/")}>Go to Homepage</button>
        </div>
    );
}
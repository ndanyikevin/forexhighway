import { Component } from "solid-js";

const Dashboard: Component = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Overview</h1>
            <div style={{
                display: "grid",
                "grid-template-columns": "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.5rem",
                "margin-top": "1.5rem"
            }}>
                <div style={{ background: "#1e293b", padding: "1.5rem", "border-radius": "8px" }}>
                    <h3>Total Revenue</h3>
                    <p style={{ "font-size": "1.8rem", "font-weight": "bold", "margin-top": "0.5rem" }}>$45,231.89</p>
                </div>
                <div style={{ background: "#1e293b", padding: "1.5rem", "border-radius": "8px" }}>
                    <h3>Active Users</h3>
                    <p style={{ "font-size": "1.8rem", "font-weight": "bold", "margin-top": "0.5rem" }}>+2,350</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
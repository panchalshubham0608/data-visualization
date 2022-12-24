import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div className="mb-5">
                <h1>Home to all your quick data visualization!</h1>
                <p>Stay focus on your problems while we help you to quickly visualize data.</p>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Visualizer</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Link to="/matrix-visualizer">Matrix Visualizer</Link>
                        </td>
                        <td>
                            <p>
                                This is a visualizer for matrices.
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

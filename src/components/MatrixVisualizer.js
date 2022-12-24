import React, { useCallback, useEffect } from "react";
import "./MatrixVisualizer.css";
import BackButton from "./BackButton";

function parseMatrix(content) {
    try {
        const matrix = JSON.parse(content);
        if (!Array.isArray(matrix)) {
            return null;
        }
        if (matrix.length === 0) {
            return null;
        }
        let count = 0;
        for (const row of matrix) {
            if (!Array.isArray(row)) {
                return null;
            }
            count += row.length;
        }
        return count === 0 ? null : matrix;
    } catch (e) {
        return null;
    }
}

export default function MatrixVisualizer() {
    const [content, setContent] = React.useState("[[1,2,3],[4,5,6],[7,8,9]]");
    const [startIndices, setStartIndices] = React.useState([-1, -1]);
    const [endIndices, setEndIndices] = React.useState([-1, -1]);

    const handleOnClick = (event) => {
        const row = event.target.parentElement.rowIndex - 1;
        const col = event.target.cellIndex - 1;
        if (event.metaKey && startIndices[0] !== -1 && startIndices[1] !== -1) {
            setEndIndices([row, col]);
        } else {
            setStartIndices([row, col]);
            setEndIndices([row, col]);
        }
    }

    const handleOnKeyDown = useCallback((event) => {
        if (event.key === "Escape") {
            setStartIndices([-1, -1]);
            setEndIndices([-1, -1]);
        } else if (startIndices[0] !== -1 && startIndices[1] !== -1 && endIndices[0] !== -1 && endIndices[1] !== -1) {
            if (event.key === "ArrowUp") {
                setStartIndices([startIndices[0] - 1, startIndices[1]]);
                setEndIndices([endIndices[0] - 1, endIndices[1]]);
            } else if (event.key === "ArrowDown") {
                setStartIndices([startIndices[0] + 1, startIndices[1]]);
                setEndIndices([endIndices[0] + 1, endIndices[1]]);
            } else if (event.key === "ArrowLeft") {
                setStartIndices([startIndices[0], startIndices[1] - 1]);
                setEndIndices([endIndices[0], endIndices[1] - 1]);
            } else if (event.key === "ArrowRight") {
                setStartIndices([startIndices[0], startIndices[1] + 1]);
                setEndIndices([endIndices[0], endIndices[1] + 1]);
            }
        }
    }, [startIndices, endIndices]);

    function isCellSelected(rowIndex, colIndex) {
        return rowIndex >= startIndices[0] && colIndex >= startIndices[1] &&
            rowIndex <= endIndices[0] && colIndex <= endIndices[1];
    }

    useEffect(() => {
        document.addEventListener("keydown", handleOnKeyDown);
        return () => {
            document.removeEventListener("keydown", handleOnKeyDown);
        }
    }, [handleOnKeyDown]);

    const matrix = parseMatrix(content);
    return (
        <div className="matrix-visualizer">            
            <BackButton />
            <div>
                <h4 className="mb-0">Visualize your matrix with our matrix-visualizer.</h4>
                <p>Paste your 2D array to view in matrix format.</p>
            </div>
            <div className="mb-3">
                <textarea className="form-control" style={{
                    backgroundColor: matrix ? "#d1e7dd" : "#f8d7da",
                }} rows="3" value={content}
                onChange={event => setContent(event.target.value)} />
            </div>

            {matrix && <div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th></th>
                            {matrix[0].map((_, colIndex) => (
                                <th key={colIndex} className="text-center">{colIndex}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {matrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <th scope="row1">{rowIndex}</th>
                                {row.map((value, colIndex) => (
                                    <td key={colIndex} className={`text-center border ${isCellSelected(rowIndex, colIndex) ? 'selected-cell' : ''}`}
                                        onClick={handleOnClick}
                                    >{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </div>
    );
}

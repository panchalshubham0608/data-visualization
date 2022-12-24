import React from "react";
import {
    Link
} from 'react-router-dom';

export default function BackButton() {
    return (
        <h1>
            <Link to="/"><i className="fa-solid fa-arrow-left text-black mb-3"></i></Link>
        </h1>
    );
}

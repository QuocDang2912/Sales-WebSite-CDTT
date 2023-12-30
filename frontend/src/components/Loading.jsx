import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import ClockLoader from "react-spinners/ClockLoader";

export default function Loading() {
    return (
        <div>
            {/* <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner> */}

            <ClockLoader size={100} color="#36d7b7" />



        </div>

    )
}

import React from 'react'
import { Link } from 'react-router-dom'
import {BsStarFill }from 'react-icons/bs' 

function DashboardUser({ data }) {
    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome {data?.name}!</h1>
                    {/* <p>Income last <span>30 days</span></p> */}
                    <h2>${data?.income ? data.income : 0}</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score</h2>
                <BsStarFill className="star" />
                <p>
                    <span>5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
        </>
    )
}

export default DashboardUser
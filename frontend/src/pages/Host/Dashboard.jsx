import React, { useEffect, useState } from "react"
import { Link, defer, Await, useLoaderData, useOutlet, useNavigate } from "react-router-dom"
import useGetHostVans from "../../hooks/useGetHostVans"
import { BsStarFill } from "react-icons/bs"
// export async function getAndRefresh(){
//     try {
//         const res = await getHostVans()
//         return res.json()
//     } catch (error) {

//     }
// }

export async function loader(obj) {
    // console.log(obj)
    // const res  = getHostVans()
    // return defer({vans:res})
    return "yes"
}

export default function Dashboard() {
    const [data, setData] = useState([])
    const fetchData = useGetHostVans(setData)
    
    useState(()=>{
        let isMounted = true
        isMounted && fetchData()
        return()=>{
            isMounted = false
        }
    })

    const hostVansEls = data.map((van) => {
        console.log("van", van)
        return (
            <Link to={`vans/${van.vanid}`} key={van.vanid}>
                <div className="host-van-single" >
                    <img src={van.image} alt={`Photo of ${van.name}`} />
                    <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}$/day</p>
                    </div>
                </div>
            </Link>
        )
    })




    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome {"Bob"}!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$2,260</h2>
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
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>

                    <div className="host-vans-list">
                        <section>{data ? hostVansEls:<p>Loading...</p>}</section>
                    </div>


            </section>
        </>
    )
}

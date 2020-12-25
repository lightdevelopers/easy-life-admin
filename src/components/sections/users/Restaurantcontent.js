import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import Piechart from './Piechart';
import $ from 'jquery';
import api, {headers} from '../../../api';
import tpfdimg1 from '../../../assets/img/costic/pizza.jpg';
import tpfdimg2 from '../../../assets/img/costic/french-fries.jpg';
import tpfdimg3 from '../../../assets/img/costic/cereals.jpg';
import tpfdimg4 from '../../../assets/img/costic/egg-sandwich.jpg';
import LoadingOverlay from 'react-loading-overlay'
import Loader from 'react-spinners/RiseLoader'

const topfoodmenutable = [
    {
        photo: tpfdimg1,
        title: "Pizza",
        price: "$20",
        id: "67384917",
    },
    {
        photo: tpfdimg2,
        title: "French Fries",
        price: "$14",
        id: "789393819",
    },
    {
        photo: tpfdimg3,
        title: "Multigrain Hot Cereal",
        price: "$25",
        id: "137893137",
    },
    {
        photo: tpfdimg4,
        title: "Fried Egg Sandwich",
        price: "$10",
        id: "235193138",
    },
]

const restaurentlisttable = [
    {
        id: "yasirbroast",
        name: "Delizus",
        location: "New York",
        jndate: "12/10/19",
        rssale: "90",
    },
    {
        id: "15452",
        name: "Lumina",
        location: "New York",
        jndate: "20/9/19",
        rssale: "99",
    },
    {
        id: "45263",
        name: "Food Loung",
        location: "New York",
        jndate: "15/10/19",
        rssale: "95",
    },
    {
        id: "45865",
        name: "Hungry House",
        location: "New York",
        jndate: "21/11/19",
        rssale: "88",
    },
    {
        id: "56652",
        name: "Luncheon",
        location: "New York",
        jndate: "12/11/19",
        rssale: "81",
    },
    {
        id: "65845",
        name: "Spice 'n' Steam",
        location: "New York",
        jndate: "20/10/19",
        rssale: "91",
    },
    {
        id: "65425",
        name: "Tomato",
        location: "New York",
        jndate: "12/10/19",
        rssale: "77",
    },
    {
        id: "54556",
        name: "Bardojo",
        location: "New York",
        jndate: "12/11/19",
        rssale: "78",
    },
    {
        id: "45556",
        name: "Deliceiux",
        location: "New York",
        jndate: "22/10/19",
        rssale: "88",
    },
    {
        id: "55856",
        name: "Food Forest",
        location: "New York",
        jndate: "12/10/19",
        rssale: "75",
    },
    {
        id: "36456",
        name: "Food Bella",
        location: "New York",
        jndate: "18/11/19",
        rssale: "90",
    },
    {
        id: "78456",
        name: "Red Chilly",
        location: "New York",
        jndate: "12/10/19",
        rssale: "85",
    },
]
const Content = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [foods,setFoods] = useState(null);

    const fetchFoods = async () => {
        setLoading(true);
        const foods = await fetch(api("/get_all_users"),{
            method: "GET",
            headers: headers,
        });
        console.log(foods);
        const list = await foods.json();
        console.log(list);
        setFoods(list);
        setLoading(false);
    }

    const changeStatus = async (id,block) => {
        setLoading(true);
        const response = await fetch(api("/change_user_block_status"),{
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                userId: id,
                toBlock: block
            })
        });
        if(response.ok) {
            for(let i=0; i<foods.length; i++) {
                if(foods[i].id == id) {
                    foods[i].isBlocked = block;
                    break;
                }
            }
            setFoods([...foods]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <>
       
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb />
                        {/* Active Orders Graph */}
                        <div className="row">
                           
                            
                            
                            <div className="col-xl-12">
                                <div className="ms-panel">
                                    <div className="ms-panel-header">
                                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>{loading && <Loader color={"pink"} size={20}/>}<h6 style={{marginLeft: 10}}>{loading ? "Loading..." : "Users List"}</h6></div>
                                    </div>
                                    <div className="ms-panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover thead-primary">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">User Name</th>
                                                        <th scope="col">Phone Number</th>
                                                        <th scope="col">Delivery Address</th>
                                                        <th scope="col">Wallet</th>
                                                        <th scope="col">Total Orders</th>
                                                        <th scope="col">Blocked Status</th>
                                                        <th scope="col">Change Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                    {foods && foods.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{item.displayName}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.deliveryAddress.knownName}</td>
                                                            <td>{item.wallet}</td>
                                                            <td>{item.numberOfOrders}</td>
                                                            <td>{item.isBlocked ? "Blocked" : "Not Blocked"}</td>
                                                            <td>
                                                                <Link><i onClick={() => changeStatus(item.id, !item.isBlocked)} className="fas fa-pencil-alt text-secondary" /></Link>
                                                            </td>
                                                    
                                                                </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>

        );
}

export default Content;
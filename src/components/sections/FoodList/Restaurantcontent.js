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
        const foods = await fetch(api("/get_food_items"),{
            method: "GET",
            headers: headers,
        });
        console.log(foods);
        const list = await foods.json();
        console.log(list);
        setFoods(list);
        setLoading(false);
    }

    const deleteFoodItem = async (id) => {
        setLoading(true);
        const response = await fetch(api("/delete_food_item"), {
            method: "DELETE",
            headers: headers,
            body: id
        });
        console.log(response);
        setLoading(false);
        if(response.ok) {
            for(let i=0; i<foods.length; i++) {
                if(foods[i].id == id) {
                    foods.splice(i,1);
                    setFoods([...foods]);
                    break;
                }
            }
        }
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
                            <div className="col-lg-6 col-md-12">
                                <div className="ms-panel ms-panel-fh">
                                    <div className="ms-panel-header">
                                        <h6>Restaurant wise sales</h6>
                                    </div>
                                    <div className="ms-panel-body">
                                        <Piechart />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="ms-panel">
                                    <div className="ms-panel-header new">
                                        <h6>Top Food Menu</h6>
                                    </div>
                                    <div className="ms-panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Food Item</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Product ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {topfoodmenutable.map((item, i) => (
                                                        <tr key={i}>
                                                            <td className="ms-table-f-w"> <img src={item.photo} alt="people" /> {item.title} </td>
                                                            <td>{item.price}</td>
                                                            <td>{item.id}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-xl-12">
                                <div className="ms-panel">
                                    <div className="ms-panel-header">
                                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>{loading && <Loader color={"pink"} size={20}/>}<h6 style={{marginLeft: 10}}>{loading ? "Loading..." : "Foods List"}</h6></div>
                                    </div>
                                    <div className="ms-panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover thead-primary">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Food Name</th>
                                                        <th scope="col">Restaurant ID</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Sizes</th>
                                                        <th scope="col">Flavors</th>
                                                        <th scope="col">Available</th>
                                                        <th scope="col">Edit</th>
                                                        <th scope="col">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                    {foods && foods.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{item.name}</td>
                                                            <td>{item.restaurantId}</td>
                                                            <td>{item.originalPrice}</td>
                                                            <td><div>
                                                                {item.sizes.map((size, index) => <p>{size.title}, {size.additionalPrice}</p>)}
                                                                </div></td>
                                                            <td><div>
                                                                {item.variants.map((flavor, index) => <p>{flavor.title}, {flavor.additionalPrice}</p>)}
                                                                </div></td>
                                                            <td>{item.isAvailable ? "Available": "Out of stock"}</td>
                                                            
                                                            <td>
                                                                <Link to={`/addfood?id=${item.id}`}><i className="fas fa-pencil-alt text-secondary" /></Link>
                                                            </td>
                                                    
                                                                <td><Link to="#"><i onClick={e => deleteFoodItem(item.id)} className="far fa-trash-alt ms-text-danger" /></Link></td>
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
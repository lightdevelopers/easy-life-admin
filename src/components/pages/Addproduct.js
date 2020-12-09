import React, { Component, useEffect, useState } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Addproductcontent from '../sections/Addproduct/Addproductcontent'
import Quickbar from '../layouts/Quickbar';
import api, {headers} from '../../api';
const Addproduct = (props) => {
    const [loading, setLoading] = useState(props.location.search.split("=")[1] ? true : false)
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        fetchRestaurants();
    } , [])
    const fetchRestaurants = async () => {
        const restaurants = await fetch(api("/get_restaurant"),{
            method: "GET",
            headers: headers,
        });
        const list = await restaurants.json();
        for(let i=0; i<list.length; i++) {
            if(list[i].id == props.location.search.split("=")[1]) {
                setRestaurant(list[i]);
                break;
            }
        }
        setLoading(false);
    }
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    {loading ? <h1>Loading... Please Wait</h1> : <Addproductcontent restaurnt={restaurant}/>}
                </main>
                <Quickbar />
            </div>
        );
}

export default Addproduct;
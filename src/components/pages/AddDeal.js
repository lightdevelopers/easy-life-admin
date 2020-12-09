import React, { Component, useEffect, useState } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Addproductcontent from '../sections/AddDeal/AddFood';
import Quickbar from '../layouts/Quickbar';
import api, {headers} from '../../api';
const Addproduct = (props) => {
    const [loading, setLoading] = useState(props.location.search.split("=")[1] ? true : false);
    const [deal, setDeal] = useState(null);

    const fetchDeals = async () => {
        const foods = await fetch(api("/get_deal"),{
            method: "GET",
            headers: headers
        });
        const list = await foods.json();
        for(let i=0; i<list.length; i++) {
            if(list[i].id == props.location.search.split("=")[1]) {
                setDeal(list[i]);
                break;
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        if(props.location.search.split("=")[1]) {
            fetchDeals();
            console.log("Fetching....")
        }
    }, []);
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    {loading ? <h1>Loading.... Please Wait</h1> : 
                    <Addproductcontent deal={deal ? deal : null}/>}
                </main>
                <Quickbar />
            </div>
        );
}

export default Addproduct;
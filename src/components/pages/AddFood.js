import React, { Component, useEffect, useState } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Addproductcontent from '../sections/AddFood/AddFood';
import Quickbar from '../layouts/Quickbar';
import api, {headers} from '../../api';
const Addproduct = (props) => {
    const [loading, setLoading] = useState(props.location.search.split("=")[1] ? true : false);
    const [food, setFood] = useState(null);
    const fetchFoods = async () => {
        const foods = await fetch(api("/get_food_items"),{
            method: "GET",
            headers: headers,
        });
        const list = await foods.json();
        console.log(list);
        for(let i=0; i<list.length; i++) {
            if(list[i].id == props.location.search.split("=")[1]) {
                console.log("FOUND")
                setFood(list[i]);
                break;
            }
        }
        setLoading(false);
    }
    useEffect(() => {
        if(props.location.search.split("=")[1]) {
            fetchFoods()
        }
    }, [])

        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    {loading ? <h1>Please Wait</h1> : 
                    <Addproductcontent food={food ? food : null}/>
    }
                </main>
                <Quickbar />
            </div>
        );
    }

export default Addproduct;
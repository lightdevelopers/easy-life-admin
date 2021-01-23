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
import firebase from 'firebase';

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

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
const Content = (props) => {
    const [loading, setLoading] = useState(false);
    const [imageLoading,setImageLoading] = useState(false);
    const [success, setSuccess] = useState(false)

    const [foods,setFoods] = useState(null);


    const [riderPhoto, setRiderPhoto] = useState("");
    const [clickabale, setClickable] = useState(false);
    const [url, setUrl] = useState("");

    const fetchFoods = async () => {
        setLoading(true);
        const response = await fetch(api("/get_flash_cards"));
        const items = await response.json();
        setFoods(items);
        setLoading(false);
    }

    const addcard = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch(api("/add_flash_card"), {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                id: "flashcard_" + create_UUID(),
                photoUri: riderPhoto,
                clickable: clickabale,
                url: url,
                counter: 0.0
            })
        });

        if(response.ok) {
            setSuccess(true)
        }
        setLoading(false);
    }

    const deleteFoodItem = async (id) => {
        setLoading(true);
        const response = await fetch(api(`/delete_flash_card?cardId=${id}`), {
            method: "DELETE",
            headers: headers,
        });
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
                        {/* Active Orders Graph */}
                        <div className="row">
                        <div className="col-xl-12 col-md-12">
                        {success && <div className="alert alert-success" role="alert">
                            <strong>Well done!</strong> Flash Card created succesfully
      </div>}
      </div>
                    </div>
                    <div className="col-xl-12 col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-header">
                                <h6>Flash Card Form</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form className="needs-validation clearfix" noValidate>
                                    <div className="form-row">

                                   
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom18">URL</label>
                                            <div className="input-group">
                                                <input value={url} onChange={e => setUrl(e.target.value)} type="text" className="form-control" id="validationCustom18" placeholder="Url..." defaultValue="Pizza" required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
                                        </div>
                                       
                                       
                            
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom12">Flashcard Image</label>
                                            <div className="custom-file">
                                                <input onChange={e => {
                                                    if(!e.target.files[0])
                                                    return;
                                                    setImageLoading(true)
                                                    firebase.storage().ref("/foods").child(new Date().toString()).put(e.target.files[0]).then(res => {
                                                        res.ref.getDownloadURL().then(url => {
                                                            setRiderPhoto(url);
                                                            setImageLoading(false);
                                                        })
                                                    });
                                                }} type="file" accept="image/x-png,image/gif,image/jpeg"  className="custom-file-input" id="validatedCustomFile" />
                                                <label className="custom-file-label" htmlFor="validatedCustomFile">Upload Image...</label>
                                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                                            </div>
                                        </div>

                                        <div className="ms-panel-header new">
                                        <p className="medium">Clickable</p>
                                        <div>
                                            <label className="ms-switch">
                                                <input checked={clickabale} onChange={e => setClickable(e.target.checked)} type="checkbox" />
                                                <span className="ms-switch-slider round" />
                                            </label>
                                        </div>
                                    </div>

                                        <div className="col-md-12 mb-3">
                                            {imageLoading && <Loader />}
                                        {riderPhoto && <img style={{width: "100%", maxHeight: 300}} src={riderPhoto}/>}
                                        </div>

                                        <div className="col-md-6 mb-3">
                                        <button onClick={addcard} className="btn btn-secondary d-block" type="submit">{loading ? "Please Wait..." : "Save"}</button>
                                        
                                    </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>





                            
                            <div className="col-xl-12">
                                <div className="ms-panel">
                                    <div className="ms-panel-header">
                                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>{loading && <Loader color={"pink"} size={20}/>}<h6 style={{marginLeft: 10}}>{loading ? "Loading..." : "Flashcards List"}</h6></div>
                                    </div>
                                    <div className="ms-panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover thead-primary">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Card ID</th>
                                                        <th scope="col">Card URL</th>
                                                        <th scope="col">Card Clickable</th>
                                                        <th scope="col">Card Counter</th>
                                                        <th scope="col">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                    {foods && foods.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{item.id}</td>
                                                            <td>{item.url}</td>
                                                            <td>{item.clickable ? "YES" : "NO"}</td>
                                                            <td>{item.counter}</td>
                                                           
                                                    
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
                    
            </>

        );
}

export default Content;
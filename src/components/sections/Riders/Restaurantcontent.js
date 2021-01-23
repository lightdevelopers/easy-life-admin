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
const Content = (props) => {

    const [editable ,setEditable] = useState(null);

    const [loading, setLoading] = useState(false);
    const [imageLoading,setImageLoading] = useState(false);
    const [success, setSuccess] = useState(false)

    const [foods,setFoods] = useState(null);
    
    const [id, setID] = useState(editable ? editable.riderId : null);
    const [riderDisplayName, setRiderDisplayName] = useState(editable ? editable.riderDisplayName : "");
    const [riderPassword, setRiderPassword] = useState(editable ? editable.password : "");
    const [riderPhoto, setRiderPhoto] = useState(editable ? editable.riderPhoto : "");
    const [phoneNumber, setPhoneNumber] = useState(editable ? editable.phoneNumber :  "");

   console.log(foods)

    const fetchFoods = async () => {
        setLoading(true);
        const response = await fetch(api("/get_riders"), {
            method: "GET",
            headers: headers,
        });

        const riders = await response.json();
        setFoods(riders);
        setLoading(false);
    }

    const addRider = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(editable) {
            const response = await fetch(api("/edit_rider"), {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    riderId: id ? id : "",
                    newDisplayName: riderDisplayName,
                    newImageURI: riderPhoto,
                    newPhoneNumber: phoneNumber,
                })
            });

            if(response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 2000)
            }
            setLoading(false);
            setID(null);
            setEditable(null);
            return;
        }

        const response = await fetch(api("/create_rider"), {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                riderDisplayName: riderDisplayName,
                riderId: riderDisplayName.toLowerCase(),
                riderPassword: riderPassword,
                riderPhoto: riderPhoto,
                phoneNumber: phoneNumber
            })
        });

        if(response.ok) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 2000)
        }
        setLoading(false);
    }

    const deleteFoodItem = async (val) => {
        console.log("Food",val);
        setLoading(true);
        const response = await fetch(api("/delete_rider"), {
            method: "DELETE",
            headers: headers,
            body: (val)
        });
        setLoading(false);
        if(response.ok) {
            for(let i=0; i<foods.length; i++) {
                if(foods[i].id == val) {
                    foods.splice(i,1);
                    setFoods([...foods]);
                    break;
                }
            }
        }
    }

     useEffect(() => {
        if(editable != null) {
            setID(editable.id);
            setRiderDisplayName(editable.displayName);
            setRiderPhoto(editable.imageURI);
            setPhoneNumber(editable.phoneNumber);
        }

    }, [editable])

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
                            <strong>Well done!</strong> Rider created succesfully
      </div>}
      </div>
                    </div>
                    <div className="col-xl-12 col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-header">
                                <h6>Rider Form</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form className="needs-validation clearfix" noValidate>
                                    <div className="form-row">

                                   
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom18">Rider Name</label>
                                            <div className="input-group">
                                                <input value={riderDisplayName} onChange={e => setRiderDisplayName(e.target.value)} type="text" className="form-control" id="validationCustom18" placeholder="Rider Name" defaultValue="Pizza" required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
                                        </div>
                                       
                                       
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom25">Rider Password</label>
                                            <div className="input-group">
                                                <input value={riderPassword} onChange={e => setRiderPassword(e.target.value)} type="text" className="form-control" id="validationCustom25" placeholder="Password..." required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom25">Rider Phone Number</label>
                                            <div className="input-group">
                                                <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} type="text" className="form-control" id="validationCustom25" placeholder="Phone Number" required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>
                            
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom12">Product Image</label>
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
                                                <label className="custom-file-label" htmlFor="validatedCustomFile">Upload Images...</label>
                                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            {imageLoading && <Loader />}
                                        {riderPhoto && <img style={{width: "100%", maxHeight: 300}} src={riderPhoto}/>}
                                        </div>

                                        <div className="col-md-6 mb-3">
                                        <button onClick={addRider} className="btn btn-secondary d-block" type="submit">{loading ? "Please Wait..." : "Save"}</button>
                                        
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
                                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>{loading && <Loader color={"pink"} size={20}/>}<h6 style={{marginLeft: 10}}>{loading ? "Loading..." : "Riders List"}</h6></div>
                                    </div>
                                    <div className="ms-panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover thead-primary">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Rider ID</th>
                                                        <th scope="col">Rider Name</th>
                                                        <th scope="col">Rider Number</th>
                                                        <th scope="col">Edit</th>
                                                        <th scope="col">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                    {foods && foods.map((item, i) => (
                                                        <tr key={item.i}>
                                                            <td>{item.riderId}</td>
                                                            <td>{item.displayName}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>
                                                                <Link onClick={e => setEditable(item)}><i className="fas fa-pencil-alt text-secondary" /></Link>
                                                            </td>
                                                    
                                                                <td><Link to="#"><i onClick={e => deleteFoodItem(item.riderId)} className="far fa-trash-alt ms-text-danger" /></Link></td>
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
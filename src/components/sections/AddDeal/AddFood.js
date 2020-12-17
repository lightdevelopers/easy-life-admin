import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import api, { headers } from '../../../api';
import { useEffect } from 'react';
import firebase from 'firebase';
import Loader from 'react-spinners/CircleLoader'

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
const Addproductcontent = ({deal}) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ids, setIds] = useState([]);
    const [dealName, setDealName] = useState(deal ? deal.dealName : "");
    const [deliveryTime, setDeliveryTime] = useState(deal ? deal.deliveryTime : 0);
    const [price, setPrice] = useState(deal ? deal.oldPrice : 0);
    const [newPrice, setNewPrice] = useState(deal ? deal.newPrice : 0);
    const [image, setImage] = useState(deal ? deal.imageURI : null);
    const [foodItemsName, setFoodItemsName] = useState(deal ? deal.foodItemsNames : []);
    const [foodItem, setFoodItem] = useState("");
    const [restaurantId, setRestaurantId] = useState(deal ? deal.restaurantId : "");
    const [available, setAvailable] = useState(deal ? deal.isAvailable : true);

    const [imageLoading, setImageLoading] = useState(false);

    const [opening, setOpening] = useState(deal ? deal.openingTime : "");
    const [closing, setClosing] = useState(deal ? deal.closingTime : "");

    const addFood = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        if(deal) {
            setLoading(true);
            const response = await fetch(api("/edit_deal"),{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Type": "application/json"
                },
                body: JSON.stringify({
                    id: deal.id,
                    dealNewName: dealName,
                    newPhoto: image,
                    newFoodItemsNames: foodItemsName,
                    restaurantId: restaurantId,
                    isAvailable: available,
                    newClosingTime: closing,
                    newOpeningTime: opening,
                    newOldPrice: price,
                    newNewPrice: newPrice,
                    newPercentageOff: ((price - newPrice) / price) * 100,
                    ratings: 5.0,
                    newDeliveryTime: deliveryTime
    
                })

                
            });

            if(response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 3000)
            } setLoading(false);

            return;
        }


        const response = await fetch(api("/add_deal"),{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
            body: JSON.stringify({
                id: "deal_" + create_UUID(),
                dealName: dealName,
                photo: image,
                foodItemsNames: foodItemsName,
                restaurantId: restaurantId,
                isAvailable: available,
                closingTime: closing,
                openingTime: opening,
                oldPrice: price,
                newPrice: newPrice,
                percentageOff: ((price - newPrice) / price) * 100,
                ratings: 5.0,
                deliveryTime: deliveryTime

            })
        });

        if(response.ok) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000)
        } setLoading(false);
    }

    useEffect(() => {
       (async () => {
        const response = await fetch(api("/get_restaurant", {
            method: "GET",
            headers: headers,
        }));
        console.log(response);
        const data = await response.json();
        for(let i=0; i<data.length; i++) {
            ids.push(data[i].id);
            
        }
        setIds([...ids])
       })();
    } , [])
        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb/>
                        {success && <div className="alert alert-success" role="alert">
                            <strong>Well done!</strong> Deal created succesfully
      </div>}
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-header">
                                <h6>Add Deal Form</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form className="needs-validation clearfix" noValidate>
                                    <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                    <label htmlFor="validationCustom23">Restaurant ID</label>
                                            <div className="input-group">
                                                <select disabled={deal ? true: false} onChange={e => setRestaurantId(e.target.options[e.target.selectedIndex].value)} value={restaurantId} className="form-control" id="validationCustom23" required>
                                                    <option>Select Restaurant ID</option>
                                                    {ids && ids.map((id,index) => <option value={id} key={id}>{id}</option>)}
                                                </select>
                                                <div className="invalid-feedback">
                                                    Please select a Currency
                  </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom18">Deal Name</label>
                                            <div className="input-group">
                                                <input value={dealName} onChange={e => setDealName(e.target.value)} type="text" className="form-control" id="validationCustom18" placeholder="Product Name" defaultValue="Pizza" required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
                                        </div>
                                       
                                       
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom25">Old Price</label>
                                            <div className="input-group">
                                                <input value={price} onChange={e => setPrice(e.target.value)} type="number" className="form-control" id="validationCustom25" placeholder="10" required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom25">New Price</label>
                                            <div className="input-group">
                                                <input value={newPrice} onChange={e => setNewPrice(e.target.value)} type="number" className="form-control" id="validationCustom25" placeholder="10" required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>




                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom25">Food Name</label>
                                            <div className="input-group">
                                                <input value={foodItem} onChange={e => setFoodItem(e.target.value)} type="text" className="form-control" id="validationCustom25" placeholder="10" required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>

                                        {foodItemsName.map((val,index) => {
                                               return <div className="col-md-12 mb-3" style={{backgroundColor: "#E7E7E7",alignItems: "center", display: "flex",flexDirection: "row", justifyContent: "space-between", padding: 10}}>
                                               <p>{val}</p>
                                               <i class="fa fa-trash" aria-hidden="true" onClick={() => {
                                                   foodItemsName.splice(index,1);
                                                   setFoodItemsName([...foodItemsName]);
                                               }}></i>
                                               </div>
                                           })}

                                        <div className="col-md-12 mb-3">
                                            <div className="input-group">
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    foodItemsName.push(foodItem);
                                                    setFoodItemsName([...foodItemsName]);
                                                    setFoodItem("");
                                                }} className="btn btn-primary">Add</button>
                                            </div>
                                        </div>
                                        
                                       
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="ms-panel">
                                    <div className="ms-panel-header">
                                        <h6>More Details </h6>
                                    </div>
                                    <div className="ms-panel-body">
                                <form className="needs-validation clearfix" noValidate>
                                    <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom12">Product Image</label>
                                            
                                            <div className="custom-file">
                                                <input onChange={e => {
                                                    if(!e.target.files[0])
                                                    return;
                                                     setImageLoading(true)
                                                     firebase.storage().ref("/foods").child(new Date().toString()).put(e.target.files[0]).then(res => {
                                                         res.ref.getDownloadURL().then(url => {
                                                             setImage(url);
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
                                        {image && <img style={{width: "100%", maxHeight: 300}} src={image}/>}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                        <label htmlFor="validationCustom18">Opening Time</label>
                                            <div className="input-group">
                                                <input value={opening} onChange={e => setOpening(e.target.value)} type="time" className="form-control" id="validationCustom18" placeholder="xx:yy am/pm"  required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                        <label htmlFor="validationCustom18">Closing Time</label>
                                            <div className="input-group">
                                                <input value={closing} onChange={e => setClosing(e.target.value)} type="time" className="form-control" id="validationCustom18" placeholder="xx:yy am/pm" required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom25">Delivery Time</label>
                                            <div className="input-group">
                                                <input value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)} type="number" className="form-control" id="validationCustom25" placeholder="10" required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>

                                        </div>
                                        </form>
                                        </div>
                                    
                                    <div className="ms-panel-header new">
                                        <p className="medium">Available</p>
                                        <div>
                                            <label className="ms-switch">
                                                <input checked={available} onChange={e => setAvailable(e.target.checked)} type="checkbox" />
                                                <span className="ms-switch-slider round" />
                                            </label>
                                        </div>
                                    </div>

                                    
                                    
                                    <div className="ms-panel-header new">
                                        <button onClick={addFood} className="btn btn-secondary d-block" type="submit">{loading ? "Please Wait..." : "Save"}</button>
                                        <button className="btn btn-primary d-block" type="submit">Save and Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default Addproductcontent;
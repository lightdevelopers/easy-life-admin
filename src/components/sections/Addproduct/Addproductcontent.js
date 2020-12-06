import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import api, { headers } from '../../../api';

const Addproductcontent = (props) => {

    const [success, setSuccess] = useState(false);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("asdasd");
    const [opening, setOpening] = useState("");
    const [closing, setClosing] = useState("");
    const [delivery, setDelivery] = useState(0);
    const [phone, setPhone] = useState("");
    const [share, setShare] = useState(0);
    const [isClose, setIsClose] = useState(false);
    const [reson, setReason] = useState("");

    const [password, setPassword] = useState("");

    const addRestaurant = async (e) => {
        e.preventDefault();
        console.log("INSERTING.....")
        setSuccess(false);
        const response = await fetch(api(`/add_restaurant?password=${password}`),{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept-Type": "application/json",
            },
            body: JSON.stringify({
                id: name.replace(/\s/g, '').toLocaleUpperCase(),
                name: name,
                address: address,
                restaurantImage: image,
                openingTime: opening,
                closingTime: closing,
                deliveryCharges: delivery,
                phoneNumber: phone,
                sharePercentage: share,
                isClose: isClose,
                closeReason: reson
            })
        });

        if(response.ok) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000)
        }

        
    }
        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb/>
                        {success && <div className="alert alert-success" role="alert">
                            <strong>Well done!</strong> Restaurant created succesfully
      </div>}
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-header">
                                <h6>Add Restaurant Form</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form className="needs-validation clearfix" noValidate>
                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom18">Restaurant Name</label>
                                            <div className="input-group">
                                                <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="validationCustom18" placeholder="Product Name" defaultValue="Pizza" required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
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
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom24">Share Percentage</label>
                                            <div className="input-group">
                                                <input value={share} onChange={e => setShare(e.target.value)} type="number" step=".01" className="form-control" id="validationCustom24" placeholder="x.xx" required />
                                                <div className="invalid-feedback">
                                                    Quantity
                  </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom25">Delivery Charges</label>
                                            <div className="input-group">
                                                <input value={delivery} onChange={e => setDelivery(e.target.value)} type="number" className="form-control" id="validationCustom25" placeholder="$10" required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom12">Product Image</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="validatedCustomFile" />
                                                <label className="custom-file-label" htmlFor="validatedCustomFile">Upload Images...</label>
                                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                                            </div>
                                        </div>
                                       
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom12">Reason</label>
                                            <div className="input-group">
                                                <textarea value={reson} onChange={e => setReason(e.target.value)} rows={5} id="validationCustom12" className="form-control" placeholder="your Reason Here...." required />
                                                <div className="invalid-feedback">
                                                    Your reason here....
                  </div>
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
                                            <label htmlFor="validationCustom18">Phone Number</label>
                                            <div className="input-group">
                                                <input value={phone} onChange={e => setPhone(e.target.value)} type="text" className="form-control" id="validationCustom18" placeholder="Phone number" required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom18">Restaurant Address</label>
                                            <div className="input-group">
                                                <input value={address} onChange={e => setAddress(e.target.value)} type="text" className="form-control" id="validationCustom18" placeholder="Address...." required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom18">Restaurant Password</label>
                                            <div className="input-group">
                                                <input value={password} onChange={e => setPassword(e.target.value)} type="text" className="form-control" id="validationCustom18" placeholder="Password..." required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
                                        </div>
                                        </div>
                                        </form>
                                        </div>
                                    
                                    <div className="ms-panel-header new">
                                        <p className="medium">Is Close</p>
                                        <div>
                                            <label className="ms-switch">
                                                <input checked={isClose} onChange={e => setIsClose(e.target.checked)} type="checkbox" />
                                                <span className="ms-switch-slider round" />
                                            </label>
                                        </div>
                                    </div>

                                    
                                    
                                    <div className="ms-panel-header new">
                                        <button onClick={addRestaurant} className="btn btn-secondary d-block" type="submit">Save</button>
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
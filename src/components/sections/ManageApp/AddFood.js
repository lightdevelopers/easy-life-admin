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
const Addproductcontent = ({food}) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [appclosed, setAppclosed] = useState(false);
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
                                <h6>Admin Password</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form className="needs-validation clearfix" noValidate>
                                    <div className="form-row">

                                    <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom18">Old Password</label>
                                            <div className="input-group">
                                                <input value={oldPassword} onChange={e => setOldPassword(e.target.value)} type="text" className="form-control" id="validationCustom18" placeholder="Product Name" defaultValue="Pizza" required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom18">New Password</label>
                                            <div className="input-group">
                                                <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="text" className="form-control" id="validationCustom18" placeholder="Product Name" defaultValue="Pizza" required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
                                        </div>
                                       
                                       
                                        

                                       


                                      
                                        <div className="col-md-12 mb-3">
                                            <div className="input-group">
                                                <button onClick={(e) => {
                                                }} className="btn btn-primary">Change Password</button>
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
                                        <h6>Manage App</h6>
                                    </div>
                                    <div className="ms-panel-body">
                                <form className="needs-validation clearfix" noValidate>
                                    <div className="form-row">
                                   
                                       
                                        </div>
                                        </form>
                                        </div>
                                    
                                    <div className="ms-panel-header new">
                                        <p className="medium">App Closed?</p>
                                        <div>
                                            <label className="ms-switch">
                                                <input checked={appclosed} onChange={e => setAppclosed(e.target.checked)} type="checkbox" />
                                                <span className="ms-switch-slider round" />
                                            </label>
                                        </div>
                                    </div>

                                    
                                    
                                    <div className="ms-panel-header new">
                                        <button onClick={() => {}} className="btn btn-secondary d-block" type="submit">{loading ? "Please Wait..." : "Save"}</button>
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
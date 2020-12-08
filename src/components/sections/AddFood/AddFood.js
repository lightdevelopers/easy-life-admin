import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import api, { headers } from '../../../api';
import { useEffect } from 'react';
import firebase from 'firebase';
import Loader from 'react-spinners/CircleLoader'
const Addproductcontent = (props) => {

    const [success, setSuccess] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [ids, setIds] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const [restaurantId, setRestaurantId] = useState("");
    const [flavors, setFlavors] = useState([]);
    const [flavor, setFlavor] = useState("")
    const [flavorDescription, setFlavorDescription] = useState("");
    const [flavorPrice, setFlavorPrice] = useState(0)
    const [sizes, setSizes] = useState([]);
    const [sizesPrice, setSizesPrice] = useState(0);
    const [size, setSize] = useState("");
    const [category, setCategory] = useState("");
    const [available, setAvailable] = useState(true);

    const [opening, setOpening] = useState("");
    const [closing, setClosing] = useState("");

    const addFood = async (e) => {
        e.preventDefault();
        console.log("INSERTING.....")
        setSuccess(false);
        const response = await fetch(api("/add_food_item"),{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
            body: JSON.stringify({
                id: new Date().toString(),
                name: name,
                price: price,
                imageUri: image,
                restaurantId: restaurantId,
                variants: flavors,
                sizes: sizes,
                category: category,
                isAvailable: available ,
                closingTime: closing,
                openingTime: opening
            })
        });

        if(response.ok) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000)
        }   
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
                            <strong>Well done!</strong> Restaurant created succesfully
      </div>}
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-header">
                                <h6>Add Food Form</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form className="needs-validation clearfix" noValidate>
                                    <div className="form-row">

                                    <div className="col-md-12 mb-3">
                                    <label htmlFor="validationCustom23">Restaurant ID</label>
                                            <div className="input-group">
                                                <select onChange={e => setRestaurantId(e.target.options[e.target.selectedIndex].value)} value={restaurantId} className="form-control" id="validationCustom23" required>
                                                    <option>Select Restaurant ID</option>
                                                    {ids && ids.map((id,index) => <option value={id} key={id}>{id}</option>)}
                                                </select>
                                                <div className="invalid-feedback">
                                                    Please select a Currency
                  </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom18">Food Name</label>
                                            <div className="input-group">
                                                <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="validationCustom18" placeholder="Product Name" defaultValue="Pizza" required />
                                                <div className="valid-feedback">
                                                    Looks good!
                  </div>
                                            </div>
                                        </div>
                                       
                                       
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom25">Price</label>
                                            <div className="input-group">
                                                <input value={price} onChange={e => setPrice(e.target.value)} type="number" className="form-control" id="validationCustom25" placeholder="10" required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom25">Flavor</label>
                                            <div className="input-group">
                                                <input value={flavor} onChange={e => setFlavor(e.target.value)} type="text" className="form-control" id="validationCustom25" placeholder="Flavor Name" required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom25">Additional Price</label>
                                            <div className="input-group">
                                                <input value={flavorPrice} onChange={e => setFlavorPrice(e.target.value)} type="number" className="form-control" id="validationCustom25" placeholder="10" required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom25">Flavor Decription</label>
                                            <div className="input-group">
                                                <input value={flavorDescription} onChange={e => setFlavorDescription(e.target.value)} type="text" className="form-control" id="validationCustom25" placeholder="Flavor Description" required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>
                                        
                                           {flavors.map((val,index) => {
                                               return <div className="col-md-12 mb-3" style={{backgroundColor: "#E7E7E7",alignItems: "center", display: "flex",flexDirection: "row", justifyContent: "space-between", padding: 10}}>
                                               <p>{val.title}, {val.additionalPrice} -> {val.description}</p>
                                               <i class="fa fa-trash" aria-hidden="true" onClick={() => {
                                                   flavors.splice(index,1);
                                                   setFlavors([...flavors]);
                                               }}></i>
                                               </div>
                                           })}
                                        

                                        <div className="col-md-12 mb-3">
                                            <div className="input-group">
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    flavors.push({
                                                        title: flavor,
                                                        description: flavorDescription,
                                                        additionalPrice: flavorPrice
                                                    });
                                                    setFlavors([...flavors]);
                                                    setFlavor("");
                                                    setFlavorPrice(0);
                                                    setFlavorDescription("");
                                                }} className="btn btn-primary">Add</button>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom25">Size</label>
                                            <div className="input-group">
                                                <input value={size} onChange={e => setSize(e.target.value)} type="text" className="form-control" id="validationCustom25" placeholder="Size..." required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom25">Additional Price</label>
                                            <div className="input-group">
                                                <input value={sizesPrice} onChange={e => setSizesPrice(e.target.value)} type="number" className="form-control" id="validationCustom25" placeholder="10" required />
                                                <div className="invalid-feedback">
                                                    Price
                  </div>
                                            </div>
                                        </div>

                                        {sizes.map((val,index) => {
                                               return <div className="col-md-12 mb-3" style={{backgroundColor: "#E7E7E7",alignItems: "center", display: "flex",flexDirection: "row", justifyContent: "space-between", padding: 10}}>
                                               <p>{val.title}, {val.additionalPrice}</p>
                                               <i class="fa fa-trash" aria-hidden="true" onClick={() => {
                                                   sizes.splice(index,1);
                                                   setSizes([...sizes]);
                                               }}></i>
                                               </div>
                                           })}

                                        <div className="col-md-12 mb-3">
                                            <div className="input-group">
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    sizes.push({
                                                        title: size,
                                                        additionalPrice: sizesPrice
                                                    });
                                                    setSizes([...sizes]);
                                                    setSize("");
                                                    setSizesPrice(0);
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
                                                    setImageLoading(true)
                                                    firebase.storage().ref("/foods").child(new Date().toString()).put(e.target.files[0]).then(res => {
                                                        res.ref.getDownloadURL().then(url => {
                                                            setImage(url);
                                                            setImageLoading(false);
                                                        })
                                                    });
                                                }} type="file" className="custom-file-input" id="validatedCustomFile" />
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
                                            <label htmlFor="validationCustom18">Category</label>
                                            <div className="input-group">
                                                <input value={category} onChange={e => setCategory(e.target.value)} type="text" className="form-control" id="validationCustom18" placeholder="Category" required />
                                                <div className="valid-feedback">
                                                    Looks good!
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
                                        <button onClick={addFood} className="btn btn-secondary d-block" type="submit">Save</button>
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
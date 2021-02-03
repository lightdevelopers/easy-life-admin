import React, { Component, useEffect, useState } from 'react';
import api, {headers} from '../../../api';
const Ordertable  = () => {
    const [orders, setOrders] = useState(null);
    const [filtered, setFiltered] = useState([]);

    console.log(filtered);
    const fetchOrder = async() => {
        let myOrders = [];
        const response1 = await fetch(api("/get_all_completed_orders"));
        console.log(response1);
        const completed = await response1.json();
        for(let i=0; i<completed.length; i++) {
            completed[i].type = "Completed";
        }
        console.log(completed);
        myOrders = [...myOrders, ...completed];
        const response2 = await fetch(api("/get_all_pending_orders"));
        const pending = await response2.json();
        for(let i=0; i<pending.length; i++) {
            pending[i].type = "Pending";
        }
        myOrders = [...myOrders, ...pending];
        const response3 = await fetch(api("/get_all_cancelled_orders"));
        const cancelled = await response3.json();
        for(let i=0; i<cancelled.length; i++) {
            cancelled[i].type = "Cancelled";
        }
        myOrders = [...myOrders, ...cancelled];
        const response4 = await fetch(api("/get_all_on_going_orders"));
        const onGoing = await response4.json();
        for(let i=0; i<onGoing.length; i++) {
            onGoing[i].type = "onGoing";
        }
        myOrders = [...myOrders, ...onGoing];

        setOrders([...myOrders])
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    useEffect(() => {
        if(orders != null)
        setFiltered([...filtered, ...orders]);
    }, [orders])
        return (
            <div className="col-12">
                <div className="ms-panel">
                    <div className="ms-panel-header">
                        <h6> Order List</h6>
                        <select style={{marginTop: 10}} onChange={e => {
                            if(orders == null)
                                return;
                            const selected = e.target.options[e.target.selectedIndex].value;
                            const items = orders.filter(order => order.type == selected);
                            setFiltered([...items]);
                        }}>
                            <option value="Filter">Filter</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="onGoing">On Going</option>
                        </select>
                    </div>
                    <div className="ms-panel-body">
                        <div className="table-responsive">
                            <table className="table table-hover thead-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">items Bill</th>
                                        <th scope="col">order Notes</th>
                                        <th scope="col">Order Items</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered && filtered.map((order, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{order.orderId}</th>
                                                <td>{order.phoneNumber}</td>
                                                <td>{order.deliveryAddress.address} {order.deliveryAddress.knownName}</td>
                                                <td>{order.itemsBill}</td>
                                                <td>{order.orderNotes}</td>
                                                <td>{order.orderItems.map(item => <p>{item.itemName} (x{item.count})</p>)}</td>
                                                <td><span className={order.type == "Completed" ? "badge badge-success" : order.type == "Pending" ? "badge badge-warning" : "badge badge-danger"}>{order.type}</span></td>
                                             </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Ordertable;
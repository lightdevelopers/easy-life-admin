import React, { Component, useEffect, useState } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Addproductcontent from '../sections/users/Restaurantcontent';
import Quickbar from '../layouts/Quickbar';
import api, {headers} from '../../api';
const Addproduct = (props) => {

        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    <Addproductcontent/>
                </main>
                <Quickbar />
            </div>
        );
    }

export default Addproduct;
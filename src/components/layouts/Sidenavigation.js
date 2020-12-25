import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

import logo from '../../assets/img/green.png';

class Sidenavigation extends Component {

    removeoverlay = () => {
        $('.ms-body').toggleClass('ms-aside-left-open');
        $('#ms-side-nav').toggleClass('ms-aside-open');
        $(".ms-aside-overlay.ms-overlay-left").toggleClass('d-block');
    }
    componentDidMount() {
        function setActiveMenuItem() {
            $('.ms-main-aside .menu-item>a').on('click', function () {
                $(this).removeAttr('href');
                var element = $(this).parent('li');
                if (element.hasClass('active')) {
                    element.removeClass('active');
                    element.find('li').removeClass('active');
                    element.find('.collapse').slideUp();
                } else {
                    element.addClass('active');
                    element.children('.collapse').slideDown();
                    element.siblings('li').children('.collapse').slideUp();
                    element.siblings('li').removeClass('active');
                    element.siblings('li').find('li').removeClass('active');
                    element.siblings('li').find('.collapse').slideUp();
                }
            });
        }
        setActiveMenuItem();
    }
    render() {
        return (
            <div>
                <div className="ms-aside-overlay ms-overlay-left ms-toggler" onClick={this.removeoverlay}></div>
                <div className="ms-aside-overlay ms-overlay-right ms-toggler"></div>
                <Scrollbar id="ms-side-nav" className="side-nav fixed ms-aside-scrollable ms-aside-left">
                    {/* Logo */}
                    <div className="logo-sn ms-d-block-lg">
                        <Link className="pl-0 ml-0 text-center" to="/">
                            <img src={logo} style={{width: 300, height: 200}} alt="logo" />
                        </Link>
                    </div>
                    {/* Navigation */}
                    <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">
                        {/* Dashboard */}
                        <li className="menu-item">
                            <Link to="/" className="has-chevron"> <span><i className="material-icons fs-16" >dashboard</i>Dashboard </span>
                            </Link>
                            
                        </li>
                        {/* /Dashboard */}
                        {/* product */}
                        <li className="menu-item">
                            <Link to="#" className="has-chevron"> <span><i className="fa fa-archive fs-16" />Restaurants </span>
                            </Link>
                            <ul id="product" className="collapse" aria-labelledby="product" data-parent="#side-nav-accordion">
                                <li> <Link to="/restaurant-list" >Restaurants List</Link>
                                </li>
                                <li> <Link to="/add-product" >Add Restaurant</Link>
                                </li >
                                {/*<li> <Link to="/product-detail" >Product Detail</Link>
                                </li >*/}
                            </ul >
                        </li >
                        {/* product end */}
                        {/* orders */}
                       
                        {/* orders end */}
                        {/* restaurants 
                        <li className="menu-item">
                            <Link to="/restaurant-list"> <span><i className="fa fa-tasks fs-16" />Restaurants List</span>
                            </Link>
                        </li >*/}
                        {/* restaurants end */}
                        {/* Invoice */}
                        <li className="menu-item">
                            <Link to="#" className="has-chevron"> <span><i className="fas fa-file-invoice fs-16" />Foods </span>
                            </Link>
                            <ul id="invoice" className="collapse" aria-labelledby="invoice" data-parent="#side-nav-accordion">
                                <li> <Link to="/foodlist" >Foods List</Link>
                                </li>
                                <li> <Link to="/addfood" >Add Food</Link>
                                </li>
                            </ul >
                        </li >

                        <li className="menu-item">
                            <Link to="#" className="has-chevron"> <span><i className="fa fa-archive fs-16" />Deals </span>
                            </Link>
                            <ul id="product" className="collapse" aria-labelledby="product" data-parent="#side-nav-accordion">
                                <li> <Link to="/deallist" >Deals List</Link>
                                </li>
                                <li> <Link to="/adddeal" >Add Deal</Link>
                                </li >
                                {/*<li> <Link to="/product-detail" >Product Detail</Link>
                                </li >*/}
                            </ul >
                        </li >
                        <li className="menu-item">
                            <Link to="/riders"> <span><i className="fas fa-clipboard-list fs-16" />Riders</span>
                            </Link>
                        </li >
                        <li className="menu-item">
                            <Link to="/flashcard"> <span><i className="fas fa-clipboard-list fs-16" />Flash Card</span>
                            </Link>
                        </li >
                        <li className="menu-item">
                            <Link to="/orders"> <span><i className="fas fa-clipboard-list fs-16" />Orders</span>
                            </Link>
                        </li >
                        {/* Invoice end */}
                        {/* customers*/}
                        
                        <li className="menu-item">
                        <Link to="/users"> <span><i className="fas fa-users fs-16" />Users</span>
                            </Link>
                        </li >

                        <li className="menu-item">
                        <Link to="/manage-app"> <span><i className="fas fa-cog fs-16" />Manage App</span>
                            </Link>
                        </li >

                        
                        <li className="menu-item">
                        <Link> <span><i className="fas fa-cog fs-16" />Reports</span>
                            </Link>
                        </li >
                        {/* Customers  end */}
                        {/* sales */}
                        
                        {/* /Apps */}
                    </ul >
                </Scrollbar >
            </div >
        );
    }
}

export default Sidenavigation;
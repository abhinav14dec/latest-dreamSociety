import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import $ from 'jquery';
import './common.css';
import ReactDOM from 'react-dom';

class Demo extends Component {
    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollIntoView();
        $(document).ready(function () {

            $('#sidebarCollapse').on('click', function () {
                // $("#sidebar").toggle().animate();
                // $('#sidebar').toggleClass('inactive active');
                if ($('#sidebar').hasClass('active')) {
                    $('#sidebar').removeClass('active').addClass('inactive');
                } else {
                    $('#sidebar').removeClass('inactive').addClass('active');
                }
            });

            $('#body').on('click', function () {
                if ($('#sidebar').hasClass('active')) {
                    $('#sidebar').removeClass('active').addClass('inactive');
                }

            });


        });
    }
    // logout = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user-type');
    //     return this.props.history.replace('/')
    // }

    // changePassword=()=>{ 
    //     console.log("password")
    //     return this.props.history.replace('/tenantDashboard/changePasswordTenant')
    // }

    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark" style={{ zIndex: "1001" }}>

                    <div id="content">

                        <div className="container-fluid">

                            <button type="button" id="sidebarCollapse" className="btn btn-info bg-dark">

                                <Icon name="sidebar" style={{ color: 'white', cursor: 'pointer' }} />


                            </button>

                        </div>
                    </div>
                    <Link className="navbar-brand" to="/tenantDashboard"><i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa mr-1">&#xf1ad;</i>DRE@M SOCIETY</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        <ul className="navbar-nav mr-auto mx-auto">
                            <li className="nav-item mx-3 active">
                                <Link className="nav-link" to="/tenantDashboard">Home<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link" to="#">Gallery</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link" to="#">About Us</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link" to="#">Contact Us</Link>
                            </li>
                        </ul>
                        {/* <div className="form-inline mt-2 mt-md-0">
                            <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                onClick={this.props.onClick} >Logout</button>
                        </div> */}
                        <div className="dropdown mx-2">
                            <button className="btn btn-outline-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {localStorage.getItem('firstName')}
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg-right bg-dark" aria-labelledby="dropdownMenuButton">
                                <div className="form-inline ml-lg-3 ml-md-2 ml-sm-2 mt-2 mt-md-0">
                                <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal"  type="button"
                                        onClick={this.props.change}>Change Password</button>

                                    <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                        onClick={this.props.onClick} >Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="wrapper">

                    <nav id="sidebar" className="bg-dark inactive">
                        <div id="sidebar-content">
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/tenantDashboard">Pay Dues</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/tenantDashboard">Vendor Services</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/tenantDashboard">Invite Guest</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/tenantDashboard">Vendor Authorization</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/tenantDashboard/tenantEventsBookingDetails">Book Personal Events</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/tenantDashboard/registerComplaint">Register Complaint</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/tenantDashboard/complaintTenantDetails">View Complaint Details</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/tenantDashboard/tenantFacility">Tenant Facility</Link></div></Menu.Item>
                            {/* <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/guestInvitation">Guest Invitation</Link></div></Menu.Item> */}
                            <div style={{ height: '10%' }}></div>
                        </div>
                    </nav>

                    <div id="body" className="container">
                        <div className="mt-4 mb-4">
                            {this.props.children}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Demo;
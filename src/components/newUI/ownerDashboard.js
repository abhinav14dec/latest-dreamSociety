import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import $ from 'jquery';
import './common.css';
import ReactDOM from 'react-dom';

class Demo extends Component {
    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollIntoView();
        $(document).ready(function () {

            $('#sidebarCollapse').on('click', function () {
                if ($('#sidebar').hasClass('active')) {
                    $('#sidebar').removeClass('active').addClass('inactive');
                    $('#sidebarTenant').removeClass('active').addClass('inactive');
                    $('#sidebarOwner').removeClass('active').addClass('inactive');
                } else {
                    $('#sidebar').removeClass('inactive').addClass('active');
                }
            });

            $('#sidebarTenantCollapse').on('click', function () {
                if ($('#sidebarTenant').hasClass('active')) {
                    $('#sidebarTenant').removeClass('active').addClass('inactive');
                } else {
                    $('#sidebarTenant').removeClass('inactive').addClass('active');
                    $('#sidebarOwner').removeClass('active').addClass('inactive');
                }
            });

            $('#sidebarOwnerCollapse').on('click', function () {
                if ($('#sidebarOwner').hasClass('active')) {
                    $('#sidebarOwner').removeClass('active').addClass('inactive');
                } else {
                    $('#sidebarOwner').removeClass('inactive').addClass('active');
                    $('#sidebarTenant').removeClass('active').addClass('inactive');
                }
            });

            $('#body').on('click', function () {
                if ($('#sidebar').hasClass('active')) {
                    $('#sidebar').removeClass('active').addClass('inactive');
                }
                if ($('#sidebarTenant').hasClass('active')) {
                    $('#sidebarTenant').removeClass('active').addClass('inactive');
                }
                if ($('#sidebarOwner').hasClass('active')) {
                    $('#sidebarOwner').removeClass('active').addClass('inactive');
                }
            });

            $('#masterdrop').on('click', function () {
                $('.master').toggleClass('show hide');

            });

            $('#detailsdrop').on('click', function () {
                $('.details').toggleClass('show hide');

            });


        });
    }
    // logout = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user-type');
    //     return this.props.history.replace('/')
    // }

    // changePassword=()=>{
          
    //     return this.props.history.replace('/superDashboard/changePassword')
    //   }
    

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
                    <Link className="navbar-brand" to="/ownerDashboard"><i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa mr-1">&#xf1ad;</i>DRE@M SOCIETY</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        <ul className="navbar-nav mr-auto mx-auto">
                            <li className="nav-item mx-3 active">
                                <Link className="nav-link" to="/ownerDashboard">Home<span className="sr-only">(current)</span></Link>
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
                        {/* <div style={{ position: 'relative', zIndex: "10000", color: 'white', paddingRight: '10px' }}> {localStorage.getItem('firstName')}</div>
                        <div className="form-inline mt-2 mt-md-0">
                            <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                onClick={this.props.onClick} >Logout</button>
                        </div> */}
                        <div className="dropdown mx-2">
                            <button className="btn btn-outline-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {localStorage.getItem('firstName')}
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg-right bg-dark" aria-labelledby="dropdownMenuButton">
                                <div className="form-inline ml-lg-3 ml-md-2 ml-sm-2 mt-2 mt-md-0">
                                <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                        onClick={this.props.change} >Change Password</button> 
                                    <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                        onClick={this.props.onClick} >Logout</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </nav>
                {/* <div className="wrapper"  style={{'backgroundImage':`url('assets/society.jpg')`}}> */}

                <div className="wrapper" style={{ backgroundImage: `url('assets/society.jpg')` }}>

                    <nav id="sidebar" className="bg-dark inactive">
                        <div id="sidebar-content">

                            {/* <Menu.Item id="sidebarTenantCollapse" className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="caret square down" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}>Admin</div></Menu.Item> */}
                            <Menu.Item id="sidebarOwnerCollapse" className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="caret square down" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}>Owner</div></Menu.Item>
                            <Menu.Item id="sidebarTenantCollapse" className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="caret square down" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}>Tenant</div></Menu.Item>

                            <div style={{ height: '10%' }}></div>
                        </div>
                    </nav>
                    {/* <nav id="sidebarTenant" className="bg-light  inactive">
                        <div id="sidebarTenant-content">
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/">Add Tenant</Link></div></Menu.Item>


                            <div style={{ height: '10%' }}></div>
                        </div>
                    </nav> */}
                    <nav id="sidebarOwner" className="bg-light inactive">
                        <div id="sidebarOwner-content">
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Pay Dues</Link></div></Menu.Item>
                            {/* <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard/addTenant">Add Tenant</Link></div></Menu.Item> */}
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Vendor Services</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Contact with other owner</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Invite Guest</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Vendor Authorization</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard/ownerEventsBooking">Book Personal Events</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Revoke Tenants</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Manage Vendor</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard/registerComplaintOwner">Register Complaint</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard/complaintOwnerDetails">View Status Detail</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard/ownerFacility">Owner Facility</Link></div></Menu.Item>
                            <div style={{ height: '10%' }}></div>
                        </div>
                    </nav>
                    <nav id="sidebarTenant" className="bg-light inactive">
                        <div id="sidebarTenant-content">
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Pay Dues</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Vendor Services</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Invite Guest</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Vendor Authorization</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/ownerDashboard">Book Personal Events</Link></div></Menu.Item>
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
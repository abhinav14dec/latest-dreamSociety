import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import $ from 'jquery';
import './demo.css';

class Demo extends Component {
    componentDidMount(){
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

    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">

                    <div id="content">

                        <div className="container-fluid">

                            <button type="button" id="sidebarCollapse" className="btn btn-info bg-dark">

                                <Icon name="sidebar" style={{ color: 'white', cursor: 'pointer' }} />


                            </button>

                        </div>
                    </div>
                    <Link className="navbar-brand" to="#"><i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa mr-1">&#xf1ad;</i>DRE@M SOCIETY</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        <ul className="navbar-nav mr-auto mx-auto">
                            <li className="nav-item mx-3 active">
                                <Link className="nav-link" to="/superDashboard">Home<span className="sr-only">(current)</span></Link>
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
                        <form className="form-inline mt-2 mt-md-0">
                            <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                            >Logout</button>
                        </form>

                    </div>
                </nav>
                <div className="wrapper">

                    <nav id="sidebar" className="bg-dark inactive">
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/registration">Super Admin Register</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}>Admin Register</div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}>Society Member Owner Register</div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}>Society Member Tenant Register</div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/vendorDashboard">Vendor</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/add_parking/new">Parking Master</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/towermaster">Tower Master</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/event">Event Master</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/flatmaster">Flat Master</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/sizemaster">Size Master</Link></div></Menu.Item>
                    </nav>
                    <div id="body" className="container">
                        {this.props.children}
                    </div>
                </div>

            </div>
        )
    }
}


export default Demo;
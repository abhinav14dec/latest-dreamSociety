import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import $ from 'jquery';

import './common.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Demo extends Component {
    state = {
        currentElement: ''
    }

    componentDidMount() {
        const url = window.location.href;

        this.setState({
            currentElement: url.slice(url.lastIndexOf('/') + 1)
        })
    }

    clickHandle = (ele) => {
        $('.active').toggleClass('active');
        $(ele.currentTarget).toggleClass('active');
    }

    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">

                    {/* <div id="content">
                        <div className="container-fluid">
                            <button type="button" id="sidebarCollapse" className="btn btn-info bg-dark">
                                <Icon name="sidebar" style={{ color: 'white', cursor: 'pointer' }} />
                            </button>
                        </div>
                    </div> */}
                    <Link className="navbar-brand" to="#"><i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa mr-1">&#xf1ad;</i>DRE@M SOCIETY</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        <ul className="navbar-nav mr-auto mx-auto">
                            <li className={(this.state.currentElement === '') ? "nav-item mx-3 active" : "nav-item mx-3"} onClick={this.clickHandle}>
                                <Link className="nav-link" to="/"><i class="fa fa-home"></i> Home</Link>
                            </li>
                            {/* <li className={(this.state.currentElement === 'gallery') ? "nav-item mx-3 active" : "nav-item mx-3"} onClick={this.clickHandle}>
                                <Link className="nav-link" to="/gallery"><i class="fa fa-image"></i> Gallery</Link>
                            </li> */}
                            <li className={(this.state.currentElement === 'features') ? "nav-item mx-3 active" : "nav-item mx-3"} onClick={this.clickHandle}>
                                <Link className="nav-link" to="/features"><i class="fa fa-list-alt"></i> Features</Link>
                            </li>
                            <li className={(this.state.currentElement === 'technologies') ? "nav-item mx-3 active" : "nav-item mx-3"} onClick={this.clickHandle}>
                                <Link className="nav-link" to="/technologies"><i class="fa fa-microchip"></i> Technologies</Link>
                            </li>
                            <li className={(this.state.currentElement === 'contactUs') ? "nav-item mx-3 active" : "nav-item mx-3"} onClick={this.clickHandle}>
                                <Link className="nav-link" to="/contactUs"><i class="fa fa-address-book"></i> Contact Us</Link>
                            </li>
                        </ul>
                        <div className="form-inline mt-2 ml-3 mt-md-0">
                            <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                onClick={this.props.onClick}>Login</button>
                        </div>

                    </div>
                </nav>
                <div className="wrapper" style={{ backgroundImage: `url('assets/society.jpg')` }}>
                    {/* <div className="wrapper" style={{'backgroundImage':`url('assets/society.jpg')`}}> */}



                    {/* <nav id="sidebar" className="bg-dark inactive">
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
                    </nav> */}
                    <div id="body" className="">
                        <div className="">
                            {this.props.children}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Demo;
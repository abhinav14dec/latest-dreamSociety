import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import './sidebar.css';

class sideBar extends Component {
    render(){
        return(
            <div>
                <Sidebar.Pushable onClick={this.props.onClick} as={Segment} attached="bottom">
                        <Sidebar id={this.props.onScroll} width='thin' as={Menu} animation="uncover" visible={this.props.visible} icon="labeled" vertical inverted>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/registration">Super Admin Register</Link></Menu.Item>
                            <Menu.Item><Icon name="user" />Admin Register</Menu.Item>
                            <Menu.Item><Icon name="user" />Society Member Owner Register</Menu.Item>
                            <Menu.Item><Icon name="user" />Society Member Tenant Register</Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/societyManagement">Society Management</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/vendorDashboard">Vendor</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/add_parking/new">Parking Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/towermaster">Tower Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/event">Event Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/flatmaster">Flat Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/sizemaster">Size Maste</Link></Menu.Item>

                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/cityMaster">City Master</Link></Menu.Item>

                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/countrymaster">Country Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/statemaster">State Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashBoard/assetsMaster">Assets Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashBoard/assetsTypeSubMaster">Assets Type Sub Master</Link></Menu.Item>

                        </Sidebar>
                        <Sidebar.Pusher dimmed={this.props.visible} >
                            <Segment style={this.props.style}  basic>
                               {this.props.children}
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
            </div>
        )
    }
}

export default sideBar;
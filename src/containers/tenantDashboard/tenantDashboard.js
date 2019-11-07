import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './superDashboard.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userLogout} from '../../actions/loginAction';
import UI from '../../components/newUI/tenantDashboard';
import TenantChart from '../tenantDashboardChart/tenantChart';

 class TenantDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { menuVisible: false, editUserModal: false, };
    this.toggleEditUserModal = this.toggleEditUserModal.bind(this)
    this.editUser = this.editUser.bind(this);
  }
  toggleEditUserModal() {
    this.setState({
      editUserModal: !this.state.editUserModal
    });
  }

  logout=()=>{
    this.props.userLogout();   
}

    changePassword=()=>{
          
      return this.props.history.replace('/tenantDashboard/changePasswordTenant')
    }

  editUser() {
    this.setState({
      editUserModal: !this.state.editUserModal
    });
  }
  

  render() {
    return (<div>
      {/* <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="headernav" >
        <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
          <Icon name="sidebar" style={{ color: 'white', cursor: 'pointer' }} />

        </Menu.Item>
        <i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa">&#xf1ad;</i> <Link className="navbar-brand" to="#">DRE@M SOCIETY</Link>
        <div className="navbar-collapse collapse" id="navbarCollapse" style={{ marginLeft: '20%' }}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/superDashboard">Home<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">About Us</Link>
            </li> 
            <li className="nav-item">
              <Link className="nav-link" to="#">Contact Us</Link>
            </li>
          </ul>
          <form className="form-inline mt-2 mt-md-0">
            <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
              onClick={this.editUser}>Logout</button>
          </form>
        </div>
      </nav> */}
      <UI onClick={this.logout} change={this.changePassword}>
          <TenantChart/>
      </UI>
      {/* <div style={{ margin: '48px auto' }}>
        <Sidebar.Pushable as={Segment} attached="bottom">
          <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
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
            <Menu.Item><Icon name="user" /><Link to="/superDashboard/sizemaster">Size Master</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashboard/cityMaster">City Master</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashBoard/assetsMaster">Assets Master</Link></Menu.Item>
            <Menu.Item><Icon name="user" /><Link to="/superDashBoard/assetsTypeSubMaster">Assets Type Sub Master</Link></Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={this.state.menuVisible}>
            <Segment basic style={{ backgroundImage: `url(${Logo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>
              {/* <Header as="h3">Application Content</Header> */}
      {/* <Image src='//unsplash.it/800/480' /> */}


    </div>
    );
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({userLogout},dispatch);
  }

  export default (connect(null,mapDispatchToProps)(TenantDashboard))
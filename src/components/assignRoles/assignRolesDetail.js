import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  assignRoleData } from '../../actions/assignRolesAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import { Table, Button } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import _ from 'underscore';

class AssignRolesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editRolesData: {
                roleName:'',
                userId:'',
                firstName:'',
                lastName:'',
               
                isActive: false,

            },
            message:'',
            filterName:"firstName",
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors: {},
            ids: [],

            isDisabled: true,


        };
    }
   

    componentDidMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.assignRoleData().then(() => this.setState({ loading: false }))
       
    }


    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
      
        return function (x) {
            console.log(x)
            return x.firstName.toLowerCase().includes(search.toLowerCase())  ||!search;
        }
    }



    renderRoles = ({ assignDisplay }) => {
    
        if (assignDisplay) { 
          return assignDisplay.sort((item1,item2)=>{ console.log(item1, item2)
        var cmprVal = (item1.userId && item2.userId ) ? (item1[this.state.filterName].localeCompare(item2[this.state.filterName])) : ''
        return this.state.sortVal ? cmprVal : -cmprVal;
        }).filter(this.searchFilter(this.state.search)).map((item, index) => { console.log(item)
           
                return (
                    <tr key={item.userId}>
                        <td>{index + 1}</td>
                        <td>{item.firstName} {" "} {item.lastName}</td>
                        <td>{item.roles.map((item, index)=>{
                                    return item.roleName
                        }).join(' , ')}</td>
                    </tr>

                )

            })
        }
    }
   




    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    
    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

    routeToChangeRoles = () => {
        this.props.history.push('/superDashboard/assignRoles')
    }



    close = () => {
        return this.props.history.replace('/superDashBoard')
    }


    render() {

        let tableData;
        tableData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr  >
        
                        <th>#</th>

                        <th  onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'firstName'}});
                        }} >Role Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>

                        <th>Roles</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRoles(this.props.AssignRolesReducer)}
                </tbody>
            </Table></div>
        return (
            <div>

                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details">
                            <h3>Role Details</h3>
                            <Button onClick={this.routeToChangeRoles} color="primary">Add Roles</Button>
                        </div>
                     
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />

                        {(this.state.loading) ? <Spinner /> : tableData}
                        


                    </div>
                </UI>

            </div>
        );
    }
}


function mapStateToProps(state) {
   console.log(state)
    return {
        AssignRolesReducer : state.AssignRolesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        assignRoleData
    
    
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignRolesDetail);
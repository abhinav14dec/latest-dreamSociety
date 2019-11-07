import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchParking } from '../../actions/parkingAction';
import { Table, Button } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

class ParkingMaster extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName:'parkingName',
            menuVisible: false,
            loading:true,
            search: ''
        }

    }
    componentDidMount() {
        this.refreshData()
    }

    refreshData(){
        this.props.fetchParking().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
    }


    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    renderParking({ parking }) {
        if (parking) {
            
            return parking.slot.sort((item1,item2)=>{
                console.log(item1, item2)
                var cmprVal = (item1.parking_master[this.state.filterName].localeCompare(item2.parking_master[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                return (
                    <tr key={item.parking_master.parkingName}>
                        <td>{index + 1}</td>
                        <td>
                            {item.parking_master.parkingName}
                        </td>
                        <td>
                            {item.count}
                        </td>
                        <td>
                            <Button color='success' className="mr-2">Edit</Button>
                            <Button color='danger' >Delete</Button>
                        </td>
                    </tr>
                );
            })
        }
    }

    searchFilter(search){
        return function(x,y){
            const slots = x.count.toString()
            return y.toString().indexOf(search) !== -1 || 
            x.parking_master.parkingName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            slots.includes(search)||
           !search;
        }
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/'); 
    }
       
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

    render() {
        let tableData;
        if(this.props.parkingDetail.parking){
            tableData = <div style={{margin:'0 auto'}}>
                <Table className="table table-bordered">
                    <thead>
                        <tr>
                        
                        <th>#</th>
                        <th style={{cursor:'pointer'}} onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'parkingName'}});
                        }}>Basement 
                         <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                            <th>No. of Parking</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderParking(this.props.parkingDetail)}
                    </tbody>
                </Table>
            </div>
        } 
        else {
            tableData = <Spinner />
        }
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div>
                        <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                        </div>
                            <div className="top-details">
                                <h3>Parking Master details</h3>
                                <Button color="primary" onClick={() => this.props.history.push('/superDashboard/add_parking/new')}>Add Parking</Button>
                            </div>
                            
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                            {!this.state.loading ? tableData: <Spinner /> }
                        </div>
                    </div>
                </UI>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        parkingDetail: state.parkingDetail
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchParking }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingMaster);
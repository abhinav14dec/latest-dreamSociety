import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getSlots } from '../../actions/flatDetailMasterAction';
import {Table,Button } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
var id;
class slotList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }

    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    componentWillMount() {
        id = localStorage.getItem('flatDetailId')
    }
    componentDidMount() {
        this.props.getSlots(id)
        .then(() => this.setState({ loading: false }))
    }
    delete = (slotId) => {
        // this.setState({ loading: true })
        // if (window.confirm('Are You Sure ?')) {
        //     this.props.removeOwner(ownerId)
        //         .then(() => {
        //             this.props.getOwnerList()
        //                 .then(() => this.setState({ loading: false }))
        //         })
        // }
        // else {
        //     this.props.getOwnerList()
        //         .then(() => this.setState({ loading: false }))
        // }
    }

    renderList = ({ slots }) => {
        if (slots) {

            return slots.slots.rows.map((item, index) => {
                return (
                    <tr key={item.slotId}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td style={{ textAlign: "center" }}>{item.flat_detail_master ?item.flat_detail_master.flatNo:''}</td>
                        <td style={{ textAlign: "center" }}>{item.flat_detail_master ? item.flat_detail_master.flat_master.flatType : ''}</td>
                        <td style={{ textAlign: "center" }}>{item.flat_detail_master ? item.flat_detail_master.floor_master.floorName : ''}</td>
                        <td style={{ textAlign: "center" }}>{item.flat_detail_master ? item.flat_detail_master.tower_master.towerName : ''}</td>
                        <td style={{ textAlign: "center" }}>{item.parking_master ? item.parking_master.parkingName : ''}</td>
                        <td style={{ textAlign: "center", width: '10px' }}>{item.slot_master?item.slot_master.slots:''}</td>
                        {/* <td> 
                             <Button color="danger" onClick={this.delete.bind(this, item.slotId)}>Delete</Button>
                        </td> */}
                    </tr>
                )
            })
        }
    }
    close = () => {
        return this.props.history.replace('/superDashBoard')
    }
    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{ textAlign: "center", width: "4%" }}>#</th>
                    <th style={{ textAlign: "center", width: "10%" }}>Flat No</th>
                    <th style={{ textAlign: "center", width: "10%" }}>Flat Type</th>
                    <th style={{ textAlign: "center", width: "10%" }}>Floor</th>
                    <th style={{ textAlign: "center", width: "16%" }}>Tower Name</th>
                    <th style={{ textAlign: "center", width: "10%"  }}>Parking</th>
                    <th style={{ textAlign: "center", width: "10%"  }}>Slots</th>
                    {/* <th style={{ textAlign: "center" }}>Action</th> */}
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.flatDetailMasterReducer)}
            </tbody>
        </Table>
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details">
                            <h3>Parking Slot List</h3>
                        </div>
                        {(this.state.loading) ? <Spinner /> : tableData}
                    </div>
                </UI>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state.flatDetailMasterReducer.slots)
    return {
        flatDetailMasterReducer: state.flatDetailMasterReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getSlots}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(slotList);

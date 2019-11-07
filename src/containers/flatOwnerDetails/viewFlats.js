import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Table,Modal,ModalBody,ModalHeader,FormGroup,Input} from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import {getOwnerFlats,deleteOwnerFlats,getAllFloor,editOwnerFlat} from '../../actions/flatOwnerAction';
import { Label } from 'semantic-ui-react';
import DefaultSelect from './../../constants/defaultSelect';
import { viewTower } from '../../actions/towerMasterAction';
import Spinner from '../../components/spinner/spinner';
import {getFlatDetails} from '../../actions/flatDetailMasterAction';
import Select from 'react-select';
import { PlaceHolder } from '../../actionCreators/index';
let ownerId;
class ViewFlats extends Component {

    state = {
        filterName: 'flatNo',
        flatDetailIds: '',
        flatNo: '',
        flatId: '',
        flatType: '',
        floorId: '',
        floorName: '',
        towerId: '',
        towerName: '',
        isActive: false,
        ids: [],
        menuVisible: false,
        editFlatModal: false,
        isDisabled: true,
        search: '',
        errors: {},
        loading: true,
        message: '',
        modalLoading: false,
        parkingId:'',
        slotId:'',
        modal: false,
        newFlatId:'',
        previousFlatDetailId:''

    }

    componentWillMount() {
        ownerId=localStorage.getItem('ownerId')
        this.props.getOwnerFlats(ownerId)
        .then(()=>{this.setState({loading:false})})
    }

    componentDidMount(){
        this.props.viewTower();
        this.props.getFlatDetails();
    }

    onHandleChange = (event) => {
        this.setState({ message: '' })
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    push = () => {
        this.props.history.push('/superDashboard/addOwnerFlat')
    }
    delete=(flatDetailId)=>{
        this.setState({loading:true})
        let ownerId=localStorage.getItem('ownerId')
        this.props.deleteOwnerFlats(flatDetailId,ownerId)
        .then(()=>this.props.getOwnerFlats(ownerId).then(()=>this.setState({loading:false})))
    }
    toggle = ( towerId, floorId,flatDetailId) => {
      
        this.setState({
             towerId, floorId,previousFlatDetailId:flatDetailId,
            modal: !this.state.modal
            
        })
        this.props.getAllFloor(towerId)
    }
    viewSlots(id) {
        localStorage.setItem('flatDetailId', id)
        this.props.history.push('/superDashboard/parkingSlotList')

    }

    flatList = ({ flats }) => {
        
        if (flats) {
            

          return  flats.flats.flat_detail_masters.map((item,index)=>{
                return (

                    <tr key={item.flatDetailId}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td style={{ textAlign: "center" }}>{item.flatNo}</td>
                        <td style={{ textAlign: "center", width: '10px',textTransform: 'capitalize'  }} >{item.flat_master.flatType}</td>
                        <td style={{ textAlign: "center", width: '10px',textTransform: 'capitalize'  }} >{item.floor_master.floorName}</td>
                        <td style={{ textAlign: "center", width: '10px',textTransform: 'capitalize'  }} >{item.tower_master.towerName}</td>
                        <td style={{ textAlign: "center" }}><button className="btn btn-success mr-2" onClick={this.viewSlots.bind(this,item.flatDetailId)} >View Parking</button></td>
                        <td style={{ textAlign: "center" }}>
                            <button className="btn btn-success mr-2" onClick={this.toggle.bind(this,item.tower_master.towerId,item.floor_master.floorId,item.flatDetailId)}>Edit</button>
                            <button className="btn btn-danger" onClick={this.delete.bind(this,item.flatDetailId)} >Delete</button>
                        </td>
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

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword')
    }


    close = () => {
        return this.props.history.replace('/superDashBoard/flatOwnerList')
    }
    searchFilter(search) {
        // return function (x) {
        //     return x.firstName.toLowerCase().includes(search.toLowerCase()) || !search;
        // }
    }
    getTower = ({ tower }) => {
        if (tower) {
            return tower.tower.map((item) => {
                return (
                    { ...item, label: item.towerName, value: item.towerId }
                )
            }
            );
        }
        return [];
    }
    towerChangeHandler = (name, selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value,
                towerName:selectOption.label
            }
        }, function () {
        });
        this.props.getAllFloor(selectOption.towerId);
    }
    getFloor=({floor})=>{
        if(floor){
            return floor.tower.Floors.map((item)=>{
                      
                return {...item ,label: item.floorName, value: item.floorId }
            })
        }
        else {
            return []
        }}
        floorChangeHandler=(name,selectOption)=>{
            this.setState({
                [name]: selectOption.value,
                floorName:selectOption.label
            })
    
        }
        getFlats=({floor})=>{
            if(floor){
              return  floor.flatDetail.filter((flatRecord)=>{
                    return flatRecord.floorId===this.state.floorId
                }).map((selectFlat)=>{
                    return {...selectFlat, label:selectFlat.flatNo,value:selectFlat.flatDetailId}
                });
            }
            else {
                return []
              }
        }
        flatChangeHandler=(name,selectOption)=>{
            let flatName=selectOption.label
            this.setState({
                [name]: selectOption.value,
                currentAddress:this.state.flat+flatName+','+this.state.floorName+','+this.state.towerName+','+this.state.currentAddress+' '+this.state.pinCode
            })
        }
    editOwnerFlat=()=>{
        let errors = {};
        if(this.state.towerId===''){
            errors.towerId="Tower can't be empty"
        }
        else if(this.state.floorId===''){
            errors.floorId="floor can't be empty"
        }
        else if(this.state.flatDetailIds==='')
        {
            errors.flatDetailIds="flat can't be empty"
        }
        this.setState({errors});
        const isValid=Object.keys(errors).length === 0;
        if(isValid){
            this.setState({ loading: true })
            this.setState({ modal: !this.state.modal })
            this.props.editOwnerFlat(ownerId,this.state.previousFlatDetailId,this.state.flatDetailIds)
            .then(()=>this.props.getOwnerFlats(ownerId).then(()=>{this.setState({loading:false})}))
        }

    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    render() {
        let tableData;
        tableData =
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: '4%'}}>#</th>
                        <th onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'flatNo'
                                }
                            });
                        }} style={{ textAlign: "center" ,width: "10%" }}>Flat No</th>
                        <th style={{ textAlign: "center", width: "10%" }}>Flat Type</th>
                        <th style={{ textAlign: "center", width: "10%" }}>Floor</th>
                        <th style={{ textAlign: "center", width: "16%" }}>Tower Name</th>
                    <th style={{ textAlign: "center", width: "16%" }}>View Parking</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {this.flatList(this.props.Owner)}
                </tbody>
            </Table>
        // let deleteSelectedButton = <Button color="danger" className="mb-2"
        //     onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>



        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>

                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details" style={{ fontWeight: 'bold' }}><h3>Owner Flat Details</h3>
                            <Button color="primary" type="button" onClick={this.push}> Add More Flat</Button>
                        </div>
                        {/* <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} /> */}
                        {(this.state.loading) ? <Spinner /> : tableData}
                        {/* {tableData} */}
                        <Modal isOpen={this.state.modal} toggle={this.toggles} style={{width:"100% !important"}}>
                                <ModalHeader toggle={this.toggle}>Edit Owner's Flat</ModalHeader>
                                <ModalBody>
                                <FormGroup>
                    <Label>Tower</Label>
                    <Select options={this.getTower(this.props.towerList)}
                        onChange={this.towerChangeHandler.bind(this, 'towerId')}
                        placeholder={PlaceHolder} />
                    <span className="error">{this.state.errors.towerId}</span>
                </FormGroup >
                <FormGroup>
                    <Label>Floor</Label>
                    <Select options={this.getFloor(this.props.towerFloor)}
                        placeholder={PlaceHolder}
                        name="floorId"
                        onChange={this.floorChangeHandler.bind(this, 'floorId')}
                    />
                    <span className="error">{this.state.errors.floorId}</span>
                </FormGroup>
                <FormGroup>
                    <Label>Flat Number</Label>
                    <Select options={this.getFlats(this.props.towerFloor)}
                        placeholder={PlaceHolder}
                        name="flatDetailIds"
                        onChange={this.flatChangeHandler.bind(this, 'flatDetailIds')}
                    />
                    <span className="error">{this.state.errors.flatDetailIds}</span>
                </FormGroup >
                                    <FormGroup>
                                        <Button color="primary mr-2" onClick={this.editOwnerFlat}>Save</Button>
                                        <Button color="danger" onClick={this.toggles}>Cancel</Button>
                                    </FormGroup>
                                </ModalBody>
                        </Modal>
                    </div>
                </UI>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        Owner: state.FlatOwnerReducer,
        towerFloor:state.FlatOwnerReducer,
        towerList: state.TowerDetails,
        flatDetailMasterReducer : state.flatDetailMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getOwnerFlats,deleteOwnerFlats,viewTower,getAllFloor,getFlatDetails,editOwnerFlat}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFlats);
import React, {Component} from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { connect } from 'react-redux';
import Spinner from '../../components/spinner/spinner';
import {addNewFlatForTenant, getFlats,getFlatDetailViaTowerId, editFlats, deleteFlat } from '../../actions/tenantMasterAction';
import { viewTower } from '../../actions/towerMasterAction';

class TenantFlatsDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            tenantId:'',
            towerName:'',
            towerId:null,
            floorName:'',
            floorId:null,
            flatNo:'',
            flatDetailId:null,
            loading:true,
            addFlat:false,
            memberError:'',
            addFlatLoading:false,
            flatError:'',
            editFlat:false,
            editFlatLoad:false,
            previousFlatDetailId:null,
            filterName:'flatNo',
            errors:{},
            message:''
        }
    }

    componentDidMount(){
        let id  = localStorage.getItem('tenantId1');
        this.setState({tenantId: id})
        if(id){
            this.props.getFlats(id).then(() => this.setState({loading: false})).catch((err) => {err;
                this.setState({loading: false})
            });
        }
        else this.setState({loading:false})
        console.log(id)
        this.props.viewTower()
    }

    toggleFlat(){
        this.setState({addFlat: !this.state.addFlat,flatError:'', towerId:'', floorId:'', flatDetailId:'', errors:{}})
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

     logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    addFlats(tenantId){
        console.log(tenantId)
        this.setState({addFlat: true,tenantId})
    }

    route = (e) => {
        e.preventDefault()
        return this.props.history.push('/superDashBoard/tenantDetails')
    }

    flatInputs = ({getTenantFlats}) => {
        if(getTenantFlats && getTenantFlats.flats){
            console.log(getTenantFlats)
            return getTenantFlats.flats.sort((item1,item2)=>{
                if(item1 && item2){
                    var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                    return this.state.sortVal ? cmprVal : -cmprVal;
                }
            }).map((item, index) => {
                return (
                    <tr key={item.flatDetailId}>
                        <td>{index + 1}</td>
                        <td>{item.tower_master.towerName}</td>
                        <td>{item.floor_master.floorName}</td>
                        <td>{item.flatNo}</td>
                        <td>
                            <Button color="success" className="mr-2" onClick={this.edit.bind(this,item.tower_master.towerName,item.floor_master.floorName, item.flatNo,item.tower_master.towerId,
                             item.floor_master.floorId,
                                item.flatDetailId)}>Edit</Button>
                            <Button color="danger" onClick={this.delete.bind(this, this.state.tenantId, item.flatDetailId)}>Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
    }

    delete = (tenantId, flatDetailId) => {
        this.setState({loading:true})
        console.log(tenantId, flatDetailId)
        let values = {
            tenantId,
            flatDetailId
        }
        this.props.deleteFlat(values)
        .then(() => this.refreshData())
        .catch((err) =>{err;
             this.refreshData()
            })
    }

    refreshData = () => {
        this.props.getFlats(this.state.tenantId).then(() => this.setState({loading:false}))
        this.props.viewTower().then(() => this.setState({loading:false}))
    }

    edit = (towerName, floorName, flatNo, towerId, floorId,flatDetailId) => {
        console.log(towerName, floorName, flatNo, towerId, floorId,flatDetailId)
        this.props.getFlatDetailViaTowerId(towerId)
        this.setState({towerName, floorName, flatNo, towerId, floorId,flatDetailId,previousFlatDetailId:flatDetailId, editFlat:true})
    }

    towerChangeHandler = (e) => {
        console.log(e)
        // var x = document.getElementById('floor');
        // console.log(x)
        // x.remove(x)
        console.log(this.state)
        this.setState({
                towerId: parseInt(e.target.value),
                memberError:'',
                floorId:'',
                floorName:'',
                flatDetailId:'',
                flatNo:'',
                message:''
        });
        this.props.getFlatDetailViaTowerId(e.target.value);
    }

    towerChangeHandler1 = (e) => {
        console.log(e)
        // var x = document.getElementById('floor');
        // console.log(x)
        // x.remove(x)
        console.log(this.state)
        this.setState({
                towerId: parseInt(e.target.value),
                memberError:'',
                floorId:'',
                floorName:'',
                flatDetailId:'',
                flatNo:'',
                message:''
        });
        this.props.getFlatDetailViaTowerId(e.target.value);
    }


    floorChangeHandler=(e)=>{
        console.log(this.state)
        this.setState({
            floorId: parseInt(e.target.value),
            memberError:'',
            flatDetailId:'',
            flatNo:'',
            message:''
        })
        console.log('lllllllll=======',this.state.floorId)
        // this.getFlats(this.props.towerFloor);
    
        }

        flatChangeHandler=(e)=>{
            console.log(this.state.flatDetailId)
            console.log(this.state)
            this.setState({
                flatDetailId: parseInt(e.target.value),
                memberError:'',
                message:''
            })
            this.props.getFlatDetailViaTowerId(this.state.towerId);
        }

    getTower = ({ tower }) => {
        if (tower) {
            return tower.tower.map((item) => {
                return (
                    // { ...item, label: item.towerName, value: item.towerId }
                    <option key={item.towerId} value={item.towerId} >{item.towerName}</option>
                )
            }
            );
        }
        return [];
    }

    getFloor=({getFlatDetail})=>{
        console.log("floor",getFlatDetail)
        if(getFlatDetail && getFlatDetail.tower){
            return getFlatDetail.tower.Floors.map((item)=>{
                      
                // return {...item ,label: item.floorName, value: item.floorId }
                return <option key={item.floorId} value={item.floorId} >{item.floorName}</option>
            })
          //   this.setState({
          //     floorId:item.floorId
          //   })
        }
        else {
            return []
        }}

        getFlats=({getFlatDetail})=>{
            console.log('7777777jjjjjj',getFlatDetail)
            if(getFlatDetail && getFlatDetail.flatDetail){
              return  getFlatDetail.flatDetail.filter((flatRecord)=>{
                return flatRecord.floorId==this.state.floorId
            }).map((selectFlat)=>{
                    console.log('bbbbbbbbbbbbbbbbb',selectFlat)
                    // return {...selectFlat, label:selectFlat.flatNo,value:selectFlat.flatDetailId}
                    return <option key={selectFlat.flatDetailId} value={selectFlat.flatDetailId} >{selectFlat.flatNo}</option>
                });
            }
            else {
                return []
              }
        }

        addNewFlat(tenantId, flatDetailId){
            let errors = {};
            if(!this.state.towerId) errors.towerId = `Please enter tower name.`
            if(!this.state.floorId) errors.floorId = `Please enter floor.`
            if(!this.state.flatDetailId) errors.flatDetailId = `Please enter flat.`
            this.setState({ errors });
            const isValid = Object.keys(errors).length === 0;
            if(isValid){
                this.setState({addFlatLoading: true})
                console.log(tenantId, flatDetailId)
                let data = {
                    tenantId, flatDetailId
                }
                this.props.addNewFlatForTenant(data)
                .then(() => this.props.getFlats(this.state.tenantId).then(() => this.refreshFlatData()))
                .catch(err => {err
                    console.log(err)
                    this.setState({addFlatLoading: false, flatError:err.response.data.message})})
            }
            
        }

        refreshFlatData = () => {
            this.setState({addFlatLoading: false, addFlat:false, towerId:'', flatDetailId:'', floorId:''})
        }

        toggleEditFlat = () => {
            this.setState({editFlat:!this.state.editFlat, towerId:'', floorId:'', flatDetailId:'', errors:{},message:''})
        }

        update = (e) => {
            let errors = {};
            if(!this.state.towerId) errors.towerId = `Please enter tower name.`
            if(!this.state.floorId) errors.floorId = `Please enter floor.`
            if(!this.state.flatDetailId) errors.flatDetailId = `Please enter flat.`
            this.setState({ errors });
            const isValid = Object.keys(errors).length === 0;
            if(isValid){
                this.setState({editFlatLoad:true})
                let { tenantId, flatDetailId, previousFlatDetailId } = this.state;
                console.log(tenantId, flatDetailId, previousFlatDetailId )
                this.props.editFlats(parseInt(tenantId), flatDetailId, previousFlatDetailId).then(() => this.refreshUpdated())
                .catch(err => {
                    err;
                    this.setState({editFlatLoad:false, message: err.response.data.message})
                })
            } 
        }

        refreshUpdated = () => {
            this.props.getFlats(this.state.tenantId).then(() => this.setState({editFlat:false,editFlatLoad:false,
                towerId:'', floorId:'', flatDetailId:''}))
        }

    render(){
        let TableData = <Table bordered>
                           <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tower</th>
                                    <th>Floor</th>
                                    <th style={{cursor: 'pointer'}} onClick={()=>{
                                        this.setState((state)=>{return {sortVal:!state.sortVal,
                                        filterName:'flatNo'}});
                                    }}>Flat<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.flatInputs(this.props.tenantReducer)}
                            </tbody>
                        </Table>

    let editFlatModal = <div>
        <div><span className="error">{this.state.message}</span></div>
        <FormGroup>
            <Label>Tower</Label>
            <Input type="select" id="tower" name="towerId" value={this.state.towerId ? this.state.towerId : <DefaultSelect />}
                onChange={this.towerChangeHandler1}>
                {/* {this.state.towerName ? <option>{this.state.towerName}</option> : <option disabled>--Select--</option>}
                {this.state.towerName ? <DefaultSelect />: null}
                {this.state.towerName ? this.getTower(this.props.towerList) : null}  */}
                <DefaultSelect />
                {this.getTower(this.props.towerList)}
            </Input>
            {!this.state.towerId ? <span className="error">{this.state.errors.towerId}</span> : ''}
        </FormGroup>
        <FormGroup>
            <Label>Floor</Label>
            <Input type="select" value={this.state.floorId ? this.state.floorId : 'no-value'} name="floorId" 
                onChange={this.floorChangeHandler}>
                <DefaultSelect />
                {this.getFloor(this.props.tenantReducer)}
            </Input>
            {!this.state.floorId ? <span className="error">{this.state.errors.floorId}</span> : ''}
        </FormGroup>
        <FormGroup>
            <Label>Flat</Label>
            <Input type="select" value={this.state.flatDetailId ? this.state.flatDetailId  :  'no-value'} name="flatDetailId" 
                onChange={this.flatChangeHandler}>
                <DefaultSelect />
                {this.getFlats(this.props.tenantReducer)}
            </Input>
            {!this.state.flatDetailId ? <span className="error">{this.state.errors.flatDetailId}</span> : ''}
        </FormGroup>
        <FormGroup>
            <Button onClick={this.update} className="mr-2" color="success">Save</Button>
            <Button color="danger" onClick={this.toggleEditFlat.bind(this)}>Cancel</Button>
        </FormGroup>
    </div>

let flatModal = <div>
        <div><span className="error">{this.state.flatError}</span></div>
            <FormGroup>
                <Label>Tower</Label>
                <Input type="select" onChange={this.towerChangeHandler}  name="towerId"
                 id="tower" value={this.state.towerId ? this.state.towerId : 'no-value'} >
                    <DefaultSelect />
                    {this.getTower(this.props.towerList)}
                 </Input>
                {!this.state.towerId ? <span className="error">{this.state.errors.towerId}</span> : ''}
            </FormGroup >
            <FormGroup>
                <Label>Floor</Label>
                <Input type="select"
                name="floorId" id="floor"
                onChange={this.floorChangeHandler}
                value={this.state.floorId ?this.state.floorId : 'no-value'}
                >
                    {<DefaultSelect/>}
                    {this.getFloor(this.props.tenantReducer)}
                </Input>
                {!this.state.floorId ? <span className="error">{this.state.errors.floorId}</span> : ''}
            </FormGroup>
            <FormGroup>
                <Label>Flat Number</Label>
                <Input type="select" name="flatDetailId"
                    onChange={this.flatChangeHandler} id="flat"
                    value={this.state.flatDetailId ? this.state.flatDetailId : 'no-value'}
                    >
                    <DefaultSelect/>
                    {this.getFlats(this.props.tenantReducer)}
                </Input>
                {!this.state.flatDetailId ? <span className="error">{this.state.errors.flatDetailId}</span> : ''}
            </FormGroup >
            <FormGroup>
                <Button color="success" className="mr-2" onClick={this.addNewFlat.bind(this, this.state.tenantId, this.state.flatDetailId)}>Add</Button>
                <Button color="danger" onClick={this.toggleFlat.bind(this)}>Cancel</Button>
            </FormGroup>
        </div>

        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Tenant Flats Detail</h3>
                        <div>
                            <Button color="primary" onClick={this.route} className="mr-2">View Tenant Detail</Button>
                            <Button color="primary" onClick={this.addFlats.bind(this, this.state.tenantId)} color="primary">Add Flats</Button>
                        </div>
                    </div>
                    <Modal isOpen={this.state.addFlat} toggle={this.toggleFlat.bind(this)}>
                        <ModalHeader toggle={this.toggleFlat.bind(this)}>Add Flat Detail</ModalHeader>
                        <ModalBody>
                            {!this.state.addFlatLoading ? flatModal:<Spinner/>}
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.editFlat} toggle={this.toggleEditFlat.bind(this)}>
                        <ModalHeader toggle={this.toggleEditFlat.bind(this)}>Edit Flat Detail</ModalHeader>
                        <ModalBody>
                            {/* {!this.state.editFlatLoading ? editFlatModal:<Spinner/>} */}
                            {!this.state.editFlatLoad ? editFlatModal : <Spinner />}
                        </ModalBody>
                    </Modal>
                    {!this.state.loading ? TableData : <Spinner />}
                </div>
            </UI>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        tenantReducer:state.tenantReducer,
        towerList: state.TowerDetails
    }
}

export default connect(mapStateToProps, { getFlats, addNewFlatForTenant, getFlatDetailViaTowerId, viewTower, editFlats,
    deleteFlat })(TenantFlatsDetail);
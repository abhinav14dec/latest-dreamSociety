import React, { Component } from 'react';
import { getFlatDetails, getFlatType, getTowerName, deleteSelectedFlat,deleteFlat, updateFlatDetails, getfloors,fetchParking,getSlotId } from '../../actions/flatDetailMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Table, Input, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';


class flatDetails extends Component {
constructor(props){
    super(props)

    this.state = {
        filterName: 'flatNo',
        flatDetailId: '',
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

    }
}

    componentWillMount() {
        this.refreshData();
        this.props.fetchParking();
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

    refreshData() {
        this.props.getFlatDetails().then(() => this.setState({ loading: false, modalLoading: false, editFlatModal: false }));
        this.props.getFlatType().then(() => this.setState({ loading: false }));
        this.props.getTowerName().then(() => this.setState({ loading: false }));
    }


    edit(flatDetailId, flatNo, flatType, floorName, towerName, flatId, floorId, towerId,parkingId) {
        this.setState({
            flatDetailId, flatNo, flatType, floorName, towerName, flatId, floorId, towerId, editFlatModal: !this.state.editFlatModal,parkingId
        })

    }


    searchFilter = (search) => {
        return function (x) {
         
            return x.flat_detail_master.tower_master.towerName.toLowerCase().includes(search.toLowerCase()) ||
                   x.flat_detail_master.flat_master.flatType.toLowerCase().includes(search.toLowerCase())  ||
                        x.flat_detail_master.flatNo.toLowerCase().includes(search.toLowerCase()) 

                        || !search;
        }
    }


    toggleEditFlatModal = () => {
        this.setState({
            editFlatModal: !this.state.editFlatModal, message: ''
        });
    } 


    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    updateDetails = (e) => {
        e.preventDefault();
        const { flatDetailId, flatNo, flatId, floorId, towerId } = this.state;

        let errors = {};
        if (this.state.flatNo === '') {
            errors.flatNo = "Flat No can't be empty";
        }

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if (isValid && this.state.message === '') {

            this.props.updateFlatDetails(flatDetailId, flatNo, flatId, floorId, towerId)
                .then(() => this.refreshData())
                .catch(err => {
                  
                    this.setState({ modalLoading: false, message: err.response.data.message })
                })
            if (this.state.message === '') {
                this.setState({ editFlatModal: true })
            }
            else {
                this.setState({ editFlatModal: false })
            }
            this.setState({
                modalLoading: true,
            })
        }
    }

  
    delete=(flatDetailId)=>{    
        this.setState({loading:true})
        let{isActive}=this.state;
        this.props.deleteFlat(flatDetailId,isActive)
        .then(()=>this.refreshData())
        this.setState({isActive:false})

    }



    deleteSelected = (ids) => {
        this.setState({
            loading: true,
            isDisabled: true
        });
        this.props.deleteSelectedFlat(ids)
            .then(() => this.refreshData())
            .catch(err => err.response.data.message);
    }




    getDropDown1 = ({ flattype }) => {
        if (flattype && flattype.flat) {
            return flattype.flat.map((item) => {
                return (
                    <option key={item.flatId} value={item.flatId}>
                        {item.flatType}
                    </option>
                )
            })
        }
    }

    getDropDown2 = ({ name }) => {
        if (name) {
            return name.map((item) => {
                return (
                    <option key={item.towerId} value={item.towerId}>
                        {item.towerName}
                    </option>
                )
            })
        }
    }

    getFloorData = ({ floorDetails }) => {
          
        if (floorDetails) {
            console.log(floorDetails)
            return floorDetails.tower.Floors.map((items) => {
              
                return (
                    <option key={items.floorId} value={items.floorId}>
                        {items.floorName}
                    </option>
                )
            })
        }
    }

    floorChange = (event) => {
        this.setState({ loading: false })
        let selected = event.target.value
        this.props.getfloors(selected);

        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
    }

    viewSlots(id) {
        localStorage.setItem('flatDetailId', id)
        this.props.history.push('/superDashboard/parkingSlotList')
    }


    push = () => {
        this.props.history.push('/superDashboard/flatDetailMaster')
    }

    renderList = ({ details }) => {

        if (details && details.flatDetail) {
          
            return details.flatDetail.sort((item1, item2) => {
                var items1=item1.flat_detail_master
                var items2=item2.flat_detail_master
                var cmprVal = (items1 && items2) ? (items1[this.state.filterName].localeCompare(items2[this.state.filterName])) : ''
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
              

                return (

                    <tr key={item.flat_detail_master.flatDetailId}>
                        <td><input type="checkbox" name="ids" className="SelectAll" value={item.flat_detail_master.flatDetailId}
                            onChange={(e) => {
                                const { flatDetailId } = item
                                if (!e.target.checked) {
                                    document.getElementById('allSelect').checked = false;
                                    let indexOfId = this.state.ids.indexOf(item.flat_detail_master.flatDetailId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1);
                                    }
                                    if (this.state.ids.length === 0) {
                                        this.setState({ isDisabled: true });
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, item.flat_detail_master.flatDetailId] });
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }

                            }} /></td>
                        <td>{index + 1}</td>
                        <td>{item.flat_detail_master?item.flat_detail_master.flatNo:''}</td>
                        <td>{item.flat_detail_master.flat_master ? item.flat_detail_master.flat_master.flatType : ''}</td>
                        <td>{item.flat_detail_master.floor_master ? item.flat_detail_master.floor_master.floorName : ''}</td>
                        <td>{item.flat_detail_master.tower_master ? item.flat_detail_master.tower_master.towerName : ''}</td>
                        <td>{item.parking_master ? item.parking_master.parkingName : ''}</td>
                        <td>{item.count}</td>
                        <td><button className="btn btn-success mr-2" onClick={this.viewSlots.bind(this,item.flat_detail_master.flatDetailId)}>View Slots</button></td>
                        <td>
                            <Button color="success" className="mr-2" onClick={this.edit.bind(this, item.flat_detail_master.flatDetailId, item.flat_detail_master.flatNo, item.flat_detail_master.flat_master.flatType, item.flat_detail_master.floor_master.floorName,item.flat_detail_master.tower_master.towerName, item.flatId, item.floorId, item.towerId,item.parking_master.parkingName)} >Edit</Button>

                            <Button color="danger" onClick={this.delete.bind(this, item.flat_detail_master.flatDetailId)}>Delete</Button>
                        </td>
                    </tr>

                )
            })
        }
    }


    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9 , a-zA-Z  -]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if (ar.length > 0) {
            this.setState({ isDisabled: false });
        }
    }

    unSelectAll = () => {

        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
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
        return this.props.history.replace('/superDashBoard')
    }
    onParkingChangeHandler=(event)=>{
        this.setState({
            parkingId:event.target.value
        },function (){
            this.props.getSlotId(this.state.parkingId);
        })
        
    }
    getParking=({parking})=>{
        if(parking){
            return parking.parking.map((items)=>{
                return(
                    <option key={items.parkingId} value={items.parkingId}>
                    {items.parkingName}
                    </option>
                )
            })
        }

    }
    getSlot=({parkingSlot})=>{
        console.log(parkingSlot)
        if(parkingSlot){
            return parkingSlot.slot.map((items)=>{
                return (
                    <option key={items.slotId} value={items.slotId}>
                    {items.slots}
                    </option> 
                )
            })
        }
    }

    render() {
        let tableData;
        tableData =
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: '4%' }}></th>
                        <th style={{ width: '4%' }}>#</th>
                        <th onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'flatNo'
                                }
                            });
                        }}>Flat No <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Flat Type</th>
                        <th>Floor</th>
                        <th>Tower Name</th>
                        <th>Parking</th>
                        <th>Total no. Slot</th>
                        <th>View Slots</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {this.renderList(this.props.flatDetailMasterReducer)}
                </tbody>
            </Table>
        let deleteSelectedButton = <Button color="danger" className="mb-2"
            onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>



        let modalData = <div>
            <FormGroup>
                <Label for="flatNo">Flat No</Label>
                <Input name="flatNo" value={this.state.flatNo} maxLength={6} onKeyPress={this.OnKeyPresshandlerPhone} onChange={this.onHandleChange} value={this.state.flatNo} />
                <span className="error">{this.state.errors.flatNo}</span>
                <span className="error">{this.state.message}</span>
            </FormGroup>

            <FormGroup>
                <Label for="flatType">Flat Type</Label>
                <Input type="select" name="flatId" value={this.state.flatId} onChange={(e) => {
                    let { flatId } = this.state;

                    flatId = e.target.value;

                    this.setState({ flatId });
                }}>
                    <option>{this.state.flatType}</option>
                    <DefaultSelect />
                    {this.getDropDown1(this.props.flatDetailMasterReducer)}
                </Input>
            </FormGroup>

            <FormGroup>
                <Label>Tower Name</Label>
                <Input type="select" name="towerId" value={this.state.towerId} onChange={this.floorChange}>
                    <option>{this.state.towerName}</option>
                    <DefaultSelect />
                    {this.getDropDown2(this.props.flatDetailMasterReducer)}
                </Input>
            </FormGroup>


            <FormGroup>
                <Label>Floor</Label>
                <Input type="select" name="floorId" value={this.state.floorId} onChange={this.onHandleChange}>
                    <option>{this.state.floorName}</option>
                    <DefaultSelect />
                    {this.getFloorData(this.props.flatDetailMasterReducer)}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Parking</Label>
                <Input type="select" name="parkingId" value={this.state.parkingId} onChange={this.onParkingChangeHandler}>
               
                    <DefaultSelect />
                    {this.getParking(this.props.flatDetailMasterReducer)}
                </Input>
            </FormGroup>
         


            <Button color="primary" className="mr-2" onClick={this.updateDetails.bind(this)}>Save </Button>
            <Button color="danger" onClick={this.toggleEditFlatModal.bind(this)}>Cancel</Button>

        </div>

        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>

                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details" style={{ fontWeight: 'bold' }}><h3>Flat Details</h3>
                            <Button color="primary" type="button" onClick={this.push}> Add Flat</Button>
                        </div>
                        <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />

                        {deleteSelectedButton}
                        <Label style={{ padding: '10px' }}><b>Select All</b><input className="ml-2"
                            id="allSelect"
                            type="checkbox" onChange={(e) => {
                                if (e.target.checked) {
                                    this.selectAll();
                                }
                                else if (!e.target.checked) {
                                    this.unSelectAll();
                                }
                            }
                            } />
                        </Label>
                        {(this.state.loading) ? <Spinner /> : tableData}
                        <Modal isOpen={this.state.editFlatModal} toggle={this.toggleEditFlatModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditFlatModal.bind(this)}>Edit Details</ModalHeader>
                            <ModalBody>
                                {!this.state.modalLoading ? modalData : <Spinner />}
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
        flatDetailMasterReducer: state.flatDetailMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getFlatDetails, getFlatType, getTowerName, deleteSelectedFlat, updateFlatDetails, deleteFlat,getfloors,fetchParking,getSlotId }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(flatDetails);
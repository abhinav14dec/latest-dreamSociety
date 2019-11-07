import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  getCity, detailCity, deleteCity, updateCity, deleteSelectCity } from './../../actions/cityMasterAction';
import { getCountry, getState } from './../../actions/societyMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import _ from 'underscore';
import DefaultSelect from './../../constants/defaultSelect';



class CityMasterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editCityData: {
                countryId: '',
                countryName: '',
                stateName: '',
                stateId: '',
                cityName: '',
                cityId: '',
                isActive: false,

            },
            message:'',
            filterName:"cityName",
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            modalLoading:false,
            errors: {},
            ids: [],

            isDisabled: true,


        };
    }
    onChangeHandler = (event) => {
        this.setState({message:'' })
        this.setState({
            [event.target.name]:event.target.value

        })
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }


    onKeyPressHandler = (event) => {
        const pattern = /^[a-zA-Z -]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }





    toggle = (cityId, countryName, stateName, cityName) => {

        this.setState({
            cityId,
            countryName,
            stateName,
            cityName,
            modal: !this.state.modal
        })
    }




    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }


    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.detailCity().then(() => this.setState({ loading: false,modalLoading: false, modal: false }))
        this.props.getCountry().then(() => this.setState({ loading: false }))
        this.props.getState().then(() => this.setState({ loading: false }))
        this.props.getCity().then(() => this.setState({ loading: false }))
    }




    editCityType = (e) => {
        e.preventDefault();
        const { cityId, countryId, stateId, cityName } = this.state

        let errors = {};

        if (this.state.cityName === '') { errors.cityName = " City Name can't be empty" }
        this.setState({ errors })

        const isValid = Object.keys(errors).length === 0

        if (isValid) {
           

            this.props.updateCity(cityId, countryId, stateId, cityName)
                .then(() => this.refreshData())
                .catch(err=>{ console.log(err.response.data.message)
                    this.setState({modalLoading: false,message: err.response.data.message, loading: false})
                    })
                    if (this.state.message === '') {
                        this.setState({ modal: true })
                    }
                    else {
                        this.setState({ modal: false })
                    }
        
                    this.setState({
                        modalLoading: true
                    })

        }
    }

    deleteCityName = (cityId) => {
        let { isActive } = this.state.editCityData
        this.setState({ loading: true })

    
        this.props.deleteCity(cityId, isActive)
            .then(() => this.refreshData())
        this.setState({ editCityData: { isActive: false } })
      
    }

    deleteSelected = (ids) => {
        this.setState({ loading: true, isDisabled: true });

       
        this.props.deleteSelectCity(ids)
            .then(() => this.refreshData())
            .catch(err => err.response.data.message);
        
 }





    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
            return x.country_master.countryName.toLowerCase().includes(search.toLowerCase())  ||
             x.state_master.stateName.toLowerCase().includes(search.toLowerCase())  ||
             x.cityName.toLowerCase().includes(search.toLowerCase()) ||!search;
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



    renderCity = ({ city }) => {

        if (city) {

       return city.sort((item1,item2)=>{
        var cmprVal = (item1.cityName && item2.cityName ) ? (item1[this.state.filterName].localeCompare(item2[this.state.filterName])) : ''
        return this.state.sortVal ? cmprVal : -cmprVal;
        }).filter(this.searchFilter(this.state.search)).map((item, index) => {
           
                return (
                    <tr key={item.cityId}  >
                        <td><input type="checkbox" className="SelectAll" name="ids" value={item.cityId}
                            onChange={(e, i) => {
                                const { cityId } = item
                                if (!e.target.checked) {
                                    document.getElementById('allSelect').checked = false;
                                    this.setState({ isChecked: false });
                                    let indexOfId = this.state.ids.indexOf(cityId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1)
                                    }
                                    if (this.state.ids.length === 0) {
                                        this.setState({ isDisabled: true });
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, cityId] });
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }

                            }} /></td>
                        <td>{index + 1}</td>
                        <td>{item.country_master?item.country_master.countryName:''}</td>
                        <td>{item.state_master?item.state_master.stateName:''}</td>
                        <td>{item.cityName}</td>
                        <td>
                            <Button color="success mr-2" onClick={this.toggle.bind(this, item.cityId, item.country_master?item.country_master.countryName:'', item.state_master?item.state_master.stateName:'', item.cityName)} >Edit</Button>

                            <Button color="danger" onClick={this.deleteCityName.bind(this, item.cityId)} >Delete</Button>

                        </td>
                    </tr>

                )

            })
        }
    }
   

    onChangeCountry= (event)=>{

        let selected= event.target.value
        var country = _.find(this.props.societyReducer.countryResult,function(obj){
            return obj.countryName === selected
            })

            this.setState({
                countryName: country.countryName,
                countryId:country.countryId,
                stateName: '',
                cityName: ''
                
            })

            this.props.getState(country.countryId)
                

    }


    onChangeState= (event)=>{
        this.setState({loading: false})
   
        let selected= event.target.value
       
        var data1 = _.find(this.props.societyReducer.stateResult,function(obj){
            return obj.stateName === selected
            })

            this.setState({
                stateId: data1.stateId,
                stateName:data1.stateName
            })

            this.props.getCity(data1.stateId);

            
        }

    fetchCountry({ countryResult }) {
        if (countryResult) {

            return (
                countryResult.map((item) => {

                    return (
                        <option value={item.countryName} key={item.countryId} >
                            {item.countryName}
                        </option>
                    )
                })
            )
        }
    }

    fetchState({ stateResult }) {
        if (stateResult) {

            return (
                stateResult.map((item, index) => {

                    return (
                        <option value={item.stateName} key={item.stateId}>
                            {item.stateName}
                        </option>
                    )
                })
            )
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

    routeToAddNewCity = () => {
        this.props.history.push('/superDashboard/cityMaster')
    }


    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
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
                        <th style={{width:'4%'}}></th>
                        <th>#</th>
                        <th>Country Name</th>
                        <th>State Name</th>

                        <th  onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'cityName'}});
                        }} >City Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>

                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderCity(this.props.cityMasterReducer)}
                </tbody>
            </Table></div>

            let modalData=<div>
                   <FormGroup>
                                    <Label>Country Name</Label>

                                     <Input type="select" value={this.state.countryName} name="countryName" onChange={this.onChangeCountry}>
                                    {/* <option value={this.state.countryId}>{this.state.countryName}</option> */}
                                        <DefaultSelect/>
                                        {this.fetchCountry(this.props.societyReducer)}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>State Name</Label>

                                     <Input type="select"  id="stateId"  name="stateName" onChange={this.onChangeState} >
                                     {this.state.stateName ? <option>{this.state.stateName}</option> : <option disabled>--Select--</option>}
                                      {this.state.stateName ? <DefaultSelect />: null}
                                       {this.state.stateName ? null : this.fetchState(this.props.societyReducer)}
                                    </Input>
                                    {!this.state.stateName ? <span className="error">{this.state.errors.stateName}</span>: ''}
                                </FormGroup>
                                <FormGroup>
                                    <Label>City Name</Label>
                                    <Input type="text" id="cityId" name="cityName" onChange={this.onChangeHandler} onKeyPress={this.onKeyPressHandler} value={this.state.cityName} maxLength={50} />
                                    <span className="error">{this.state.errors.cityName}</span>
                                    <span className="error">{this.state.message}</span>
                                </FormGroup>


                                <FormGroup>
                                    <Button color="primary mr-2" onClick={this.editCityType}>Save</Button>

                                    <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                                </FormGroup>
            </div>
        return (
            <div>

                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details">
                            <h3>City Details</h3>
                            <Button onClick={this.routeToAddNewCity} color="primary">Add City</Button>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                            <ModalBody>
                            {!this.state.modalLoading  ? modalData : <Spinner />}
                            </ModalBody>
                        </Modal>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />

                        <Button color="danger" className="mb-3" onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled} >Delete Selected</Button>
                        <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}>Select All<input className="ml-2"
                    id="allSelect"
                    type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            }
                        }
                    }/></Label>

                        {(this.state.loading) ? <Spinner /> : tableData}
                        


                    </div>
                </UI>

            </div>
        );
    }
}


function mapStatToProps(state) {

    return {
        cityMasterReducer: state.cityMasterReducer,
        societyReducer: state.societyReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry, getState, getCity, detailCity, deleteCity, updateCity, deleteSelectCity }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(CityMasterDetail);
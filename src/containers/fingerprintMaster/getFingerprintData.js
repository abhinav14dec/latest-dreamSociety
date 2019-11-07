import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { getFingerprintData,getMachineData } from '../../actions/fingerprint';
import { connect } from 'react-redux';
import { Table, Row, Col, FormGroup, Input, Button, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import DropdownComponent from '../../components/reusableComponents/dropdown';
import DefaultSelect from '../../constants/defaultSelect';
import styles from '../../components/newUI/common.css';
import Spinner from '../../components/spinner/spinner';


class FingerPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            flats: '',
            editModal: false,
            editData: {
                isActive: false
            },
            filterName: 'firstName',
            flatDetailId:'',
            loading: true,
            modalLoading: false,
            modal: false,
            isDisabled: true,
            ids: [],
            search: '',
            message: '',
            errors: {},
            selectedUser:'',
            type:'activated',
            

           
            
        }

    }

  

    componentDidMount=()=> {
        this.refreshData();
    }

    refreshData=()=> {
       
        const type= this.state.type
        
        this.setState({loading: true})
        this.props.getFingerprintData(type).then(() => this.setState({ loading: false, modalLoading:false })).catch(err=>{  console.log(err.response.data.message)
            this.setState({message: err.response.data.message, loading: false})
            })


        // this.props.getRateForElectricityExpense();
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) { 
            return x.firstName.toLowerCase().includes(search.toLowerCase())  ||
             x.email.toLowerCase().includes(search.toLowerCase())  ||
             x.contact.toLowerCase().includes(search.toLowerCase()) ||
             x.flats[0].tower_master.towerName.toLowerCase().includes(search.toLowerCase()) ||
             x.flats[0].floor_master.floorName.toLowerCase().includes(search.toLowerCase())||
            
            !search;
        }
    }



    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword')
    }

    onChangeInput = (userId,e) => {
        
        let selected=e.target.value
        console.log("^^edit ",  e.target.value)

        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
        this.setState({
            [e.target.name]: e.target.value,
        
            flatDetailId:selected,
            selectedUser:userId,
            message:''
        })
        this.props.getMachineData(e.target.value);
    }

    getMachineComponent=(userId,flatDetailId,type)=>{
        
        localStorage.setItem('flatDetailId', flatDetailId)
       
        localStorage.setItem('userId', userId)
        localStorage.setItem('type', type)
         
        let errors = {};

        
        if (this.state.flatDetailId === '') 
        { errors.flatDetailId = " Flat No can't be empty" }

        this.setState({ errors })
        const isValid = Object.keys(errors).length === 0

        if (isValid) {
            this.props.history.push('/superDashboard/getMachineData');   
        }  
    }

    getDropdownForFlats = ({ fingerprintDetails},userId) => {
        let data;
        if (fingerprintDetails && fingerprintDetails.userData) {
            return fingerprintDetails.userData.filter((flatRecord) => {        
                return flatRecord.userId == userId
            }).map((item) => {
                return item.flats ? item.flats.map((item) => {  console.log("flats===============", item)
                    return (
                        <option key={item.flatDetailId} value={item.flatDetailId} >
                            {item.flatNo}
                        </option>
                    )
                }) : ''
            })
          
        }
    }

    getFingerprintDetail({ fingerprintDetails }) {
        if (fingerprintDetails && fingerprintDetails.userData) {

            return fingerprintDetails.userData.sort((item1,item2)=>{ 
                var cmprVal = (item1.firstName && item2.firstName ) ? (item1[this.state.filterName].localeCompare(item2[this.state.filterName])) : ''
             return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => { console.log("================",item)
                return (
                    <tr key={item.userId}>
                        <td> {index + 1}</td>
                        <td> {item.firstName + " " + item.lastName}</td>
                        <td> {item.email}</td>
                        <td> {item.contact}</td>
                        <td> {item.flats[0]  ? item.flats[0].tower_master.towerName : ''}</td>
                        <td> {item.flats[0]   ? item.flats[0].floor_master.floorName :''}</td>
                     
                        <td>
                            {/* <DropdownComponent
                                name="flatDetailId"
                                type="select"
                                inputChange={this.onChangeInput}
                                value={this.state.flatDetailId}
                            // className="error"
                            // error={this.state.errors.rate}
                            ><DefaultSelect />
                                {this.getDropdownForFlats(this.props.fingerprintReducer,item.userId)}
                            </DropdownComponent> */}
                            <Input type="select" defaultValue='no-value' value={item.userId !== this.state.selectedUser ? 'no-value' : this.state.flatDetailId }  name="flatDetailId" onChange={this.onChangeInput.bind(this,item.userId)} >
                                <DefaultSelect/>
                                {this.getDropdownForFlats(this.props.fingerprintReducer,item.userId)}
                            </Input>
                             <span className="error">{this.state.errors.flatDetailId}</span>
                            
                        </td>
                        <td>
                            <Button color="success" className="mr-2" disabled={item.userId !== this.state.selectedUser}   onClick={this.getMachineComponent.bind(this,item.userId, this.state.flatDetailId, this.state.type)}>Get Machine</Button>
                        </td>
                    </tr>
                )
            })
        }

    }

    activatedChange = async (e)=>{
       let selected=e.target.value;
       console.log(selected)
      await this.setState({
           type:selected
        })
     
      this.refreshData()
      this.setState({modalLoading: true})
    }
    
  

    onChange = (e) => {
        this.setState({ message: '' })
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

    render() {
         
        let tableData = <Table bordered>
            <thead>
                <tr>
                    {/* <th style={{ width: '4%' }}></th> */}
                    <th style={{ width: '4%' }}>#</th>
                    <th  onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'firstName'}});
                        }} >Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                    {/* <th>Name</th> */}
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Tower Name</th>
                    <th>Floor No</th>
                    <th>Flats</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.getFingerprintDetail(this.props.fingerprintReducer)}
            </tbody>
        </Table>
        let radioData=<div>
            <Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
                    id="activated"
                    type="radio"
                    name="activated"
                    onChange={this.activatedChange}
                    value='activated'
                    checked={ this.state.type === 'activated' ? true : false}
                    />{' '}Activated</Label>

                    <Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
                    id="deActivated"
                    type="radio"
                    name="deactivated"
                    onChange={this.activatedChange}
                    checked={this.state.type === 'deactivated' ? true : false}
                    value='deactivated'
                    />{' '}DeActivated</Label>

                    <Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
                    id="all"
                    type="radio"
                    name="all"
                    onChange={this.activatedChange}
                    value='all'
                    checked={this.state.type === 'all' ? true : false}
                    />{' '}All</Label>
        </div>


        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3 align="center">Finger Print Data Master</h3>
                        {/* <Button color="primary" onClick={this.addExpense}>Finger Print Data Master</Button> */}
                    </div>
                    <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />
                    { radioData }
                    {(this.state.loading) ? <Spinner /> : tableData}
                   
                </div>
            </UI>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fingerprintReducer: state.fingerprintReducer,
    }
}
export default connect(mapStateToProps, { getFingerprintData,getMachineData })(FingerPrint);
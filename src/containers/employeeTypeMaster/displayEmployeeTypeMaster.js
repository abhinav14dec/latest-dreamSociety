import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { getEmployee, getEmployeeType, getEmployeeWorkType, updateEmployee, deleteEmployee, deleteMultipleEmployee } from '../../actions/employeeTypeMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect'
import SearchFilter from '../../components/searchFilter/searchFilter';
class DisplayEmployeeTypeMaster extends Component {
  
    state = {
        editEmployeeData: {
     
            employeeTypeId: '',
            employeeType: '',
            employeeWorkTypeId: '',
            employeeWorkType: '',


            isActive: false
        },
        serviceType: '',
        editEmployeeModal: false,
        loading: true,
        search:'',
         ids: [],
        isDisabled: true,
        errors:{},
        filterName:"serviceType",
        modalLoading:false,
        message: ''
    }
    componentDidMount() {

        this.refreshData()

    }

  
    refreshData() {
        this.props.getEmployee().then(() => this.setState({ loading: false,modalLoading:false,editEmployeeModal:false }));
        this.props.getEmployeeType().then(() => this.setState({ loading: false }));
        this.props.getEmployeeWorkType().then(() => this.setState({ loading: false }));
        console.log("123", this.props.getEmployee())
    }
    toggleEditEmployeeModal() {
        this.setState({
            editEmployeeModal: !this.state.editEmployeeModal,message:''
        })
    }
    OnKeyPresshandler(event) {
        const pattern = /[a-zA-Z _]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    onChange=(e)=> {

        this.setState({ message: '' })
        if (!!this.state.errors[e.target.name]) {
          let errors = Object.assign({}, this.state.errors);
          delete errors[e.target.name];
          this.setState({ [e.target.name]: e.target.value, errors });
      }
      else {
          this.setState({ [e.target.name]: e.target.value });
      }
       
      } 
    editEmployee(employeeDetailId, employeeTypeId, employeeWorkTypeId, serviceType) {
        console.log('i m in edit ', employeeTypeId, employeeWorkTypeId, serviceType);
        this.setState({
            editEmployeeData: { employeeDetailId, employeeTypeId, employeeWorkTypeId},serviceType, 
            editEmployeeModal: !this.state.editEmployeeModal
        })
    }

    updateEmployee = () => {
        let errors = {};
        const {serviceType}=this.state;
        if(!this.state.serviceType){
            errors.serviceType = "Service Type can't be empty. Please select."
        }
        this.setState({ errors });
        let { employeeDetailId, employeeTypeId, employeeWorkTypeId} = this.state.editEmployeeData;
        const isValid = Object.keys(errors).length === 0
    
        // const isValid = this.validate();
        if (isValid) {
     
      
        this.props.updateEmployee(employeeDetailId, employeeTypeId, employeeWorkTypeId, serviceType).then(() => { this.refreshData() }).catch(err => this.setState({ modalLoading: false, message: err.response.data.message }))




        if (this.state.message === '') {
            this.setState({ editEmployeeModal: true })
    }
    else {
            this.setState({ editEmployeeModal: false })
    }


    this.setState({
         modalLoading: true
    })
}
    }


    deleteEmployee(employeedetailId) {
        this.setState({ loading: true })

        let { isActive } = this.state.editEmployeeData;

        this.props.deleteEmployee(employeedetailId, isActive).then(() => this.refreshData())
        this.setState({ editEmployeeData: { isActive: false } })
    }

    addEmployee = () => {
        this.props.history.push('/superDashboard/employeeType')
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }
  


    getEmpType({ employeeType }) {
        console.log(employeeType, "emptype");
        if (employeeType) {
            return (
                employeeType.employeeType.map((item) => {
                    return (
                        <option key={item.employeeTypeId} value={item.employeeTypeId} >
                            {item.employeeType}
                        </option>
                    )
                })
            )
        }
    }

    getEmpWorkType({ employeeWorkType }) {
        console.log(employeeWorkType, "emp")
        if (employeeWorkType) {
            return (
                employeeWorkType.employeeWorkType.map((item) => {
                    return (
                        <option key={item.employeeWorkTypeId} value={item.employeeWorkTypeId}>
                            {item.employeeWorkType}
                        </option>
                    )
                })
            )
        }
    }







    searchOnChange = (e) => {
        //  this.setState({})
        this.setState({ search: e.target.value })
}
searchFilter(search) {
    return function (x) {
            return x.serviceType.toLowerCase().includes(search.toLowerCase()) || 
            x.employee_work_type_master.employeeWorkType.toLowerCase().includes(search.toLowerCase()) || 
            x.employee_type_master.employeeType.toLowerCase().includes(search.toLowerCase()) || 
            
            !search;
    }
}


    getEmployee({ getEmployee }) {
        console.log(getEmployee)
        if (getEmployee && getEmployee.employeeDetail) {
            return (
                getEmployee.employeeDetail.sort((item1,item2) =>{
                    var cmprVal=(item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                    return this.state.sortVal ?cmprVal:-cmprVal}).filter(this.searchFilter(this.state.search)).map((item, index) => {
                    return (
                        <tr key={item.employeeDetailId}>

                            <td><input type="checkbox" name="ids" value={item.employeeDetailId} className="SelectAll"
                                onChange={(e, i) => {
                                    const { employeeDetailId } = item
                                    if (!e.target.checked) {
                                        if (this.state.ids.length > -1) {
                                            document.getElementById('allSelect').checked = false;
                                            let indexOfId = this.state.ids.indexOf(employeeDetailId);
                                            if (indexOfId > -1) {
                                                this.state.ids.splice(indexOfId, 1)
                                            }
                                            if (this.state.ids.length === 0) {
                                                this.setState({ isDisabled: true })
                                            }
                                        }
                                    }
                                    else {
                                        this.setState({ ids: [...this.state.ids, employeeDetailId] })
                                        if (this.state.ids.length >= 0) {
                                            this.setState({ isDisabled: false })
                                        }
                                    }
                                }} /></td>
                            <td>{index + 1}</td>
                            <td>{item.serviceType} </td>
                            <td>{item.employee_work_type_master?item.employee_work_type_master.employeeWorkType:''}</td>
                            <td>{item.employee_type_master?item.employee_type_master.employeeType:''}</td>
                            <td>
                                <button className="btn btn-success mr-2" onClick={this.editEmployee.bind(this, item.employeeDetailId, item.employeeTypeId, item.employeeWorkTypeId, item.serviceType)}  >Edit</button>
                                <button className="btn btn-danger" onClick={this.deleteEmployee.bind(this, item.employeeDetailId)}>Delete</button>
                            </td>
                        </tr>

                    )
                }
                ))
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
        let allIds = []
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }
    }
    deleteSelected(ids){
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteMultipleEmployee(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }


    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }


    render() {
        let tableData;
        tableData =
            <Table>
                <thead>
                    <tr>
                        <th style={{width:"4px" }}></th>
                        <th style={{width:"4px" }}>#</th>
                        <th onClick={()=>{this.setState((state)=>{return{sortVal:!state.sortVal,filterName:"serviceType"}})}}>Service Type
        <i class="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Employee Work Type</th>
                        <th>Employee Type</th>
                        <th> Actions  </th>
                    </tr>
                </thead>
                <tbody>
                    {this.getEmployee(this.props.employeeDetails)}
                </tbody>
            </Table>

            let modalData =<div>
                       <FormGroup>
                                    <Label for="eventType"> Service Type</Label>
                                    <Input name="serviceType" value={this.state.serviceType}
                                        onChange={this.onChange}
                                        
                                        maxLength={25}
                                        onKeyPress={this.OnKeyPresshandler}

                                    />
                                    <span className="error">{this.state.errors.serviceType}</span>
                                    <span className="error">{this.state.message} </span>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="eventType"> Employee Work Type</Label>
                                    <select id="serviceType"  className="form-control" value={this.state.editEmployeeData.employeeWorkTypeId}
                                        onChange={(e) => {
                                            let { editEmployeeData } = this.state;

                                            editEmployeeData.employeeWorkTypeId = e.target.value;

                                            this.setState({ editEmployeeData });
                                        }}
                                    >
                                    <DefaultSelect/>
                                        {this.getEmpWorkType(this.props.employeeDetails)}
                                    </select>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventType"> Employee Type</Label>
                                    <select id="serviceType"  className="form-control" value={this.state.editEmployeeData.employeeTypeId}
                                        onChange={(e) => {
                                            let { editEmployeeData } = this.state;

                                            editEmployeeData.employeeTypeId = e.target.value;

                                            this.setState({ editEmployeeData });
                                        }}


                                    >
                                    <DefaultSelect/>
                                        {this.getEmpType(this.props.employeeDetails)}
                                    </select>
                                </FormGroup>

                                <Button color="primary" className="mr-2" onClick={this.updateEmployee}>Save</Button>
                                <Button color="danger" onClick={this.toggleEditEmployeeModal.bind(this)}>Cancel</Button>
            </div>
        let deleteSelectedButton = <Button color="danger" className="mb-2" disabled={this.state.isDisabled}
            onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
        return (



            <div>

                <UI onClick={this.logout}  change={this.changePassword}>

                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details" >
                            <h3 align="center"> Employee Details</h3>
                            <Button color="primary" onClick={this.addEmployee} > Add Employee</Button>
                        </div>
                        <Modal isOpen={this.state.editEmployeeModal} toggle={this.toggleEditEmployeeModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditEmployeeModal.bind(this)}>Edit  Employee Details</ModalHeader>
                            <ModalBody>


                                                {!this.state.modalLoading?modalData:<Spinner/>}
                             

                            </ModalBody>
                        </Modal>
                        <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
                        
                        {deleteSelectedButton}

                        <Label style={{padding:'10px'}}><b>Select All</b><input className="ml-2"
                                id="allSelect"
                                type="checkbox" onChange={(e) => {
                                        if(e.target.checked) {
                                            this.selectAll();
                                        }
                                        else if(!e.target.checked){
                                            this.unSelectAll();
                                        } 
                                    }  
                                }/>
                            </Label>
                        {!this.state.loading ? tableData : <Spinner />}

                    </div>


                </UI>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        employeeDetails: state.employeeDetails
    }
}
function mapDispatchToProps(dispatch) {

    return bindActionCreators({ getEmployee, getEmployeeType, getEmployeeWorkType, updateEmployee, deleteEmployee, deleteMultipleEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEmployeeTypeMaster)      
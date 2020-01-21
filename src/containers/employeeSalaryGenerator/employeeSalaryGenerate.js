import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import { ViewEmployee,getDashboardEmployee } from '../../actions/employeeMasterAction';
import { bindActionCreators } from 'redux';
import DefaultSelect from '../../constants/defaultSelect'
import { FormGroup,Form, Input, Label, Row, Col,Button } from 'reactstrap';
import {numberValidation} from '../../validation/validation';






class EmployeeSalaryGenerate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employeeId: '',
            result:'',
            lwp: '',
            plBalance: '',
            clBalance: '',
            variableComponent: '',
            selfDevelopmentAllowance: '',
            canteenAllowance: '',
            medicalReimbursement: '',
            nightAllowance: '',
            specialAllowance: '',
            pfNo: '',
            tds: '',
            netSalary: '',
            adjustments: '',
            adjustmentAdditions: '',
            adjustmentDeductions: '',
            annualBonus: '',
            totalPayment: '',
            loading: true,
            errors: {},

            menuVisible: false,
        }

    }


    componentDidMount = () => {
        this.refreshData()
    }

    refreshData = () => {
        this.props.ViewEmployee().then(() => this.setState({loading: false}));

    }


    onChange=(e) =>{
        this.setState({message:'' })
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }
    onKeyPressHandler = (event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};
        if (!this.state.employeeId) {
            errors.employeeId = "cant be empty"
        }
        

        this.setState({ errors });





        const isValid = Object.keys(errors).length === 0;

        if (isValid) {

            // this.setState({ loading: true })
                // this.props.addCity(this.state)
                // .then(()=>this.props.history.push('/superDashboard/employeeSalaryGenerator'))
                // .catch(err => {
                //     this.setState({ message: err.response.data.message, loading: false })
                // })


            // this.setState({
            //     state:{
            //       cityName:'',
            //       countryId:'',
            //       stateId:'',


            //       menuVisible: false,


            //     }
            //   });

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

    empDetails = () => {
        this.props.history.push('/superDashboard/employeeSalaryGenerator');
    }

    close = () => {
        return this.props.history.replace('/superDashBoard')
    }

    getEmployee({ getEmployee }) {
        if (getEmployee && getEmployee.data && getEmployee.data.employee) { 
            return getEmployee.data.employee.map((item) => {
                return (
                <option key={item.employeeId} value={item.employeeId}>
                    {`${item.firstName} ${item.middleName} ${item.lastName}`}
                </option>
                )
            })
        }
    }

    onChangeEmp= (event)=>{
        this.onChange(event);
        let selected= event.target.value
        console.log("===selected", selected)
      
            this.props.getDashboardEmployee(selected).then((res) => this.setState({result:res.payload.data.employee}))

    }

    render() {
       console.log(this.state.result)

        let formData = <div>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                    <Label for="employeeId">Employee Name</Label>
                    <Input type="select" defaultValue='no-value' id="employeeId" name="employeeId" onChange={this.onChangeEmp}>
                    <DefaultSelect/>
                        {this.getEmployee(this.props.EmpDetails)}
                    </Input >
                    <span className='error'>{this.state.errors.employeeId}</span>
                    </Col>
                    <Col md={6}>
                        <Label>Employee Id</Label>
                        <Input placeholder="employee id" value={this.state.result.employeeId}  readOnly></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                   <Col md={6}>
                        <Label>Email Id</Label>
                        <Input placeholder="email id" value={this.state.result.email}  readOnly></Input>
                    </Col>
                    <Col md={6}>
                        <Label>Contact No</Label>
                        <Input placeholder="contact no" value={this.state.result.contact}  readOnly></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                   <Col md={4}>
                        <Label>Bank Name</Label>
                        <Input placeholder="bankName"   readOnly></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Salary Account no.</Label>
                        <Input placeholder="account no" readOnly></Input>
                    </Col>
                    <Col md={4}>
                        <Label>PAN No.</Label>
                        <Input  placeholder="pan" readOnly ></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                   <Col md={4}>
                        <Label>Basic Salary</Label>
                        <Input placeholder="basic salary" value={this.state.result.basic} readOnly></Input>
                    </Col>
                    <Col md={4}>
                        <Label>HRA</Label>
                        <Input placeholder="hra" value={this.state.result.hra} readOnly></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Travel Allowance</Label>
                        <Input placeholder="travel allowance" value={this.state.result.travelAllowance} readOnly></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                   <Col md={4}>
                        <Label>ESI</Label>
                        <Input placeholder="esi" value={this.state.result.esi}  readOnly></Input>
                    </Col>
                    <Col md={4}>
                        <Label>PF</Label>
                        <Input placeholder="pf" value={this.state.result.pf}  readOnly></Input>
                    </Col>
                    <Col md={4}>
                        <Label>PF No.</Label>
                        <Input placeholder="pf no." name="pfNo" ></Input>
                    </Col>
                </Row>
            </FormGroup>

            <FormGroup>
                <Row md={12}>
                   <Col md={4}>
                        <Label>Leave Without Pay(LWP)</Label>
                        <Input type="text" placeholder="lwp" name="lwp"></Input>
                    </Col>
                    <Col md={4}>
                        <Label>PL Balance as on</Label>
                        <Input type="text" placeholder="pl balance" name="plBalance" onKeyPress={numberValidation} maxlenth={2}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>CL Balance as on</Label>
                        <Input type="text" placeholder="cl balance" name="clBalance" onKeyPress={numberValidation} maxlenth={2}></Input>
                    </Col>
                </Row>
            </FormGroup>

            <FormGroup>
                <Row md={12}>
                   <Col md={4}>
                        <Label>Varible Component</Label>
                        <Input type="text" placeholder="variable component" name="variableComponent" maxlenth={5}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Self Development Allowance</Label>
                        <Input type="text" placeholder="Self Development Allowance" name="selfDevelopmentAllowance" onKeyPress={numberValidation} maxlenth={2}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Canteen Allowance</Label>
                        <Input type="text" placeholder="Canteen Allowance" name="canteenAllowance" onKeyPress={numberValidation} maxlenth={2}></Input>
                    </Col>
                </Row>
            </FormGroup>

            <Button color="success" className="mr-2 page-btn">Submit</Button>
            <Button color="danger" className="page-btn" onClick={this.empDetails}>Cancel</Button>
        </div>


        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.handleSubmit}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Employee Salary Master</h3>
                        {!this.state.loading ? formData : <Spinner />}
                    </Form>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        EmpDetails: state.EmpDetails
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ViewEmployee,getDashboardEmployee}, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(EmployeeSalaryGenerate));

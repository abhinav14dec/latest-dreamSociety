import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import { ViewEmployee,getDashboardEmployee,postEmpSalaryDetail } from '../../actions/employeeMasterAction';
import { bindActionCreators } from 'redux';
import DefaultSelect from '../../constants/defaultSelect'
import { FormGroup,Form, Input, Label, Row, Col,Button } from 'reactstrap';
import {numberValidation} from '../../validation/validation';
import { viewActiveAccounts } from '../../actions/salaryAccount';



class EmployeeSalaryGenerate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employeeId: '',
            accountId:'',
            result:'',
            account:'',
            attendenceInDays:'',
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
            mobileReimbursement: '',
            adjustmentAdditions: '',
            adjustmentDeductions: '',
            annualBonus: '',
            totalPayment: '',
            total:'',
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
        const {employeeId,accountId,attendenceInDays,lwp,
        plBalance,
        clBalance,
        variableComponent,
        selfDevelopmentAllowance,
        canteenAllowance,
        medicalReimbursement,
        nightAllowance,
        specialAllowance,
        pfNo,
        tds,
        mobileReimbursement,
        adjustmentAdditions,
        adjustmentDeductions,
        annualBonus,
        total}= this.state

        let errors = {};
        if (!employeeId) {
            errors.employeeId = "cant be empty"
        }
        else if(!attendenceInDays) {
            errors.attendenceInDays = "cant be empty"
        }
        

        this.setState({ errors });

        const data={employeeId,accountId,attendenceInDays,lwp,
            plBalance,
            clBalance,
            variableComponent,
            selfDevelopmentAllowance,
            canteenAllowance,
            medicalReimbursement,
            nightAllowance,
            specialAllowance,
            pfNo,
            tds,
            mobileReimbursement,
            adjustmentAdditions,
            adjustmentDeductions,
            annualBonus,
            totalPayment:total}


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {

            this.setState({ loading: true })
                this.props.postEmpSalaryDetail(data)
                .then(()=>this.props.history.push('/superDashboard/employeeSalaryGenerator'))
                .catch(err => {
                    this.setState({ message: err.response.data.message, loading: false })
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

      onChangeEmp= async (event)=>{
        this.onChange(event);
        let selected= event.target.value
        
            const employeeDetail = await this.props.getDashboardEmployee(selected);
            this.props.viewActiveAccounts(selected).then((res) => this.setState({account:res.payload.account,accountId:res.payload.account.accountId}))
            const data=employeeDetail.payload.data.employee;
            const basic=data.basic;
            const hra=data.hra;
            const travelAllowance=data.travelAllowance;
            const pf=data.pf;
            const esi=data.esi;
            
          
            const total = parseInt(basic) + parseInt(hra) + parseInt(travelAllowance) - parseInt(pf) - parseInt(esi);
            this.setState({result:data,totalPayment:total});
            
    

    }

    onRateChange=(e)=>{
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});    
        }
    } 
    onAttendenceChange = (e) => {
        this.onChange(e);
        this.setState({ [e.target.name]: e.target.value });
        let d = new Date();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let noOfDays = new Date(year, month, 0).getDate();
            const final = (parseInt(this.state.totalPayment) / noOfDays).toFixed(2);
            const finalAmount = Math.round((final * e.target.value).toFixed(2));
            this.setState({
                total: finalAmount
            })
    }

    render() {
      
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
                   <Col md={4}>
                        <Label>Email Id</Label>
                        <Input placeholder="email id" value={this.state.result.email}  readOnly></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Contact No</Label>
                        <Input placeholder="contact no" value={this.state.result.contact}  readOnly></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Attendence In Days</Label>
                        <Input placeholder="Attendence In Days" name="attendenceInDays"  onKeyPress={numberValidation} onChange={this.onAttendenceChange} maxLength={2}></Input>
                        <span className="error" >{this.state.errors.attendenceInDays}</span>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                   <Col md={4}>
                        <Label>Bank Name</Label>
                        <Input placeholder="bankName" value={this.state.account.bankName}   readOnly></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Salary Account no.</Label>
                        <Input placeholder="account no" value={this.state.account.accountNo} readOnly></Input>
                    </Col>
                    <Col md={4}>
                        <Label>PAN No.</Label>
                        <Input  placeholder="pan" value={this.state.account.pan} readOnly ></Input>
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
                        <Input placeholder="pf no." name="pfNo" readOnly></Input>
                    </Col>
                </Row>
            </FormGroup>

            <FormGroup>
                <Row md={12}>
                   <Col md={4}>
                        <Label>Leave Without Pay(LWP)</Label>
                        <Input type="text" placeholder="lwp" name="lwp" onKeyPress={numberValidation} onChange={this.onChange}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>PL Balance as on</Label>
                        <Input type="text" placeholder="pl balance" name="plBalance" onKeyPress={numberValidation} maxLength={2} onChange={this.onChange}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>CL Balance as on</Label>
                        <Input type="text" placeholder="cl balance" name="clBalance" onKeyPress={numberValidation} maxLength={2} onChange={this.onChange}></Input>
                    </Col>
                </Row>
            </FormGroup>

            <FormGroup>
                <Row md={12}>
                   <Col md={4}>
                        <Label>Varible Component</Label>
                        <Input type="text" placeholder="variable component" name="variableComponent" maxLength={8} value={this.state.variableComponent} onChange={this.onRateChange}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Self Development Allowance</Label>
                        <Input type="text" placeholder="Self Development Allowance" name="selfDevelopmentAllowance" value={this.state.selfDevelopmentAllowance} onChange={this.onRateChange} maxLength={8}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Canteen Allowance</Label>
                        <Input type="text" placeholder="Canteen Allowance" name="canteenAllowance" value={this.state.canteenAllowance} onChange={this.onRateChange} maxLength={8}></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                   <Col md={4}>
                        <Label>Medical Reimbursement</Label>
                        <Input type="text" placeholder="Medical Reimbursement" name="medicalReimbursement" maxLength={8} value={this.state.medicalReimbursement} onChange={this.onRateChange}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Night Allowance</Label>
                        <Input type="text" placeholder="Self Development Allowance" name="nightAllowance"  maxLength={8} value={this.state.nightAllowance} onChange={this.onRateChange}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Special Allowance</Label>
                        <Input type="text" placeholder="Special Allowance" name="specialAllowance"  maxLength={8} value={this.state.specialAllowance} onChange={this.onRateChange}></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                   <Col md={4}>
                        <Label>TDS</Label>
                        <Input type="text" placeholder="TDS" name="tds" maxLength={5} value={this.state.tds} onChange={this.onRateChange}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Mobile Reimbursement</Label>
                        <Input type="text" placeholder="Mobile Reimbursement" name="mobileReimbursement" maxLength={5} value={this.state.mobileReimbursement} onChange={this.onRateChange}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Adjustment Additions</Label>
                        <Input type="text" placeholder="Adjustment Additions" name="adjustmentAdditions" value={this.state.adjustmentAdditions} maxLength={10} onChange={this.onRateChange}></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                   <Col md={4}>
                        <Label>Adjustment Deductions</Label>
                        <Input type="text" placeholder="Adjustment Deductions" name="adjustmentDeductions" maxLength={10} value={this.state.adjustmentDeductions} onChange={this.onRateChange}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Annual Bonus</Label>
                        <Input type="text" placeholder="Annual Bonus" name="annualBonus" maxLength={10} value={this.state.annualBonus} onChange={this.onRateChange}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>Total Payment</Label>
                        <Input  placeholder="Total Payment" value={this.state.total}  name="totalPayment" readOnly></Input>
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
    return bindActionCreators({ViewEmployee,getDashboardEmployee,viewActiveAccounts,postEmpSalaryDetail}, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(EmployeeSalaryGenerate));

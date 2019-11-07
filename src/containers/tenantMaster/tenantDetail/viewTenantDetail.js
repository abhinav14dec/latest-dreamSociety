import React, { Component } from 'react';
import { Form, FormGroup, Label, Button, Input, Row, Col } from 'reactstrap';
import UI from '../../../components/newUI/superAdminDashboard';

class ViewTenantDetail extends Component {
    constructor(props){
        super(props);
        this.state = {fileName:'', gender:'', Male:'Male', Female:'Female', Other:'Other'};
    }
    componentDidMount(){
        const data = JSON.parse(localStorage.getItem('tenantDetails'));
        console.log(...data)
        this.setState(...data)
        console.log(this.state)
    }

    imgChange = (event) => {
        
        const files = event.target.files
        const file = files[0];
        console.log(this.state)
        let fileName = file ? file.name : '';
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                picture :  reader.result,
                fileName
              })
              console.log(this.state.picture)
          };
        }
        console.log(document.querySelector('#real-input'))
        const name = document.querySelector('#real-input').value.split(/\\|\//).pop();
            const truncated = name.length > 20 
              ? name.substr(name.length - 20) 
              : name;
            
              document.querySelector('.file-info').innerHTML = truncated;
    }

    browseBtn = (e) => {
        document.getElementById('real-input').click();
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

     logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
    }

    render(){
        console.log(this.state)
        return(
            <UI onClick={this.logout} change={this.changePassword}>
                <Form>
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <h3 style={{textAlign:'center'}}>Tenant Full Details</h3>
                    <FormGroup>
                        <Row>
                            <Col md={8}>
                                <Input type="file" accept='image/*' id="real-input" onChange={this.imgChange} />
                                <Button className="browse-btn" onClick={this.browseBtn}>
                                    Update pic
                                </Button>
                                <span className="file-info" >upload New Pic</span>
                            </Col>
                            <Col md={4}>
                                <div style={{border: '1px solid black', textAlign:'center'}}>
                                    <img src={this.state.picture} readOnly height='100px' width='100px' />
                                </div>
                            </Col>
                            
                        </Row>
                        
                        <span className="error">{this.state.imageSizeError}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label>Tenant Name</Label>
                        <Input value={this.state.firstName} type='text' disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label>Gender:</Label>
                        <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                        <span><Input name="gender" readOnly
                                onChange={this.onChange} type="radio" value={this.state.Male}
                                checked={this.state.Male===this.state.gender ? true : false}/></span>
                        
                        
                        <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                        <span><Input  readOnly name="gender" onChange={this.onChange} type="radio"
                                value={this.state.Female} checked={this.state.Female===this.state.gender ? true : false} /></span>
                        
                        
                        <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                        <span><Input  readOnly name="gender" onChange={this.onChange} type="radio"
                                value={this.state.Other} checked={this.state.Other===this.state.gender ? true : false}/></span>
                    </FormGroup>
                    <FormGroup>
                        <Label>Date of Birth</Label>
                        <Input type="date" value={this.state.dob} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label>Contact No</Label>
                        <Input type="text" value={this.state.contact} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="text" value={this.state.email} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" onClick={() => this.props.history.push('/superDashboard/tenantDetails')}>Go Back</Button>
                    </FormGroup>
                </Form>
            </UI>
        )
    }
}

export default ViewTenantDetail;
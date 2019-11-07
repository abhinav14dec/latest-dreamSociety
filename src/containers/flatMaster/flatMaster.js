import React, { Component } from 'react';

import { connect } from 'react-redux';
import { AddDetails, getSocietyNameDetails, getSizeTypeDetails, getDetails } from '../../actions/flatMasterAction';
import { bindActionCreators } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';


class FlatMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            societyId: '',
            societyName:'',
            flatType: '',
            flatSuperArea: '',
            sizeId: '',
            coverArea: '',
            errors: {},
            isSubmit: false,
            loading:true,
            menuVisible: false
        };
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        console.log(localStorage.getItem('societyId'));
        this.setState({societyId: localStorage.getItem('societyId')})
        // this.props.getSocietyNameDetails().then(()=> this.setState({loading:false}))
        this.props.getSizeTypeDetails().then(()=> this.setState({loading:false}))
    }

    submit = (e) => {
        e.preventDefault();
        let errors = {};
        // if (!this.state.societyId) {
        //     errors.societyId = "Society Name cannot be empty"
        // }
        if (this.state.flatType === '') errors.flatType = "Cant be empty";
        else if (this.state.flatType.length < 3) errors.flatType = "Characters should be less than four"
        if (this.state.flatSuperArea === '') errors.flatSuperArea = "Cant be empty";

        if (!this.state.sizeId) {
            errors.sizeId = "Size Type cannot be empty";
        }
        if (this.state.coverArea === '') errors.coverArea = "Cant be empty";
        else if (parseInt(this.state.coverArea) > parseInt(this.state.flatSuperArea)) errors.coverArea=
         "Cover Area cannot be greater then Flat Super Area";
         else if (parseInt(this.state.coverArea) == parseInt(this.state.flatSuperArea)) errors.coverArea=
         "Cover Area cannot be equal to Flat Super Area";
        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            this.setState({ loading: true })
            this.props.AddDetails({ ...this.state })
            .then(() => this.props.history.push('/superDashboard/flatmaster/flatmasterdetails'));
            this.setState({
                // societyId: "",
                flatType: '',
                flatSuperArea: '',
                sizeId: '',
                coverArea: '',
                isSubmit: true,
                menuVisible: false
            });
        }
    }
    onChange(e){
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log('no errors');
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        } else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }

        console.log(this.state)
    }
    // societyName=({ list0 })=> {
    //     console.log(list0)
    //     if (list0) {
    //         // const name =list0.societyName
    //         // console.log(name)

    //         return (
    //             list0.map((item) => {
                    
                      
    //                     console.log(item)
    //             //    this.state.societyName=name
    //                     // <option key{item.societyId} value={item.societyId}>
    //                     //     {item.societyName}
    //                     // </option>
            
    //             })
    //         )

    //     }
    // }
    sizeType({ list4 }) {
        if (list4) {

            return (
                list4.map((item) => {
                    return (
                        <option key={item.sizeId} value={item.sizeId}>
                            {item.sizeType}
                        </option>
                    )
                })
            )

        }
    }

    push = () => {
        this.props.history.push('/superDashboard/flatmaster/flatmasterdetails')
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    OnKeyPresshandlerPhone=(event)=>{
        const pattern = /^[0-9+]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }


    render() {
          let form;
        
            
          
            form = <div>
             
             {/* <FormGroup>
               <Label>Society Name</Label>
                 <Input
                    type="text"
                    name="societyId"
                    value={this.societyName(this.props.flat)}
                    onChange={this.onChange}>
                </Input>
                <span   style={{color:'red'}}>{this.state.errors.societyId}</span>  

            </FormGroup>  */}


            <FormGroup>
                <Label>Flat Type</Label>
                <Input
                    type="text"
                    name="flatType"
                    placeholder="flat type"
                    maxLength='4'
                    value={this.state.flatType}
                    onChange={this.onChange} />
                    
                <span style={{color:'red'}}>{this.state.errors.flatType}</span>
            </FormGroup>

            <FormGroup>
                <Label>Flat SuperArea</Label>
                <Input
                    type="text"
                    name="flatSuperArea"  
                    placeholder="flat superArea"  
                    value={this.state.flatSuperArea}
                    onKeyPress = {this.OnKeyPresshandlerPhone}
                    maxLength='4'
                    onChange={this.onChange} />
                <span  style={{color:'red'}}>{this.state.errors.flatSuperArea}</span>
            </FormGroup>

            <FormGroup>
                <Label>Size Type</Label>
                <Input
                    type="select"
                    name="sizeId"
                    onChange={this.onChange}>
                    <option>--SELECT--</option>
                    {this.sizeType(this.props.flat)}
                </Input>
                <span  style={{color:'red'}}>{this.state.errors.sizeId}</span>
            </FormGroup>

            <FormGroup>
                <Label>Cover Area</Label>
                <Input
                    type="text"
                    name="coverArea"
                    placeholder="Cover Area"
                    value={this.state.coverArea}
                    onKeyPress = {this.OnKeyPresshandlerPhone}
                    maxLength='4'
                    onChange={this.onChange} />
                <span  style={{color:'red'}}>{this.state.errors.coverArea}</span>
            </FormGroup>

            <FormGroup>
                <Button color="success" type="submit" className="mr-2">Submit</Button>
                <Button color="danger" onClick={this.push}>Cancel</Button>
              
            </FormGroup>
              </div>
          

        

        return (
            <div>
                
                <UI onClick={this.logout} change={this.changePassword}>
                <Form onSubmit={this.submit}>
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>

                    <h3 style={{textAlign:'center', marginBottom: '10px'}}> Flat Master</h3>
                    {!this.state.loading ? form : <Spinner /> }
                </Form>
                </UI>
                {/* </SideBar>
                </div> */}

            </div>

        )

    }
}
function mapStateToProps(state) {

    return {
        flat: state.flat

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddDetails, getSocietyNameDetails, getSizeTypeDetails, getDetails }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(FlatMaster);
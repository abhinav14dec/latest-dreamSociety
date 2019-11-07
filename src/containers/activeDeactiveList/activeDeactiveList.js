import React, { Component } from 'react';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
// import './countryMaster.css';
import { connect } from 'react-redux';
import { getRoles,showActiveList,showDeactiveList } from '../../actions/activeDeactive';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';

class ShowList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ids:[],
            id:'',
            roleName: '',
            roleId:'',
            search: '',
            // code: '',
            // currency: '', 
            // phoneCode: '',
            errors: {},
            filterName:'activeMembers',
            // message:'',
            isSubmit: false,
            loading:false,
            menuVisible: false
        }
    }

    componentDidMount(){
        this.refreshData()
    }

    refreshData(){
        this.props.getRoles().then(()=> this.setState({loading: false}))
        
    
    }

    onChange = (e) => {
    
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log('no errors');
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        } else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
        console.log(this.state.code)


    }

    OnKeyPresshandlerPhone = (event) => {
        const pattern = /^[0-9+]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    submit = (e) => {
        let errors = {};

        if (!this.state.id) {
            errors.id = "Please select role"
        } 
         console.log(this.state)
         let id=this.state.id
        // if (this.state.code === '') errors.code = "Cant be empty";
        // // else if(this.state.code.length.<98) errors.code ="Country code should be in captital";
        // else if (this.state.code.length !== 3 && this.state.code.length !== 2) errors.code = "Characters should be of length 2 or 3."
        // if (this.state.currency === '') errors.currency = "Cant be empty";

        // if (this.state.phoneCode === '') errors.phoneCode = "Cant be empty";

        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;
        // let codeChar = this.state.code.toUpperCase();
        if (isValid) {

            this.setState({ loading: true })
            this.props.showActiveList(this.state.id)
            .then(() => this.props.history.push(`/superDashboard/showList/showListDetails/${id}`))
            // .catch((err)=>{console.log(err.response.data.message)
                this.setState({loading:false})

            this.setState({
                roleName: '',    
               
                isSubmit: true
            });
        }
    }

    submit1=()=>{
        let errors = {};

        if (!this.state.id) {
            errors.id = "Please select role"
        } 
         console.log(this.state)
         let id=this.state.id
        // if (this.state.code === '') errors.code = "Cant be empty";
        // // else if(this.state.code.length.<98) errors.code ="Country code should be in captital";
        // else if (this.state.code.length !== 3 && this.state.code.length !== 2) errors.code = "Characters should be of length 2 or 3."
        // if (this.state.currency === '') errors.currency = "Cant be empty";

        // if (this.state.phoneCode === '') errors.phoneCode = "Cant be empty";

        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;
        // let codeChar = this.state.code.toUpperCase();
        if (isValid) {

            this.setState({ loading: true })
            this.props.showDeactiveList(this.state.id)
            .then(() => this.props.history.push(`/superDashboard/showList/showListDetails2/${id}`))
            // .catch((err)=>{console.log(err.response.data.message)
                this.setState({loading:false})

            this.setState({
                roleName: '',    
               
                isSubmit: true
            });
        }

    }

    countryDetails = () => {
        console.log('jioi');
        this.props.history.push('/superDashboard/countrymaster/countrymasterdetails');
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    // onKeyPressHandler=(event)=> {
    //     const pattern = /^[a-zA-Z ]+$/;
    //     let inputChar = String.fromCharCode(event.charCode);
    //     if (!pattern.test(inputChar)) {
    //         event.preventDefault();
    //     }
    // }
    // onKeyPressHandle=(event)=> {
    //     const pattern = /^[0-9+]$/;
    //     let inputChar = String.fromCharCode(event.charCode);
    //     if (!pattern.test(inputChar)) {
    //         event.preventDefault();
    //     }
    // }
    // onKeyPressHandle1=(event)=>{
    //     const pattern = /^[a-zA-Z$ ]+$/;
    //     let inputChar = String.fromCharCode(event.charCode);
    //     if (!pattern.test(inputChar)) {
    //         event.preventDefault();
    //     }
    // }
    // onKeyPressCode=(event)=>{
    //     const pattern = /^[a-zA-Z]+$/;
    //     let inputChar = String.fromCharCode(event.charCode);
    //     if (!pattern.test(inputChar)) {
    //         event.preventDefault();
    //     }
    // }
    onChangeCountry=(e)=>{
        // let codeDetails= e.target.value.toUpperCase();
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log('no errors');
            this.setState({ [e.target.name]: e.target.value.toUpperCase().trim(''), errors });
        } else {
        this.setState({code:e.target.value.toUpperCase().trim('')});

    }
}
    userType=({roles})=>{
        console.log(roles);
        if(roles){
            return(
                roles.role.map((item)=>{
                    return(
                        <option key ={item.id} value={item.id}>
                              {item.roleName}
                            </option>
                    )
                })
            )
        }

    }
         
    close=()=>{
        return this.props.history.replace('/superDashBoard');
    }
    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword');
     }

   

    render() {
          
          let form;
             form=<div>

             <FormGroup>
                <Label>Role</Label>
                <Input type="select" 
                name='id'
                onChange={this.onChange}>
                   <option >--SELECT--</option>
                    {this.userType(this.props.activeDeactive)}
                </Input>
                { <span className='error'>{this.state.errors.id}</span> }
                
            </FormGroup>

           
            <FormGroup>
            <div className='container'>
            <div className='row'>
                <Button className='col-5 align-self-start' color="success"onClick={this.submit} >Show Active Members </Button>
                    <Button className='col-5 align-self-end' style={{left: '100px'}} color="danger" onClick={this.submit1}>Show Deactive Members</Button>
                    </div>
                    </div>
            </FormGroup>
              </div>

        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                <Form>
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>

                    <h3 style={{textAlign:'center', marginBottom: '10px'}}> Show List</h3>
                    {!this.state.loading ? form : <Spinner /> }
                    
                </Form>
                {/* {this.fetchRoles(this.props.activeDeactive)} */}
               
                </UI>

            </div>
        )

    }
}

function  mapStateToProps(state){
    return{
        activeDeactive:state.activeDeactive
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
             getRoles,
             showActiveList,
             showDeactiveList
            
            
            
            }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowList);
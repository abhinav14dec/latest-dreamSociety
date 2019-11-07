import React,{Component} from 'react';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPassword,clearMessage } from '../../actions/resetPassword';


class resetPassword1 extends Component{
    constructor(props){
        super(props);

        this.state={
           newPassword:'',
           confirmPassword:'',
           type:'password',
           type1:'password',
            
            errors:{}
        }
    }

  

    submit=(e)=>{ 
        e.preventDefault();
        let url = window.location.href.split('?')[1]
        let errors = {};

        if (this.state.newPassword === '') errors.newPassword = "Cant be empty";
        if (this.state.confirmPassword === '') errors.confirmPassword = "Password can't be empty.";
        else if (this.state.newPassword !== this.state.confirmPassword) errors.confirmPassword = `Password doesn't match.`
        
        this.setState({ errors });
    
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
          
          console.log(url)
          let { newPassword } = this.state
          this.props.resetPassword({newPassword, url})
          
            
        }  
        
    }
    showHide=(e)=>{
        this.setState({
          type: this.state.type === 'password' ? 'input' : 'password',
        })
      }

      showHide1=(e)=>{
        this.setState({

          type1: this.state.type1 === 'password' ? 'input' : 'password',

        })
      }
      
      fetchMessage=({message})=>{
        // console.log('hcvbdhcbdsuchybvdsjc');
        console.log(message);
        if( message ){
            console.log('agIN');
            return <div>{message.message}</div>
        }
    }
    

    onChange=(e)=>{

      this.props.clearMessage();
      this.setState({newPassword:''})

      if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value.trim(''), errors });
    }
    else {
           
            this.setState({ [e.target.name]: e.target.value});
       }
    }

    onChange1=(e)=>{

      this.props.clearMessage();
      
      this.setState({confirmPassword:''})

      if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value.trim(''), errors });
    }
    else {
           
            this.setState({ [e.target.name]: e.target.value});
        }
    }
    render(){
        let show = (<i className="fa fa-eye" style={{'position': 'absolute', 'right': '15px', 'top': '40px'}}></i>);
        let hide = (<i className="fa fa-eye-slash" style={{'position': 'absolute', 'right': '15px', 'top': '40px'}}></i>);
       
        return(
            <div>
                <Form onSubmit={this.submit}>
                  <FormGroup>
                      <Label>Enter New Password</Label>
                    <Input type="password"
                        name="newPassword"
                        type={this.state.type}
                        maxLength='40'
                        onChange={this.onChange}/>
                    <span className="error">{this.state.errors.newPassword}</span>
                    <span className="newPassword" onClick={this.showHide}>{this.state.type === 'password' ? hide: show}</span>
                

                  </FormGroup>

                  <FormGroup>
                      <Label>Confirm Password</Label>
                    <Input type="password"
                        name="confirmPassword"
                        maxLength='40'
                        onChange={this.onChange1}
                        type={this.state.type1}/>
                    <span className="error">{this.state.errors.confirmPassword}</span>
                    <span className="newPassword" onClick={this.showHide1}>{this.state.type1 === 'password' ? hide: show}</span>
                

                  </FormGroup>
                  
                  <FormGroup>
                      <Button color="success">Submit</Button>
                  </FormGroup>
                  </Form>

                  {this.fetchMessage(this.props.resetPasswordReducer)}
                  
                  
            </div>
        )
    }
}
function mapStateToProps(state) {

    return {
        resetPasswordReducer: state.resetPasswordReducer

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      resetPassword,
      clearMessage
            
           
    
    }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(resetPassword1);
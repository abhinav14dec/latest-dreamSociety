import React,{Component} from 'react';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { matchUser,clearMessage } from '../../actions/forgetPassword';


class forgetPassword extends Component{
    constructor(props){
        super(props);

        this.state={
            userName:'',
            message:'',
            message1:'', 
            message2:'',
            
            errors:{}
        }
    }

    submit=(e)=>{
        e.preventDefault();
      
        let errors = {};

        if (this.state.userName === '') errors.userName = "Cant be empty";
        this.setState({ errors });
    
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            let { userName } = this.state
               this.props.matchUser(userName)
               .catch(err => this.setState({message1:err.response.data.errMessage}))
              
        }     
    }

    fetchUser=({message})=>{
        // console.log('hcvbdhcbdsuchybvdsjc');
        // console.log(message);
        if( message && this.state.message1===''){
            console.log('agIN');
            return <div>{message.message}</div>
        }
    }

    onChange=(e)=>{
            console.log("---------onchnage---------");
            this.props.clearMessage();
            this.setState({ [e.target.name]: e.target.value.trim(''),message1:'',errors:''});
    }
    render(){
        // let mssg=this.state.message1;
        return(
            <div>
                <Form onSubmit={this.submit}>
                  <FormGroup>
                      <Label>Enter UserName</Label>
                    <Input type="text"
                        name="userName"
                        onChange={this.onChange}/>
                    {<span className="error">{this.state.errors.userName}</span>}
                    <span className="error">{this.state.message1}</span>
                

                  </FormGroup>
                  
                  <FormGroup>
                      <Button color="success">Submit</Button>
                  </FormGroup>
                  </Form>

                  {this.fetchUser(this.props.forgetPasswordReducer)}
                  
                  
            </div>
        )
    }
}
function mapStateToProps(state) {

    return {
        forgetPasswordReducer: state.forgetPasswordReducer

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        matchUser ,
        clearMessage
            
           
    
    }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(forgetPassword);
import React,{ Component } from 'react';
import { Row, Col } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getData, addCard, getCard, verifySignatureFun, getCardDetails} from '../../actions/paymentAction';
import axios from 'axios';
import { URN } from '../../actionCreators';
import { authHeader } from '../../helper/authHeader';
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import UI from '../../components/newUI/ownerDashboard';
import Spinner from '../../components/spinner/spinner';

// console.log("process.env",process.env)
var razorpay = new window.Razorpay({
    key: 'rzp_test_igd3N3CAkAeRcV'
    
});

let verification={}
let dataPayment={};
let paymentCheck=false
class Payment extends Component {
    

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            user: '',
            paymentCheckbox:false,
            number: '',
            numberArray:[],
            cvvNo: '',
            expMonth: '',
            expYear:'',
            errMessage: '',
            cardBrand: '',
            isValid: null,
            cardStatus: '',
            currentDate: '',
            errMessageDate: '',
            holder: '',
            checkCard: true,
            showRzp: false,
            charges:0,
            contact:'',
            email:'',
            method:'',
            order_id:'',
            amount:'',
            radioCheck:false,
            radioId:0,
            existingCard:false,
            existingCardId:""
        }
        
}

    componentWillMount() {
        this.setState({ user: localStorage.getItem('userId')})
    }
    componentDidMount() {
        this.props.getData();
        
        this.props.getCard(authHeader).then(res=>{
            return res.payload.card.map(item=>{
                return this.setState({
                    numberArray:[...this.state.numberArray,item.number],
                    charges:this.props.location.state.totalCharges
                })
            })
        })
       
    }

    checkRadio=(e,id)=>{
        console.log("iiiiiii",id)
        if(id===1){
            this.setState({radioId:1})
        }else{
            this.setState({radioId:0})
        }
        
    }
    checkChange = () => {
        this.setState({paymentCheckbox:!this.state.paymentCheckbox})
    }
    payWithExisting = (e,ind) => {
        e.preventDefault();
        console.log("vallllllll====>",e.target.value)
        this.props.getCardDetails(e.target.value,authHeader).then(res=>{
            const cardData = res.payload.getExpiry;
            // eslint-disable-next-line
            cardData.map((item,index)=>{
                console.log("sdfdsfdsfsdfsf",item)
                const exp = item.expiration.split('/');
            this.setState({
                holder:item.holder,
                number:item.number,
                expMonth:exp[0],
                expYear:exp[1]
            })
            console.log("9innnnnn===>",ind)
            if(ind){
                this.setState({existingCardId:ind})
            }else{
                this.setState({existingCardId:""})
            }
            })
        })

    }

    addCard = (e) => {
        e.preventDefault();
        this.setState({ show: true });
    }

    number = (e) => {
        e.preventDefault();
        this.setState({ errMessage: '', cardBrand: '', cardStatus: '', checkCard: true });
    }
    holder = (e) => {
        this.setState({ holder: e.target.value })
    }
    changeDate = () => {
        this.setState({ errMessageDate: '', checkCard: false });
        
    }

    changeExpiryDate = (e) => {
       
        
        this.setState({ [e.target.name]: e.target.value },()=>{
            let expMonth = this.state.expiration.split('/')
            this.setState({expMonth:expMonth[0],expYear:expMonth[1]})
        });

    }

   
    change = (e) => {
        let checkCard = this.state.checkCard;
        let number = e.target.value;
        this.setState({ [e.target.name]: e.target.value });
        axios.post(`${URN}/validate/card`, {
            number, checkCard
        },{headers: authHeader()}).then(res => {
            this.setState({ cardBrand: res.data.response.brand })
            if (res.data.response.validCardNumber === true) {
                this.setState({number})
                
                this.setState({ cardStatus: 'Card Number Approved', isValid: true })

            }
        }
        )
            .catch(err => this.setState({ errMessage: err.response.data.response, isValid: false }));

    }
    nameValidation = (event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    numberValidation = (event) => {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    setCvv = (e) => {
        this.setState({cvvNo:e.target.value.toString()})
      
    }
    submit = (e) => {
        e.preventDefault();
        if(this.state.paymentCheckbox && !this.state.numberArray.includes(this.state.number)){
            this.props.addCard(this.state,authHeader);
        }
        // eslint-disable-next-line
       setTimeout=()=>{
        this.setState({ show: false, cardBrand: '', errMessage: '', cardStatus: '', currentDate: '',verification:verification });
    }
}
    getCards = ({ getCard }) => {
        if (getCard) {
            return getCard.map(item => {
                return (
                    <div>
                        <Row>
                            <Col xs="4">{item.number}</Col>
                            <Col xs="5">{item.holder}</Col>
                            <Col xs="3">{item.expiration}</Col>
                        </Row>
                        <hr />
                    </div>
                )
            })
        }

    }
   
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        localStorage.removeItem('userName');
        localStorage.removeItem('contact');
        return this.props.history.replace('/')
    }


    render() {
        let {numberArray} = this.state; 
        let formData;
        console.log("purpose====>",this.props.location.state);
        formData = <div style={{maxWidth:"100%",alignItems:"center"}}>
    
            <FormGroup>
                <Label>Amount: ₹ {this.props.location.state.totalCharges} for {this.props.location.state.purpose}</Label>
                </FormGroup>
                <FormGroup>
                <Row xs={12}>
                <Col xs={6}>
                <FormGroup check>
                <Label check>
                <Input type="radio" name="newCard" checked={this.state.radioId===0} onChange={(e)=>this.checkRadio(e,0)}/>Add New Card and Pay
                </Label>
                </FormGroup>
                </Col>
                <Col xs={6}>
                <FormGroup check>
                <Label check>
                <Input type="radio" name="oldCard" checked={this.state.radioId===1} onChange={(e)=>this.checkRadio(e,1)}/>Pay with Existing Cards
                </Label>
                </FormGroup>
                </Col>
                </Row>
                </FormGroup>
                {(this.state.radioId===0)?<div>
                    <FormGroup>
                <Input type="text" name="holder" onChange={this.holder} placeholder="Enter Card holder Name" onKeyPress={this.nameValidation} maxLength={30}/>
                </FormGroup>
                <FormGroup>
                <div><Input type="text" name="number" onChange={this.number} onBlur={this.change} placeholder="Card Number" onKeyPress={this.numberValidation} style={{position:"relative"}} maxLength={16}/><span style={{position:"absolute",right:"5%",top:"20%",color:"green"}}><b><i>{this.state.cardBrand}</i></b></span></div>
                {this.state.isValid ? "" : <div><span style={{ color: 'red' }}>{this.state.errMessage}</span></div>}
                </FormGroup>
                <Row xs={12}>
                <Col xs={6}>
                <FormGroup>
                <Input type="text" name="expiration" placeholder='Enter expiry no ' onChange={this.changeDate} onBlur={this.changeExpiryDate}/>
                </FormGroup>
                </Col>
                <Col xs={6}>
                <FormGroup>
                <Input type="text" name="cvvNo" onChange={this.setCvv} placeholder='Enter cvv no'/>
                </FormGroup>
                </Col>
                </Row>
                <FormGroup check>
                <Label check>
                <Input type="checkbox" onChange={this.checkChange}/> Do you want to save your card for future?
                </Label>
                </FormGroup>
                </div>:
                <div>{numberArray.map((item,index)=>{
                  return (
                      <div key={index}>
                 <FormGroup check>
                  <Label check>
                  {console.log("item.length-4",item.length-4)}
                  <Input type="radio" value={item} name="existingCard" onChange={(e)=>this.payWithExisting(e,index)}/>{item.slice(item.length-4,item.length)}
                  </Label>
                  </FormGroup>
                  <FormGroup>
                  {(index===this.state.existingCardId)?
                    <Input type="text" name="cvvNo" onChange={this.setCvv} placeholder='Enter cvv no'/>:
                    ""}
                    </FormGroup>
                  </div>
                  )
                })
                }</div>}
                
            

            <FormGroup style = {{marginTop:"20px"}}>
            <Button color="danger" onClick={this.designationDetails}>Cancel</Button>
            <Button type="submit" color="success" onClick={(res)=>{
            razorpay.createPayment({
            'contact':localStorage.getItem('contact'),
            'email':localStorage.getItem('userName'),
            'method':'card',
            'order_id':this.props.location.state.razorpay_id,
            'amount':this.props.location.state.totalCharges*100,
            'card[name]':this.state.holder,
            'card[number]':this.state.number,
            'card[cvv]':this.state.cvvNo,
            'card[expiry_month]':this.state.expMonth,
            'card[expiry_year]':this.state.expYear,

            });
            

            let promise = new Promise((resolve,reject)=>{
                razorpay.on('payment.success',function(rspn){
                dataPayment = rspn
                paymentCheck=true;
                if(paymentCheck){
                    resolve();
                }
            })
            })
            promise.then(rrr=>{
                this.props.verifySignatureFun(dataPayment,authHeader).then(res=>{
                    if(res){
                        this.props.history.push('/ownerDashboard/paymentDone')
                    }
                })
                
                
            }).catch(err=>{
                console.log(err);
            })
            }} className="mr-2" style={{float:"right"}}>Pay</Button>
            </FormGroup>
        </div>
        return (
            <div>
                 <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={(e)=>{this.submit(e)}} style={{maxWidth:"60%"}}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ marginBottom: '10px' }}>Payment</h3>

                        {!this.state.loading ? formData : <Spinner />}
                    </Form>

                </UI>
            </div>)
            
                }
}
function mapStateToProps(state) {
    console.log(",,,,,,",state.societyEventBookingReducer)
    return {
        payment: state.payment
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getData,
        addCard,
        getCard,
        verifySignatureFun,
        getCardDetails
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
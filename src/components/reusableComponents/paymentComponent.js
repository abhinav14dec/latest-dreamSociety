import React,{ Component, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getData, addCard, getCard, verifySignatureFun} from '../../actions/paymentAction';
import axios from 'axios';
import { URN } from '../../actionCreators';
import { authHeader } from '../../helper/authHeader';
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

console.log("process.env",process.env)
var razorpay = new window.Razorpay({
    key: 'rzp_test_igd3N3CAkAeRcV',
    key_secret:'rXLwbN77HeeIVma6EQDScJ3P'
    
});
let redirect_url;
let globalData = {
    'contact': "9960525050",
    'email': "mayurmahale9@gmail.com",
    'method': "card",
    'order_id':"order_DoWN48iKHTMNX2",
    'amount':444400,
    // callback_url : `http://localhost:8083/superDashboard/paymentDone`,
    // redirect:true,
    "handler": function (response){
        alert(response.razorpay_payment_id);
        if(response){
            redirect_url=`/paymentDone?${response.razorpay_payment_id}&${response.razorpay_order_id}&${response.razorpay_signature}`
        }else{
            redirect_url=`/payment`
        }   
        window.location.href = redirect_url;
    },
    
}
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
            expiration: '',
            errMessage: '',
            cardBrand: '',
            isValid: null,
            cardStatus: '',
            currentDate: '',
            errMessageDate: '',
            holder: '',
            checkCard: true,
            showRzp: false,
            charges:400,
            oId:'',
            pId:'',
            sig:''
            
        }
}

    componentWillMount() {
        this.setState({ user: localStorage.getItem('userId')})
    }
    componentDidMount() {
        this.props.getData();
        
        this.props.getCard(authHeader).then(res=>{
            return res.payload.card.map(item=>{
                return this.setState({numberArray:item.number})
            })
        })
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }
    checkChange = () => {
        this.setState({paymentCheckbox:!this.state.paymentCheckbox})
    }


    addCard = (e) => {
        e.preventDefault();
        console.log('hii');
        this.setState({ show: true });
    }

    number = (e) => {
        e.preventDefault();
        this.setState({ errMessage: '', cardBrand: '', cardStatus: '', checkCard: true });
    }
    holder = (e) => {
        this.setState({ holder: e.target.value },()=>{
            globalData['card[name]'] = this.state.holder
        })
    }
    changeDate = () => {
        this.setState({ errMessageDate: '', checkCard: false });
        
    }

    changeExpiryDate = (e) => {
       
        console.log('onBlur');
        this.setState({ [e.target.name]: e.target.value },()=>{
            let expMonth = this.state.expiration.split('/')
            console.log("expMonth",expMonth)
            globalData['card[expiry_month]'] = expMonth[0];
            globalData['card[expiry_year]'] = expMonth[1];
        });

    }

   
    change = (e) => {
        let checkCard = this.state.checkCard;
        let number = e.target.value;
        console.log('onBlur');
        this.setState({ [e.target.name]: e.target.value });
        axios.post(`${URN}/validate/card`, {
            number, checkCard
        },{headers: authHeader()}).then(res => {
            this.setState({ cardBrand: res.data.response.brand })
            if (res.data.response.validCardNumber == true) {
                globalData['card[number]'] = number;
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
        globalData['card[cvv]'] = e.target.value.toString();
    }
    submit = (e) => {
        e.preventDefault();
        
        // this.props.value(this.state);
        console.log("this.state.number",this.state.number)
        if(this.state.paymentCheckbox && !this.state.numberArray.includes(this.state.number)){
            
            this.props.addCard(this.state,authHeader);
        }
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
    // showData({ paymentData }) {
    //     if (paymentData) {
    //         let arr = [];
    //         let data = paymentData.methods.wallet
    //         for (let x in data) {
    //             arr.push(x);
    //         }
    //         return arr.map(item => {
    //             return (
    //                 <div>
    //                     <Row>
    //                         <Col xs="4">
    //                             <h5></h5>
    //                         </Col>

    //                         <Col xs="8">
    //                             <h5>{item}</h5>
    //                         </Col> 

    //                     </Row>
    //                     <hr />
    //                 </div>
    //             )
    //         })
    //     }
    // }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }


    render() {
        // console.log('asdbchadbsc');
        let formData;
        formData = <div style={{maxWidth:"100%",alignItems:"center"}}>

            <FormGroup>
                <Label>Amount: ₹ {this.state.charges}</Label>
                </FormGroup>
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
            

            <FormGroup style = {{marginTop:"20px"}}>
            <Button color="danger" onClick={this.designationDetails}>Cancel</Button>
            <Button color="success" onClick={(res)=>{
            razorpay.createPayment(globalData);
            console.log("uuuuuser",razorpay)
            

            let promise = new Promise((resolve,reject)=>{
                razorpay.on('payment.success',function(rspn){
                    console.log(rspn)
                dataPayment = rspn
                paymentCheck=true;
                if(paymentCheck){
                    resolve();
                }
            })
            })
            promise.then(rrr=>{
                
                    console.log("dkjshfkdhsh",paymentCheck)
                    console.log("dataPayment",dataPayment)
                this.props.verifySignatureFun(dataPayment,authHeader)
               axios.get(``)
                
            }).catch(err=>{
                console.log(err);
            })
            }} className="mr-2" style={{float:"right"}}>Pay</Button>
            </FormGroup>
        </div>
        return (
            <div>
                 <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={(e)=>{this.submit(e,this.props.getCard(authHeader))}} style={{maxWidth:"40%"}}>
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
        verifySignatureFun
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
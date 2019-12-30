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
            numberWithSpace:"",
            cvvNo: '',
            cardNoLength:4,
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
    getCardType=(number)=>
{
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null){
        this.setState({cardBrand:'Visa',cardNoLength:19})
    }
    // Mastercard 
    
    re = new RegExp("5[1-5][0-9]|(2(?:2[2-9][^0]|2[3-9]|[3-6]|22[1-9]|7[0-1]|72[0]))\d*")
     if (number.match(re)!==null){
         console.log("kjsdfkjsdhf")
         this.setState({cardBrand:'MasterCard',cardNoLength:19});
     }
     
    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null){
        this.setState({cardBrand:'AMEX',cardNoLength:18})
    }
    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null){
        this.setState({cardBrand:'Discover',cardNoLength:19})
    }
    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null){
        this.setState({cardBrand:'Diners',cardNoLength:17})
    }
    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
    this.setState({cardBrand:'Diners - Carte Blanche',cardNoLength:17})
        

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null){
        this.setState({cardBrand:'JCB',cardNoLength:19})
    }
    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null){
    this.setState({cardBrand:'Visa Electron',cardNoLength:19})    
    }
    return "";
}
    addCard = (e) => {
        e.preventDefault();
        this.setState({ show: true });
    }

    cardNumberHandler = (e,brand) => {
       this.setState({checkCard:true});
    var v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    if(e.target.value.length===4){
        return this.getCardType(e.target.value)
    }else if(e.target.value.length<4){
        this.setState({cardBrand:''})
    }
    for (var i=0, len=match.length; i<len; i+=4) {
        
            parts.push(match.substring(i, i+4))
        
        
    }

    if (parts.length) {
        e.target.value = parts.join(' ')
        
        return e.target.value
    } else {
        return e.target.value
    }
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
        let number = e.target.value.trim();
        this.setState({ [e.target.name]: e.target.value });
        axios.post(`${URN}/validate/card`, {
            number, checkCard
        },{headers: authHeader()}).then(res => {
            console.log("res.data.response.brand",res.data.response.brand)
            // this.setState({ cardBrand: res.data.response.brand })
            if (res.data.response.validCardNumber == true) {
                this.setState({number})
                this.setState({ cardStatus: 'Card Number Approved', isValid: true })
            }else{
                this.setState({ errMessage: 'Please provide valid card number', isValid: false })
            }
        })
        .catch(err => {
            this.setState({ errMessage: err.response.data.response, isValid: false })
            // console.log(err.message);
        })
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
                <div><Input type="text" name="number" onChange={(e)=>this.cardNumberHandler(e)} onBlur={this.change} onKeyPress={this.numberValidation} placeholder="Card Number" style={{position:"relative"}} maxLength={this.state.cardNoLength}/><span style={{position:"absolute",right:"5%",top:"20%",color:"green"}}><b><i>{this.state.cardBrand}</i></b></span></div>
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
                  <Input type="radio" value={item} checked = {this.state.existingCardId==index} 
                  name="existingCard" onChange={(e)=>this.payWithExisting(e,index)}/>
                  {
                    new Array(item.length-3).join('X').concat(item.slice(item.length-4,item.length))
                    .replace(/(\w{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
                  }
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
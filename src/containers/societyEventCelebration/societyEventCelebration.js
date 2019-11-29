import React, { Component } from "react";
import { FormGroup, Row, Col, Form, Label, Input, Button } from "reactstrap";
import UI from "../../components/newUI/superAdminDashboard";
import { userLogout } from "../../actions/loginAction";
import {
  guestDetails,
  getInvitationList
} from "../../actions/societyEventCelebrationAction";
import { connect } from "react-redux";
class SocietyEventCelebration extends Component {
  state = {
    guestName: "",
    guestEmail: "",
    guestMobileNum: "",
    numOfAdultInFamily: "",
    numOfChildInFamily: "",
    numOfAdultInGuest: "",
    numOfChildInGuest: "",
    price: "",
    interested: true,
    filteredList: [],
    errorAdultInFamily:'',
    errorGuestDetails:'',
    errors:{},
  };

  componentDidMount() {
    this.props.getInvitationList();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.invitationList !== nextProps.invitationList) {
      let filteredList = nextProps.invitationList.filter(item => {
        return item.eventId === Number(this.props.match.params.id);
      });
      this.setState({ filteredList });
    }
  }
  // Handle Input change

  handleInputChange = event => {
    this.setState({ [event.target.name]: Number(event.target.value) });
  };

  // Handle Guestlist input

  handleGuestListChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Logout

  logout = () => {
    this.props.userLogout();
  };

  // Submit form

  handleFormSubmit = event => {
    event.preventDefault();
    let data = {};
    let list = [];
    let errors={}
    const {
      numOfAdultInGuest,
      numOfChildInGuest,
      numOfAdultInFamily,
      numOfChildInFamily,
      interested,
      filteredList,
    } = this.state;

    let childCharge =
      filteredList && filteredList[0] ? filteredList[0].charges : "";
    let adultCharge =
      filteredList && filteredList[0] ? filteredList[0].perPersonCharge : "";
    let price =
      (numOfAdultInFamily + numOfAdultInGuest) * adultCharge +
      (numOfChildInFamily + numOfChildInGuest) * childCharge;
    const totalGuest = numOfAdultInGuest + numOfChildInGuest;
    let guestLimit=filteredList&&filteredList[0]?filteredList[0].guestLimit:'';
    for (let i = 0; i < totalGuest; i++) {
        // if(!this.state[`guestName` + i]|| !this.state[`guestMobileNum`+i]){
        //         errors.errorGuestDetails="Please fill all guest details"
        // }
      data = {
        guestName: this.state["guestName" + i],
        guestEmail: this.state["guestEmail" + i],
        guestMobileNum: this.state["guestMobileNum" + i]
      };
      list.push(data);
    }
    this.setState({ guestList: list, price: price }, () => {
      let payload = {
        noOfAdultsInFamily: numOfAdultInFamily,
        noOfChildInFamily: numOfChildInFamily,
        noOfAdultInGuest: numOfAdultInGuest,
        noOfChildInGuest: numOfChildInGuest,
        /*guestList:this.state.guestList,*/
        interested: interested,
        totalCharges: this.state.price
      };
      this.props.guestDetails(payload)
    });
  };

  
  // change password

  changePassword=()=>{
          if(this.props.match.path==='/ownerDashboard/societyEventCelebration/:id'){
              this.props.history.push('/ownerDashboard/changePasswordOwner')
          }
          else if(this.props.match.path==='/tenantDashboard/societyEventCelebration/:id'){
              this.props.history.push('/tenantDashboard/changePasswordTenant')
          }
  }

  // Add Guest Details
  addGuest = (numOfAdultInGuest, numOfChildInGuest) => {
    const total = numOfAdultInGuest + numOfChildInGuest;
    let guestList = [];
    for (let i = 0; i < total; i++) {
      guestList.push(
        <FormGroup key={i}>
          <Row md={12}>
            <Col md={4}>
              <Label>Guest Name</Label>
              <Input
                placeholder="Guest name"
                name={`guestName${i}`}
                onChange={this.handleGuestListChange}
              />
            </Col>
            <Col md={4}>
              <Label>Guest E-mail</Label>
              <Input
                placeholder="Guest email"
                name={`guestEmail${i}`}
                onChange={this.handleGuestListChange}
              />
            </Col>
            <Col md={4}>
              <Label>Guest Contact</Label>
              <Input
                placeholder="Guest Contact"
                name={`guestMobileNum${i}`}
                onChange={this.handleGuestListChange}
              />
            </Col>
          </Row>
        </FormGroup>
      );
    }
    return guestList;
  };
  
  render() {
    const {
      numOfAdultInGuest,
      numOfChildInGuest,
      filteredList,
      numOfAdultInFamily,
      numOfChildInFamily
    } = this.state;
    let childCharge =
      filteredList && filteredList[0] ? filteredList[0].charges : "";
    let adultCharge =
      filteredList && filteredList[0] ? filteredList[0].perPersonCharge : "";
    let price =
      (numOfAdultInFamily + numOfAdultInGuest) * adultCharge +
      (numOfChildInFamily + numOfChildInGuest) * childCharge;
    return (
      <div>
        <UI onClick={this.logout} change={this.changePassword}>
          <Form className="jumbotron" onSubmit={this.handleFormSubmit}>
            <FormGroup>
              <Row md={12}>
                <Label>Family members who will attend the event:</Label>
                <Col md={4}>
                  <Input
                    placeholder="number of adults in family"
                    name="numOfAdultInFamily"
                    value={numOfAdultInFamily}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <span className='error'>
                            {this.state.errorAdultInFamily}
                    </span>
                <Col md={4}>
                  <Input
                    placeholder="number of child in family"
                    name="numOfChildInFamily"
                    value={numOfChildInFamily}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <span className='error'>
                            {this.state.errorChildInFamily}
                          </span>
              </Row>
            </FormGroup>
            <FormGroup>
              {filteredList &&
              filteredList[0] &&
              filteredList[0].guestAllowed !== false ? (
                <Row md={12}>
                  <Label>No. of guest/non family members in event:</Label>
                  <Col md={4}>
                    <Input
                      placeholder="number of adult guests"
                      name="numOfAdultInGuest"
                      value={numOfAdultInGuest}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col md={4}>
                    <Input
                      placeholder="number of child guests"
                      name="numOfChildInGuest"
                      value={numOfChildInGuest}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </FormGroup>
            {this.addGuest(numOfAdultInGuest, numOfChildInGuest)}
            <FormGroup>
              <Row md={12}>
                <Col md={4}>
                  <Label>Adult Charges(per person)</Label>
                  <Input
                    value={
                      filteredList && filteredList[0]
                        ? filteredList[0].perPersonCharge
                        : ""
                    }
                    readOnly
                  />
                </Col>
                <Col md={4}>
                  <Label>Child Charges(per child)</Label>
                  <Input
                    value={
                      filteredList && filteredList[0]
                        ? filteredList[0].charges
                        : ""
                    }
                    readOnly
                  />
                </Col>
                <Col md={4}>
                  <Label>Total Price</Label>
                  <Input value={price} readOnly />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Button color="success">Submit</Button>
            </FormGroup>
          </Form>
        </UI>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    invitationList: state.societyEventCelebrationReducer.invitationList,
    isGuestDetailsReceived:state.societyEventCelebrationReducer.isGuestDetailsReceived
  };
};

export default connect(mapStateToProps, {
  guestDetails,
  getInvitationList,
  userLogout
})(SocietyEventCelebration);

import React, { Component } from 'react';
import { getComplaints, rejectComplaint, acceptComplaint, sendConfirmations, complaintCompleted, deleteSelectedComplaints, getFeedback } from '../../../actions/viewComplaintsAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label, Table } from 'reactstrap';
import SearchFilter from '../../../components/searchFilter/searchFilter';
import UI from '../../../components/newUI/superAdminDashboard';
import Spinner from '../../../components/spinner/spinner';
import DefaultSelect from '../../../constants/defaultSelect';

var Id;

class ViewComplaints extends Component {
    constructor() {
        super()
        this.state = {
            filterName: "slotTime1",
            complaintId: '',
            slots: [],
            slotTime1: '',
            slotTime2: '',
            slotTime3: '',
            date: '',
            flatDetailId: '',
            isActive: false,
            ids: [],
            menuVisible: false,
            editModal: false,
            editModal1: false,
            isDisabled: true,
            search: '',
            errors: {},
            loading: true,
            modalLoading: false,
            message: '',
            accept: '',
            updatedSlots: '',
            disable: ''

        }
    }


    componentDidMount() {
        this.refreshData();

    }

    onHandleChange = (event) => {

        this.setState({ updatedSlots: event.target.value })
        if (!!this.state.errors[event.target.updatedSlots]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.updatedSlots];
            this.setState({ updatedSlots: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ errors: event.target.value.trim('') });
        }
    }

    componentWillMount() {
        Id = localStorage.getItem('complaintId')
    }



    refreshData() {
        this.props.getComplaints().then(() => this.setState({ loading: false, modalLoading: false, editModal: false }));
        this.props.getFeedback(Id)
    }

    rejectComplaint = (complaintId) => {
        this.setState({ loading: true })
        let { isActive } = this.state;
        this.props.rejectComplaint(complaintId, isActive)
            .then(() => this.refreshData())
        this.setState({ isActive: false })
    }

    acceptComplaint = (complaintId) => {
        this.setState({ loading: true })
        let { isActive } = this.state;
        this.props.acceptComplaint(complaintId, isActive)
            .then(() => this.refreshData())
        this.setState({ isActive: false })
    }


    searchFilter(search) {
        return function (x) {

            return x.flat_detail_master.flatNo.toString().includes(search.toLowerCase()) || !search;
        }
    }


    push = () => {
        this.props.history.push('/vendorDashboard/viewVendorFeedback')
    }

    toggleModal() {
        this.setState({
            editModal: !this.state.editModal, message: ''
        });
    }

    toggleModal1() {
        this.setState({
            editModal1: !this.state.editModal1, message: ''
        });
    }


    openComplaint(complaintId, slots) {
        this.setState({
            complaintId, slots,
            editModal: !this.state.editModal
        }, function () {

        });

    }

    complaintCompleted(complaintId) {
        this.setState({ loading: true })
        let { isActive } = this.state;
        this.props.complaintCompleted(complaintId, isActive)
            .then(() => this.refreshData())
        this.setState({ isActive: false })
    }


    sendConfirmation = () => {
        const { complaintId, updatedSlots } = this.state;
        let errors = {};
        if (this.state.updatedSlots === '') {
            errors.updatedSlots = "Slot can't be empty"
        }


        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            this.props.sendConfirmations(complaintId, updatedSlots)
                .then(() => this.refreshData())
            this.setState({
                modalLoading: true
            })
        }

    }

    deleteSelected(ids) {
        this.setState({
            loading: true,
            isDisabled: true
        });
        this.props.deleteSelectedComplaints(ids)
            .then(() => this.refreshData())
            .catch(err => err.response.data.message);
    }


    viewFeedback(complaintId) {
        localStorage.setItem('complaintId', complaintId);
        this.push();
    
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    renderList = ({ complaints }) => {
      

        if (complaints) {

            return complaints.complaints.sort((item1, item2) => {
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                return (

                    <tr key={item.complaintId}>
                        <td><input type="checkbox" name="ids" className="SelectAll" value={item.complaintId}
                            onChange={(e) => {
                                const { complaintId } = item
                                if (!e.target.checked) {
                                    document.getElementById('allSelect').checked = false;
                                    let indexOfId = this.state.ids.indexOf(complaintId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1);
                                    }
                                    if (this.state.ids.length === 0) {
                                        this.setState({ isDisabled: true });
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, complaintId] });
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }

                            }} /></td>
                        <td>{index + 1}</td>
                        <td>{"Flat No- " + item.flat_detail_master.flatNo + " , " + item.flat_detail_master.floor_master.floorName + " floor, " + " " + item.flat_detail_master.tower_master.towerName}</td>
                        <td>{item.description}</td>
                        <td>{item.user_master.firstName + " " + item.user_master.lastName + " , " + item.user_master.contact}</td>
                        <td style={{ width: '27%' }}>

                            <Button color="primary" className="mr-2" name="accept" onClick={this.acceptComplaint.bind(this, item.complaintId)} disabled={!!(item.complaint_status_master.statusType === 'ACCEPTED') || !!(item.complaint_status_master.statusType === 'COMPLETED') || !!(item.complaint_status_master.statusType === 'CANCELED') || !!(item.complaint_status_master.statusType === 'IN PROGRESS')}>Accept</Button>
                            <Button color="danger" className="mr-2" onClick={this.rejectComplaint.bind(this, item.complaintId)} disabled={!!(item.complaint_status_master.statusType === 'COMPLETED') || !!(item.complaint_status_master.statusType === 'CANCELED')}>Reject</Button>
                            <Button color="success" className="mr-2" onClick={this.complaintCompleted.bind(this, item.complaintId)} disabled={!!(item.complaint_status_master.statusType === 'COMPLETED') || !!(item.complaint_status_master.statusType === 'CANCELED') || !!(item.complaint_status_master.statusType === 'ACCEPTED')}>Completed</Button>
                        </td>
                        <td>{item.complaint_status_master.statusType}</td>
                        <td>
                            <Button color="success" className="mr-2" onClick={this.openComplaint.bind(this, item.complaintId, item.slots)} disabled={!!(item.complaint_status_master.statusType === 'TO DO') || !!(item.complaint_status_master.statusType === 'COMPLETED') || !!(item.complaint_status_master.statusType === 'IN PROGRESS') || !!(item.complaint_status_master.statusType === 'CANCELED') || !!(item.disable === true)}>Send</Button>
                        </td>
                        <td>
                            <Button color="success" className="mr-2" onClick={this.viewFeedback.bind(this, item.complaintId)} >Feedback</Button>
                        </td>
                    </tr>


                )
            })
        }
    }


    renderFeedback = ({ feedbackResult }) => {
        if (feedbackResult) {
        }
    }




    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    close = () => {
        return this.props.history.replace('/vendorDashboard')
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword')
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if (ar.length > 0) {
            this.setState({ isDisabled: false });
        }
    }

    unSelectAll = () => {

        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }

    }



    render() {

        let tableData;
        tableData =
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: '4%' }}></th>
                        <th style={{ width: '4%' }}>#</th>
                        <th onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'slotTime1'
                                }
                            });
                        }}>Flat Details <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Description</th>
                        <th>Complainee</th>
                        <th style={{ width: '19%', textAlign: 'center' }}>Actions</th>
                        <th style={{ width: '11%' }}>Current Status</th>
                        <th>Send Confirmation</th>
                        <th>View Feedback</th>


                    </tr>
                </thead>

                <tbody>
                    {this.renderList(this.props.viewComplaintsReducer)}
                    {this.renderFeedback(this.props.viewComplaintsReducer)}
                </tbody>
            </Table>


        let modalData = <div>
            <FormGroup>
                <Label> Slots</Label>
                <Input type="select" name="updatedSlots" defaultValue='no-value' onChange={this.onHandleChange}>
                    <DefaultSelect />
                    {this.state.slots ? this.state.slots.map((item) => {
                        return (
                            <option key={item} value={item}>{item}</option>
                        )
                    }) : []}


                </Input>
                <span className="error">{this.state.errors.updatedSlots}</span>

            </FormGroup>


            <FormGroup>
                <Button color="primary" className="mr-2" onClick={this.sendConfirmation}>Send Confirmation </Button>
                <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
            </FormGroup>
        </div>

        let modalData1 = <div>
            <FormGroup>
                <Label> Slots</Label>
                <Input type="select" name="updatedSlots" defaultValue='no-value' onChange={this.onHandleChange}>
                    <DefaultSelect />
                    {this.state.slots ? this.state.slots.map((item) => {
                        return (
                            <option key={item} value={item}>{item}</option>
                        )
                    }) : []}


                </Input>
                <span className="error">{this.state.errors.updatedSlots}</span>

            </FormGroup>


            <FormGroup>
                <Button color="danger" onClick={this.toggleModal1.bind(this)}>Cancel</Button>
            </FormGroup>
        </div>

        let deleteSelectedButton = <Button color="danger" className="mb-2"
            onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>
        return (

            <div>
                <UI onClick={this.logout} change={this.changePassword}>

                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>

                        <Modal isOpen={this.state.editModal} toggle={this.toggleModal.bind(this)} >
                            <ModalHeader toggle={this.toggleModal.bind(this)}>Select Slot</ModalHeader>
                            <ModalBody>
                                {!this.state.modalLoading ? modalData : <Spinner />}
                            </ModalBody>
                        </Modal>
                        <div className="top-details" style={{ fontWeight: 'bold' }}><h3>View Complaints</h3>
                        </div>


                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />

                        {deleteSelectedButton}

                        <Label style={{ padding: '10px' }}><b>Select All</b><input className="ml-2"
                            id="allSelect"
                            type="checkbox" onChange={(e) => {
                                if (e.target.checked) {
                                    this.selectAll();
                                }
                                else if (!e.target.checked) {
                                    this.unSelectAll();
                                }
                            }} />
                        </Label>


                        {!this.state.loading ? tableData : <Spinner />}



                    </div>

                    <Modal isOpen={this.state.editModal1} toggle={this.toggleModal1.bind(this)} >
                        <ModalHeader toggle={this.toggleModal1.bind(this)}>Feedback</ModalHeader>
                        <ModalBody>
                            {!this.state.modalLoading ? modalData1 : <Spinner />}
                        </ModalBody>
                    </Modal>
                </UI>


            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        viewComplaintsReducer: state.viewComplaintsReducer


    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getComplaints, rejectComplaint, acceptComplaint, sendConfirmations, complaintCompleted, deleteSelectedComplaints, getFeedback }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewComplaints);      
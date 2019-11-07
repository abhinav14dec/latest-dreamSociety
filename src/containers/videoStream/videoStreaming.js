import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogout } from '../../actions/loginAction';
import { URN } from '../../actionCreators/index';
import UI from '../../components/newUI/superAdminDashboard';
import { videoStream } from '../../actions/videoStreamingAction';
import { Label } from 'semantic-ui-react';

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = { menuVisible: false, editUserModal: false, videos: [] };
        this.toggleEditUserModal = this.toggleEditUserModal.bind(this)
        this.editUser = this.editUser.bind(this);
    }

    componentDidMount() {
        this.props.videoStream()
            .then(res => {
                console.log(res.payload.videoData[0].Video);
                const videos = [];
                res.payload.videoData[0].Video.map(item => {
                    videos.push(item);
                })
                
                console.log(videos);
                this.setState({ videos: videos })
            })
    }

    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    logout = () => {
        this.props.userLogout();
    }

    changePassword = () => {

        return this.props.history.replace('/superDashboard/changePassword')
    }

    editUser() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }


    render() {
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="row">
                        {this.state.videos.map(item => {
                            console.log(item);
                            let urn = `${URN}/live/video/${item.videoId}`;
                            console.log(urn);
                            return (<div className="col-lg-4 col-md-6 col-sm"><div><Label className="mt-5">{item.videoName}</Label></div><div><video width="300px" height="240px" controls><source src={urn} type="video/mp4" /></video></div></div>)
                        })}
                    </div>
                </UI>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        videoStreamingReducer: state.videoStreamingReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ videoStream, userLogout }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Video));
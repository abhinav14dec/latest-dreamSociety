import React, { Component } from 'react';
import AddElectricityExpense from '../../containers/electricityExpense/addElectricityExpense';

class CloseForm extends Component {
    constructor(props) {
        super(props)
    }
    close = () => {
        console.log('close form')
        return this.props.history.push('/superDashBoard');
    }

    render() {
        return (
            <div>
                <AddElectricityExpense onRef={ref => (this.close = ref)} />
                {/* <button onClick={this.close}>Child.method()</button> */}
            </div>
        );
    }

}

export default CloseForm;
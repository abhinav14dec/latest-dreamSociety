import React, { Component } from 'react';
import axios from 'axios';
import { authHeader } from "../../helper/authHeader";
import {URN} from '../../actionCreators/index';

import CanvasJSReact from '../../components/canvasjs.react';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TenantComplaintPieChart extends Component {
	state={
		accepted:'',
		assigned:'',
		cancelled:'',
		completed:'',
		inprogress:'',
		todo:''
		
	}

	componentDidMount() {
        axios.get(`${URN}/chart`,{headers:authHeader()})
          .then(res => {
			console.log(res.data);
			this.getData(res.data)
		  })
		}
		getData=(data)=>{
this.setState({
	accepted:data.complaintsData.accepted,
	assigned:data.complaintsData.assigned,
	cancelled:data.complaintsData.cancelled,
	completed:data.complaintsData.completed,
	inprogress:data.complaintsData.inprogress,
	todo:data.complaintsData.todo

})
		}
	render() {
		const options = {
			// exportEnabled: true,
			// theme: "dark2",
			animationEnabled: false,
			title: {
				text: "Complaint Details"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 12,     
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: this.state.assigned, label: "ASSIGNED" },
					{ y: this.state.todo, label: "TODO" },
					{ y: this.state.cancelled, label: "REJECTED" },
					{ y: this.state.accepted, label: "ACCEPTED" },
					{ y: this.state.inprogress, label: "INPROGRESS" },
					{ y: this.state.completed, label: "COMPLETED" },
				]
			}],
			// data: [
			// 	{
			// 		// Change type to "doughnut", "line", "splineArea", etc.
			// 		type: "column",
			// 		dataPoints: [
			// 			{ label: "Apple",  y: 10  },
			// 			{ label: "Orange", y: 15  },
			// 			{ label: "Banana", y: 25  },
			// 			{ label: "Mango",  y: 30  },
			// 			{ label: "Grape",  y: 28  }
			// 		]
			// 	}
			// 	]
	
		}
		
		return (
		<div>
			
			<CanvasJSChart options = {options}
 
				onRef={ref => this.chart = ref} 
			/>
			{/* <FlatLineChart/> */}
			
			
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default TenantComplaintPieChart;
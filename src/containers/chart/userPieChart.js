import React, { Component } from 'react';
import axios from 'axios';
import { authHeader } from "../../helper/authHeader";
import {URN} from '../../actionCreators/index';
import UserLineChart from './userLineChart'
import CanvasJSReact from '../../components/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class UserPieChart extends Component {
	state={   
        totalActiveEmployee: '',
        totalActiveOwner: '',
        totalActiveTenant: '',
        totalActiveVendor: '',
        totalDeactiveEmployee: '',
        totalDeactiveOwner: '',
        totalDeactiveTenant: '',
        totalDeactiveVendor: ''
	}

	componentDidMount() {
        axios.get(`${URN}/user/count/list`,{headers:authHeader()})
          .then(res => {
			console.log(res.data);
			this.getData(res.data)
		  })
		}
		getData=(data)=>{
this.setState({
    totalActiveEmployee: data.totalActiveEmployee,
    totalActiveOwner :data.totalActiveOwner,
    totalActiveTenant:data.totalActiveTenant,

	          totalActiveVendor:data.totalActiveVendor,
             totalDeactiveEmployee:data.totalDeactiveEmployee,
            totalDeactiveOwner : data.totalDeactiveOwner,
            totalDeactiveTenant: data.totalDeactiveTenant,
            totalDeactiveVendor :data.totalDeactiveVendor
})
		}
	render() {
		const options = {
			// theme: "dark2",

			// exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "User Details"
			},
			data: [{
			
					type: "pie",  

				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,     
				// indexLabel: "{label} - {y}%",
				dataPoints: [
            
            {  y:this.state.totalActiveEmployee  ,label : " Total Active Employee "},
           
            {  y:this.state.totalActiveOwner ,label : "Total Active Owner "},
            {  y:this.state.totalActiveTenant ,label : "Total Active Tenant" },
            {  y:this.state.totalActiveVendor  ,label :  "Total Active Vendor" },
            {  y:this.state.totalDeactiveEmployee  ,label : "Total Deactive Employee" },
            {  y:this.state.totalDeactiveOwner   ,label :  "Total Deactive Owner" },
            {  y:this.state.totalDeactiveTenant   ,label :"Total Deactive Tenant "},
            {  y:this.state.totalDeactiveVendor   ,label : "total Deactive Vendor" }
                        
   
            
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
				/* onRef={ref => this.chart = ref} */
			/>
			{/* <UserLineChart/> */}
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default UserPieChart;
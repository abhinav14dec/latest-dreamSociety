import React, { Component } from 'react';
import axios from 'axios';
import { authHeader } from "../../helper/authHeader";
import {URN} from '../../actionCreators/index';
import CanvasJSReact from '../../components/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class FlatPieChart extends Component {
	state={
		flat:'',
		emptyFlats:''
	}

	componentDidMount() {
        axios.get(`${URN}/flats/count`,{headers:authHeader()})
          .then(res => {
			this.getData(res.data)
		  })
		}
		getData=(data)=>{
this.setState({
	flat:data.activeFlats,
	emptyFlats:data.emptyFlats
})
		}
	render() {
		const options = {
			// exportEnabled: true,
			// theme: "dark2",
			animationEnabled: false,
			title: {
				text: "Flat Details"
			},
			data: [{
				type: "pie",
			

				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,     
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: this.state.flat, label: "Active Flats" },
					{ y: this.state.emptyFlats, label: "Empty Flats" },
					
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

export default FlatPieChart;
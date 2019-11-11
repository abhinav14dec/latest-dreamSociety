import React, { Component } from 'react';
import CanvasJSReact from '../../components/canvasjs.react';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ServiceDetailsChart extends Component {
	state={
		enabled:35,
		disabled:45,
		notTaken:20,
		
	}

// 	componentDidMount() {
//         axios.get(`${URN}/flats/count`,{headers:authHeader()})
//           .then(res => {
// 			this.getData(res.data)
// 		  })
// 		}
// 		getData=(data)=>{
// this.setState({
// 	flat:data.activeFlats,
// 	emptyFlats:data.emptyFlats
// })
// 		}
	render() {
		const options = {
			// exportEnabled: true,
			// theme: "dark2",
			animationEnabled: false,
			title: {
				text: "Service Details"
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
					{ y: this.state.enabled, label: "ENABLED" },
					{ y: this.state.disabled, label: "DISABLED" },
					{ y: this.state.notTaken, label: "NOT TAKEN" },
					

					
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

export default ServiceDetailsChart;
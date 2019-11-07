import React, { Component } from 'react';
import axios from 'axios';
import { authHeader } from "../../helper/authHeader";
import { URN } from '../../actionCreators/index';
import InventoryLineChart from './inventoryLineChart';
import CanvasJSReact from '../../components/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class InventoryPieChart extends Component {


	state = {
		count: '',
		assetType: '',
		inventoryLength: '',
		viewData: [],
		 view:[],
		 display:[],
		 displayData:[],
		 assetTypeData:[]
	}

	componentDidMount() {
		axios.get(`${URN}/inventory`, { headers: authHeader() })
			.then(res => {
				console.log(res.data);
				this.getData(res.data)
			})
	}
// viewData = new Object();
  
	getData = (data) => {
		// 	data.inventory.map((item)=>{

		// 	{item.count}
		// 	console.log(item.count);
		// 	this.setState({count:item.count})

		// })
			let arr = [];
			data.inventory.map(inventory => {
				console.log("count-->",inventory.count)
				this.state.viewData.push(inventory.count);
				this.state.displayData.push(inventory.avgRate);
				this.state.assetTypeData.push(inventory.asset_type_master.assetType)
				
				for (let i = 0; i < data.inventory.length; i++) {
					this.setState({inventoryLength:data.inventory.length})
				
					// console.log(  	this.state.inventoryLength)
				   this.setState({['count'+i] : this.state.viewData[i] }) 
				   this.setState({['avgRate'+i] : this.state.displayData[i] }) 	
				   this.setState({['assetType'+i]:this.state.assetTypeData[i]})
				//    this.state.display[i]= 	{label:"count",y:this.state.displayData[i]}
                   
				   this.state.view[i]= 	{label:"  Asset  Count",name: this.state.displayData[i],assetType:this.state.assetTypeData[i], y:this.state.viewData[i]}
				//    this.setState({viewData:this.state.viewData[i]})
					console.log("inside for  ==>",this.state.viewData[i],this.state.displayData[i])
				
				
				}

			})
		
   

		this.setState({
			// count: data.inventory.map((item)=>{
			// 	{item.count}
			// }),
			assetType: data.inventory.assetType
		})
		console.log(this.state.count);

	}
	// displayData = () => {
	// 	var value;
	// 	console.log(this.state)
	// 	for (let i = 0; i < this.state.inventoryLength; i++) {
	// 		value = {
	// 			y: this.state['count' + i], label: 'count'
	// 		}
	// 		this.state.viewData.push(value)
	// 	}
	// 	console.log(this.state.viewData)
	// 	return this.state.viewData
	// }
	render() {

    
		
		console.log(this.state.count)
		const options = {
			// exportEnabled: true,

			animationEnabled: false,
			title: {
				text: "Inventory Details "
			},
			zoomEnabled:true,
			data: [{
				type: "pie",


				startAngle: 75,
				toolTipContent: " asset Type: <br/><strong> {assetType}</strong> {label}: {y}   average Rate :<br/>{name}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: this.state.view,
				// this.state.display
				// [
                
				// 	{ y: this.state.viewData, label: "count" },
					

					// {y:this.state.viewData.count,label:'123'}
				
					// { y: 90, label: "count" }

					// { y: this.state.count, label: "c" },
					// { y: this.state.assetType, label: "Empty Flats" }

				// ]
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

				<CanvasJSChart options={options}

				/* onRef={ref => this.chart = ref} */
				/>
				{/* <InventoryLineChart /> */}

				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default InventoryPieChart;
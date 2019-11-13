import React, { Component } from 'react';
import axios from 'axios';
import { authHeader } from "../../helper/authHeader";
import { URN } from '../../actionCreators/index';
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
				this.getData(res.data)
			})
	}
// viewData = new Object();
  
	getData = (data) => {
			 data.inventory.map(inventory => {
				if(inventory){
					this.state.viewData.push(inventory.count);
					this.state.displayData.push(inventory.avgRate);
					this.state.assetTypeData.push(inventory.asset_type_master.assetType)
					
					for (let i = 0; i < data.inventory.length; i++) {
						this.setState({inventoryLength:data.inventory.length})
					
					   this.setState({['count'+i] : this.state.viewData[i] }) 
					   this.setState({['avgRate'+i] : this.state.displayData[i] }) 	
					   this.setState({['assetType'+i]:this.state.assetTypeData[i]})
					    // eslint-disable-next-line
					   this.state.view[i]= 	{label:"  Asset  Count",name: this.state.displayData[i],assetType:this.state.assetTypeData[i], y:this.state.viewData[i]}
					} 
					return '';
				}  else return null;
			})
		
		this.setState({
			assetType: data.inventory.assetType
		})

	}

	render() {
		const options = {
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
			}],
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
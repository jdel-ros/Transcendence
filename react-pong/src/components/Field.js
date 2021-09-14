// // import React, { Component } from 'react';

// import React, { useEffect, useState } from 'react';
// import Ball from './Ball';

// const Field = (props) => {
// 	const {ctx,width, height, j1scored} = props;
// 	// ctx.fillStyle = "black"
// 	// ctx.font = '48px serif';
// 	// ctx.fillText('Merfi kiki',20,150);
// 	// ctx.arc(100, 200, 20, 0, 2 * Math.PI);
// 	// ctx.arc(140, 200, 20, 0, 2 * Math.PI);
// 	// ctx.rect(110,200,20,100);
// 	// ctx.arc(120,300,10,0,2*Math.PI);
// 	// ctx.fill();
// 	// useEffect(() => {
// 	// 	console.log('child canvas ' + canvas)
// 	// 	setCanvas(getCanvas)
// 	// 	console.log('child getCanvas ' + getCanvas)
// 	// })
// 	return (
// 		<div>
// 			{ctx&&<Ball ctx={ctx} width={width} height={height} j1scored={j1scored}/>}
// 		</div>
// 	);
// };

// export default Field;
// // class Field extends Component {
// // 	constructor(props) {
// // 		super(props);
// // 		this.state = {
// // 			canvas: null,
// // 		};
// // 	}
// // 	console.log()
// // 	drawCircle = () => {
// // 		this.setState({canvas: this.props.value});
// // 		console.log('test props: ' + this.props.current)
// // 		const ctx = this.props.value.current.getContext('2d')
// // 		ctx.beginPath();
// // 		ctx.fillStyle = "red"
// // 		ctx.fillRect(0, 0, 50, 100)
// // 		ctx.stroke();
// // 	};


// // 	render() {

// // 		return (
// // 			<div>
// // 				{/* {this.drawCircle()} */}
// // 			</div>
// // 		);
// // 	}
// // }

// // export default Field;

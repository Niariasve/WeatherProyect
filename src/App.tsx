// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';

function App() {
  

  return (
    <>
		<Grid container spacing={5}>
			<Grid xs={12} sm={4} md={3} lg={2}>1</Grid>
	      	<Grid xs={6} sm={4} md={3} lg={2}>2</Grid>
	      	<Grid xs={6} sm={4} md={3} lg={2}>3</Grid>
	      	<Grid xs={12} sm={4} md={3} lg={2}>4</Grid>
			<Grid xs={6} sm={4} md={6} lg={2}>5</Grid>
			<Grid xs={6} sm={4} md={6} lg={2}>6</Grid>
			<Grid xs={12} sm={6} md={4} lg={4}>
				<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13}/>
			</Grid>
			<Grid xs={12} sm={6} md={4} lg={4}>
				<Summary></Summary>
			</Grid>
			<Grid xs={12} sm={8} md={8} lg={8} lgOffset={2}>
				<BasicTable></BasicTable>
			</Grid>
	    </Grid>
    </>
  )
}

export default App

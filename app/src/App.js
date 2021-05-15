import React from 'react'
import Router from 'router'
import theme from 'theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import store from 'redux/store'
import './index.css'

const App = () => {
	return (
		<div className="App">
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router />
				</ThemeProvider>
			</Provider>
		</div>
	)
}

export default App

import React from 'react'
import ReactDOM from 'react-dom'
import AppRoute from './route/App.route'
import 'bootstrap/dist/css/bootstrap.rtl.css'
import { Provider } from 'react-redux'
import store from './redux/store'
ReactDOM.render(
	<Provider store={store}>
		<AppRoute />
	</Provider>,
	document.getElementById('root')
)

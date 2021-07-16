import { Component } from 'react'
import { Main, Panel } from '../layout'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {
	PanelLogin,
	PanelProduct,
	PanelQuantity,
	PanelOrders,
} from '../Panel/pages'
import {
	Basket,
	Checkout,
	Home,
	PaymentResult,
	Product,
	Products,
} from '../Shopping/pages'
import { Payment } from '../Payment Page/Payment'
class AppRoute extends Component {
	state = {
		basketList: [],
	}
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' exact>
						<Main basketList={this.state.basketList}>
							<Home />
						</Main>
					</Route>
					<Route
						path='/products/:category'
						exact
						render={(props) => {
							return (
								<Redirect to={`/products/${props.match.params.category}/1`} />
							)
						}}
					></Route>

					<Route
						path='/products/:category/:page'
						exact
						render={(props) => {
							return (
								<Main basketList={this.state.basketList}>
									<Products {...props} />
								</Main>
							)
						}}
					/>
					<Route
						path='/product/:id'
						exact
						render={(props) => {
							return (
								<Main basketList={this.state.basketList}>
									<Product {...props} />
								</Main>
							)
						}}
					/>
					<Route path='/basket' exact>
						<Main basketList={this.state.basketList}>
							<Basket basket-list={this.state.basketList} />
						</Main>
					</Route>
					<Route path='/checkout' exact>
						<Main basketList={this.state.basketList}>
							<Checkout />
						</Main>
					</Route>
					<Route path='/payment' exact>
						<Payment />
					</Route>
					<Route path='/payment-result/success' exact>
						<Main basketList={this.state.basketList}>
							<PaymentResult status='success' />
						</Main>
					</Route>
					<Route path='/payment-result/fail' exact>
						<Main basketList={this.state.basketList}>
							<PaymentResult status='fail' />
						</Main>
					</Route>
					<Route path='/panel/login' exact>
						<PanelLogin />
					</Route>
					<Route path='/panel/product' exact>
						<Redirect to='/panel/product/1' />
					</Route>
					<Route
						path='/panel/product/:page'
						render={(props) => {
							return (
								<Panel active='product'>
									<PanelProduct {...props} />
								</Panel>
							)
						}}
					/>
					<Route path='/panel/quantity' exact>
						<Redirect to='/panel/quantity/1' />
					</Route>
					<Route
						path='/panel/quantity/:page'
						render={(props) => {
							return (
								<Panel active='quantity'>
									<PanelQuantity {...props} />
								</Panel>
							)
						}}
					/>
					<Route path='/panel/orders' exact>
						<Redirect to='/panel/orders/expected/1' />
					</Route>
					<Route
						path='/panel/orders/:ordersFilter/:page'
						render={(props) => {
							return (
								<Panel active='orders'>
									<PanelOrders {...props} />
								</Panel>
							)
						}}
					></Route>
					<Route path='/not-found' exact>
						<h1>Page Not Found!</h1>
					</Route>
					<Redirect to='/not-found' />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default AppRoute

import React, { Suspense } from 'react'
import { Route, Switch, Redirect, Router as NavigationRouter } from 'react-router-dom'
import Header from 'components/Header.js'
import Footer from 'components/Footer.js'

import history from './browserHistory'
// import { isAuthSelector } from 'redux-state/selectors/authSelector'
// import { useSelector } from 'react-redux'
import NotificationHandler from 'components/NotificationHandler'

const Login = React.lazy(() =>
	import(
		/* webpackChunkName: "login page" */
		'./pages/Login'
	),
)

const Home = React.lazy(() =>
	import(
		/* webpackChunkName: "Home page" */
		'./pages/Home'
	),
)

export const publicRoutes = [{ path: '/login', children: <Login />, exact: true }]

export const bothRoutes = []

const privateRoutes = [
	{ path: '/home', children: <Home />, exact: true },
	{ path: '/support', children: <Home page="SUPPORT" />, exact: true },
	{ path: '/support/answer/:id', children: <Home page="SUPPORT_ANSWER" />, exact: true },
	{ path: '/users', children: <Home page="USERS" />, exact: true },
	{ path: '/users/new', children: <Home page="NEW_USER" />, exact: true },
	{ path: '/users/edit/:id', children: <Home page="EDIT_USER" />, exact: true },
	{ path: '/users/:id', children: <Home page="USER" />, exact: true },
	{ path: '/map', children: <Home page="MAP" />, exact: true },
]

const publicRedirectRoutes = privateRoutes.map(({ path, exact }) => ({
	exact,
	path,
	children: <Redirect key={path} to="/login" from={path} />,
}))

const privateRedirectRoutes = publicRoutes.map(({ path, exact }) => ({
	path,
	exact,
	children: <Redirect key={path} to="/home" from={path} exact />,
}))

/**
 * @param isAuthenticated Boolean
 */

const getRoutes = (isAuthenticated) => {
	return isAuthenticated
		? [...privateRoutes, ...privateRedirectRoutes, ...bothRoutes]
		: [...publicRoutes, ...publicRedirectRoutes, ...bothRoutes]
}

const Router = () => {
	const isAuth = true //useSelector(isAuthSelector)

	const routes = getRoutes(isAuth)

	return (
		<>
			<div className="app-content">
				<NotificationHandler />
				{!!routes?.length && (
					<Suspense fallback={<div>...loading</div>}>
						<NavigationRouter history={history}>
							<Header isAuth={isAuth} />
							<Switch>
								{routes.map((route, key) => (
									<Route key={route.path + key} {...route} />
								))}
								<Redirect push from="/*" to={isAuth ? '/home' : '/login'} />
							</Switch>
						</NavigationRouter>
					</Suspense>
				)}
			</div>
			<Footer />
		</>
	)
}

export default Router

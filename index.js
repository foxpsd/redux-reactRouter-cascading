import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import App from './modules/App'
import About from './modules/About'
import Repos from './modules/Repos'
import Repo from './modules/Repo'


// import store from './store0'
import cStore from './page/store'

import Form1Page from './page/form1Page/Form1Page'
import Form2Page from './page/form2Page/Form2Page'

const store = cStore();
render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="/repos" component={Repos}>
					<Route path="/repos/:userName/:repoName" component={Repo}/>
				</Route>
				<Route path="/about" component={About}/>
				<Route path="/form1" component={Form1Page}></Route>
				<Route path="/form2" component={Form2Page}></Route>
			</Route>
		</Router>
  	</Provider>
), document.getElementById('app'))

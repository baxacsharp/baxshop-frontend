import "./App.css"
import React from "react"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import LoginPage from "./containers/Login"
import axios from "axios"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import store, { history } from "./store"
import { SET_AUTH } from "./containers/Authentication/constants"
import Application from "./containers/Application"
import ScrollToTop from "./scrollToTop"
import setToken from "./utils/token"
// import { BrowserRouter as Router, Route } from "react-router-dom"
import "./styles/style.scss"
import "font-awesome/css/font-awesome.min.css"
import "simple-line-icons/css/simple-line-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "rc-slider/assets/index.css"

const token = localStorage.getItem("token")

if (token) {
  setToken(token)

  store.dispatch({ type: SET_AUTH })
}
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
function App() {
  // axios.defaults.withCredentials = true
  // const user = useSelector((state) => state.account.user)
  // const endpoint = process.env.REACT_APP_BACKEND_URL
  // useEffect(() => {
  //   setInterval(() => {
  //     axios.post(endpoint + "/users/refreshToken", { withCredentials: true })
  //   }, 1000 * 60 * 7)
  // }, [])
  // if (!user._id) {
  //   return (
  //     <Provider store={store}>
  //       <Router>
  //         <Route
  //           render={(routerProps) => <LoginPage {...routerProps} />}
  //           path="/login"
  //         />
  //       </Router>
  //     </Provider>
  //   )
  // } else {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop>
          <Application />
        </ScrollToTop>
      </ConnectedRouter>
    </Provider>
  )
}

export default App

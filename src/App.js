import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//using boostrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

import GuestLayout from './layouts/GuestLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ProductDetail from './pages/product/ProductDetail';

import AdminLayout from './layouts/AdminLayout';
import User from './pages/admin/User';
import Post from './pages/admin/post/Post';
import CUPost from './pages/admin/post/CUPost';
import RevenueStatistic from './pages/admin/statistical/RevenueStatistic';
import ProductStatistic from './pages/admin/statistical/ProductStatistic';
import NotFound from './pages/404';
import AddProduct from './pages/admin/product/AddProduct';
import ProductAttribute from './pages/admin/product/ProductAttribute';

const Home = () => <h3>Home</h3>;

class App extends Component {
  render() {
    let level = undefined;
    if (this.props.auth.authenticated) {
      level = this.props.auth.user.level;
    }

    const redirectToLogin = (props) => {
      return (
        <Redirect to={{
          pathname: "/user/signin",
          // state: { from: history.location }
          state: { from: props.location }
        }} />
      )
    }

    return (
      <Router>
        {/* su dung switch de tim duong dan dau tien match */}
        <Switch>
          {/* route admin */}
          {/* {user && user.level == 2 && routes.admin.map((route) => routeAdmin(route))} */}
          <Route exact path="/admin" render={props => level && level === 2 ? (
            <AdminLayout>
              <Home {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/users" render={props => level && level === 2 ? (
            <AdminLayout>
              <User {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/posts" render={props => level && level === 2 ? (
            <AdminLayout>
              <Post {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/posts/new" render={props => level && level === 2 ? (
            <AdminLayout>
              <CUPost {...props} newPost={true} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/posts/edit/:id" render={props => level && level === 2 ? (
            <AdminLayout>
              <CUPost {...props} newPost={false} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/products" render={props => level && level === 2 ? (
            <AdminLayout>
              <Home {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/product/add" render={props => level && level === 2 ? (
            <AdminLayout>
              <AddProduct {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/product/attributes" render={props => level && level === 2 ? (
            <AdminLayout>
              <ProductAttribute {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/statistical/revenue" render={props => level && level === 2 ? (
            <AdminLayout>
              <RevenueStatistic {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/statistical/product" render={props => level && level === 2 ? (
            <AdminLayout>
              <ProductStatistic {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />

          {/* route guest */}
          {/* {routes.guest.map((route) => routeGuest(route))} */}
          <Route exact path="/" render={props => (
            <GuestLayout>
              <Home {...props} />
            </GuestLayout>
          )} />
          <Route exact path="/user/signin" render={props => (
            <GuestLayout>
              <SignIn {...props} handleLogIn={this.handleLogIn} />
            </GuestLayout>
          )} />
          <Route exact path="/user/signup" render={props => (
            <GuestLayout>
              <SignUp {...props} />
            </GuestLayout>
          )} />
          <Route exact path="/user/forgotpassword" render={props => (
            <GuestLayout>
              <ForgotPassword {...props} />
            </GuestLayout>
          )} />
          <Route exact path="/product/detail" render={props => (
            <GuestLayout>
              <ProductDetail {...props} />
            </GuestLayout>
          )} />

          <Route exact component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App);

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import React from 'react'
import { render } from 'react-dom'

import UserUpdateForm from '../../components/forms/UserUpdateForm';
import UserPostForm from '../../components/forms/UserPostForm';
import PostList from '../../components/PostList'
import NotFound from '../../components/NotFound'

// TODO: create dynamic menu with active option
const App = React.createClass({
    render() {
        return(
            <div>
              <div className="row">
                <div className="col-lg-3">
                    <div className="nav flex-column nav-pills" role="tablist">
                        <a className="nav-link" href={"/user/" + this.props.params.user_id + "/"} role="tab" aria-expanded="true">
                            <i className="fa fa-home fa-lg" aria-hidden="true"> Моя сторінка</i>
                        </a>
                        <a className="nav-link" href={"/user/" + this.props.params.user_id + "/update"} role="tab" aria-expanded="true">
                            <i className="fa fa-pencil fa-lg" aria-hidden="true"> Змінити дані</i>
                        </a>
                        <a className="nav-link" href={"/user/" + this.props.params.user_id + "/post/create"} role="tab" aria-expanded="true">
                            <i className="fa fa-newspaper-o fa-lg" aria-hidden="true"> Додати статтю</i>
                        </a>
                    </div>
                </div>
                <div className="col-lg-9">
                    {this.props.children}
                </div>
              </div>
            </div>
        )
    }
});

const PersonalIndex = React.createClass({
    render(){
        return(
            <div>
                <PostList url="/api/user/posts/" grid="col-6 col-lg-6" />
            </div>
        )
    }
});


render((
  <Router history={browserHistory}>
    <Route path="/user/:user_id/" component={App}>
        <IndexRoute component={PersonalIndex} />
        <Route path="update" component={UserUpdateForm}/>
        <Route path="post/create" component={UserPostForm}/>
        <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'));
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import React from 'react'
import { render } from 'react-dom'

import UserUpdateForm from '../../jsx/components/forms/UserUpdateForm';
import UserPostForm from '../../jsx/components/forms/UserPostForm';
import PostList from '../../jsx/components/PostList'
import NotFound from '../../jsx/components/NotFound'

import menu from './data/menu_uk.js'

// TODO: create dynamic menu with active option
class App extends React.Component {
    render() {
        return(<div className="row">
                  <div className="col-lg-3">
                    <div className="nav flex-column nav-pills" role="tablist">
                        {menu(this.props.params.user_id).map((menu, i) =>
                            <a key={i} className="nav-link" href={menu.link} role="tab" aria-expanded="true">
                               <i className={menu.icon} aria-hidden="true"> {menu.title}</i>
                            </a>
                         )}
                    </div>
                  </div>
                  <div className="col-lg-9">
                    {this.props.children}
                  </div>
              </div>
        )
    }
};

class PersonalIndex extends React.Component {
    render(){
        return(
            <div>
                <PostList url="/api/user/posts/" grid="col-6 col-lg-6" />
            </div>
        )
    }
};


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
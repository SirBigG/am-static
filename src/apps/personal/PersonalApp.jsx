import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import React from 'react'
import { render } from 'react-dom'

import UserUpdateForm from './components/UserUpdateForm';
import UserPostForm from './components/UserPostForm';
import PostList from '../../jsx/components/PostList'
import NotFound from '../../jsx/components/NotFound'

import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import menu from './data/menu_uk.js';

// TODO: create dynamic menu with active option
class App extends React.Component {
    constructor() {
        super();
        this.state = {visible: false};
    }

    toggleVisibility () {
         this.setState({ visible: !this.state.visible })
    }

    render() {
        const { visible } = this.state
        return(<div>
        <Menu secondary>
            <Menu.Item>AgroMega</Menu.Item>
            <Menu.Item onClick={this.toggleVisibility.bind(this)}><Icon name="sidebar"/> Меню</Menu.Item>
        </Menu>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='uncover' width='wide' visible={visible} vertical color='red'>
            {menu(this.props.params.user_id).map((menu, i) =>
              <div key={i}>
              <Menu.Item as={Link} name={menu.item} to={menu.link}>
                <Icon name={menu.icon} size='large'/>
                {menu.title}
              </Menu.Item>
              </div>
            )}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              {this.props.children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
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
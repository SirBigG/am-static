import { Router, Route, Link, browserHistory, IndexRoute, IndexLink } from 'react-router'

import React from 'react'
import { render } from 'react-dom'

import UserUpdateForm from './components/UserUpdateForm';
import UserPostForm from './components/UserPostForm';
import EventForm from './components/EventForm';
import PostList from '../../jsx/components/PostList'
import NotFound from '../../jsx/components/NotFound'

import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Responsive, Container } from 'semantic-ui-react';

import menu from './data/menu_uk.js';


const sidebarInitial = {
                    mobile: {visible: false, animation: 'overlay', width: 'thin'},
                    computer: {visible: true, animation: 'uncover', width: 'wide'}
               }

class App extends React.Component {
    constructor() {
        super();
        this.state = this.isMobile() ? sidebarInitial.mobile : sidebarInitial.computer;
    }

    isMobile(){
        return window.innerWidth <= Responsive.onlyMobile.maxWidth
    }

    toggleVisibility () {
         this.setState({
              visible: !this.state.visible,
              animation: this.state.animation,
              width: this.state.width });
    }

    render() {
        const { visible, animation, width } = this.state
        let headerMenu = ""
        if (this.isMobile()){
            headerMenu = <Menu size='huge' secondary>
            <Menu.Item onClick={this.toggleVisibility.bind(this)}><Icon name="sidebar"/> Меню</Menu.Item>
            <Menu.Item as={Link} to={'/'} color='green'>AgroMega</Menu.Item>
        </Menu>
        }

        return(<div>
        {headerMenu}
        <Sidebar.Pushable as={Segment} >
          <Sidebar as={Menu} animation={animation} width={width} visible={visible} vertical inverted>
            <Header as='h2' icon textAlign='center'>
                <Icon name='user' circular color={'green'} />
                <Header.Content>
                     <a href='/' target='_self'><span className='ui blue'>Agro</span><span className='ui yellow'>Mega</span></a>
                </Header.Content>
            </Header>
            {menu(this.props.params.user_id).map((menu, i) =>
              <Menu.Item as={i === 0 ? IndexLink : Link} name={menu.item} activeClassName="active" to={menu.link} color='green' index={i} key={i}>
                <Icon name={menu.icon} size='large'/>
                {menu.title}
              </Menu.Item>
            )}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment style={{minHeight: window.innerHeight + 'px'}}>
                <Container>
                  {this.props.children}
                </Container>
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
                <PostList url="/api/user/posts/" columns={2} />
            </div>
        )
    }
};


render((
  <Router history={browserHistory}>
    <Route path="/profile/" component={App}>
        <IndexRoute component={PersonalIndex} />
        <Route path="update" component={UserUpdateForm}/>
        <Route path="create/post" component={UserPostForm}/>
        <Route path="create/event" component={EventForm}/>
        <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'));
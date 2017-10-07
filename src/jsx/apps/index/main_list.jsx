import React from 'react';
import ReactDOM from 'react-dom';

import PostList from '../../components/PostList'

ReactDOM.render(<PostList url='/api/post/all/' grid="col-12 col-lg-6"/>, document.getElementById('main-list'));

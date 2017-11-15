import React from 'react';
import 'whatwg-fetch';

import {orderBy} from '../utils/filters'

import ListPostItem from './ListPostItem'

import { Grid, Button } from 'semantic-ui-react'

class PostList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
         data: undefined,
         previous: "",
         next: "",
         url: ""
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({url: newProps.url});
    }
    componentDidMount() {
        if (this.state.url){
            this.fetchData(this.state.url)
        } else {
            this.fetchData(this.props.url)
        }
    }
    fetchData(url){
        fetch(url,
            {
                method: 'GET',
                credentials: 'same-origin',
                headers: {'X-Requested-With': 'XMLHttpRequest'}
            }
        )
            .then(
                (response) => {
                    if (response.status === 200){
                        response.json().then((json) => {this.setState({data: orderBy(json.results, 2),
                                                                       previous: json.previous,
                            next: json.next})})
                    }
            }
            );
    }
    onNext(e){
        e.preventDefault();
        this.setState({url: this.state.next});
        this.fetchData(this.state.next);
        // TODO: maybe nicer solusion
        window.scrollTo(0, 0)
    }
    onPrevious(e){
        e.preventDefault();
        this.setState({url: this.state.previous});
        this.fetchData(this.state.previous);
        window.scrollTo(0, 0)
    }
    render() {
        if(!this.state.data){
            return (<div>
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"> </i>
                        <p className="sr-only">Loading...</p>
                    </div>
            )
        }
        var postNodes = this.state.data.map((group, i) => {
            return (
                     <ListPostItem group={group} key={i}/>
                   )
        });


        if(this.state.previous){
            var previous = <Button inverted color='green' onClick={this.onPrevious.bind(this)} size='tiny' floated='right'>
                               &laquo; Попередня
                           </Button>
        }
        if(this.state.next){
            var next = <Button inverted color='green' onClick={this.onNext.bind(this)} size='tiny' floated='left'>
                         Наступна &raquo;
                       </Button>
        }
        return (
            <div>
                <Grid columns={this.props.columns} >
                    {postNodes}
                </Grid>

                <Grid columns={2}>
                   <Grid.Row>
                      <Grid.Column>
                        {previous}
                      </Grid.Column>
                      <Grid.Column>
                         {next}
                      </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
};


export default PostList;
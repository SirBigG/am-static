import React from 'react';

import {truncate} from '../utils/filters'

import { Grid, Image, Card } from 'semantic-ui-react'


class ListPostItem extends React.Component {
    render() {;
        var groupNodes = this.props.group.map((post, i) => {
            return <Grid.Column computer={6} mobile={16} key={i}>
                    <Card>
                       <Image src={post.photo ? post.photo.image : ""} alt={post.photo ? post.photo.description : "" } fluid />
                       <Card.Content>
                         <Card.Header textAlign={'center'}><a href={ post.url }>{ post.title }</a></Card.Header>
                         <Card.Description>
                           <div style={{textAlign: 'justify'}} dangerouslySetInnerHTML={{__html: truncate(post.text.replace(/<[^>]*>/g, ''), 40)}}/>
                         </Card.Description>
                       </Card.Content>
                    </Card>
                </Grid.Column>
            });
        return (
            <Grid.Row>
                {groupNodes}
            </Grid.Row>
        )
    }
};


export default ListPostItem;

import React from 'react';

import {truncate} from '../utils/filters'


class ListPostItem extends React.Component {
    render() {
        var groupNodes = this.props.group.map((post, i) => {
            return <div className="item_in_list" key={ i }>
                    <img src={post.photo.image} alt={ post.photo.description } id="image-list-size" className="img-rounded img-fluid" />
                    <a href={ post.url }><h2 className="text-center">{ post.title }</h2></a>
                    <div className="text-justify" dangerouslySetInnerHTML={{__html: truncate(post.text, 40) }} />
                </div>
            });
        return (
            <div className={this.props.grid_class}>
                {groupNodes}
            </div>
        )
    }
};


export default ListPostItem;

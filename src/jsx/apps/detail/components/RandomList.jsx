import React from 'react';
import 'whatwg-fetch';


const styles = {
    title : {
         overflow: 'auto'
    }
}


var RandomList = React.createClass({
    getInitialState() {
        return {data: []};
    },
    componentDidMount() {
        fetch('/api/post/random/all/',
            {
                method: 'GET',
                credentials: 'same-origin'
            }
        )
            .then(
                (response) => {
                    if (response.status === 200){
                        response.json().then((json) => {this.setState({data: json.results})})
                    }
            }
            );
    },
    render() {
        var postNodes = this.state.data.map((post, i) => {
            return (<div className="col-xs-6 col-md-3" key={i}>
                          <div className="item_in_list">
                            <a href={post.url}><img src={post.photo.image} className="img-rounded img-responsive" id="image-detail-list"/></a>
                            <h5 className="text-center" styles={[styles.title]}><a href={post.url}>{post.title}</a></h5>
                          </div>
                      </div>)
        });
        return (
            <div className="row">
                {postNodes}
            </div>
        )
    }
});


export default RandomList;
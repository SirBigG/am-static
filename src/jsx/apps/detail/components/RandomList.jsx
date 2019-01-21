import React from 'react';
import 'whatwg-fetch';

import Fingerprint2 from 'fingerprintjs2';
import GetCookieMixin from "../../../mixins/GetCookieMixin";

const styles = {
    title : {
         overflow: 'auto'
    }
};


var RandomList = React.createClass({
    mixins: [GetCookieMixin],

    getInitialState() {
        return {data: []};
    },

    componentDidMount() {
        Fingerprint2.get((components)=> {
            const fingerprint = Fingerprint2.x64hash128(components.map(function (pair:any) { return pair.value; }).join(), 31);
            fetch('/api/post/view/',
            {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": this.getCookie("csrftoken"),
                },
                body: JSON.stringify({"fingerprint": fingerprint,
                    "post_id": parseInt(document.getElementById('comment').className)})
            }
        )
            .then(
                (response) => {
                    if(response.status === 200){
                       console.log("success view");
                }
                }
            );
		});

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
            return (<div className="col-6 col-lg-3" key={i}>
                          <div className="item_in_list">
                            <a href={post.url}><img src={post.photo ? post.photo.image : ""} className="img-rounded img-fluid" id="image-detail-list"/></a>
                            <h5 className="text-center" style={{overflow: 'auto'}}><a href={post.url}>{post.title}</a></h5>
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
import React from 'react';
import Fingerprint2 from 'fingerprintjs2';

import GetCookieMixin from "../../../mixins/GetCookieMixin";


var UsefulBlock = React.createClass({
    mixins: [GetCookieMixin],

    getInitialState() {
        return {is_clicked: false}
    },

    buttonClicked(value) {
        this.setState({is_clicked:true});
        Fingerprint2.get((components)=> {
            const fingerprint = Fingerprint2.x64hash128(components.map(function (pair:any) { return pair.value; }).join(), 31);
            fetch('/api/post/useful/',
            {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": this.getCookie("csrftoken"),
                },
                body: JSON.stringify({
                    "fingerprint": fingerprint,
                    "post_id": parseInt(document.getElementById('comment').className),
                    "is_useful": value})
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
    },

    render(){
        if (this.state.is_clicked === true){
            return (
                <div className="row">
                    <div className="col-12 mt-4 mb-4">
                        <span className="h6 text-success">Дякуємо за відгук! Ваш голос буде враховано при публікації контенту.</span>
                    </div>
                </div>
            )
        }
        return(<div className="row">
            <div className="col-12 mt-4 mb-4">
                <span className="h6 mr-4">Публікація була корисною?</span>
                <button className="btn btn-success mr-2" onClick={() => this.buttonClicked(true)}>Так</button>
                <button className="btn btn-danger" onClick={() => this.buttonClicked(false)}>Ні</button>
            </div>
        </div>)
    }
});

export default UsefulBlock;
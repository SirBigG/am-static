import React from 'react';
import ReactDOM from 'react-dom';
import FieldErrorsMixin from '../../mixins/FieldErrorsMixin';

import 'whatwg-fetch';

import {Icon, Input, Image, Form, Dropdown} from 'semantic-ui-react';

// TODO: create nice styles for component
// TODO: creating help text rendering
// TODO: scroll cursor up to top. Need to fix
// TODO: handler for form state changing because after save render previous value
var styles = {
    overflow: 'hidden',
    overflowY: 'scroll',
    display: 'none',
    zIndex: 10
};

var AutocompleteField = React.createClass({
    mixins: [FieldErrorsMixin],
    getInitialState() {
        return {data: [], next: "", value: "", scrollData: [], options: [], defValue: ""};
    },
    componentWillReceiveProps(newProps) {
        this.setState({value: newProps.valueDefault.value, defValue:newProps.valueDefault.pk});
    },
    onChange(event, value) {
        this.setState({value: event.target.value});
        fetch(this.props.url + '?loc=' + event.target.value,
            {
                method: 'GET'}).then(
                (response) => {
                    if (response.status === 200){
                         response.json().then((json) => {
                            this.setState({next: json.next});
                            this.setOptions(json.results)
                         });
                }
                })
    },
    onInputClick(e){
        e.preventDefault();
        styles.display = '';
    },
    onScroll(event){
        event.preventDefault();
        var el = ReactDOM.findDOMNode(this.refs.scrollDropdawn);
        if (el.offsetHeight + el.scrollTop - 2 === el.scrollHeight) {
            $.ajax({
                url: this.state.next,
                cache: false,
                success: function (data) {
                    this.setState({scrollData: data.results, next: data.next});
                }.bind(this)
            });
            el.scrollTop = el.scrollHeight;
        }
    },
    setOptions(data){
        console.log(data.map((item)=> {return {key:item.pk, value: item.pk, text: item.value}}))
        this.setState({options: data.map((item)=> {return {key:item.pk, value: item.pk, text: item.value}})})
    },

    componentWillMount() {
        fetch(this.props.url,
              {
                method: 'GET'
              }
        ).then(
            (response) => {
                if (response.status === 200) {
                   response.json().then((json) => {
                      this.setState({next: json.next});
                      this.setOptions(json.results);
                   })
                }
            }
        );
    },
    render() {
        var errors = this.renderErrors(this.props.errors);
        return(<div className="ten wide field">
         <Dropdown placeholder='Виберіть місто' fluid search selection
          options={this.state.options}
          onSearchChange={this.onChange} value={this.state.defValue} text={this.state.value}/>
        </div>
        )
    }
});

export default AutocompleteField;

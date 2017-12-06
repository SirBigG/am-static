import React from 'react';
import ReactDOM from 'react-dom';
import FieldErrorsMixin from '../../mixins/FieldErrorsMixin';

import 'whatwg-fetch';

import {Form, Dropdown} from 'semantic-ui-react';

// TODO: creating help text rendering
// TODO: scroll cursor up to top. Need to fix
// TODO: scroll fix
var AutocompleteField = React.createClass({
    mixins: [FieldErrorsMixin],
    getInitialState() {
        return {next: "", value: "", scrollData: [], options: [], defValue: ""};
    },
    componentWillReceiveProps(newProps) {
        this.setState({value: newProps.valueDefault.value, defValue:newProps.valueDefault.pk});
    },
    onSearchChange(event, value) {
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
    onChange(e, item){
        if (item.value){
          this.state.options.map((_item) =>{
             if (_item.value === item.value){
                this.setState({defValue:_item.value, value: _item.text})
                return
             }
          })
        }
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
        <Form.Field>
          <label>{this.props.label}</label>
                <input type="text"
                       value={this.state.defValue}
                       name={this.props.name}
                       id={this.props.id}
                       style={{display: "none"}}
                       />
        </Form.Field>
         <Dropdown
          placeholder={this.props.placeholder} fluid search selection
          options={this.state.options}
          onSearchChange={this.onSearchChange}
          onChange={this.onChange}
          value={this.state.defValue}
          text={this.state.value}/>
        </div>
        )
    }
});

export default AutocompleteField;

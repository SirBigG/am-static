import React from 'react';
import FieldErrorsMixin from '../../mixins/FieldErrorsMixin';
import 'whatwg-fetch';

import {Form} from 'semantic-ui-react';

const SelectField = React.createClass({
    mixins: [FieldErrorsMixin],
    getInitialState() {
        return {data: []}
    },
    componentDidMount: function() {
        fetch(this.props.url, {method: 'GET'})
            .then(
                (response) => {
                    if (response.status === 200){
                        response.json().then((json) => {this.setState({data: json})})
                    }
            }
            );
    },
    render() {
        var options = this.state.data.map((item) => {
            return <option value={ item.pk } key={ item.pk }>
                        { item.value }
                    </option>
        });
        var errors = this.renderErrors(this.props.errors);
        
        return(
            <Form.Field width={this.props.width}>
                <label>{this.props.label}</label>
                <select
                    name={this.props.name}
                    className={this.props.class}
                    role="menu">
                    <option value="">------------</option>
                    {options}
                </select>
                { errors }
            </Form.Field>
        )
    }
});


export default SelectField;

import React from 'react';
import ReactDOM from 'react-dom';
import FieldErrorsMixin from '../../mixins/FieldErrorsMixin';

import DatePicker from 'react-datepicker';
import moment from "moment";

import 'react-datepicker/dist/react-datepicker.css';

import {Form, Input} from 'semantic-ui-react';

// TODO: Creating help text and errors rendering if they are
// TODO: more change date features
const DatePickerField = React.createClass({
    mixins: [FieldErrorsMixin],

    render() {
        var errors = this.renderErrors(this.props.errors);
        return(
            <Form.Field>
                <label>{this.props.label}</label>
                <DatePicker
                    selected={moment(this.props.value)}
                    onChange={this.props.onChange}
                    value={this.props.value}
                    name={this.props.name}
                    dateFormat="YYYY-MM-DD" />
                { errors }
            </Form.Field>
        )
    }
});

export default DatePickerField;

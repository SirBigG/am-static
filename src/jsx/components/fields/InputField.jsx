import React from 'react';
import FieldErrorsMixin from '../../mixins/FieldErrorsMixin';

import {Form, Input} from 'semantic-ui-react';

// TODO: Creating help text and errors rendering if they are
const InputField = React.createClass({
    mixins: [FieldErrorsMixin],
    render() {
        var errors = this.renderErrors(this.props.errors);
        var error = false;
        if (this.props.errors)
            error = true;
        return(
            <Form.Field width={this.props.width}>
                <label>{this.props.label}</label>
                <input type={this.props.type}
                       value={this.props.value}
                       name={this.props.name}
                       error={error}
                       />
                { errors }
            </Form.Field>
        )
    }
});

export default InputField;

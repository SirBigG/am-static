import React from 'react';
import ReactDOM from 'react-dom';
import AutocompleteField from '../../../jsx/components/fields/AutocompleteField';
import InputField from '../../../jsx/components/fields/InputField';
import ImageUploadField from '../../../jsx/components/fields/ImageUploadField';
import DatePickerField from '../../../jsx/components/fields/DatePickerField';
import GetCookieMixin from '../../../jsx/mixins/GetCookieMixin';
import FieldChangeHandlersMixin from '../../../jsx/mixins/FieldChangeHandlersMixin';
import 'whatwg-fetch';

import {Form, Button, Responsive} from 'semantic-ui-react';

var UserUpdateForm = React.createClass({
    mixins: [GetCookieMixin, FieldChangeHandlersMixin],
    getInitialState() {
        return {data: {}, errors: {}}
    },
    componentDidMount: function() {
        fetch("/api/users/",
            {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                        "X-CSRFToken": this.getCookie("csrftoken")
                }
            }
        )
            .then(
                (response) => {
                    if (response.status === 200){
                        response.json().then((json) => {this.setState({data: json})})
                    }
            }
            );
    },
    onSubmit(e){
        e.preventDefault();
        fetch("/api/users/",
            {
                method: 'PUT',
                credentials: 'same-origin',
                headers: {
                        "X-CSRFToken": this.getCookie("csrftoken")
                },
                body: new FormData(ReactDOM.findDOMNode(this.refs.form))
            }
        )
            .then(
                (response) => {
                    if(response.status === 400){
                        response.json().then((json) => {this.setState({errors: json})})
                    } else if (response.status === 200){

                        alert('Зміни успішно збережено');
                    }
                }
            )

    },
    render() {
        let width = window.innerWidth <= Responsive.onlyMobile.maxWidth ? 16 : 12
        return(
            <Form ref="form">
                <InputField type="email"
                            value={this.state.data.email}
                            name="email"
                            label="Email"
                            width={width}
                            errors={this.state.errors.email}
                            onChange={this.handleTextChange.bind(this, 'email')}/>
                <InputField type="text"
                            value={this.state.data.first_name}
                            name="first_name"
                            label="Ім’я"
                            width={width}
                            errors={this.state.errors.first_name}
                            onChange={this.handleTextChange.bind(this, 'first_name')}/>
                <InputField type="text"
                            value={this.state.data.last_name}
                            name="last_name"
                            label="Прізвище"
                            width={width}
                            errors={this.state.errors.last_name}
                            onChange={this.handleTextChange.bind(this, 'last_name')}/>
                <DatePickerField value={this.state.data.birth_date}
                                 name="birth_date"
                                 label="Дата народження"
                                 errors={this.state.errors.birth_date}
                                 onChange={this.handleDatepickerChange.bind(this, 'birth_date')}/>
                <InputField type="text"
                            value={this.state.data.phone1}
                            name="phone1"
                            label="Телефон"
                            width={width}
                            errors={this.state.errors.phone1}
                            onChange={this.handleTextChange.bind(this, 'phone1')}/>
                <InputField type="text"
                            value={this.state.data.phone2}
                            name="phone2"
                            label="Інший телефон"
                            width={width}
                            errors={this.state.errors.phone2} 
                            onChange={this.handleTextChange.bind(this, 'phone2')}/>
                <AutocompleteField url="/api/locations/" 
                                   valueDefault={this.state.data.location} 
                                   name="location" 
                                   label="Локація"
                                   placeholder="Виберіть місто"
                                   width={width}
                                   errors={this.state.errors.location}/>
                <ImageUploadField name="avatar"
                                  image_url={this.state.data.avatar_url}
                                  errors={this.state.errors.avatar}
                                  size='medium'
                                  onChange={this.handleImageChange.bind(this, 'avatar_url')}/>
                    <Form.Field control={Button} type="submit" color="green" onClick={this.onSubmit} style={{marginTop: "10px"}}>Зберегти</Form.Field>
            </Form>
        )
    }
});

export default UserUpdateForm;

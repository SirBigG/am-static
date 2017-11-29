import React from 'react';
import ReactDOM from 'react-dom';
import GetCookieMixin from '../../../jsx/mixins/GetCookieMixin';
import FieldChangeHandlersMixin from '../../../jsx/mixins/FieldChangeHandlersMixin';
import InputField from '../../../jsx/components/fields/InputField';
import TextField from '../../../jsx/components/fields/TextField';
import SelectField from '../../../jsx/components/fields/SelectField';
import AutocompleteField from '../../../jsx/components/fields/AutocompleteField';
import DatePickerField from '../../../jsx/components/fields/DatePickerField';
import ImageUploadField from '../../../jsx/components/fields/ImageUploadField';
import 'whatwg-fetch';

import {Form, Button, Responsive} from 'semantic-ui-react';

var EventForm = React.createClass({
    mixins: [GetCookieMixin, FieldChangeHandlersMixin],
    getInitialState() {
        return {errors: {}}
    },
    onSubmit(e){
        e.preventDefault();
        var formData = new FormData(ReactDOM.findDOMNode(this.refs.eventForm));
        var value = CKEDITOR.instances['text'].getData();
        formData.append('text', value);
        fetch("/api/event/create/",
            {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                        "X-CSRFToken": this.getCookie("csrftoken")
                },
                body: formData
            }
        )
            .then(
                (response) => {
                    if(response.status === 400){
                        response.json().then((json) => {this.setState({errors: json})})
                    } else if (response.status === 201){
                        response.json().then((json) => {
                            window.location.href = json.url
                        })
                    }
                }
            )

    },
    render() {
        let width = window.innerWidth <= Responsive.onlyMobile.maxWidth ? 16 : 12
        return(
            <Form ref="eventForm">
                <InputField type="text"
                            name="title"
                            label="Заголовок"
                            width={width}
                            errors={this.state.errors.title}/>
                <TextField name="text"
                           label="Текст"
                           errors={this.state.errors.text}
                           cols="5"
                           rows="5"
                           height="450"
                           width={width}/>
                <AutocompleteField url="/api/locations/"
                                   name="location"
                                   label="Локація"
                                   placeholder="Виберіть місто"
                                   width={width}
                                   errors={this.state.errors.location}/>
                <InputField type="text"
                            name="address"
                            label="Адреса"
                            width={width}
                            errors={this.state.errors.address}/>
                <SelectField name="type"
                             label="Категорія"
                             width={width}
                             value_attr="title"
                             errors={this.state.errors.type}
                             url="/api/event_types/">
                <ImageUploadField name="poster"
                                  errors={this.state.errors.poster}
                                  size="medium"
                                  onChange={this.handleImageChange.bind(this, "poster")}/>
                <DatePickerField name="start"
                                 label="Дата початку"
                                 errors={this.state.errors.start}
                                 time={true}
                                 onChange={this.handleDatepickerChange.bind(this, "start")}/>
                <DatePickerField name="stop"
                                 label="Дата кінця"
                                 time={true}
                                 errors={this.state.errors.stop}
                                 onChange={this.handleDatepickerChange.bind(this, "stop")}/>
                <Form.Field control={Button} type="submit" color="green" onClick={this.onSubmit} style={{marginTop: "10px"}}>Зберегти</Form.Field>
            </Form>
        )
    }
});


export default EventForm;
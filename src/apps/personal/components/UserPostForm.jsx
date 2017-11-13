import React from 'react';
import ReactDOM from 'react-dom';
import GetCookieMixin from '../../../jsx/mixins/GetCookieMixin';
import FieldChangeHandlersMixin from '../../../jsx/mixins/FieldChangeHandlersMixin';
import InputField from '../../../jsx/components/fields/InputField';
import TextField from '../../../jsx/components/fields/TextField';
import SelectField from '../../../jsx/components/fields/SelectField';
import PhotoSet from '../../../jsx/components/PhotoSet';
import 'whatwg-fetch';

import {Form, Button, Responsive} from 'semantic-ui-react';

var UserPostForm = React.createClass({
    mixins: [GetCookieMixin, FieldChangeHandlersMixin],
    getInitialState() {
        return {data: [], errors: {}}
    },
    onSubmit(e){
        e.preventDefault();
        var formData = new FormData(ReactDOM.findDOMNode(this.refs.postForm));
        var nums = [1,2,3,4];
        var value = CKEDITOR.instances['text'].getData();
        formData.append('text', value);
        nums.map((i) => {
            if (formData.get('image'+i)) {
                formData.append('photos', formData.get('image' + i))
            }
            formData.delete('image'+i)
        });
        fetch("/api/user/posts/",
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
            <Form ref="postForm">
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
                <SelectField name="rubric"
                             label="Категорія"
                             width={width}
                             errors={this.state.errors.rubric}
                             url="/api/categories/?level=1"/>
                <PhotoSet errors={this.state.errors.photos}/>
                <InputField type="text"
                            name="source"
                            label="Джерело"
                            width={width}
                            errors={this.state.errors.source}/>
                <Form.Field control={Button} type="submit" color="green" onClick={this.onSubmit} style={{marginTop: "10px"}}>Зберегти</Form.Field>
            </Form>
        )
    }
});


export default UserPostForm;
import React from 'react';
import FieldErrorsMixin from '../../mixins/FieldErrorsMixin';

import {Icon, Input, Image, Form, Responsive} from 'semantic-ui-react'

const ImageUploadField = React.createClass ({
    
    mixins: [FieldErrorsMixin],

    getInitialState(){
        return { imagePreviewUrl: ''}
    },

  componentWillReceiveProps(newProps) {
      this.setState({imagePreviewUrl: newProps.image_url})
  },

  render() {
      let $imagePreview = null;
      if (this.state.imagePreviewUrl) {
          $imagePreview = (<Image src={this.state.imagePreviewUrl} size={this.props.size}/>);
      } else {
          $imagePreview = "";
      }
      var errors = this.renderErrors(this.props.errors);
      let width = window.innerWidth <= Responsive.onlyMobile.maxWidth ? 16 : 2
      return (
          <div>
              <Form.Field width={width}>
              <label className="ui green button" htmlFor={this.props.name} style={{marginTop: '10px'}}>
                  <Icon name="plus circle" size='large'/> Додати фото
              </label>
              <Input type="file"
                     onChange={this.props.onChange}
                     className='hidden'
                     name={this.props.name}
                     id={this.props.name}
                     style={{display: 'none'}} />
              </Form.Field>
              {errors}
              <div className="imgPreview">
                  {$imagePreview}
              </div>
          </div>
      )
  }
});

export default ImageUploadField;

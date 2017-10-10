import React from 'react';
import FieldErrorsMixin from '../../mixins/FieldErrorsMixin';


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
          $imagePreview = (<img src={this.state.imagePreviewUrl} className="img-fluid" width={this.props.width}
          height={this.props.height}/>);
      } else {
          $imagePreview = "";
      }
      var errors = this.renderErrors(this.props.errors);
      return (
          <div className="form-group">
              <label className="btn btn-success d-flex justify-content-center" htmlFor={this.props.name}>
                  <i className="fa fa-plus-circle fa-lg" aria-hidden="true"> Додати фото</i>
              </label>
              <input type="file"
                         onChange={this.props.onChange}
                         className="form-control-file invisible"
                         name={this.props.name}
                         id={this.props.name}  />
              {errors}
              <div className="imgPreview">
                  {$imagePreview}
              </div>
          </div>
      )
  }
});

export default ImageUploadField;

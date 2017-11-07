import  React from 'react';

import {Header} from 'semantic-ui-react';

const FieldErrorsMixin = {
    renderErrors(errors) {
        if(!errors)
        {
            return null;
        }

        return errors.map(this.renderError);
    },

    renderError(error, key) {
        if(!error || !error.length)
        {
            return null;
        }
        var error_key = 'error_'+key;
        return (
            <Header as="h5" key={error_key} color="red">{ error }</Header>
        );
    }

};

export default FieldErrorsMixin;

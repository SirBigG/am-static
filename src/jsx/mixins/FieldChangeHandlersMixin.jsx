import moment from "moment";

const FieldChangeHandlersMixin = {
    handleTextChange(name, event) {
        event.preventDefault();
        let currentData = this.state.data;
        if (event.target) {
            currentData[name] = event.target.value;
            this.setState({data: currentData})
        }
    },
    handleDatepickerChange(name, event){
       let currentData = this.state.data;
        if (event._d) {
            currentData[name] = moment(event._d).format("YYYY-MM-DD");
            this.setState({data: currentData})
        }
    },
    handleDateTimePickerChange(name, event){
       let currentData = this.state.data;
        if (event._d) {
            currentData[name] = moment(event._d).format("YYYY-MM-DD HH:mm");
            this.setState({data: currentData})
        }
    },
    handleImageChange(name, event) {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        let currentData = this.state.data;
        reader.onloadend = () => {
            currentData[name] = reader.result;
            this.setState({data: currentData})
        };
        reader.readAsDataURL(file)
    }

};

export default FieldChangeHandlersMixin;

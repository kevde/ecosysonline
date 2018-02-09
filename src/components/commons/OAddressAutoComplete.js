import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import _ from 'lodash';

class OAddressAutoComplete extends React.Component {
    constructor(props) {
        super(props)
        this.state = { container: props.container, fieldName: props.fieldName, address: _.get(props.container, props.fieldName) };
    }
    async onChange(address) {
        _.set(this.state.container, this.state.fieldName, address);
        this.setState({ address, container: this.state.container });
    }

    onBlur() {
        if (this.props.onUpdate) {
            this.props.onUpdate(this.state.container);
        }
    }

    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange.bind(this),
            onBlur: this.onBlur.bind(this)
        }

        return (
        	<div className="persona-location">
        	<h3>{this.props.label}</h3>
            <PlacesAutocomplete inputProps={inputProps} className="ant-input"/>
        	</div>
        )
    }
}

export default OAddressAutoComplete;
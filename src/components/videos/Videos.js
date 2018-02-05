import React, { Component } from 'react';
import { Modal, Input, Row, Col } from 'antd';

class Videos extends Component {

    state = { visible: true };

    render() {
        return (
            <Modal
          title="Welcome to EcoSystem"
          visible={this.state.visible}
          onOk={this.hideModal.bind(this)}
          onCancel={this.hideModal.bind(this)}
           width="80%"
        >
        <video src="youtu.be/MLeIBFYY6UY" controls="true" onEnded={()=> this.redirectTo()} />
        </Modal>
        );
    }

    hideModal() {
        this.setState({ visible: false }, () => console.log("closed"));
    }

    showModal() {
        this.setState({ visible: true }, () => console.log("opened"));
    }

    redirectTo() {

    }
}

export default Videos;
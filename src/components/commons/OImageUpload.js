import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { Upload, Icon, Modal, Spin } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default
class OImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            container: props.container,
            croppedImage: props.container[props.fieldName],
            imageUrl: props.container[props.fieldName],
            loading: false,
            modalVisible: false
        }
    }
    _crop() {
        this.setState({ croppedImage: this.refs.cropper.getCroppedCanvas().toDataURL() });
    }

    getBase64(img) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result));
            reader.addEventListener('error', (e) => reject(e));
            reader.readAsDataURL(img);
        });
    }

    render() {
        return (
            <div className="avatar-photo">
            <Modal visible={this.state.modalVisible} onOk={this.onSave.bind(this)}  onCancel={this.hideModal.bind(this)}>
                <Spin spinning={this.state.loading}>
                <Row>
                <Col md={8}>
                <Cropper
                    ref='cropper'
                    src={this.state.imageUrl}
                    style={{height: '30vh', width: '100%'}}
                    // Cropper.js options
                    aspectRatio={1}
                    autoCropArea={1}
                    modal={true}
                    autoCrop={true}
                    guides={false}
                    crop={this._crop.bind(this)} />             
                </Col>
                <Col md={3}>
                {(this.state.container[this.props.fieldName]) ?
                    <img src={this.state.croppedImage} alt="" className="ant-upload ant-upload-select-picture-card"/> : ""}
                    <Upload
                        accept="image/*"
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        onChange={this.changeImage.bind(this)}
                        showUploadList={false}
                        >
                        <div>
                            <Icon type={this.state.loading ? 'loading' : 'plus'} />
                            <div className="ant-upload-text">Upload</div>
                        </div>
                    </Upload>
                </Col>
                </Row>
                </Spin>
            </Modal>
            <div onClick={this.displayModal.bind(this)}>
                    <img src={this.state.container[this.props.fieldName]} ref="imageContainer" alt="" />
            </div>
        </div>
        );
    }

    async changeImage(e) {
        let imageUrl = await this.getBase64(e.file.originFileObj);
        this.setState({ imageUrl });
    }

    async displayModal(e) {
        this.setState({ modalVisible: true });
    }

    renderInsideDisplay() {
        return <div>
                    <Icon type={this.state.loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">Upload</div>
                </div>;
    }

    async onSave() {
        if (this.props.onSave) {
            this.setState({ loading: true });
            let httpResponse = await this.props.onSave(this.state.container, this.refs.cropper.getCroppedCanvas());
            if (httpResponse) {
                this.state.container[this.props.fieldName] = `${process.env.REACT_APP_PHOTO_BASE}/${httpResponse.data}`;
                this.refs.imageContainer.src = `${this.state.container[this.props.fieldName]}?time=${new Date().getTime()}`;
                this.setState({ container: this.state.container });
                this.setState({ modalVisible: false }, () => console.log("closed"));
            }
            this.setState({ loading: false });
        }
    }

    hideModal() {
        this.setState({ modalVisible: false }, () => console.log("closed"));
    }
}

export default OImageUpload;
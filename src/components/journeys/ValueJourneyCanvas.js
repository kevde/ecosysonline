import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Image, Text } from "react-konva";

class ValueJourneyTemplate extends React.Component {
    state = {
        image: new window.Image()
    };
    componentDidMount() {
        this.state.image.src = `${process.env.PUBLIC_URL}/worksheet.jpg`;
        this.state.image.onload = () => this.imageNode.getLayer().batchDraw();
    }

    render() {
        return (
            <Image image={this.state.image} y={0} ref={node => this.imageNode = node} />
        );
    }
}

export default class ValueJourneyCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = { journey: props.journey };
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({ journey: nextProps.journey });
    }

    onClick(e) {
        const canvas = e.target.getCanvas();
        const tempLink = document.createElement('a');
        tempLink.href = canvas.toDataURL();
        tempLink.setAttribute('download', 'worksheet.png');
        tempLink.click();
    }

    render() {
        return (
            <Stage className="journey-canvas" width={1400} height={1100} onClick={this.onClick.bind(this)}>
                <Layer>
                  <ValueJourneyTemplate />
                            <Text  x={70} y={850} height={120} width={340} text={this.state.journey.aware}/>
                            <Text  x={550} y={850} height={120} width={340} text={this.state.journey.engage}/>
                            <Text  x={1010} y={850} height={120} width={340} text={this.state.journey.subscribe}/>
                            <Text  x={1010} y={530} height={120} width={340} text={this.state.journey.convert}/>
                            <Text  x={545} y={530} height={120} width={340} text={this.state.journey.excite}/>
                            <Text  x={110} y={225} height={130} width={295} text={this.state.journey.ascend[0]}/>
                            <Text  x={110} y={310} height={130} width={295} text={this.state.journey.ascend[1]}/>
                            <Text  x={110} y={435} height={130} width={295} text={this.state.journey.ascend[2]}/>
                            <Text  x={110} y={555} height={130} width={295} text={this.state.journey.ascend[3]}/>
                            <Text  x={545} y={210} height={145} width={350} text={this.state.journey.advocate}/>
                            <Text  x={1010} y={210} height={145} width={340} text={this.state.journey.promote}/>
                            <Text  x={1010} y={210} height={145} width={340} text={this.state.journey.promote}/>
                </Layer>
          </Stage>
        );
    }
}
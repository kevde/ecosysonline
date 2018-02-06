import React from 'react'
import ReactDOM from 'react-dom'
import { Icon } from 'antd'
import Parallax from 'react-springy-parallax'
import ValueJourneyCanvas from './ValueJourneyCanvas'
import AscendForm from 'components/journeys/AscendForm';
import OTextArea from 'components/commons/OTextArea';

export default class ValueJourneyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { journey: props.journey };
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({ journey: nextProps.journey });
    }

    // componentDidMount() {
    //     window.addEventListener('wheel', this.handleScroll);
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('wheel', this.handleScroll);
    // }

    onUpdate(journey) {
        if (this.props.onUpdate) {
            this.props.onUpdate(journey);
        }
    }

    handleScroll = (e) => {
        const step = 10; // how many pixels to scroll
        if (e.deltaY > 0) // scroll down
            this.refs.parallax.refs.container.scrollTop += e.deltaY;
        else //scroll up
            this.refs.parallax.refs.container.scrollTop += e.deltaY;
    }

    render() {
        const mainStyle = {
            lineHeight: '10px',
            position: 'initial',
            width: '100%',
            height: '100vh'
        }
        const styles = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%'
        }
        const worksheetStyle = {
            height: 'auto',
            width: '100%'
        }
        const successStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%'
        }

        return (
            <Parallax ref="parallax" pages={12} style={mainStyle} className="journey-card-container">

                <Parallax.Layer offset={0} speed={1} style={{ backgroundColor: '#1c2b36', width: '100%', height: '200vh' }} />
                <Parallax.Layer offset={1} speed={1} style={{ backgroundColor: '#f0c514', width: '100%', height: '200vh' }} />
                <Parallax.Layer offset={2} speed={1} style={{ backgroundColor: '#13b899', width: '100%', height: '200vh' }} />
                <Parallax.Layer offset={3} speed={1} style={{ backgroundColor: '#3297d4', width: '100%', height: '200vh' }} />
                <Parallax.Layer offset={4} speed={1} style={{ backgroundColor: '#45b96d', width: '100%', height: '200vh' }} />
                <Parallax.Layer offset={5} speed={1} style={{ backgroundColor: '#e77d24', width: '100%', height: '200vh' }} />
                <Parallax.Layer offset={6} speed={1} style={{ backgroundColor: '#965ba5', width: '100%', height: '200vh' }} />
                <Parallax.Layer offset={7} speed={1} style={{ backgroundColor: '#344a5f', width: '100%', height: '200vh' }} />
                <Parallax.Layer offset={8} speed={1} style={{ backgroundColor: '#b8d430', width: '100%', height: '200vh' }} />
                <Parallax.Layer offset={9} speed={1} style={{ backgroundColor: '#1c2b36', width: '100%', height: '200vh' }} />
                <Parallax.Layer offset={10} speed={1} style={{ backgroundColor: '#00aeff', width: '100%', height: '150vh' }} />
                <Parallax.Layer
                    offset={0}
                    speed={0.1}
                    style={successStyle}
                    >
                    <div className="journey-card welcome" onClick={() => this.refs.parallax.scrollTo(1)}>

                        <br/>
                        <p className="title">Welcome to Value Journey Worksheet</p> 
                        <p className="description">Please fill the down button to start your journey</p>
                    </div>
                        <div className="journey-card-next-step">
                            <Icon type="down" onClick={() => this.refs.parallax.scrollTo(1)}/>
                        </div>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={1}
                    speed={0.1}
                    style={styles}
                    >
                    <div className="journey-card">
                        <div>
                            <Icon type="aliwangwang-o" />
                        </div>
                        <h1 className="journey-card-header">Aware</h1>
                        <div className="journey-card-details">
                        <OTextArea 
                            onUpdate={this.onUpdate.bind(this)} 
                            title="Aware" 
                            container={this.state.journey} 
                            fieldName='aware' 
                            label='How do you going to make your persona aware that you exist?'/>
                        </div>
                        <div className="journey-card-next-step">
                            <Icon type="down" onClick={() => this.refs.parallax.scrollTo(2)}/>
                        </div>
                    </div>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={2}
                    speed={0.1}
                    style={styles}
                    >
                    <div className="journey-card">
                        <div>
                            <Icon type="aliwangwang-o" />
                        </div>
                        <h1 className="journey-card-header">Engage</h1>
                        <div className="journey-card-details">
                        <OTextArea 
                            onUpdate={this.onUpdate.bind(this)} 
                            title="Engage" 
                            container={this.state.journey} 
                            fieldName='engage' 
                            label='How do they engage with your company?'/>
                        </div>
                        <div className="journey-card-next-step">
                            <Icon type="down" onClick={() => this.refs.parallax.scrollTo(3)}/>
                        </div>
                    </div>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={3}
                    speed={0.1}
                    style={styles}
                    >
                    <div className="journey-card">
                        <div>
                            <Icon type="aliwangwang-o" />
                        </div>
                        <h1 className="journey-card-header">Subscribe</h1>
                        <div className="journey-card-details">
                        <OTextArea 
                            onUpdate={this.onUpdate.bind(this)} 
                            title="Subscribe" 
                            container={this.state.journey} 
                            fieldName='subscribe' 
                            label='Where do they subscribe to that gives them value?'/>
                        </div>
                        <div className="journey-card-next-step">
                            <Icon type="down" onClick={() => this.refs.parallax.scrollTo(4)}/>
                        </div>
                    </div>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={4}
                    speed={0.1}
                    style={styles}
                    >
                    <div className="journey-card">
                        <div>
                            <Icon type="aliwangwang-o" />
                        </div>
                        <h1 className="journey-card-header">Convert</h1>
                        <div className="journey-card-details">
                        <OTextArea 
                            onUpdate={this.onUpdate.bind(this)} 
                            title="Convert" 
                            container={this.state.journey} 
                            fieldName='convert' 
                            label='How do you convert them to a first buy?'/>
                        </div>
                        <div className="journey-card-next-step">
                            <Icon type="down" onClick={() => this.refs.parallax.scrollTo(5)}/>
                        </div>
                        <div className="journey-card-left-step">
                            <Icon type="left" onClick={() => this.refs.parallax.scrollTo(3)}/>
                        </div>
                    </div>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={5}
                    speed={0.1}
                    style={styles}
                    >
                    <div className="journey-card">
                        <div>
                            <Icon type="aliwangwang-o" />
                        </div>
                        <h1 className="journey-card-header">Excite</h1>
                        <div className="journey-card-details">
                        <OTextArea 
                            onUpdate={this.onUpdate.bind(this)} 
                            title="Excite" 
                            container={this.state.journey} 
                            fieldName='excite' 
                            label='How do you excite them?'/>
                        </div>
                        <div className="journey-card-next-step">
                            <Icon type="down" onClick={() => this.refs.parallax.scrollTo(6)}/>
                        </div>
                        <div className="journey-card-left-step">
                            <Icon type="left" onClick={() => this.refs.parallax.scrollTo(2)}/>
                        </div>
                    </div>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={6}
                    speed={0.1}
                    style={styles}
                    >
                    <div className="journey-card">
                        <div>
                            <Icon type="aliwangwang-o" />
                        </div>
                        <h1 className="journey-card-header">Ascend</h1>
                        <div className="journey-card-details">
                        <AscendForm 
                            onUpdate={this.onUpdate.bind(this)} 
                            title="Ascend" 
                            container={this.state.journey} />
                        </div>
                        <div className="journey-card-next-step">
                            <Icon type="down" onClick={() => this.refs.parallax.scrollTo(7)}/>
                        </div>
                        <div className="journey-card-left-step">
                            <Icon type="left" onClick={() => this.refs.parallax.scrollTo(5)}/>
                        </div>
                    </div>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={7}
                    speed={0.1}
                    style={styles}
                    >
                    <div className="journey-card">
                        <div>
                            <Icon type="aliwangwang-o" />
                        </div>
                        <h1 className="journey-card-header">Advocate</h1>
                        <div className="journey-card-details">
                        <OTextArea 
                            onUpdate={this.onUpdate.bind(this)} 
                            title="Advocate" 
                            container={this.state.journey} 
                            fieldName='advocate' 
                            label='What will you provide in the advocate step?'/>
                        </div>
                        <div className="journey-card-next-step">
                            <Icon type="down" onClick={() => this.refs.parallax.scrollTo(8)}/>
                        </div>
                        <div className="journey-card-left-step">
                            <Icon type="left" onClick={() => this.refs.parallax.scrollTo(5)}/>
                        </div>
                    </div>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={8}
                    speed={0.1}
                    style={styles}
                    >
                    <div className="journey-card">
                        <div>
                            <Icon type="aliwangwang-o" />
                        </div>
                        <h1 className="journey-card-header">Promote</h1>
                        <div className="journey-card-details">
                        <OTextArea 
                            onUpdate={this.onUpdate.bind(this)} 
                            title="Promote" 
                            container={this.state.journey} 
                            fieldName='promote' 
                            label='How does your persona going to promote you?'/>
                        </div>
                        <div className="journey-card-next-step">
                            <Icon type="down" onClick={() => this.refs.parallax.scrollTo(9)}/>
                        </div>
                    </div>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={9}
                    speed={0.1}
                    style={successStyle}
                    >
                    <div className="journey-card success" onClick={() => this.refs.parallax.scrollTo(10)}>
                        <Icon type="check-circle-o" />
                        <br/>
                        <p>Great. You can now view your workflow journey worksheet</p>
                    </div>
                        <div className="journey-card-next-step">
                            <Icon type="down" onClick={() => this.refs.parallax.scrollTo(10)}/>
                        </div>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={10}
                    speed={0.1}
                    style={worksheetStyle}
                    >
                    <div className="journey-card-sheet">
                        <ValueJourneyCanvas journey={this.state.journey}/>
                    </div>
                </Parallax.Layer>
            </Parallax>
        )
    }
}
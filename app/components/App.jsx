import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
let GLOBAL_CONFIG = require('../config/config.js');
console.log(GLOBAL_CONFIG);
import * as I18n from '../vendors/I18n.js';
import SCORM from './SCORM.jsx';
import Radio from './Radio';
import {startRadio} from '../reducers/actions';

export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.state = {
    };
  }

  startRadio(){
    this.props.dispatch(startRadio());
  }

  componentDidMount(){
    this.startRadio();
  }

  render(){
    let appContent = "";

    if((this.props.tracking.finished !== true) || (this.props.wait_for_user_profile !== true)){
      appContent = (
        <Radio
          conf= {GLOBAL_CONFIG}
          tracks={this.props.tracks}
          dispatch={this.props.dispatch}
        />
      );
    }

    return (
      <React.Fragment>
        <div id="container">
          {appContent}
          <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        </div>
      </React.Fragment>
    );
  }

}

function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps)(App);
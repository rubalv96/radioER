import React, {Fragment} from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BackgroundImage extends React.Component {

  constructor(){
    super();
  }
  render(){
    let imgBackground = (
      <img id="backgroundImg" src={this.props.imagePath}/>
    );

    return (
      <>
        {imgBackground}
      </>
    );
  }

}
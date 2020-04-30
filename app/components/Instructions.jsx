import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
let GLOBAL_CONFIG = require('../config/config.js');

export default class Instructions extends React.Component {

  constructor(){
    super();
    this.state = {
      id_animated:true,
      show_instructions:false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({id_animated:false});
    this.setState({show_instructions:true});

  }
  render(){
    let id_animated = this.state.id_animated;
    let instructions;
    let instructionsTitle = "";
    if(GLOBAL_CONFIG.show_instructions_title){

      instructionsTitle = (
        <p className="instructionsTitle">Instrucciones</p>
      );
    }
    this.state.show_instructions ? instructions = (
      <>
        <img id={"instructionsImageBackground"}
          src="./assets/images/instructions_old.png"
          onClick={()=>{this.setState({show_instructions:false});}}

        />
        <div id={"instructionsMessage"} onClick={()=>{this.setState({show_instructions:false});}}>
          <div>
            <p><b>Radio</b></p>
            <ul>
              <li><b>Encender la radio.</b> Pulsar el botón ON/OFF para empezar a sintonizar los canales de radio.</li>
              <li><b>Sintonizar canal.</b> Hay dos formas de cambiar la frecuencia a sintonizar.</li>
              <ol>
                <li><b>Rueda de frecuencias</b>. Girando la rueda que se encuentra a la derecha de la pantalla de frecuencias</li>
                <li><b>Pantalla de frecuencias.</b> Arrastrando en la propia pantalla de las frecuencias.</li>
              </ol>

            </ul>

          </div>
          <div>
            <p><b>Cassette</b></p>
            <ul>
              <li><b>Selección de cassette.</b> Primero se debe seleccionar un cassette de la estantería de la izquierda.</li>
              <li><b>Controles.</b> A través de los botones de control se puede reproducir, pausar, pasar al siguiente track o parar la reproducción.</li>
            </ul>
          </div>
          <div>
            <p><b>Volumen</b></p>
            <p>Para ajustar el volumen se debe girar la rueda del volumen situada en la parte inferior de la pantalla de frecuencias</p>
            <p><b>Reto completado</b></p>
            <p>El reto es completado cuando se hayan reproducido todos los tracks de radio y cassettes necesarios</p>
          </div>

        </div>
      </>
    ) : instructions = "";
    return (
      <>
        <div >
          {instructionsTitle}
          <img id={id_animated === true ? "paperInstructionsAnimated" : "paperInstructions"}
            src="./assets/images/instructions.png"
            onClick={this.handleClick}/>
          {instructions}
        </div>
      </>
    );
  }

}
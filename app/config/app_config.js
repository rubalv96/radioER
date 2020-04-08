let GLOBAL_CONFIG_DEVELOPMENT = {

  initial_frequency: 40,
  max_frequency: 50,
  min_frequency: 10,
  step_frequency: 0.01,
  delta: 2,

  //Tracks
  path_track_1: "./assets/sounds/backgroundMusic.mp3",
  frequency_track_1: 22,

  // path_track_2: "./assets/sounds/backgroundMusic.mp3",
  // frequency_track_2: 32,

  // path_track_3: "./assets/sounds/backgroundMusic.mp3",
  // frequency_track_3: 45,

  // Nombre de la prueba
  title:"El misterio de Cleopatra",
  // Imagen de fondo
  imageBackground:"./assets/images/puzzle/egipto_fondo.jpg", // imagen de fondo
  opacityBackground:"0.5", // opacidad de la imagen (por defecto sin opacidad)

  // Sonidos (por defecto, no hay música)
  backgroundMusic:"./assets/sounds/backgroundMusic.mp3", // https://www.fesliyanstudios.com/royalty-free-music/downloads-c/mysterious-music/7
  successMusic:"./assets/sounds/successMusic.mp3", // http://soundbible.com/1003-Ta-Da.html
  failureMusic:"./assets/sounds/failureMusic.mp3", // http://soundbible.com/1830-Sad-Trombone.html
  volume:1, // Volumen de 0 a 1 (defecto 1)

  // Dimensiones del puzzle
  M:3, // numero de columnas del puzzle (requerido)
  N:2, // numero de filas del puzzle (requerido)
  fake_pieces:6,

  // Reverse mode (defecto -> false)
  reverseMode:false,

  // Timer
  time:"210", // tiempo en segundos para resolver el puzzle

  // Zoom
  zoomMode:true, // activar modo zoom
  zoomFactor:5, // factor de ampliación

  // Tiempo mínimo exigido para leer instrucciones (en segundos)
  timeToReadInstructions:1,

  // Mensaje inicial
  initialMessage:"El Antiguo Egipto está repleto de misterios. Las actividades cotidianas, las creencias, las leyendas y las vivencias son reflejados en el arte egipcio y esconde grandes incógnitas. Nos hemos adentrado en la residencia de Cleopatra y hemos encontrado un conjunto de piezas que pueden esconder un gran secreto. Los soldados han ido a buscar agua al Nilo para el baño diario de la faraona y tenemos 3 minutos y medio antes de que lleguen a los aposentos de Cleopatra. ¿Nos ayudas a resolverlo?", // mensaje inicial de bienvenida
  initialMessagePrint:"(mensaje configurable por el autor del recurso)", // mensaje inicial de bienvenida para impresión
  initialImage:"./assets/images/puzzle/egipto_inicial.svg", // foto inicial de bienvenida

  // Mensaje final
  endMessageSuccess:"Has dado con uno de los papiros más importantes del Antiguo Egipto así como el símbolo del Ankh, el símbolo egipcio de la vida. Estamos más cerca de averiguar las grandes incógnitas de Cleopatra. ¡Enhorabuena!", // mensaje de exito
  endMessageFail:"Parece que eso no nos sirve para seguir investigando los misterios de Egipto.", // mensaje de fallo
  endImageSuccess:"./assets/images/puzzle/egipto_inicial.svg", // imagen de exito
  endImageFail:"./assets/images/puzzle/egipto_fallo.png", // imagen de fallo

  // Escapp configuraciones
  escapp:{
    endpoint:"https://escapp.dit.upm.es/api/escapeRooms/2",
    localStorageKey:"ESCAPP_Puzzle",
    imagesPath:"assets/images/",
    I18n:{
      availableLocales:["es", "en"],
      locale:"es",
      defaultLocale:"es",
    },
    appPuzzleIds:[5],
    forceValidation:false,
  },

  // No tocar
  debug:true,
  debug_scorm_api:false,
  debug_scorm_api_window:false,
  available_locales:["es", "en"],
  // locale: "es",
  adaptive:true,
  finish_screen:true,
  scorm:{
    completion_threshold:0.5,
    score_threshold:0.6,
  },
};

module.exports = GLOBAL_CONFIG_DEVELOPMENT;
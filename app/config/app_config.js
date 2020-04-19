let GLOBAL_CONFIG_DEVELOPMENT = {

  initial_frequency: 100,
  max_frequency: 110,
  min_frequency: 90,
  step_frequency: 0.01,
  delta: 0.5,

  //Tracks
  path_track_1: "./assets/sounds/prueba1.mp3",
  frequency_track_1: 91.0,

  // path_track_2: "./assets/sounds/prueba2.mp3",
  // frequency_track_2: 95.3,

  path_fake_track_1: "./assets/sounds/prueba2.mp3",
  frequency_fake_track_1: 94,
  //
  // path_track_3: "./assets/sounds/backgroundMusic.mp3",
  // frequency_track_3: 98.3,

  plain_text_to_morse_1:"The code is 14",
  frequency_plain_text_1:92,

  // plain_text_to_morse_2:"SOS",
  // frequency_plain_text_2:102.5,
  //
  plain_text_to_morse_fake_1:"SOS",
  frequency_plain_text_fake_1:95,
  //
  // plain_text_to_morse_3:"OSO",
  // frequency_plain_text_3:105.3,

  coded_text_to_morse_1: "... --- ...",
  frequency_coded_text_1:93,

  // coded_text_to_morse_2: "--- ... ---",
  // frequency_coded_text_2:96.9,
  //
  coded_text_to_morse_fake_1: "--- ... ---",
  frequency_coded_text_fake_1:96,

  cassette_1:{
    title: "Abbey Road",
    artist: "The Beatles",
    tracks:[
      {
        title: "Come together",
        path: "./assets/sounds/prueba1.mp3",
        required: true,
      },
      {
        title: "Something",
        path: "./assets/sounds/prueba2.mp3",
        required: false,

      },

    ],
  },

cassette_2:{
    title: "The Rolling Stones",
    artist: "The Rolling Stones",
    tracks:[
      {
        title: "Route 66",
        path: "./assets/sounds/prueba2.mp3",
        required: true,

      },
      {
        title: "I Just Want to Make Love to You",
        path: "./assets/sounds/prueba1.mp3",
        required: false,
      },
      {
        title: "Honest I do",
        path: "./assets/sounds/prueba1.mp3",
        required: false,
      },

    ],
  },

cassette_3:{
    title: "A night at the Opera",
    artist: "Queen",
    tracks:[
      {
        title: "Death on Two Legs",
        path: "./assets/sounds/prueba1.mp3",
        required: false,

      },
      {
        title: "Lazing on a Sunday Afternoon",
        path: "./assets/sounds/prueba2.mp3",
        required: true,

      },
      {
        title: "I'm in Love with My Car",
        path: "./assets/sounds/prueba2.mp3",
        required: true,

      },

    ],
  },

  strict_mode: true,


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
let GLOBAL_CONFIG_DEVELOPMENT = {

  initial_frequency:100,
  max_frequency:110,
  min_frequency:90,
  step_frequency:0.01,
  delta:0.5,

  // Tracks
  radio_tracks:[
    {
      type:"radio_track",
      path:"./assets/sounds/prueba1.mp3",
      frequency:91.0,
      required:"50%",
    },
    {
      type:"radio_track",
      path:"./assets/sounds/prueba2.mp3",
      frequency:90.0,
      required:0.5,
      puzzleId: 1,
    },
    {
      type:"radio_track",
      path:"./assets/sounds/prueba2.mp3",
      frequency:94.0,
      required:0.5,
      puzzleId: 2,
    },
    {
      type:"morse_plain_text",
      text:"SOS",
      frequency:92,
      required:0,
    },
    {
      type:"morse_coded_text",
      code:"... --- ...",
      frequency:98.0,
      required:8,
      puzzleId: 3,
    },
  ],

  show_instructions_title:true,

  cassettes:[
    {
      title:"Abbey Road",
      artist:"The Beatles",
      tracks:[
        {
          title:"Come together",
          path:"./assets/sounds/prueba1.mp3",
          required:"50%",
          puzzleId: 4,
        },
        {
          title:"Something",
          path:"./assets/sounds/prueba2.mp3",
          required:"25%",
          puzzleId: 5,


        },

      ],
    },
    {
      title:"The Rolling Stones",
      artist:"The Rolling Stones",
      tracks:[
        {
          title:"Route 66",
          path:"./assets/sounds/prueba2.mp3",
          required:0,

        },
        {
          title:"I Just Want to Make Love to You",
          path:"./assets/sounds/prueba1.mp3",
          required:0.5,
          puzzleId: 6,

        },
        {
          title:"Honest I do",
          path:"./assets/sounds/prueba1.mp3",
          required:0.2,
          puzzleId: 7,

        },

      ],
    },
    {
      title:"A night at the Opera",
      artist:"Queen",
      tracks:[
        {
          title:"Death on Two Legs",
          path:"./assets/sounds/prueba1.mp3",
          required:0,

        },
        {
          title:"Lazing on a Sunday Afternoon",
          path:"./assets/sounds/prueba2.mp3",
          required:0,

        },
        {
          title:"I'm in Love with My Car",
          path:"./assets/sounds/prueba2.mp3",
          required:0,

        },

      ],
    },

  ],


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
  escapp:{
    endpoint:"https://escapp.dit.upm.es/api/escapeRooms/10",
    localStorageKey:"ESCAPP_Radio",
    imagesPath:"assets/images/",
    I18n:{
      availableLocales:["es", "en"],
      locale:"es",
      defaultLocale:"es",
    },
    appPuzzleIds:[1],
    forceValidation:true,
  },
};

module.exports = GLOBAL_CONFIG_DEVELOPMENT;
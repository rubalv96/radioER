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
      path:"./assets/sounds/quimica_1.mp3",
      frequency:106.5,
      required:"50%",
      puzzleId: 1,
    },
    {
      type:"radio_track",
      path:"./assets/sounds/quimica_2.mp3",
      frequency:93.0,
      required:"50%",
      puzzleId: 2,
    },
    {
      type:"radio_track",
      path:"./assets/sounds/quimica_3.mp3",
      frequency:95.3,
      required:0,
      puzzleId: 3,
    },
    {
      type:"morse_plain_text",
      text:"Carbono",
      frequency:98.5,
      required:"100%",
      puzzleId: 4,
    },
    {
      type:"morse_coded_text",
      code:"... --- ...",
      frequency:103.5,
      required:0,
    },
  ],

  show_instructions_title:true,

  cassettes:[
    {
      title:"Química Orgánica",
      tracks:[
        {
          title:"Oxidación",
          path:"./assets/sounds/quimica_4.mp3",
          required:"50%",
          puzzleId: 5,
        },
        {
          title:"Radio atómico",
          path:"./assets/sounds/track3.mp3",
          required:0,
        },
        {
          title:"Espectro químico",
          path:"./assets/sounds/quimica_5.mp3",
          required:"25%",
          puzzleId: 6,


        },

      ],
    },
    {
      title:"Química inorgánica",
      tracks:[
        {
          title:"Átomos",
          path:"./assets/sounds/track1.mp3",
          required:0,

        },
        {
          title:"Moléculas",
          path:"./assets/sounds/quimica_6.mp3",
          required:"50%",
          puzzleId: 7,

        },
        {
          title:"Reacciones Químicas",
          path:"./assets/sounds/track4.mp3",
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
    imagesPath:"./assets/images/",
    I18n:{
      availableLocales:["es", "en"],
      locale:"es",
      defaultLocale:"es",
    },
    appPuzzleIds:[1],
    forceValidation:false,
  },
};

module.exports = GLOBAL_CONFIG_DEVELOPMENT;
let GLOBAL_CONFIG_DEVELOPMENT = {

  initial_frequency:100,
  max_frequency:110,
  min_frequency:80,
  step_frequency:0.01,
  delta:0.5,

  // Tracks
  radio_tracks:[

    {
      type:"radio_track",
      path:"./assets/sounds/colores/jazz/Cafe_Con_Leche.mp3",
      frequency:82.5,
      required:0,
      
    },
    {
      type:"radio_track",
      path:"./assets/sounds/colores/jazz/Swamp_Walk.mp3",
      frequency:89.0,
      required:0,

    },
    {
      type:"radio_track",
      path:"./assets/sounds/colores/jazz/Et_Voila.mp3",
      frequency:94.5,
      required:0,
    },
    {
      type:"morse_plain_text",
      text:"ROJO",
      frequency:98.5,
      required:"100%",
      puzzleId: 1,
    },
{
      type:"radio_track",
      path:"./assets/sounds/colores/jazz/Carnival_De_Brazil.mp3",
      frequency:94.5,
      required:0,
    },
{
      type:"radio_track",
      path:"./assets/sounds/colores/jazz/You_Make_Me_Feel_Good.mp3",
      frequency:94.5,
      required:0,
    },
{
      type:"radio_track",
      path:"./assets/sounds/colores/jazz/Tributaries_of_the_Bayou.mp3",
      frequency:94.5,
      required:0,
    },
    {
      type:"morse_plain_text",
      text:"VERDE",
      frequency:106.0,
      required:"100%",
    },
{
      type:"radio_track",
      path:"./assets/sounds/colores/jazz/Et_Voila.mp3",
      frequency:107.5,
      required:0,
    },
  ],

  show_instructions_title:true,

  cassettes:[
    {
      title:"The best of POP",
      tracks:[
        {
          title:"Eighty Three",
          path:"./assets/sounds/colores/pop/Eighty_Three.mp3",
          required:"50%",
          puzzleId: 5,
        },
        {
          title:"Energized",
          path:"./assets/sounds/colores/pop/Energized.mp3",
          required:0,
        },
        {
          title:"Greed",
          path:"./assets/sounds/colores/pop/Greed.mp3",
          required:0,
        },
	{
          title:"Lucky Day",
          path:"./assets/sounds/colores/pop/Lucky_Day.mp3",
          required:0,
        },
	{
          title:"Natural",
          path:"./assets/sounds/colores/pop/Natural.mp3",
          required:0,
        },
	{
          title:"Roll and Drop",
          path:"./assets/sounds/colores/pop/Rollanddrop.mp3",
          required:0,
        },
{
          title:"Stoker",
          path:"./assets/sounds/colores/pop/Stoker.mp3",
          required:0,
        },

      ],
    },
    {
      title:"The best of Rock",
      tracks:[
        {
          title:"Burnt",
          path:"./assets/sounds/colores/rock/Burnt.mp3",
          required:0,

        },
        {
          title:"Ditch Diggin",
          path:"./assets/sounds/colores/rock/Ditch_Diggin.mp3",
          required:0,
        },
        {
          title:"Fiend",
          path:"./assets/sounds/colores/rock/Fiend.mp3",
          required:0,
        },
{
          title:"Locally sourced",
          path:"./assets/sounds/colores/rock/Locally_Sourced.mp3",
          required:0,
        },
{
          title:"Soft",
          path:"./assets/sounds/colores/rock/Soft.mp3",
          required:0,
        },
{
          title:"Tape Deck",
          path:"./assets/sounds/colores/rock/Tape_Deck.mp3",
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

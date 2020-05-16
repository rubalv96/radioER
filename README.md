# Virtual Radios Generator
This application is a generator of virtual radios to use as resources in educational Escape Rooms.
It is compatible with Escapp, an educational escape room management platform.
The resources generated are easily integrated with the Escapp platform and are compliant with the SCORM standard allowing for integration into learning management systems (LMS) such as Moodle.

## Demo 
![Demo Image](./app/assets/images/demo.gif)
## Getting started 🚀

### Prerequisites 📋
In order to build the resources you need to have:
- Internet connection
- [Node.js](https://nodejs.org/es/download/) and [Git](https://git-scm.com/downloads) installed on your computer.


### Installing 🔧

 - Open a new terminal and go to your working directory.
 - Clone the GitHub project and go to the radioER folder:
```shell
$ git clone https://github.com/rubalv96/radioER
$ cd radioER
```

 - Execute the following command to install all the project dependencies in the 'node_modules' folder:
```shell
$ npm install
```
 - Execute the following command to transform audios into Morse format and to start the development server:
```shell
$ node tasks/morsify.js 
$ npm run start
```
     - The app will be available at the following URL
          http://localhost:8080.
     - SCORM 1.2 environment will be available at http://localhost:8080/scorm12.html.
     - SCORM 2004 environment will be available at http://localhost:8080/scorm2004.html.
 - Development server can be stopped by pressing 'Ctrl-C'.
 - Configuration can be specified in the following files:
    - app/config/config.js: Global configuration for the React application.
    - app/config/app_config.js: Main configuration for the React application.
    - app/config/config_lms.js: Configuration for the SCORM environments. 


## Configuration ⚙️

### Game configuration
| Config parameter | Description |  
| ------ | ------ | 
| show_instructions_title | Visible instruction label on the sticky note (true or false)  
| initial_frequency | Starting frequency when the radio is turned on 
| min_frequency | Minimum tunable frequency 
| max_frequency | Maximum tunable frequency 
| step_frequency | Minimum jump between two frequencies to be tuned 
| radio_track[type] | Define the audio type, it can take the following values: radio_track, morse_plain_text, morse_coded_text
| radio_track[path] | Path to audio file (only defined in radio_track audio)
| radio_track[frequency] | Frequency associated with the audio 
| radio_track[required] | Necessary listening time to give an audio as completed. You can take percentile values (indicates the percentage of the audio duration that should be heard as a minimum) or numerical values indicating the minimum number of seconds to listen. If the value is 0, it indicates that the audio does not need to be heard.
| radio_track[code] | Only for audio of type morse_coded_text. Indicates the morse code to be transformed into audio
| radio_track[text] | Only for Morse_plain_text audios. Indicates plain text to be transformed into Morse audio.
| radio_track[puzzleId] | Only for audios with a required field other than 0. Associates the challenge identifier in Escapp with the associated audio.
| cassettes[title] | Indicates the title of the tape 
| cassettes[tracks[title]] |  Indicates the title of the song of the tape 
| cassettes[tracks[path]] | Path to audio file  
| cassettes[tracks[required]] | Necessary listening time to give an audio as completed. You can take percentile values (indicates the percentage of the audio duration that should be heard as a minimum) or numerical values indicating the minimum number of seconds to listen. If the value is 0, it indicates that the audio does not need to be heard.
| cassettes[tracks[puzzleId]] | Only for audios with a required field other than 0. Associates the order of the challenge in Escapp with the associated audio.
| delta | Frequential distance delimiting the environment from which an audio begins to be heard



### Escapp configuration
| Config parameter | Description | 
| ------ | ------ | 
| endpoint | Escapp URL of the Escape Room |
| localStorageKey | Key to save Escapp Data in the Local Storage | 
| imagesPath | Path of the images that will be cropped | 
| appPuzzleIds | Order id of the puzzle in the Virtual Escape Room | 
| forceValidation | Required authentication in Escapp in order to play (true or false) | 


### Available commands

|Command| Description |
|--|--|
|npm run start  | Start the development server. |
|npm run production  | Create a production ready build of the application in the 'dist' folder. |
|npm run scorm_package  | Create a production ready build of the application and package it into two SCORM packages (compliant with SCORM 1.2 and SCORM 2004) in the 'dist_scorm' folder. |
|npm run clean| Remove the 'dist' and 'dist_scorm' folders. |
|npm run lint| Execute an eslint check. |
|npm test| Run all tests. |

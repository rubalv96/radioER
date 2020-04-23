const morseToMp3 = require('morse-mp3');
const morsify = require('morsify');
const {resolve} = require('path');

const appConfigPath = resolve(__dirname, '../app/config/app_config.js');
let GLOBAL_CONFIG = require(appConfigPath);

let j=1, k=1;
for(let i=0; i<GLOBAL_CONFIG.radio_tracks.length; i++){
    let track_type = GLOBAL_CONFIG.radio_tracks[i].type;
    let track = GLOBAL_CONFIG.radio_tracks[i];
    if(track_type === "morse_plain_text"){
        const morsePath = resolve(__dirname, '../app/assets/sounds/morse/morse_sound_from_plain_text_' + j + '.mp3');
        morseToMp3.convert(track.text, morsePath);
        j++;
    }
    if(track_type === "morse_coded_text"){
        const decoded = morsify.decode(track.code);
        const morsePath = resolve(__dirname, '../app/assets/sounds/morse/morse_sound_from_coded_text_' + k + '.mp3');
        morseToMp3.convert(decoded, morsePath);
        k++;
    }

}




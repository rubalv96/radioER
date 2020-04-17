const morseToMp3 = require('morse-mp3');
const morsify = require('morsify');
const {resolve} = require('path');

const appConfigPath = resolve(__dirname, '../app/config/app_config.js');
let GLOBAL_CONFIG = require(appConfigPath);


for(let i=1; i<12; i++){
    if(typeof GLOBAL_CONFIG["plain_text_to_morse_" + i] === "string"){
        const morsePath = resolve(__dirname, '../app/assets/sounds/morse/morse_sound_from_plain_text_' + i + '.mp3');
        morseToMp3.convert(GLOBAL_CONFIG["plain_text_to_morse_" +i], morsePath);
    }
    if(typeof GLOBAL_CONFIG["coded_text_to_morse_" + i] === "string"){
        const decoded = morsify.decode(GLOBAL_CONFIG["coded_text_to_morse_" + i]);
        const morsePath = resolve(__dirname, '../app/assets/sounds/morse/morse_sound_from_coded_text_' + i + '.mp3');
        morseToMp3.convert(decoded, morsePath);
    }

    if(typeof GLOBAL_CONFIG["plain_text_to_morse_fake_" + i] === "string"){
        const morsePath = resolve(__dirname, '../app/assets/sounds/morse/morse_sound_from_plain_text_fake_' + i + '.mp3');
        morseToMp3.convert(GLOBAL_CONFIG["plain_text_to_morse_fake_" +i], morsePath);
    }
     if(typeof GLOBAL_CONFIG["coded_text_to_morse_fake_" + i] === "string"){
            const decoded = morsify.decode(GLOBAL_CONFIG["coded_text_to_morse_fake_" + i]);
            const morsePath = resolve(__dirname, '../app/assets/sounds/morse/morse_sound_from_coded_text_fake_' + i + '.mp3');
            morseToMp3.convert(decoded, morsePath);
        }

}




/**
 * Created by Felipe on 12/05/2016.
 */


var AudioManager = (function () {
    var audios = {};
    const AUDIO_EXTENSION = ".mp3";

    var audiosStatus = {};


    var onEndCallBackGenerator = function (name, callBack, callBackCaller) {
        return function () {
            audiosStatus[name] = "stopped";
            if (callBack)
                callBack.call(callBackCaller);
        }
    };

    return {
        loadAudio: function (name, directory) {
            if (audios.hasOwnProperty(name)) {
                Debug.log("Audio already loaded", 0, "audioManager");
                return;
            }
            var currentPath = FarofaGame.getLoadDirectory();
            var currentExtension = AUDIO_EXTENSION;
            var audio = new Audio(currentPath + directory + name + currentExtension);
            audios[name] = audio;
            audiosStatus[name] = "stopped";
        },


        playAudio: function (name, loop, playOtherInstance, callBackOnEnd, callBackCaller) {
            if (!audios.hasOwnProperty(name)) {
                Debug.log("Audio does not exist", 0, "audioManager");
                return;
            }
            if (audiosStatus[name] == "playing" && !playOtherInstance) {

                Debug.log("Audio is already playing.", 0, "audioManager");
                return;

            }
            if (playOtherInstance) {
                var audio = new Audio(audios[name].src);
                audio.play();
            }


            if (audiosStatus[name] == "stopped") {
                var audio = audios[name];
                audio.loop = loop;
                audio.onended = onEndCallBackGenerator(name,callBackOnEnd, callBackCaller);
            }
            audiosStatus[name] = "playing";
            audios[name].play();
        },

        pauseAudio: function (name) {
            if (!audios.hasOwnProperty(name)) {
                Debug.log("Audio does not exist");
                return;
            }
            if (audiosStatus[name] != "playing") {
                Debug.log("Audio is not playing.");
                return;
            }

            audios[name].pause();
            audiosStatus[name] = "paused";
        },

        stopAudio: function (name) {
            if (!audios.hasOwnProperty(name)) {
                Debug.log("Audio does not exist", 0, "audioManager");
                return;
            }
            if (audiosStatus[name] == "stopped") {
                Debug.log("Audio already stopped", 0, "audioManager");
                return;
            }

            audios[name].pause();
            audios[name].currentTime = 0;
            audiosStatus[name] = "stopped";
        },

        setVolume: function (name, volume) {
            audios[name].volume = volume;
        },

        notStoppedAudios: function () {
            var list = [];
            for (var audioName in audiosStatus) {
                if (audiosStatus[audioName] != "stopped") {
                    list.push(audioName);
                }
            }
            return list;
        }
    }
})();
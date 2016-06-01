/**
 * Created by Felipe on 27/05/2016.
 */

function RestoreHealth(playerStats) {
    playerStats.restoreHealth(2);
    EventCenterInstance.getInstance().callEvent("playerLoseHealth", this);
}

function GivesExtraHeart(playerStats) {
    playerStats.addMaximumHealth();
    playerStats.restoreHealth(2);
    EventCenterInstance.getInstance().callEvent("playerLoseHealth", this);
}

function ResumeMusic() {
    var mainSong = FarofaGame.getGlobalVariable("MainMusic");
    var volume = FarofaGame.getGlobalVariable("MainMusicVolume");
    AudioManager.setVolume(mainSong,volume);
    AudioManager.playAudio(mainSong, false);
}

function SpeedBonus(playerStats) {
    var mainSong = FarofaGame.getGlobalVariable("MainMusic");
    var volume = FarofaGame.getGlobalVariable("MainMusicVolume");

    AudioManager.pauseAudio(mainSong);
    AudioManager.setVolume("Mariachi", volume);
    AudioManager.playAudio("Mariachi", false, false, ResumeMusic);
    playerStats.giveSpeedBonus(10000,2);
}

function InvincibleBonus(playerStats) {
    var mainSong = FarofaGame.getGlobalVariable("MainMusic");
    var volume = FarofaGame.getGlobalVariable("MainMusicVolume");

    AudioManager.pauseAudio(mainSong);
    AudioManager.setVolume("Russian", volume);
    AudioManager.playAudio("Russian", false, false, ResumeMusic);
    playerStats.invincibleBonus(10000);
}
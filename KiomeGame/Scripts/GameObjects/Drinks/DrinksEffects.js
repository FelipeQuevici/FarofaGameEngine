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
    AudioManager.setVolume("Hotline",1);
    AudioManager.playAudio("Hotline");
}

function SpeedBonus(playerStats) {
    AudioManager.pauseAudio("Hotline");
    AudioManager.playAudio("Mariachi",false,ResumeMusic);
    playerStats.giveSpeedBonus(10000,2);
}

function InvincibleBonus(playerStats) {
    AudioManager.pauseAudio("Hotline");
    AudioManager.playAudio("Russian",false,ResumeMusic);
    playerStats.invincibleBonus(10000);
}
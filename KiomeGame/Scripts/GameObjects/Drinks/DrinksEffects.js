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

function SpeedBonus(playerStats) {
    playerStats.giveSpeedBonus(10000,2);
}

function InvencivleBonus(playerStats) {
    playerStats.invincibleBonus(10000);
}
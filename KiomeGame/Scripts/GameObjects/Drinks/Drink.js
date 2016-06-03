
function Drink(name, price, functionToCall, player, index) {
    this.onCreateItem = function (name, price, index) {
        this.name = name;
        this.price = price;
        this.index = index;
        //console.log(player);
    };

    this.drinkEffect = function () {
        //console.log(player);
        var stats = player.getComponent("stats");
        functionToCall.call(null, stats);
    };

    this.onCreateItem(name, price, index);
}
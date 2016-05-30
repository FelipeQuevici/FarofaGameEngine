
function Drink(name, price, functionToCall, player) {
    this.onCreateItem = function (name, price ) {
        this.name = name;
        this.price = price;
        console.log(player);
    };

    this.drinkEffect = function () {
        console.log(player);
        var stats = player.getComponent("stats");
        functionToCall.call(null, stats);
    };

    this.onCreateItem(name, price);
}
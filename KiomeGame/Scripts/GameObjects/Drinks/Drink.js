
function Drink(name, price) {
    this.onCreateItem = function (name, price, index) {
        this.name = name;
        this.price = price;
    };

    this.buyDrink = function () {

    };

    this.onCreateItem(name, price);
}
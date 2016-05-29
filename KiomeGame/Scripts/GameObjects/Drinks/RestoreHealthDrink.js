/**
 * Created by Felipe on 27/05/2016.
 */

RestoreHealthDrink.inheritsFrom(Drink);

function RestoreHealthDrink(name, price) {
    this.onCreate = function (name, price) {
        this.onCreateItem(name, price);
    };  


    this.onCreate(name,price);
}
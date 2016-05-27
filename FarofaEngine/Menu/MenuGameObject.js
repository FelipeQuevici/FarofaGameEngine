/**
 * Created by Felipe on 26/05/2016.
 */

MenuGameObject.inheritsFrom(GameObject);

function MenuGameObject(scene) {
    var items = [];
    var selectedItem;
    var selectedIndex;

    

    function onCreate(scene) {
        this.onCreateGameObject(scene, new Vector2(), 0);
    }
    
    this.addItem = function (item) {
        items.push(item);
    };

    this.selectItem = function (index) {
        if (selectedItem )  {
            selectedItem.unselect();
        }

        items[index].select();
        selectedItem = items[index];
        selectedIndex = index;

    };

    this.positionOf = function (itemObject) {
        var indexOf = items.indexOf(itemObject);
        return 40+indexOf*40;
    };
    

    this.onInitialize = function () {
        EventCenterInstance.getInstance().subscribeEvent("arrowUpClicked",this.indexMinus,this);
        EventCenterInstance.getInstance().subscribeEvent("arrowDownClicked", this.indexPlus, this);
        EventCenterInstance.getInstance().subscribeEvent("enterClicked", this.clickSelected, this);
    };

    this.clickSelected = function () {

        selectedItem.click();
    };

    this.indexPlus = function () {
        var newIndex = selectedIndex+1;
        if (newIndex >= items.length) newIndex = 0;
        this.selectItem(newIndex);
    };

    this.indexMinus = function () {
        var newIndex = selectedIndex-1;
        if (newIndex < 0) newIndex = items.length-1;
        this.selectItem(newIndex);
    };

    onCreate.call(this, scene);
}
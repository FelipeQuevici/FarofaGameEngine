/**
 * Created by Felipe on 07/05/2016.
 */

Object.prototype.objCallEvent = function (event, args) {
    EventCenterInstance.getInstance().callEvent(event,this,args);
};

Object.prototype.objSubscribeEvent = function (eventName, functionToSub) {
    EventCenterInstance.getInstance().subscribeEvent(eventName, functionToSub);
};

Object.prototype.objUnsubscribeEvent = function (eventName, functionToUnsub) {
    EventCenterInstance.getInstance().unsubscribeEvent(eventName, functionToUnsub);
};
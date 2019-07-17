/*
window.onload = function(){

var count = 0;
var event = new Event("enterFrame");

var enter = function(){
  document.body.dispatchEvent(new Event("enterFrame"));
  count++;
  setInterval(enter,1000);
}
enter();

}
*/

class EnterFrame{
  constructor(frame) {
    this.count=0;
    setInterval(this.enterFrame,frame);
  }
  // メソッド
  enterFrame() {
    document.body.dispatchEvent(new Event("enterFrame"));
  }
  get getFrame(){
    this.count++;
    return this.count;
  }
}
class EnterFrame{
  constructor(frame) {
    self = this;
    this.count=0;
    setInterval(this.enterFrame,frame);
  }
  // メソッド
  enterFrame() {
    document.body.dispatchEvent(new Event("enterFrame"));
    self.count++;
  }
  get getFrame(){
    return this.count;
  }
}
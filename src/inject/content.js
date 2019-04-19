console.log("content.js inject");
import {zip, upzip} from "./util";

class Record {
  constructor() {
    this.handel = null;
    this.events = [];
  }
  start() {
		const that = this;
    this.handel = rrweb.record({
      emit(event) {
        // 将 event 存入 events 数组中
        console.log("event");
        that.events.push(event);
      },
    });
  }
  stop() {
    this.handel && this.handel();
  }
  save() {
    const events = this.events;
    if (events.length === 0) return;
    const data = zip(JSON.stringify(events));
    // const body = JSON.stringify({ data });
    chrome.storage.local.get({data: []}, function(items) {
      const list = items.data;
      console.log("读取成功！", list);
			const newData = data;
			console.log(new Date());
      list.push({data: newData, time: new Date()});
      chrome.storage.local.set({data: list}, function() {
        console.log("保存成功！");
      });
    });
    this.events = [];
  }
}
(() => {
  const RR = new Record();
  document.querySelector("html").addEventListener("keydown", function keydown(e) {
    if (e.keyCode === 112) {
      console.log("start", chrome);
      alert("准备开始");
      RR.start();
    }
  });
  document.querySelector("html").addEventListener("keydown", function keydown(e) {
    if (e.keyCode === 113) {
      console.log("stop");
      RR.stop();
      alert("完成录制");
      RR.save();
      e.stopImmediatePropagation();
    }
  });
})();

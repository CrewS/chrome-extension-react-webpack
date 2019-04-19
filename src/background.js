import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {unzip, getQueryVariable} from "./inject/util";
class App extends React.Component {
  componentWillMount() {
		console.log(123);
		this.getData();
	}
	getData(){
		console.log(id)
		const id = getQueryVariable('id');
		if (id === false) return;
		chrome.storage.local.get({data: []}, function(items) {
			const list = items.data
			const events = JSON.parse(unzip(list[id].data));
			new rrwebPlayer({
				target: document.body, // 可以自定义 DOM 元素
				data: {
					events,
				},
			})
		});
	}
  render() {
    return <div>123</div>;
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

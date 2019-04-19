import React from "react";

class App extends React.Component {
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  constructor() {
		super();
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
    console.log("1232");
    this.get();
  }
  get(){
    const that = this;
    chrome.storage.local.get({data: []}, function(items) {
      const data = items.data;
      that.setState({
        data,
      });
      console.log(data);
    });
  };
  render() {
    const {data} = this.state;
    return (
      <div>
        <h1>Hello React & Webpack!</h1>
        <ul>
          {data.map((item, index) => {
            return (
              <li onClick={() => {window.open(chrome.extension.getURL(`background.html?id=${index}`));}}>
                {`这是第${index + 1}条记录`} {item.data.slice(0, 10)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import socket from './utilities/socket-connection';
import './App.css';
import { Widget } from './components/Widget';

class App extends Component {
  constructor() {
    super();
    this.state = {
      performanceData: {},
    };
  }

  componentDidMount() {
    socket.on('data', (data) => {
      // inside this callback, we just got some new data!
      // let's update state so we can
      // re-render App --> Widget --> CPU/Mem/Info
      // we need to make a copy of current state
      // so we can mutate it!
      const currentState = { ...this.state.performanceData };
      // const currentState = Object.assign(this.state.performanceData,{})
      // currentState is an object! Not an array!
      // the reason for this is so we can use the machine's
      // MacA as it's property
      currentState[data.macA] = data.data;
      this.setState({
        performanceData: currentState,
      });
    });
  }

  render() {
    console.log(this.state.performanceData);
    let widgets = [];
    const data = this.state.performanceData;
    // grab each machine, by property, from data
    Object.entries(data).forEach(([key, value]) => {
      widgets.push(<Widget key={key} data={value} />);
    });
    return <div className='App'>{widgets}</div>;
  }
}

export default App;

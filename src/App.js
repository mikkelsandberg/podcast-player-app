import React, { Component } from 'react';
import Feed from 'rss-to-json';
import EpisodeList from './Components/EpisodeList/EpisodeList';
import './Styles/reset.css';
import './Styles/App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: undefined
    };
  };

  loadFeed = () => {
    Feed.load('https://friendquestpodcast.podbean.com/feed/', (err, rss) => {
      this.setState({
        feed: rss
      });
    });
  };

  componentDidMount() {
    window.addEventListener('load', this.loadFeed);
  };

  formatTime = timeString => {
    let timeArray = timeString.split(':');
    let timeInt = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    timeInt.hours = (parseInt(timeArray[0], 10) < 10 ? '0' : '') + parseInt(timeArray[0], 10);
    timeInt.minutes = (parseInt(timeArray[1], 10) < 10 ? '0' : '') + parseInt(timeArray[1], 10);
    timeInt.seconds = (parseInt(timeArray[2], 10) < 10 ? '0' : '') + parseInt(timeArray[2], 10);

    return timeInt;
  };

  render() {
    return (
      <div className="App">
        { this.state.feed === undefined && <h1 className="loadingScreen">Loading...</h1> }
        { this.state.feed &&
          <div>
            <h1>{this.state.feed.title}</h1>
            <h2>Episodes</h2>
            <EpisodeList
              items={this.state.feed.items}
              formatTime={this.formatTime} />
          </div>
        }
      </div>  
    );
  }
}
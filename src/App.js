import React, { Component } from 'react';
import Feed from 'rss-to-json';
import EpisodeList from './EpisodeList';

class App extends Component {
  state = {};

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
        { this.state && this.state.feed &&
          <EpisodeList
            podcast_title={this.state.feed.title}
            items={this.state.feed.items}
            formatTime={this.formatTime} />
        }
      </div>  
    );
  }
}

export default App;

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

  render() {
    return (
      <div className="App">
        { this.state && this.state.feed &&
          <EpisodeList
            title={this.state.feed.title}
            epTitle={this.state.feed.items[0].title}
            epLink={this.state.feed.items[0].link} />
        }
      </div>  
    );
  }
}

export default App;

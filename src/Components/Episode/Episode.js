import React from 'react';
import Audio from 'react-audioplayer';

class Episode extends React.Component {
  render() {
    return (
      <div className="episodeItem">
        <h3 className="episodeTitle"><a href={this.props.link} target="_blank">{this.props.title}</a></h3>
        <p className="description">{this.props.description}</p>
        <div className="bottomContent">
          <div className="mediaPlayer"> 
            <Audio
              width={300}
              color={'#505050'}
              playlist={[
                {
                  name: this.props.title,
                  src: this.props.audioLink
                }
              ]} />
          </div>
          <div className="metaData">
            <p className="timeStamp">{this.props.formatTime(this.props.duration).hours}h {this.props.formatTime(this.props.duration).minutes}m {this.props.formatTime(this.props.duration).seconds}s</p>
            <p className="seasonEpisodeLabel">S{parseInt(this.props.season, 10)}E{parseInt(this.props.episode, 10)}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Episode;
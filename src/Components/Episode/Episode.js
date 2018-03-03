import React from 'react';
import PropTypes from 'prop-types';

const Episode = props =>
  <div className="episodeItem">
    <h3 className="episodeTitle"><a href={props.link} target="_blank">{props.title}</a></h3>
    <p className="description">{props.description}</p>
    <div className="goToEpisodeButton">
      <a href={props.link} target="_blank" rel="noopener" className="goToEpisodeLink">Go to episode</a>
    </div>
    <div className="metaData">
      <p className="timeStamp">{props.formatTime(props.duration).hours}h {props.formatTime(props.duration).minutes}m {props.formatTime(props.duration).seconds}s</p>
      <p className="seasonEpisodeLabel">S{parseInt(props.season, 10)}E{parseInt(props.episode, 10)}</p>
    </div>
  </div>;

Episode.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  episode: PropTypes.string.isRequired,
  formatTime: PropTypes.func.isRequired
};

export default Episode;
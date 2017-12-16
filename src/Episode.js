import React from 'react';
import PropTypes from 'prop-types';

const Episode = props =>
  <div className="episodeItem">
    <h3><a href={props.link} target="_blank">{props.title}</a></h3>
    <h4>Length:</h4>
    <p>{props.formatTime(props.duration).hours}h {props.formatTime(props.duration).minutes}m {props.formatTime(props.duration).seconds}s</p>
    <h4>Description:</h4>
    <p>{props.description}</p>
    <a href={props.link} target="_blank">Read more</a>
    <h4>S{parseInt(props.season, 10)}E{parseInt(props.episode, 10)}</h4>
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
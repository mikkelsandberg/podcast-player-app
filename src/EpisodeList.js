import React from 'react';
import LatestEpisode from './LatestEpisode';
import SeasonList from './SeasonList';
import PropTypes from 'prop-types';

const EpisodeList = props =>
  <div>
    <h1>{props.podcast_title}</h1>
    <h2>Latest Episode:</h2>
    <LatestEpisode
      items={props.items}
      formatTime={props.formatTime} />
    <h2>Seasons:</h2>
    <SeasonList
      items={props.items}
      formatTime={props.formatTime} />
  </div>;

EpisodeList.propTypes = {
  podcast_title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  formatTime: PropTypes.func.isRequired
};

export default EpisodeList;
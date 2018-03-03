import React from 'react';
import Episode from '../Episode/Episode';
import PropTypes from 'prop-types';

const LatestEpisode = props =>
  <div className="episodeListWrapper">
    <Episode
      link={props.items[0].link}
      title={props.items[0].title}
      duration={props.items[0].itunes_duration}
      description={props.items[0].itunes_subtitle}
      season={props.items[0].itunes_season}
      episode={props.items[0].itunes_episode}
      formatTime={props.formatTime} />
  </div>;

LatestEpisode.propTypes = {
  items: PropTypes.array.isRequired,
  formatTime: PropTypes.func.isRequired
};

export default LatestEpisode;
import React from 'react';
import Episode from '../Episode/Episode';
import PropTypes from 'prop-types';

const SeasonList = props =>
  <div className="seasonWrapper">
    <div className="episodeListWrapper">
      {props.items.map((item, id) =>
        <Episode
          key={id}
          link={item.link}
          title={item.title}
          duration={item.itunes_duration}
          description={item.itunes_subtitle}
          season={item.itunes_season}
          episode={item.itunes_episode}
          formatTime={props.formatTime} />
      )}
    </div>
  </div>;

SeasonList.propTypes = {
  items: PropTypes.array.isRequired,
  formatTime: PropTypes.func.isRequired
};

export default SeasonList;
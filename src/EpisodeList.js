import React from 'react';
import PropTypes from 'prop-types';

const EpisodeList = props =>
  <div>
    <h1>{props.title}</h1>
    <h2>Latest Episode:</h2>
    <div className="episodeListWrapper">
      <div className="episodeItem">
        <h3><a href={props.epLink} target="_blank">{props.epTitle}</a></h3>
      </div>
    </div>
  </div>;

EpisodeList.propTypes = {
  title: PropTypes.string.isRequired,
  epTitle: PropTypes.string.isRequired,
  epLink: PropTypes.string.isRequired
};

export default EpisodeList;
import React from 'react';
import Episode from '../Episode/Episode';

class SeasonList extends React.Component {
  render() {
    return (
      <div className="seasonWrapper">
        <div className="episodeListWrapper">
          {this.props.items.map((item, id) =>
            <Episode
              key={id}
              link={item.link}
              title={item.title}
              audioLink={item.enclosures[0].url}
              duration={item.itunes_duration}
              description={item.itunes_subtitle}
              season={item.itunes_season}
              episode={item.itunes_episode}
              formatTime={this.props.formatTime} />
          )}
        </div>
      </div>
    )
  }
}

export default SeasonList;
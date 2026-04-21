import React from 'react';

const ChannelGrid = ({ channels, onSelectChannel }) => {
  if (channels.length === 0) {
    return (
      <div className="no-results">
        <p>No channels found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="channel-grid">
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="channel-card"
          onClick={() => onSelectChannel(channel)}
        >
          <div className="channel-logo-container">
            {channel.logo ? (
              <img src={channel.logo} alt={channel.name} loading="lazy" />
            ) : (
              <div className="logo-placeholder">{channel.name.charAt(0)}</div>
            )}
          </div>
          <div className="channel-info">
            <h4 className="channel-name">{channel.name}</h4>
            <div className="channel-tags">
              {channel.languages.slice(0, 2).map(lang => (
                <span key={lang} className="tag">{lang}</span>
              ))}
              {channel.categories.slice(0, 1).map(cat => (
                <span key={cat} className="tag category-tag">{cat}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelGrid;

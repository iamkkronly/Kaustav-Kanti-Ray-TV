import React, { useState, useEffect, useMemo } from 'react';
import { fetchChannels } from './api/iptv';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChannelGrid from './components/ChannelGrid';
import VideoPlayer from './components/VideoPlayer';
import './App.css';

function App() {
  const [allChannels, setAllChannels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchChannels();
        setAllChannels(data.channels);
        setCategories(data.categories);
        setLanguages(data.languages);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch channels", err);
        setError("Failed to load channels. Please try again later.");
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredChannels = useMemo(() => {
    return allChannels.filter(channel => {
      const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '' || channel.categories.includes(selectedCategory);
      const matchesLanguage = selectedLanguage === '' || channel.languages.includes(selectedLanguage);
      return matchesSearch && matchesCategory && matchesLanguage;
    });
  }, [allChannels, searchQuery, selectedCategory, selectedLanguage]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading KKR TV Channels...</p>
        <p className="credit-text">Developer :- Kaustav Kanti Ray @iamkkronly</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="main-layout">
        <Sidebar
          categories={categories}
          languages={languages}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <main className="content">
          <div className="results-info">
            <span>Showing {filteredChannels.length} channels</span>
            { (selectedCategory || selectedLanguage || searchQuery) && (
                <button className="clear-filters" onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setSelectedLanguage('');
                }}>Clear all filters</button>
            )}
          </div>
          <ChannelGrid
            channels={filteredChannels}
            onSelectChannel={setSelectedChannel}
          />
        </main>
      </div>

      {selectedChannel && (
        <VideoPlayer
          url={selectedChannel.streamUrl}
          title={selectedChannel.name}
          onClose={() => setSelectedChannel(null)}
        />
      )}

      <footer className="mobile-footer">
         Developer :- Kaustav Kanti Ray @iamkkronly
      </footer>
    </div>
  );
}

export default App;

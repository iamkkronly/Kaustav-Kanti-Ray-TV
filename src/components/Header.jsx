import React from 'react';
import { Search, Tv } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="header">
      <div className="header-left">
        <Tv size={32} className="text-primary" />
        <h1 className="logo-text">KKR TV</h1>
      </div>

      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search channels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="header-right">
        <span className="developer-credit">Developer :- Kaustav Kanti Ray @iamkkronly</span>
      </div>
    </header>
  );
};

export default Header;

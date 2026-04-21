import React from 'react';

const Sidebar = ({
  categories,
  languages,
  selectedCategory,
  setSelectedCategory,
  selectedLanguage,
  setSelectedLanguage
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>Languages</h3>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="filter-select"
        >
          <option value="">All Languages</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="sidebar-section">
        <h3>Categories</h3>
        <div className="category-list">
          <button
            className={`category-item ${selectedCategory === '' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('')}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <p>© 2024 KKR TV</p>
        <p className="tiny-credit">Developer :- Kaustav Kanti Ray @iamkkronly</p>
      </div>
    </aside>
  );
};

export default Sidebar;

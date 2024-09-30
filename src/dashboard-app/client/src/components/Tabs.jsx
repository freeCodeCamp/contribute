import React from 'react';

const Container = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    height: '40px',
    margin: '20px'
  };

  return <div style={containerStyle}>{/* content */}</div>;
};
const Tab = ({ active, theme, children }) => {
  const tabStyle = {
    background: active ? theme.primary : 'white',
    color: active ? 'white' : theme.primary,
    fontSize: '18px',
    padding: '5px',
    border: `2px solid ${theme.primary}`,
    borderLeft: 'none',
    width: '200px',
    textAlign: 'center',
    cursor: 'pointer'
  };

  // media query handling
  if (window.innerWidth <= 600) {
    tabStyle.width = 'auto';
    tabStyle.minWidth = '100px';
  }

  // hover effect
  const handleMouseEnter = () => {
    tabStyle.background = theme.primary;
    tabStyle.color = 'white';
  };

  const handleMouseLeave = () => {
    tabStyle.background = active ? theme.primary : 'white';
    tabStyle.color = active ? 'white' : theme.primary;
  };

  return (
    <div
      style={tabStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const Tabs = ({ view, onViewChange }) => {
  return (
    <Container>
      <Tab id='tabs-search' onClick={onViewChange} active={view === 'search'}>
        Search
      </Tab>
      <Tab id='tabs-reports' onClick={onViewChange} active={view === 'reports'}>
        Pareto
      </Tab>
      <Tab
        id='tabs-boilerplates'
        onClick={onViewChange}
        active={view === 'boilerplates'}
      >
        Boilerplate PRs
      </Tab>
      <Tab id='tabs-other' onClick={onViewChange} active={view === 'other'}>
        Other Repos' PRs
      </Tab>
    </Container>
  );
};

export default Tabs;

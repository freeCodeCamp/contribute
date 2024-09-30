import React, { Component } from 'react';

import FreeCodeCampLogo from './assets/freeCodeCampLogo';
import Tabs from './components/Tabs';
import Search from './components/Search';
import Pareto from './components/Pareto';
import Repos from './components/Repos';
import Footer from './components/Footer';

import { ENDPOINT_INFO } from './constants';
const PageContainer = () => {
  return <div>{/* content */}</div>;
};

const Container = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '960px',
    width: '90vw',
    padding: '15px',
    borderRadius: '4px',
    boxShadow: '0 0 4px 0 #777'
  };

  return <div style={containerStyle}>{/* content */}</div>;
};

const AppNavBar = () => {
  return <nav>{/* content */}</nav>;
};

const logoStyle = { paddingLeft: '30px' };

const titleStyle = { margin: '0', padding: '0' };

class App extends Component {
  state = {
    view: 'search',
    footerInfo: null
  };

  updateInfo() {
    fetch(ENDPOINT_INFO)
      .then(response => response.json())
      .then(({ ok, numPRs, prRange, lastUpdate }) => {
        if (ok) {
          const footerInfo = { numPRs, prRange, lastUpdate };
          this.setState(() => ({ footerInfo }));
        }
      })
      .catch(() => {
        // do nothing
      });
  }

  handleViewChange = ({ target: { id } }) => {
    const view = id.replace('tabs-', '');
    this.setState(() => ({ ...this.clearObj, view }));
    if (view === 'reports' || view === 'search') {
      this.updateInfo();
    }
  };

  componentDidMount() {
    this.updateInfo();
  }

  render() {
    const {
      handleViewChange,
      state: { view, footerInfo }
    } = this;
    return (
      <>
        <AppNavBar>
          <a
            href='https://www.freecodecamp.org/'
            target='_blank'
            rel='noopener noreferrer'
            style={logoStyle}
          >
            <FreeCodeCampLogo />
          </a>
          <h1 style={titleStyle}>Contributor Tools</h1>
          <ul className='app-menu'>
            <li>
              <a
                href='https://github.com/freeCodeCamp/freeCodeCamp'
                target='_blank'
                rel='noopener noreferrer'
              >
                GitHub
              </a>
            </li>
          </ul>
        </AppNavBar>
        <PageContainer>
          <Tabs view={view} onViewChange={handleViewChange} />
          <Container>
            {view === 'search' && <Search />}
            {view === 'reports' && <Pareto />}
            {view === 'boilerplates' && (
              <Repos
                key='boilerplates'
                dataFilter={repo => repo._id.includes('boilerplate')}
              />
            )}
            {view === 'other' && (
              <Repos
                key='other'
                dataFilter={repo =>
                  !repo._id.includes('boilerplate') &&
                  repo._id !== 'freeCodeCamp'
                }
              />
            )}
          </Container>
          {footerInfo && <Footer footerInfo={footerInfo} />}
        </PageContainer>
      </>
    );
  }
}
export default App;

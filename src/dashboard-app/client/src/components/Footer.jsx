import React from 'react';

const Container = () => {
  const containerStyle = {
    marginTop: '5px',
    textAlign: 'center'
  };

  return <div style={containerStyle}>{/* content */}</div>;
};

const Info = () => {
  const infoStyle = {
    fontSize: '14px',
    padding: '2px'
  };

  return <div style={infoStyle}>{/* content */}</div>;
};

const Footer = props => {
  const localTime = lastUpdate => {
    const newTime = new Date(lastUpdate);
    return newTime.toLocaleString();
  };

  const {
    footerInfo: { numPRs, prRange, lastUpdate }
  } = props;
  return (
    lastUpdate && (
      <Container>
        <Info>Last Update: {localTime(lastUpdate)}</Info>
        <Info>
          # of open PRs: {numPRs} ({prRange})
        </Info>
      </Container>
    )
  );
};

export default Footer;

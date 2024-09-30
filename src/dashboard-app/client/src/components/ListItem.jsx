import React from 'react';

const Container = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden'
  };

  const mediaQueryStyle =
    window.innerWidth <= 600
      ? {
          marginTop: '1em',
          flexDirection: 'column'
        }
      : {};

  return (
    <div style={{ ...containerStyle, ...mediaQueryStyle }}>{/* content */}</div>
  );
};

const prNumStyle = { flex: 1 };
const usernameStyle = { flex: 1 };
const titleStyle = { flex: 3 };

const ListItem = ({ number, username, prTitle: title, prLink }) => {
  const prUrl = prLink
    ? prLink
    : `https://github.com/freeCodeCamp/freeCodeCamp/pull/${number}`;
  return (
    <Container>
      <a
        style={prNumStyle}
        href={prUrl}
        rel='noopener noreferrer'
        target='_blank'
      >
        #{number}
      </a>
      <span style={usernameStyle}>{username}</span>
      <span style={titleStyle}>{title}</span>
    </Container>
  );
};

export default ListItem;

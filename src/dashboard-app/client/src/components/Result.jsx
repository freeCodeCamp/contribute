const Result = ({ index, children }) => {
  const resultStyle = {
    border: '1px solid #aaa',
    margin: '10px 0',
    padding: '3px',
    background: index % 2 === 0 ? '#eee' : 'transparent' // handles odd/even background
  };

  return <div style={resultStyle}>{children}</div>;
};

export default Result;

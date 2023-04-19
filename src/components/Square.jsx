const Square = ({ handleClick, value, style, winningIndex }) => {
  return (
    <div className="box" onClick={handleClick} style={style}>
      {value}
    </div>
  );
};
export default Square;

const ResetButton = ({ onClick }) => {
  return (
    <button
      className="btn-reset btn"
      onClick={onClick}
      data-testid="resetButton"
    >
      Reset
    </button>
  );
};

export default ResetButton;

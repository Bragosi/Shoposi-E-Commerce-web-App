const MenuSvg = ({ openNavigation }) => {
  return (
    <svg
      className="overflow-visible transition-all duration-300 ease-in-out"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "11" : "4"}
        width="24"
        height="2"
        rx="1"
        fill="black"
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "11" : "18"}
        width="24"
        height="2"
        rx="1"
        fill="black"
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
    </svg>
  );
};

export default MenuSvg;

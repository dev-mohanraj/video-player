import PropTypes from "prop-types";

export const Show = ({ when, children }) => {
  return <>{when ? children : null}</>;
};

Show.propTypes = {
  when: PropTypes.bool,
  children: PropTypes.instanceOf(Element),
};

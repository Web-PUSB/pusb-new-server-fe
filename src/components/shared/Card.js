import React from "react";
import PropTypes from "prop-types";

const Card = ({ variant, extra, children, ...rest }) => {
  const variantClass = variant === "outlined" ? "border border-gray-200" : "";

  return (
    <div
      className={`!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl ${
        rest.default
          ? "shadow-shadow-500 dark:shadow-none"
          : "shadow-shadow-100 dark:shadow-none"
      } dark:!bg-navy-800 dark:text-white ${variantClass} ${extra || ""}`}
      {...rest}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  variant: PropTypes.oneOf(["outlined", "default"]),
  extra: PropTypes.string,
  children: PropTypes.node.isRequired,
  default: PropTypes.bool,
};

Card.defaultProps = {
  variant: "default",
  extra: "",
  default: false,
};

export default Card;

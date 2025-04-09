import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

function useOutsideAlerter(ref, setX) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
}

const Dropdown = ({ button, children, classNames, animation }) => {
  const wrapperRef = useRef(null);
  const [openWrapper, setOpenWrapper] = useState(false);

  useOutsideAlerter(wrapperRef, setOpenWrapper);

  return (
    <div ref={wrapperRef} className="relative flex">
      <div
        className="flex"
        onMouseDown={() => setOpenWrapper(!openWrapper)}
      >
        {button}
      </div>
      <div
        className={`${classNames} absolute z-10 ${
          animation
            ? animation
            : "origin-top-right transition-all duration-300 ease-in-out"
        } ${openWrapper ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  button: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
  animation: PropTypes.string,
};

export default Dropdown;

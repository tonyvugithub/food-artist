import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const linkIcon = ({ icon, link, className, title }) => {
  return (
    <div className={className} title={title}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={icon} />
      </a>
    </div>
  );
};

export default linkIcon;

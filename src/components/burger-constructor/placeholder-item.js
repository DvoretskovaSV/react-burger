import React from "react";
import itemStyles from "./placeholder-item.module.css";
import PropTypes from "prop-types";

const PlaceholderItem = ({ className = '' }) => (
    <div className={`${itemStyles.item} ${className}`}></div>
);

PlaceholderItem.propTypes = {
    className: PropTypes.string,
};

export default PlaceholderItem;
import React from "react";
import listStyles from "./placeholder-list.module.css";
import PropTypes from "prop-types";
import PlaceholderItem from "./placeholder-item";

const PlaceholderList = ({className = ''}) => (
    <div className={`${listStyles.section} ${className}`}>
        <span>Выберите ингредиенты</span>
    </div>
);

PlaceholderItem.propTypes = {
    className: PropTypes.string,
};

export default PlaceholderList;
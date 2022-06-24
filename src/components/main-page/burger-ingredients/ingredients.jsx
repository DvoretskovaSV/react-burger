import React from 'react';
import ingredientsStyles from './ingredients.module.css';
import PropTypes from "prop-types";
import ModalOverlay from "../../elements/modal/modal-overlay";

const BurgerIngredients = ({ children }) => (
    <ul className={`${ingredientsStyles.list} pl-4 pr-4`}>
        {children}
    </ul>
);

ModalOverlay.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
}

export default BurgerIngredients;
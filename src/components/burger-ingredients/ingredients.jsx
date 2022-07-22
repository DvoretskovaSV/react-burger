import React from 'react';
import ingredientsStyles from './ingredients.module.css';
import PropTypes from "prop-types";
import ModalOverlay from "../elements/modal/modal-overlay";
import IngredientsItem from "./item";

const BurgerIngredients = ({ingredients}) => (
    <ul className={`${ingredientsStyles.list} pl-4 pr-4`}>
        {ingredients.map(item => (
            <IngredientsItem
                ingredient={item}
                key={item._id}
                className="mb-8"
            />
        ))}
    </ul>
);

ModalOverlay.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
}

export default BurgerIngredients;
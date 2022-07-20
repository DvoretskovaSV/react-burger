import React, {useEffect} from 'react';
import ingredientsStyles from './ingredients.module.css';
import PropTypes from "prop-types";
import ModalOverlay from "../elements/modal/modal-overlay";
import IngredientsItem from "./item";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {openModalIngredient} from "../../services/actions/modal";

const BurgerIngredients = ({ingredients}) => {
    const dispatch = useDispatch();
    const {state} = useLocation();

    useEffect(() => {
        if (state) {
            const { isModal, ingredientId } = state;

            if (isModal && ingredientId) {
                dispatch(openModalIngredient(ingredientId));
            }
        }
    }, [state])

    return (
        <ul className={`${ingredientsStyles.list} pl-4 pr-4`}>
            {ingredients.map(item => (
                <IngredientsItem
                    ingredient={item}
                    key={item._id}
                    className="mb-8"
                />
            ))}
        </ul>
    )
};

ModalOverlay.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
}

export default BurgerIngredients;
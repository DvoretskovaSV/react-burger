import React, {useState} from 'react';
import { useDrag } from 'react-dnd'
import PropTypes from "prop-types";
import {
    Counter, CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientStyles from './item.module.css';
import Modal from "../../elements/modal/modal";
import IngredientDetails from "./details";
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_MODAL_INGREDIENT, OPEN_MODAL_INGREDIENT} from "../../../services/actions/modal";

const IngredientsItem = ({ingredient, className = ''}) => {
    const dispatch = useDispatch();

    const { image, name, price, _id, type, count } = ingredient;
    const isOpenModal = useSelector(store => store.modal.isOpenModalIngredient);

    const [{ opacity }, drag] = useDrag(
        () => ({
            type: 'ingredient',
            item: { _id, type },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        }),
        [_id],
    )

    const handlerClick = () => {
        dispatch({
            type: OPEN_MODAL_INGREDIENT
        });
    }

    const handleClose = () => {
        dispatch({
            type: CLOSE_MODAL_INGREDIENT
        });
    }

    return (
        <>
            <li
                className={`${ingredientStyles.item} ${className}`}
                onClick={handlerClick}
                ref={drag} style={{ opacity }}
            >
                <img className="pl-4 pr-4" src={image} alt={name}/>
                {count && <Counter count={count} size="default"/>}
                <span className={`${ingredientStyles.price} mt-1 mb-1`}>
                    {price} <CurrencyIcon type="primary"/>
                </span>
                <div>{name}</div>
            </li>
            {isOpenModal &&
                <Modal
                    title="Детали ингредиента"
                    isOpen={isOpenModal}
                    onClose={handleClose}
                >
                    <IngredientDetails {...ingredient}/>
                </Modal>
            }

        </>
    );
};

IngredientsItem.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
};

export default IngredientsItem;

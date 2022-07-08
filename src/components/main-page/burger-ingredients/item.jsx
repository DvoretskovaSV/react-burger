import React from 'react';
import { useDrag } from 'react-dnd'
import PropTypes from "prop-types";
import {
    Counter, CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientStyles from './item.module.css';
import Modal from "../../elements/modal/modal";
import IngredientDetails from "./details";
import {useDispatch, useSelector} from "react-redux";
import {openModalIngredient, closeModalIngredient} from "../../../services/actions/modal";

const IngredientsItem = ({ingredient, className = ''}) => {
    const dispatch = useDispatch();

    const { image, name, price, _id, type, count } = ingredient;
    const isOpenIngredient = useSelector(store => store.modal.isOpenIngredient);
    const openIdIngredient = useSelector(store => store.modal.openIdIngredient);

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

    const handlerClick = () => dispatch(openModalIngredient(ingredient._id));
    const handleClose = () => dispatch(closeModalIngredient());

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
            {isOpenIngredient && openIdIngredient === ingredient._id &&
                <Modal
                    title="Детали ингредиента"
                    isOpen={Boolean(isOpenIngredient)}
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

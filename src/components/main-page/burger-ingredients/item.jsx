import React, {useState} from 'react';
import PropTypes from "prop-types";
import {
    Counter, CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientStyles from './item.module.css';
import Modal from "../../elements/modal/modal";
import IngredientDetails from "./details";

const IngredientsItem = ({ingredient, className = ''}) => {
    const { image, name, price, count } = ingredient;
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <>
            <li
                className={`${ingredientStyles.item} ${className}`}
                onClick={() => setModalOpen(true)}
            >
                <img className="pl-4 pr-4" src={image} alt={name}/>
                {count && <Counter count={count} size="default"/>}
                <span className={`${ingredientStyles.price} mt-1 mb-1`}>
                    {price} <CurrencyIcon type="primary"/>
                </span>
                <div>{name}</div>
            </li>
            {modalOpen &&
                <Modal
                    title="Детали ингредиента"
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
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

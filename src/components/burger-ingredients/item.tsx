import React, {FC} from 'react';
import {useDrag} from 'react-dnd'
import {
    Counter, CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientStyles from './item.module.css';
import Modal from "../elements/modal/modal";
import IngredientDetails from "./details";
import {closeModalIngredient} from "../../services/actions/modal";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {TIngredient} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../hooks";

type IProps = {
    ingredient: TIngredient;
    className: string;
}

const IngredientsItem: FC<IProps> = ({ingredient, className = ''}) => {
    const dispatch = useAppDispatch();

    const {image, name, price, _id, type, count} = ingredient;
    const { isOpenIngredient, openIdIngredient } = useAppSelector(store => store.modal);
    const history = useHistory();
    const location = useLocation();

    const [{opacity}, drag] = useDrag(
        () => ({
            type: 'ingredient',
            item: {_id, type},
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        }),
        [_id],
    )

    const handleClose = () => {
        dispatch(closeModalIngredient());
        history.replace("/");
    };

    return (
        <>
            <li
                className={`${ingredientStyles.item} ${className}`}
                ref={drag} style={{opacity}}
            >

                <img className="pl-4 pr-4" src={image} alt={name}/>
                {count && <Counter count={count} size="default"/>}
                <span className={`${ingredientStyles.price} mt-1 mb-1`}>
                    {price} <CurrencyIcon type="primary"/>
                </span>
                <div>{name}</div>
                <NavLink
                    to={{
                        pathname: `/ingredients/${_id}`,
                        state: { background: location }
                    }}
                    className={ingredientStyles.link}></NavLink>
            </li>
            {isOpenIngredient && openIdIngredient === ingredient._id &&
                <Modal
                    title="Детали ингредиента"

                    onClose={handleClose}
                >
                    <IngredientDetails {...ingredient}/>
                </Modal>
            }

        </>
    );
};

export default IngredientsItem;

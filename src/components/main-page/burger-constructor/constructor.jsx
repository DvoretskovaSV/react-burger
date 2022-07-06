import React, {useCallback} from "react";
import PropTypes from 'prop-types';
import listStyles from "./constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import PlaceholderItem from "./placeholder-item";
import PlaceholderList from "./placeholder-list";
import {useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {
    REMOVE_CONSTRUCTOR_INGREDIENTS,
    SET_CONSTRUCTOR_INGREDIENTS,
    SET_CONSTRUCTOR_LOCK
} from "../../../services/actions/constructor";
import ConstructorItem from "./item";
import {CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER} from "../../../services/actions/ingredients";
import {ingredientConstructor} from "../../../utils/types/ingredient-constructor";

const BurgerConstructor = ({items, lockItem}) => {
    const dispatch = useDispatch();

    const onDrop = (item) => {
        const { _id, type } = item;
        if (type !== 'bun') {
            dispatch({
                type: SET_CONSTRUCTOR_INGREDIENTS,
                id: _id,
            })
        } else {
            dispatch({
                type: SET_CONSTRUCTOR_LOCK,
                id: _id,
            })
        }
    };

    const handleClose = (uuid) => {
        dispatch({
            type: REMOVE_CONSTRUCTOR_INGREDIENTS,
            uuid
        })
    };

    const [, drop] = useDrop({
        accept: 'ingredient',
        drop: onDrop,
    });

    const moveOrder = (dragIndex, hoverIndex) => {
        if (Number.isInteger(dragIndex) && Number.isInteger(hoverIndex)) {
            dispatch({
                type: CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
                prevIndex: dragIndex,
                currentIndex: hoverIndex,
            })
        }
    };

    return (
        <ul className={listStyles.list} ref={drop}>
            {lockItem ?
                <li className="pl-8 mb-4">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${lockItem.name} (вверх)`}
                        price={lockItem.price}
                        thumbnail={lockItem.image}
                    />
                </li>
                : <PlaceholderItem className="ml-8 mb-4 mr-4" type="top"/>
            }
            <ul className={`${listStyles.sub_list} custom-scroll pr-2`} >
                {items.length ?
                    items.map((item, index) => (
                        !lockItem || lockItem._id !== item._id
                        ? <ConstructorItem
                                item={item}
                                key={item.uuid}
                                index={index}
                                handleClose={() => handleClose(item.uuid)}
                                moveOrder={moveOrder}
                            />
                        : null
                )) : <PlaceholderList className='ml-8 mr-4'/>}
            </ul>
            {lockItem ?
                <li className="pl-8 mt-4">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${lockItem.name} (низ)`}
                        price={lockItem.price}
                        thumbnail={lockItem.image}
                    />
                </li>
                : <PlaceholderItem className="ml-8 mt-4 mr-4" type="bottom"/>
            }
        </ul>
    )
};

BurgerConstructor.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            ...ingredientConstructor,
            uuid: PropTypes.string.isRequired,
        })
    ),
    lockItem: PropTypes.shape(ingredientConstructor)
};

export default BurgerConstructor;
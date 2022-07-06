import React from "react";
import PropTypes from 'prop-types';
import listStyles from "./constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PlaceholderItem from "./placeholder-item";
import PlaceholderList from "./placeholder-list";

const BurgerConstructor = ({items, lockId}) => {
    const lockItem = items.find(item => item._id === lockId);

    return (
        <ul className={listStyles.list}>
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
            <ul className={`${listStyles.sub_list} custom-scroll pr-2`}>
                {items.length ?
                    items.map((item, index) => (
                    lockId !== item._id
                        ? <li className={listStyles.item} key={index}>
                            <span className="mr-2">
                                <DragIcon type="primary"/>
                            </span>
                            <ConstructorElement
                                isLocked={false}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
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
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            count: PropTypes.number,
        })
    ),
    lockId: PropTypes.string,
};

export default BurgerConstructor;
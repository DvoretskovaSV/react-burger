import React, {FC} from "react";
import listStyles from "./constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import PlaceholderItem from "./placeholder-item";
import PlaceholderList from "./placeholder-list";
import {useDrop} from "react-dnd";
import {
    addIngredient, addLock, removeIngredient, changeOrder
} from "../../services/actions/constructor";
import ConstructorItem from "./item";
import {TConstructorIngredientItem, TIngredient} from "../../utils/types";
import {useAppDispatch} from "../../hooks";

type TProps = {
    items: Array<TConstructorIngredientItem>;
    lockItem?: TIngredient | undefined;
};

const BurgerConstructor: FC<TProps> = ({items, lockItem}) => {
    const dispatch = useAppDispatch();

    const onDrop = (item: TIngredient) => {
        const { _id, type } = item;
        if (type !== 'bun') {
            dispatch(addIngredient(_id));
        } else {
            dispatch(addLock(_id))
        }
    };

    const handleClose = (uuid: string) => dispatch(removeIngredient(uuid));

    const [, drop] = useDrop({
        accept: 'ingredient',
        drop: onDrop,
    });

    const moveOrder = (dragIndex: number, hoverIndex: number): void => {
        if (Number.isInteger(dragIndex) && Number.isInteger(hoverIndex)) {
            dispatch(changeOrder(dragIndex, hoverIndex));
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
                : <PlaceholderItem className="ml-8 mb-4 mr-4"/>
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
                : <PlaceholderItem className="ml-8 mt-4 mr-4"/>
            }
        </ul>
    )
};

export default BurgerConstructor;
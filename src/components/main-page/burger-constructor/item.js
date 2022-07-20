import React, {useRef} from "react";
import listStyles from "./constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";
import BurgerConstructor from "./constructor";
import {ingredientConstructor} from "../../../utils/types/ingredient-constructor";

const ConstructorItem = ({item, handleClose, index, moveOrder}) => {
    const {uuid} = item;
    const ref = useRef(null)

    const [{ handlerId }, drop] = useDrop({
        accept: 'constructor-ingredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (
                (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
                || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
            ) return;

            moveOrder(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
             item.index = hoverIndex

        },
    });

    const [{opacity}, drag] = useDrag(
        () => ({
            type: 'constructor-ingredient',
            item: () => ({ uuid, index }),
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0 : 1,
            }),
        }),
        [],
    )

    drag(drop(ref))

    return (
        <li className={listStyles.item} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
          <span className="mr-2">
              <DragIcon type="primary"/>
          </span>
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={handleClose}
            />
        </li>
    )
}

ConstructorItem.propTypes = {
    item: PropTypes.shape(ingredientConstructor),
    index: PropTypes.number.isRequired,
    moveOrder: PropTypes.func,
    handleClose: PropTypes.func
};

export default ConstructorItem;
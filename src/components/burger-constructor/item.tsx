import React, {FC, RefObject, useRef} from "react";
import listStyles from "./constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {TConstructorIngredientItem} from "../../utils/types";
import {DragElementWrapper} from "react-dnd/src/types/connectors";

type TProps = {
    item: TConstructorIngredientItem,
    handleClose: () => void;
    index: number;
    moveOrder: (dragIndex: number, hoverIndex: number) => void;
};

interface IDragItem {
    index: number;
    id?: string;
    type?: string;
    handlerId?: string | symbol | null | unknown;
    uuid?: string;
}

const ConstructorItem: FC<TProps> = ({item, handleClose, index, moveOrder}) => {
    const {uuid} = item;
    const ref = useRef<HTMLLIElement>(null)

    const [{ handlerId }, drop]: [Pick<IDragItem, 'handlerId'>, DragElementWrapper<RefObject<HTMLLIElement>>] = useDrop({
        accept: 'constructor-ingredient',
        collect: monitor => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item, monitor) => {
            if (!ref.current) return;

            const dragIndex = (item as IDragItem).index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;

            if (
                hoverClientY &&
                ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
                || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY))
            ) return;

            moveOrder(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            (item as IDragItem).index = hoverIndex
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
        <li
            className={listStyles.item}
            ref={ref}
            style={{ opacity }}
            data-handler-id={handlerId}
            data-cy="constructor-item"
        >
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

export default ConstructorItem;
import React, {FC} from "react";
import itemStyles from "./placeholder-item.module.css";

type TProps = {
    className: string;
};

const PlaceholderItem: FC<TProps> = ({ className = '' }) => (
    <div className={`${itemStyles.item} ${className}`}></div>
);

export default PlaceholderItem;
import React, {FC} from "react";
import itemStyles from "./placeholder-item.module.css";

type IProps = {
    className: string;
};

const PlaceholderItem: FC<IProps> = ({ className = '' }) => (
    <div className={`${itemStyles.item} ${className}`}></div>
);

export default PlaceholderItem;
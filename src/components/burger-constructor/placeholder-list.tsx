import React, {FC} from "react";
import listStyles from "./placeholder-list.module.css";

type TProps = {
    className?: string;
};

const PlaceholderList: FC<TProps> = ({className = ''}) => (
    <div className={`${listStyles.section} ${className}`}>
        <span>Выберите ингредиенты</span>
    </div>
);

export default PlaceholderList;
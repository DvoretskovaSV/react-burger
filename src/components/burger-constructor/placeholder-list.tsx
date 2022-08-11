import React, {FC} from "react";
import listStyles from "./placeholder-list.module.css";

type IProps = {
    className?: string;
};

const PlaceholderList: FC<IProps> = ({className = ''}) => (
    <div className={`${listStyles.section} ${className}`}>
        <span>Выберите ингредиенты</span>
    </div>
);

export default PlaceholderList;
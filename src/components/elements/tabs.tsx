import React, {FC} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import tabsStyles from './tabs.module.css';
import {TSection, SectionsType} from "../../utils/types";


type IProps = {
    sections: Array<TSection>;
    current: string;
    onClick: (value: SectionsType) => void;
};

const Tabs: FC<IProps> = ({sections, current, onClick}) => (
    <div className={tabsStyles.tabs}>
        {sections.map((section, index) => (
            // @ts-ignore
            <Tab key={index}
                 active={current === section.typeId}
                 onClick={() => onClick(section.typeId)}
                 value={section.typeId}
            >
                {section.text}
            </Tab>
        ))}
    </div>
);

export default Tabs;
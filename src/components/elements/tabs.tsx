import React, {FC} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import tabsStyles from './tabs.module.css';
import {TSection, SectionsType} from "../../utils/types";


type TProps = {
    sections: Array<TSection>;
    current: string;
    onClick: (value: SectionsType) => void;
};

const Tabs: FC<TProps> = ({sections, current, onClick}) => (
    <div className={tabsStyles.tabs} data-cy="tabs">
        {sections.map((section, index) => (
            // @ts-ignore
            <Tab key={index}

                 active={current === section.typeId}
                 onClick={() => onClick(section.typeId)}
                 value={section.typeId}
            >
                <span
                    data-cy={current === section.typeId ? 'active' : 'not-active'}>
                    {section.text}
                </span>
            </Tab>
        ))}
    </div>
);

export default Tabs;
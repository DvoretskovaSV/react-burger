import React from 'react';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import tabsStyles from './tabs.module.css';

const Tabs = ({sections, onClick = () => undefined}) => {
    const [current] = React.useState('bun');

    return (
        <div className={tabsStyles.tabs}>
            {sections.map((section, index) => (
                <Tab key={index}
                     active={current === section.typeId}
                     onClick={onClick}
                     value={section.typeId}
                >
                    {section.text}
                </Tab>
            ))}
        </div>
    );
};

Tabs.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            typeId: PropTypes.any.isRequired,
        })
    ).isRequired,
    onClick: PropTypes.func,
};

export default Tabs;
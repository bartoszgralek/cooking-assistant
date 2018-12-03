import React, { Component } from 'react';
import "../css/Example.css";

import ResponsiveMenu from 'react-responsive-navbar';

class Example extends Component {
    render() {
        return (
            <ResponsiveMenu
                menuOpenButton={<div>Open</div>}
                menuCloseButton={<div>Close</div>}
                changeMenuOn="600px"
                largeMenuClassName="large-menu-classname"
                smallMenuClassName="small-menu-classname"
                menu={
                    <ul>
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                        <li><a>Item 3</a></li>
                        <li><a>Item 4</a></li>
                    </ul>
                }
            />
        );
    }
}

export default Example;
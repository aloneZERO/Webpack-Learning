'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';

class Search extends React.Component {
    render() {
        return (
            <div className="search-text">
                开始搜索 By React
            </div>
        );
    }
}

ReactDOM.render(
    <Search/>,
    document.getElementById('root')
);
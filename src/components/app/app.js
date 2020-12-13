import React from 'react';

import './app.css';

import AppHeader from '../app-header/'; // по умолчанию ищет файл index.js
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';

const App = () => {
    const data = [         
        {label: 'Going to learn React', important: true, id: 'qwer'},
        {label: 'That is so good', important: false, id: 'asdf'},
        {label: 'I need a break...', important: false, id: 'zxcv'}
    ];

    return (
        <div className='app'>
            <AppHeader/>
            <div className='search-panel d-flex'>
                <SearchPanel/>
                <PostStatusFilter/>
            </div>
            <PostList posts={data} />
            <PostAddForm/>
        </div>
    )
}

export default App;
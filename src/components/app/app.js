import React from 'react';

import './app.css';
// import style from './App.module.css';
import styled from 'styled-components';

import AppHeader from '../app-header/'; // по умолчанию ищет файл index.js
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`
const StyledAppBlock = styled(AppBlock)`
    background-color: grey;
`

const App = () => {
    const data = [         
        {label: 'Going to learn React', important: true, id: 'qwer'},
        {label: 'That is so good', important: false, id: 'asdf'},
        {label: 'I need a break...', important: false, id: 'zxcv'}
    ];

    return (
        <StyledAppBlock>
            <AppHeader/>
            <div className='search-panel d-flex'>
                <SearchPanel/>
                <PostStatusFilter/>
            </div>
            <PostList posts={data} />
            <PostAddForm/>
        </StyledAppBlock>
    )
}

export default App;
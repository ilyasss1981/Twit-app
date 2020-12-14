import React, { Component } from 'react';

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
// Пример наследования стилизации блока
// const StyledAppBlock = styled(AppBlock)` 
//     background-color: grey;
// `

const SearchFilterBlock = styled.div`
    display: flex;
    margin: 1rem 0;
    .search-input {
        width: auto;
        flex-grow: 1;
        margin-right: 3px;
      }
`

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [         
                {label: 'Going to learn React', important: true, id: '1'},
                {label: 'That is so good', important: false, id: '2'},
                {label: 'I need a break...', important: false, id: '3'}
            ]
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);

        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);     
            //Так делать нельзя, нужно соблюдать иммутабельность state
            // data.splice(index, 1);            
            // return {
            //     data: data
            // }
            const newArr = [...data];
            newArr.splice(index, 1);
            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }            
        });
    }

    render() {
        return (
            <AppBlock>
                <AppHeader/>
                <SearchFilterBlock>
                    <SearchPanel/>
                    <PostStatusFilter/>
                </SearchFilterBlock>
                <PostList 
                    posts={this.state.data}
                    onDelete={this.deleteItem}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </AppBlock>
        )
    }
    

    
}
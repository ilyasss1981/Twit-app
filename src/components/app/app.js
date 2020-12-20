import React, { Component } from 'react';
import nextId from "react-id-generator";

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
                {label: 'Going to learn React', important: true, like: false, id: nextId()},
                {label: 'That is so good', important: false, like: false, id: nextId()},
                {label: 'I need a break...', important: false, like: false, id: nextId()}
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);  
        this.onFilterSelect = this.onFilterSelect.bind(this)    
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
            id: nextId()
        }
        
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }            
        });
    }

    onToggle(id, prop) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old};           
            newItem[prop] = !old[prop];
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })        
    }
    onToggleImportant(id) {
        this.onToggle(id, 'important')
    }
    onToggleLiked(id) {
        this.onToggle(id, 'like')
    }

    // onToggleImportant(id) {
    //     this.setState(({data}) => {
    //         const index = data.findIndex(elem => elem.id === id);
    //         const old = data[index];
    //         const newItem = {...old, important: !old.important};
    //         const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
    //         return {
    //             data: newArr
    //         }
    //     })
    // }    

    // onToggleLiked(id) {
    //     this.setState(({data}) => {
    //         const index = data.findIndex(elem => elem.id === id);
    //         const old = data[index];
    //         const newItem = {...old, like: !old.like};
    //         const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
    //         return {
    //             data: newArr
    //         }
    //     })
    // }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label.indexOf(term) >  -1
        });
    }

    onUpdateSearch(term) {
        this.setState({term})
    }


    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <SearchFilterBlock>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </SearchFilterBlock>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </AppBlock>
        )
    }
    

    
}
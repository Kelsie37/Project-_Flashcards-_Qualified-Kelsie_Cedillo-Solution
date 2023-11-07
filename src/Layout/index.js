import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';

import Header from './Header';
import NotFound from './NotFound';

import Home from './Home';
import AddCard from './AddCard';
import CreateDeck from './CreateDeck';
import EditCard from './EditCard';
import EditDeck from './EditDeck';
import Study from './Study';
import Deck from './Deck';


function Layout() {
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/'>
                    <Link to='/decks/new'>
                        <button>Create Deck</button>
                    </Link>
                    <Home/>
                </Route>
                <Route exact path='/decks/new'>
                    <CreateDeck/>
                </Route>
                <Route exact path='/decks/:deckId/study'>
                    <Study/>
                </Route>
                <Route exact path='/decks/:deckId/edit'>
                    <EditDeck/>
                </Route>
                <Route exact path='/decks/:deckId'>
                    <Deck/>
                </Route>
                <Route exact path='/decks/:deckId/cards/new'>
                    <AddCard/>
                </Route>
                <Route exact path='/decks/:deckId/cards/:cardId/edit'>
                    <EditCard/>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </div>
    );
}

export default Layout;
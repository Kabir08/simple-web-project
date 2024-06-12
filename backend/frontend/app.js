// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Prep from './components/Prep';
import About from './components/About';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/prep" component={Prep} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

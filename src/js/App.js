import '../css/App.css';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import * as React from "react";
import UserList from "./UserList";

function App() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <div>
                <UserList></UserList>
            </div>


        </div>
    );
}

export default App;

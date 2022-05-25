import '../styles/App.scss';
import Content from "./content";
import Sidebar from "./sidebar";

function App() {
    return (
        <div className="App">
            <div className="container">
                <Sidebar/>
                <Content/>
            </div>
        </div>
    );
}

export default App;

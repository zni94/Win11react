import './App.css';
import {Route, Routes} from "react-router";
import Layout from "./components/Layout";

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}/>
        </Routes>
    );
}

export default App;
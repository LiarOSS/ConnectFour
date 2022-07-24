import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import GameContainer from "../components/pages/GameContainer";

const Router = () => (
    <Routes>
        <Route path={"/"} element={<GameContainer/>}/>
    </Routes>
)

export default Router;
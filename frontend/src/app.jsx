import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ViewMothers } from "./Pages/ViewMothers";
import { ViewBabies } from "./Pages/ViewBabies";
import { Register } from "./Pages/Register/Register";
import { HistoryLog } from "./Pages/HistoryLog";
import { VerifyFeed } from "./Pages/VerifyFeed";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view_mothers" element={<ViewMothers />} />
          <Route path="/view_babies" element={<ViewBabies />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history_log" element={<HistoryLog />} />
          <Route path="/verify_feed" element={<VerifyFeed />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reviews from "./Components/Reviews";
import Nav from "./Components/Nav";
import SingleReview from "./Components/SingleReview";
import CreateReview from "./Components/CreateReview";
import SingleUser from "./Components/SingleUser";
import Error from "./Components/Error";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
//make error pages for if review/userdata fails to load
//make it direct to said error pages

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Reviews />} />
          <Route path="/reviews/:review_id" element={<SingleReview />} />
          <Route path="/reviews/create" element={<CreateReview />} />
          <Route path="/users/:username" element={<SingleUser />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./home/Home";
import ChatWidget from "./components/chatwgt/ChatWidget";
import ScrollButton from "./components/scroll/ScrollButton";
import Checkout from "./checkout/Checkout";
import Rooms from "./room/Rooms";
import RoomDetails from "./room/RoomDetails";
import About from "./about/About";
import Contact from "./contact/Contact";
import RoomManager from "./Admin/Rooms/RoomManager";
import Login from "./Login/Login";
import Signup from "./signup/Signup";
import VerifyEmail from "./verify/VerifyEmail";
import NotFound from "./components/Notfound/NotFound";
import ScrollToTop from "./components/scroll/ScrollToTop";
function App() {
  return (
    <div className="bg-[#0f0c0c] min-h-screen text-[#FFF0DC]">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/our-rooms" element={<Rooms />} />
          <Route path="/room-details/:id" element={<RoomDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/room-management" element={<RoomManager />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
        <Footer />
        <ChatWidget />
        <ScrollButton />
      </Router>
    </div>
  )
}

export default App;

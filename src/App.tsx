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
import Gallery from "./components/gallery/Gallery";
import GalleryManager from "./Admin/Rooms/gallery/GalleryManager";
import AdminLayout from "./Admin/dashboard/AdminLayout";
import Dashboard from "./Admin/dashboard/Dashboard";
function App() {
  return (
    <div className="bg-[#0f0c0c] min-h-screen text-[#FFF0DC]">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route index path="/" element={<> <Navbar /><Home /><Footer /><ChatWidget /><ScrollButton /></>} />
          <Route path="/checkout" element={<> <Navbar /><Checkout /><Footer /><ChatWidget /><ScrollButton /></>} />
          <Route path="/our-rooms" element={<> <Navbar /><Rooms /><Footer /><ChatWidget /><ScrollButton /></>} />
          <Route path="/room-details/:id" element={<> <Navbar /><RoomDetails /><Footer /><ChatWidget /><ScrollButton /></>} />
          <Route path="/about" element={<> <Navbar /><About /><Footer /><ChatWidget /><ScrollButton /></>} />
          <Route path="/contact" element={<> <Navbar /><Contact /><Footer /><ChatWidget /><ScrollButton /></>} />
          <Route path="/login" element={<> <Navbar /><Login /><Footer /><ChatWidget /><ScrollButton /></>} />
          <Route path="/signup" element={<> <Navbar /><Signup /><Footer /><ChatWidget /><ScrollButton /></>} />
          <Route path="/gallery" element={<> <Navbar /><Gallery /><Footer /><ChatWidget /><ScrollButton /></>} />
          <Route path="*" element={<> <Navbar /><NotFound /><Footer /><ChatWidget /><ScrollButton /></>} />
          <Route path="/verify-email" element={<> <Navbar /><VerifyEmail /><Footer /><ChatWidget /><ScrollButton /></>} />
          {/* admin layout pages */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="room-management" element={<RoomManager />} />
            <Route path="gallery-management" element={<GalleryManager />} />
          </Route>
        </Routes>

      </Router>
    </div>
  )
}

export default App;

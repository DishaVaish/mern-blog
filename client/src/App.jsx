import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import React from 'react'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
// import Post from './../../api/models/post.model';
import PostPage from './pages/PostPage';

export default function App() {
  return (
    <Router>
      <Header />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/sign-in" element={<SignIn />} />
         <Route path="/sign-up" element={<SignUp />} />
         {/* <Route element ={<PrivateRoute/>}> */}
         <Route path="/dashboard" element={<Dashboard />} />
         {/* </Route> */}
         {/* <Route element ={<OnlyAdminPrivateRoute/>}> */}
         <Route path="/create-post" element={<CreatePost />} />
         {/* </Route> */}
         <Route path="/projects" element={<Projects />} />
         <Route path="/post/:postSlug" element={<PostPage />} />
         
       </Routes>
       <Footer />
    </Router>
  )
}

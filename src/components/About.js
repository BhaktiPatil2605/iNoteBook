// import React, { useContext, useEffect } from 'react'
// import noteContext from '../context/notes/noteContext'
import { Link } from 'react-router-dom'

import React from "react";
const About = () => {
  // const a = useContext(noteContext);
  // useEffect(() => {
  //   a.update();
  //   // eslint-disable-next-line
  // }, [])

  return (
    <div className="container">
    <h1 class="about-heading">About Our iNoteBook Platform</h1>
        <p>Welcome to iNoteBook, your ultimate solution for managing personal notes with unmatched security and convenience. Our platform is designed to help you organize, edit, and delete your notes seamlessly, ensuring that your personal information is always protected. Here’s what you can do:</p>

        <div class="feature-list">
            <h3>Key Features</h3>
            <ul>
                <li><strong>Add, Edit, and Delete Notes:</strong> Easily add new notes, edit them whenever needed, and delete notes you no longer want.</li>
                <li><strong>Personal Note Security:</strong> Your notes are private. Only you can see your notes. We use strong security measures to protect your information.</li>
                <li><strong>User-Specific Access:</strong> Each user has their own secure login. Once logged in, you can only see and manage your own notes.</li>
                <li><strong>Easy to Use:</strong> Our platform is designed to be simple and user-friendly. You can use it on your computer, tablet, or phone.</li>
                <li><strong>Secure Login:</strong> We use secure login methods to keep your account safe. Your data is protected from unauthorized access.</li>
            </ul>
        </div>

        <div class="why-choose-us">
            <h3>Why Choose Us?</h3>
            <p>In today’s world, keeping your personal notes secure is important. Our platform provides a reliable and safe way to store your notes. Whether you’re keeping track of tasks, ideas, or sensitive information, we ensure your data is protected.</p>
            <ul>
                <li><strong>User-Friendly Design:</strong> Our simple and clean design makes it easy for anyone to use.</li>
                <li><strong>Top-Notch Security:</strong> We use advanced security techniques to protect your notes.</li>
                <li><strong>Accessible Anywhere:</strong> Access your notes from any device, anytime, anywhere.</li>
                <li><strong>Dedicated Support:</strong> If you need help, our support team is here for you.</li>
            </ul>
        </div>

        <div class="get-started">
            <h3>Get Started</h3>
            <p>Join us today! <Link to="/signup">Sign Up</Link> and start managing your notes in a secure and easy way. Enjoy the peace of mind knowing your personal information is safe with us.</p>
        </div>
    </div>
    
  );
};

export default About;

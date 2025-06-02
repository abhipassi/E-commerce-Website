// import './styles.css'
//  import { Link } from "react-router-dom"
// function Nav() {
//     return (
//         <div >
//             <div>
//                 <ul className='nav'>
//                     <li><a href='/'>Home</a></li>
//                     <li><a href='#'>abc</a></li>
//                     <li><a href='#'>xyz</a></li>
//                     <li><a href='#'>About Us</a></li>
//                     <li><a href='/admin'>Admin</a></li>
//                 </ul>
//             </div>


//         </div>
//     );
// }

// export default Nav;

import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';

const Nav = () => {
  return (
    <div className="relative flex justify-end items-center bg-black mt-1 p-4">
      
      <div className="absolute left-4 flex gap-4">
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
        <Link to="/admin/category" style={linkStyle}>Admin</Link>
      </div>
      <Link to="/cart" className="text-white text-3xl mr-7">
        <ShoppingCart />
      </Link>
    </div>
  );
};


const linkStyle = {
  color: "white",
  marginRight: "1rem",
  textDecoration: "none"
};

export default Nav;

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

const Nav = () => {
  return (
    <nav style={{ background: "#333", padding: "1rem" }}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
      <Link to="/admin/category" style={linkStyle}>Admin</Link>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  marginRight: "1rem",
  textDecoration: "none"
};

export default Nav;

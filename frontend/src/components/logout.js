import React from 'react'
function Logout() {
        try {
          localStorage.removeItem('user');
          window.location.href = "/"; // Replace with your desired route
        } catch (error) {
          // Handle errors, e.g., network issues
          console.error('Logout failed:', error);
        };
      return (<></>)
}
export default Logout;

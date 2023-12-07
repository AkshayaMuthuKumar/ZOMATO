import React, { useState } from "react";
import '../Styles/Header.css';
import { useHistory } from 'react-router-dom';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: 'solid 1px brown',
        width: '250px'
    },
};


const Header = () => {
    const [backgroundColor, setBackgroundColor] = useState('');
    const [display, setDisplay] = useState('none');
    

    const handleLogout = () => {
        history.push('/ ');
        // Update the state to indicate that the user is logged out
    };

    const history = useHistory();

    return (
        <div className="navbar" style={{ backgroundColor: backgroundColor }}>
            <div className="circle" style={{ display: display }}>
                <span className="circle-text">e!</span>
            </div>
             
            
                <div className="auth-buttons">
                    
                    <button className="create-account-button" onClick={handleLogout}>LogOut</button>
                </div>
            

        </div>
    );
}

export default Header;

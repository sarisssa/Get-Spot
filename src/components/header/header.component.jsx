import { useEffect } from 'react';

import './header.styles.scss';

const Header = ({ token, setToken }) => {

    const CLIENT_ID = '01698bc63ac64a1fbb90d40a9140fb29';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';

    const authURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

    useEffect(() => {
        if (!token) {
            const hash = window.location.hash;
            let urlParams = new URLSearchParams(hash.replace("#", "?"));
            let token = urlParams.get('access_token');
            setToken(token);
            window.localStorage.setItem('token', token);
        }
    }, [])

    const logout = () => {
        setToken('');
        window.localStorage.removeItem("token")
    }

    return (
        <>
            <div className='login-button'>
                {!token ? <a href={authURL}>
                    Login to Spotify
                </a> : <button onClick={logout}>Logout</button>}
            </div>
            <div className='header-title'>
                <a className='app-title'>GET SPOT</a>
                <span className='header-description'>Find your favorite artists!</span>
            </div>
        </>
    )
}

export default Header;
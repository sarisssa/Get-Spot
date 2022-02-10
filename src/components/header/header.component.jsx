import { useEffect } from 'react';

const Header = ({ token, setToken }) => {

    const CLIENT_ID = '01698bc63ac64a1fbb90d40a9140fb29';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';

    const authURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

    useEffect(() => {
        if (!token) {
            let urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
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
        <nav className="nav-bar">
            <h2>Get Spot</h2>
            {!token ? <a href={authURL}>
                Login to Spotify
            </a> : <button onClick={logout}>Logout</button>}
        </nav>
    )
}

export default Header;
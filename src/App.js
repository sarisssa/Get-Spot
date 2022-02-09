import { useState, useEffect } from 'react';

import ArtistProfile from './components/artist-profile/artist-profile.component';

import './App.css';

const axios = require('axios');

const App = () => {
  const [token, setToken] = useState('');
  const [searchbar, setSearchbar] = useState('');
  const [artist, setArtist] = useState([]);

  const CLIENT_ID = '01698bc63ac64a1fbb90d40a9140fb29';
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  const authURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
    let token = urlParams.get('access_token');
    setToken(token);
    window.localStorage.setItem('token', token);
  }, [])

  const logout = () => {
    setToken('');
    window.localStorage.removeItem("token")
  }

  const search = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          query: searchbar,
          type: "artist"
        }
      })
      setArtist(data.artists.items[0]);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Get Spot</h2>
        {!token ? <a href={authURL}>
          Login to Spotify
        </a> : <button onClick={logout}>Logout</button>}
        {token ?
          <form onSubmit={search}>
            <input
              type="text"
              className='search-bar'
              placeholder='Search for an artist...'
              onChange={event => setSearchbar(event.target.value)} />
            <button type={"submit"}>Search</button>
          </form>
          : <h2>Please login</h2>
        }
      </header>
      <ArtistProfile artist={artist} />
    </div>
  );
}

export default App;

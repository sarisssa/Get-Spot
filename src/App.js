import { useState, useEffect } from 'react';

import ArtistProfile from './components/artist-profile/artist-profile.component';

import './App.css';

const axios = require('axios');

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [searchbar, setSearchbar] = useState('');
  const [artist, setArtist] = useState('');
  const [topTracks, setTopTracks] = useState('');

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

  const getTopTracks = async (artistID) => {
    if (artistID) {
      let { data } = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=US&`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      return data.tracks;
    }
    return [];
  }

  const search = async (event) => {
    try {
      let { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          query: searchbar,
          type: "artist"
        }
      })
      const targetArtist = data.artists.items[0]
      setArtist(targetArtist);
      let artistID = targetArtist?.id
      const trackData = await getTopTracks(artistID);
      console.log(trackData);
      setTopTracks(trackData);
      setSearchbar('');


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
          <form name='search-form'>
            <input
              name='search-bar'
              type="text"
              value={searchbar}
              className='search-bar'
              placeholder='Search for an artist...'
              onChange={event => setSearchbar(event.target.value)} />
            <button
              type={'button'}
              onClick={search}>
              Search
            </button>
          </form>
          : <h2>Please login</h2>
        }
      </header>
      {artist ? <ArtistProfile artist={artist} /> : null}
    </div>
  );
}

export default App;

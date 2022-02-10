import { useState, useEffect } from 'react';

import Header from './components/header/header.component';
import SearchBar from './components/search-bar/search-bar.component';
import ArtistProfile from './components/artist-profile/artist-profile.component';
import TracksContainer from './components/tracks-container/tracks-container';

import './App.css';

const axios = require('axios');

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [searchbar, setSearchbar] = useState('');
  const [artist, setArtist] = useState('');
  const [topTracks, setTopTracks] = useState([]);

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

      const targetArtist = data.artists.items[0];
      setArtist(targetArtist);

      let artistID = targetArtist?.id;
      const trackData = await getTopTracks(artistID);

      setTopTracks(trackData);
      setSearchbar('');

    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div className="App">
      <Header token={token} setToken={setToken} />
      <header className="App-header">
        {token ?
          <SearchBar search={search} searchbar={searchbar} setSearchbar={setSearchbar} />
          : <h2>Please login</h2>
        }
      </header>
      {artist
        ?
        <div className='search-results'>
          <ArtistProfile artist={artist} />
          <TracksContainer tracks={topTracks} />
        </div>
        : null
      }
    </div>
  );
}

export default App;

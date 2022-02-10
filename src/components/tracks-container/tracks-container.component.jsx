import { useState } from 'react';

const TracksContainer = ({ tracks }) => {
    const [isSongPlaying, setPlayStatus] = useState(false);
    const [curSongURL, setURL] = useState('');
    const [] = useState(null);

    console.log(tracks);

    const playSong = (previewURL) => {
        let curSong = new Audio(previewURL);

        if (!isSongPlaying) { //Play song when no song is playing
            curSong.play();
            setPlayStatus(true);
            setURL(previewURL);
        }
        else { //A song is currently playing
            if (curSongURL === previewURL) { //User clicks on curSong again
                curSong.pause();
                setPlayStatus(false);
            }
            else { //User clicks on a different song
                curSong.play();
                setPlayStatus(false); //Is this necessary?
                setURL(previewURL);
            }
        }
    }

    return (
        <div className="tracks-container">
            {
                tracks.map((track, index) => {
                    const trackImage = track.album.images[0].url;
                    const previewURL = track.preview_url;
                    return (
                        <div key={index} onClick={() => playSong(previewURL)}>
                            <img
                                src={trackImage}
                                className="track-image"
                                alt="track"
                            />
                            <p className="track-name">{track.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TracksContainer;
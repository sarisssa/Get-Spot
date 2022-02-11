import { useState } from 'react';

const TracksContainer = ({ tracks }) => {
    const [trackState, setTrackState] = useState({
        curSongURL: '',
        audio: null,
        isPlaying: false
    })

    const { curSongURL, audio, isPlaying } = trackState;

    const playSong = (previewURL) => {

        let curSong = new Audio(previewURL);

        if (!isPlaying) { //Play song when no song is playing
            curSong.play();

            setTrackState(prevState => ({
                ...prevState,
                curSongURL: previewURL,
                isPlaying: true,
                audio: curSong
            }));
        }
        else {
            if (curSongURL === previewURL) { //User clicks on curSong again
                audio.pause();

                setTrackState(prevState => ({
                    ...prevState,
                    isPlaying: false
                }));

            }
            else { //User clicks on a different song
                audio.pause();
                curSong.play();

                setTrackState(prevState => ({
                    ...prevState,
                    curSongURL: previewURL,
                    isPlaying: true,
                    audio: curSong
                }));
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
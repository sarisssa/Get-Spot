import { useState } from 'react';

import './tracks-container.styles.scss';

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
                        <div className='track' key={index} onClick={() => playSong(previewURL)}>
                            <img
                                src={trackImage}
                                className="track-image"
                                alt="track"
                            />
                            <div className="track-play">
                                <div className="track-svg-container">
                                    {curSongURL === previewURL
                                        ? <div><svg className="svg-inline--fa fa-pause fa-w-14" aria-hidden="true" data-prefix="fa" data-icon="pause" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg></div>
                                        : <div><svg className="svg-inline--fa fa-play fa-w-14" aria-hidden="true" data-prefix="fa" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></div>}
                                </div>
                            </div>
                            <p className="track-name">{track.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TracksContainer;
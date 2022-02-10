const TracksContainer = ({ tracks }) => {
    console.log(tracks);

    return (
        <div className="tracks-container">
            {
                tracks.map((track, index) => {
                    const trackImage = track.album.images[0].url;
                    return (
                        <div key={index}>
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
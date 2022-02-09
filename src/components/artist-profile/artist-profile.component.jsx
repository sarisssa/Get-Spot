
const ArtistProfile = ({
    artist,
    artist: { name, images, genres, popularity, followers }
}) => {

    return (
        <div className='profile-container'>
            <h1 className='profile-name'>{name}</h1>
            <img
                className='profile-image'
                src={images[0].url}
            />
            <h2 className="profile-followers">
                {`${followers.total} followers`}
            </h2>
            <h2>{`Artist Rank: ${popularity}`}</h2>
            <div className="profile-genres">
                {
                    genres.map((genre, index) => {
                        return (
                            <span key={index}>{genre}</span>
                        )
                    })
                }
            </div>
        </div>
    );

}

export default ArtistProfile
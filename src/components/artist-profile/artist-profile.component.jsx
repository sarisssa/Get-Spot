import './artist-profile.styles.scss';

const ArtistProfile = ({
    artist,
    artist: { name, images, genres, popularity, followers }
}) => {

    return (
        <div className='profile-container'>
            <img
                className='profile-image'
                src={images[0].url}
            />
            <div className='profile-info'>
                <h1 className='profile-name'>{name}
                    <h2 className="profile-popularity">
                        {`Popularity Ranking: ${popularity}`}
                    </h2>
                    <h2 className="profile-followers">
                        {`${followers.total.toLocaleString()} followers`}
                    </h2>
                </h1>
                <div className="profile-genres">
                    {
                        genres.map((genre, index) => { //Add ampersand to string in case we are at last array element 
                            genre = genre !== artist.genres[artist.genres.length - 1] ? ` ${genre}, ` : `& ${genre}`;
                            return (
                                <span key={index}>{genre}</span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ArtistProfile
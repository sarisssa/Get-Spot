const ArtistProfile = ({
    artist,
    artist: { name, id, images, genres, popularity, followers }
}) => {

    console.log(artist);

    return (
        <div className='profile-container'>
            <h1>{name}</h1>
            <img src={images[0].url}
            />
        </div>
    );

}

export default ArtistProfile
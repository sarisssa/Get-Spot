const SearchBar = ({ searchbar, setSearchbar, search }) => {

    return (
        <form name='search-form'>
            <input
                name='search-bar'
                type="text"
                value={searchbar}
                className='search-bar'
                placeholder='Search for an artist...'
                onChange={event => setSearchbar(event.target.value)}
            />
            <button
                type={'button'}
                onClick={search}>
                Search
            </button>
        </form>
    )
}

export default SearchBar;
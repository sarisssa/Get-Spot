const SearchBar = ({ searchbar, setSearchbar, search }) => {

    return (
        <form name='search-form'>
            <input
                type="text"
                className='search-bar'
                value={searchbar}
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
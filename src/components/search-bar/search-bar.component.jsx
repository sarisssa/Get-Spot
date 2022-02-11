import { useState } from 'react';

const SearchBar = ({ search }) => {

    const [searchBar, setSearchBar] = useState('');

    const triggerSearch = () => {
        search(searchBar);
        // setSearchbar('');
    }

    const captureEnter = (event) => {
        if (event.key === 'Enter') {
            triggerSearch();
        }
    }

    return (
        <form name='search-form'>
            <input
                type="text"
                className='search-bar'
                value={searchBar}
                placeholder='Search for an artist...'
                onChange={event => setSearchBar(event.target.value)}
                onKeyPress={(event) => captureEnter(event)}
            />
            <button
                type={'button'}
                onClick={() => triggerSearch()}>
                Search
            </button>
        </form>
    )
}

export default SearchBar;


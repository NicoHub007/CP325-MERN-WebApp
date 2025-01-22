import { useState } from 'react'

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = (evt) => {
        evt.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setQuery('');
        }
    }

    const handleChange = (evt) => {
        setQuery(evt.target.value);
    };
    return (
        <div className='search-bar'>
            <form onSubmit={handleSearch}>
                <input type='text'
                    value={query}
                    onChange={handleChange}
                    placeholder=' '
                />
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}

export default SearchBar
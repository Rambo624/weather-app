

function Search({ search, setSearch, handleSearch }) {
  return (
    <div className='search-bar'>
      <input 
        type='text' 
        placeholder='Enter city' 
        name='search' 
        value={search} 
        onChange={(event) => setSearch(event.target.value)} 
      />
      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default Search;

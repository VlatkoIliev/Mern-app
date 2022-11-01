import { GoSearch } from 'react-icons/go';

const Filter = ({ handleFilter, filterBy, handleTerm, term }) => {
  return (
    <div className='search-filter'>
      <div className='search-container'>
        <input
          className='search-field'
          type='text'
          placeholder='Search by term...'
          value={term}
          onChange={handleTerm}
        />
        <GoSearch className='search-icon' />
      </div>
      <select
        value={filterBy}
        onChange={handleFilter}
        className='search-select'
      >
        <option></option>
        <option>All todos</option>
        <option>Completed todos</option>
        <option>Pending todos</option>
      </select>
    </div>
  );
};

export default Filter;

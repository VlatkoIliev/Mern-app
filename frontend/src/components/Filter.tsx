import { GoSearch } from 'react-icons/go';
import { FilterProps } from '../interface/filterProps';

const Filter = ({ value, handleFilter, handleTerm }: FilterProps) => {
  return (
    <div className='search-filter'>
      <div className='search-container'>
        <input
          className='search-field'
          type='text'
          placeholder='Search by term...'
          onChange={handleTerm}
        />
        <GoSearch className='search-icon' />
      </div>
      <select value={value} onChange={handleFilter} className='search-select'>
        <option value='All todos'>All todos</option>
        <option value='Completed todos'>Completed todos</option>
        <option value='Pending todos'>Pending todos</option>
      </select>
    </div>
  );
};

export default Filter;

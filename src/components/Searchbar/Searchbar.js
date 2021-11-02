import PropTypes from 'prop-types';
import { useState } from 'react';

function Searchbar({ getFormData }) {
  const [value, setValue] = useState('');

  function handleInputChange(event) {
    const { value } = event.currentTarget;
    setValue(value);
  }

  function handleSubmite(event) {
    event.preventDefault();
    getFormData(value);
    setValue('');
  }

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmite}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  getFormData: PropTypes.func,
};
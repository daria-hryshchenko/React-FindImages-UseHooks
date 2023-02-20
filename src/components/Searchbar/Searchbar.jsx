import { useState } from 'react';
import { Input, Form, Header, Button, ButtonLabel } from './Searchbar.module';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  const inputChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={inputChange}
          value={input}
        />
      </Form>
    </Header>
  );
}

Searchbar.protoTypes = {
  onSubmit: PropTypes.func.isRequired,
};

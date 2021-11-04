import { Header, Form, Button, Span, Input } from "./SearchBar.styled";
import PropTypes from "prop-types";

export const SearchBar = ({ onSubmit }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSubmit(e.target.elements.searchImage.value.toLowerCase());
  };

  return (
    <Header>
      <Form onSubmit={handleSearch}>
        <Button type="submit">
          <Span>Search</Span>
        </Button>

        <Input
          type="text"
          name="searchImage"
          autoComplete="off"
          autoFocus
          placeholder="Введи имя для поиска картинки..."
        />
      </Form>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

import PropTypes from "prop-types";
import { LoadMore } from "./Button.styled";

export function Btn({ onClick }) {
  return (
    <LoadMore type="button" onClick={onClick}>
      Загрузить еще...
    </LoadMore>
  );
}

Btn.prototype = {
  onClick: PropTypes.func.isRequired,
};

import { ListItem, Img } from "./ImageGalleryItem.styled";
import PropTypes from "prop-types";

export function ImageGalleryItem({ image, onClick }) {
  const { id, webformatURL, tags } = image;

  return (
    <ListItem onClick={onClick} key={id}>
      <Img src={webformatURL} alt={tags} />
    </ListItem>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

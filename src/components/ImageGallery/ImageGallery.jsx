import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import { List } from "./ImageGallery.styled";

export const ImageGallery = ({ images, onSelect }) => {
  return (
    <List>
      {images.map((image, id) => (
        <ImageGalleryItem
          key={id}
          image={image}
          onClick={() => onSelect(image)}
        />
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

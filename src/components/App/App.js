import { useState, useEffect } from "react";
import { Spinner } from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

import { fetchImages } from "../../API/Api";
import { SearchBar } from "../SearchBar/SearchBar";
import { Btn } from "../Button/Button";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Modal } from "../Modal/Modal";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImages] = useState(null);
  const [searchImage, setSearchImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchImage) return;
    async function getFetchImages() {
      try {
        setLoading("true");

        const gallery = await fetchImages(searchImage, page);

        if (searchImage.trim() === "" || gallery.length === 0) {
          return toast.error(`таких картинок нет, попробуй еще`);
        }

        setImages((images) => [...images, ...gallery]);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } catch (error) {
        toast.error("ошибка");
      } finally {
        setLoading("false");
      }
    }

    getFetchImages();
  }, [page, searchImage]);

  const handleSubmit = (searchImage) => {
    setSearchImages(searchImage);
    setPage(1);
    setImages([]);
  };

  const handleSelectImg = (imageURL) => {
    setShowModal(!showModal);
    setSelectedImages(imageURL);
  };

  const BtnLoadMore = () => {
    setPage((page) => page + 1);
  };

  const showBtn = images.length >= 1;

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {loading === "true" && <Spinner />}
      <ImageGallery images={images} onSelect={handleSelectImg} />
      {showBtn && <Btn onClick={BtnLoadMore} />}
      {showModal && (
        <Modal
          src={selectedImage.largeImageURL}
          alt={selectedImage.tags}
          onSelect={handleSelectImg}
        />
      )}
      <Toaster />
    </div>
  );
}

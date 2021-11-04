import { Component } from "react";
import { Spinner } from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

import { fetchImages } from "../../API/Api";
import { SearchBar } from "../SearchBar/SearchBar";
import { Btn } from "../Button/Button";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Modal } from "../Modal/Modal";

export default class App extends Component {
  state = {
    images: [],
    page: 1,
    selectedImage: null,
    searchImage: null,
    status: "free",
    error: null,
    loading: false,
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchImage, page } = this.state;

    if (prevState.searchImage !== searchImage || prevState.page !== page) {
      try {
        this.setState({ status: "pending" });
        const gallery = await fetchImages(searchImage, page);

        this.setState({ status: "resolved" });

        if (searchImage.trim() === "" || gallery.length === 0) {
          return toast.error(`таких картинок нет, попробуй еще`);
        }
        this.setState({ images: [...this.state.images, ...gallery] });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } catch (error) {
        this.setState({ status: "reject" });
        toast.error("ошибка");
      }
    }
  }

  handleSubmit = (searchImage) => {
    this.setState({ searchImage: searchImage, page: 1, images: [] }); //перепроверить
  };

  handleSelectImg = (imageURL) => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      selectedImage: imageURL,
    }));
  };

  BtnLoadMore = () => {
    this.setState((p) => ({ page: p.page + 1 }));
  };

  render() {
    const { images, status, showModal, selectedImage } = this.state;
    const showBtn = images.length >= 1;

    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        {status === "pending" && <Spinner />}
        <ImageGallery images={images} onSelect={this.handleSelectImg} />
        {showBtn && <Btn onClick={this.BtnLoadMore} />}
        {showModal && (
          <Modal
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
            onSelect={this.handleSelectImg}
          />
        )}
        <Toaster />
      </div>
    );
  }
}

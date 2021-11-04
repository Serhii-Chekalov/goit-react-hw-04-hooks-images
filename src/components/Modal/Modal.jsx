import { Component } from "react";
import { Overlay, ModalStyle } from "./Modal.styled";

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onSelect();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onSelect();
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyle>
          <img src={src} alt={alt} />
        </ModalStyle>
      </Overlay>
    );
  }
}

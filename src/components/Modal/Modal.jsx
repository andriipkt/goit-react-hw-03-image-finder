import css from './Modal.module.css';
const { Component } = require('react');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyEsc);
  }

  handleKeyEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>
    );
  }
}

export default Modal;

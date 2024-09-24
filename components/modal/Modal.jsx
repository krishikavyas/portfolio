import './Modal.scss';

const Modal = ({ title, onSubmit, onCancel, isOpen, children, disable }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onCancel} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          <button disabled={disable} className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button disabled={disable} className="submit-button" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

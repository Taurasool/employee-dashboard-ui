interface ToastMessageProps {
  message: string;
  show: boolean;
}

function ToastMessage({
  message,
  show,
}: ToastMessageProps) {
  return (
    <div
      className={`toast position-fixed top-0 end-0 m-4 ${
        show ? "show" : "hide"
      }`}
      style={{
        zIndex: 9999,
      }}
    >
      <div className="toast-header">
        <strong className="me-auto">
          Employee Dashboard
        </strong>

        <small>Now</small>
      </div>

      <div className="toast-body">
        {message}
      </div>
    </div>
  );
}

export default ToastMessage;
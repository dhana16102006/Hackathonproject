export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>{title}</h3>
        <p style={{ margin: "10px 0", color: "#666" }}>
          {message}
        </p>

        <div className="modal-actions">
          <button onClick={onCancel}>Cancel</button>
          <button className="danger" onClick={onConfirm}>
            Stop habit
          </button>
        </div>
      </div>
    </div>
  );
}

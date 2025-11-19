export default function LoadingSpinner({ message = "Cargando..." }) {
  return (
    <div className="spinner">
      <div className="spinner-circle"></div>
      <p>{message}</p>
    </div>
  );
}
export default function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <div className="error-box">
      <strong>Error:</strong> {error}
    </div>
  );
}
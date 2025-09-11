export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#040406',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>Page Not Found</h2>
        <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

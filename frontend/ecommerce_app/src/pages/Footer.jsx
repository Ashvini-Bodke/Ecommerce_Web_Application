export default function Footer() {
  return (
    <footer className="bg-light border-top mt-3 py-3">

      <div className="container text-center">

        <p className="mb-1">MyShop</p>

        <div className="mb-1">
          <a href="/" className="text-dark text-decoration-none mx-2">Home</a>
          <a href="/products" className="text-dark text-decoration-none mx-2">Products</a>
          <a href="/login" className="text-dark text-decoration-none mx-2">Login</a>
        </div>

        <small className="text-muted">© 2026 MyShop</small>

      </div>

    </footer>
  );
}
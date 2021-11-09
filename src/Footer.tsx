export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-feedback">
        Feedback welcome: feedback@gnarlybits.com
      </div>
      <div className="footer-build">
        Built on {new Date(/*apv.build.date*/).toUTCString()}
      </div>
    </footer>
  );
}

export function Footer() {
  const buildDate = process.env.REACT_APP_BUILD_DATE ? new Date(process.env.REACT_APP_BUILD_DATE) : new Date();

  return (
    <footer className="footer">
      <div className="footer-feedback">
        Feedback welcome: feedback@gnarlybits.com
      </div>
      <div className="footer-build">
        Built on {buildDate.toUTCString()}
      </div>
    </footer>
  );
}

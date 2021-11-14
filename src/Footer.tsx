export function Footer() {
  const buildDate = process.env.REACT_APP_BUILD_DATE ? new Date(process.env.REACT_APP_BUILD_DATE) : new Date();

  return (
    <footer className="footer">
      <div className="footer-feedback">
        Feedback welcome: <a href="mailto:feedback@gnarlybits.com?subjet=ESO Builder">feedback@gnarlybits.com</a>
      </div>
      <div className="footer-build">
        Built on {buildDate.toUTCString()}
      </div>
    </footer>
  );
}

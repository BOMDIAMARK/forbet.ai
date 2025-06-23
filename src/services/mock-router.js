// Mock do react-router-dom para desenvolvimento
export const BrowserRouter = ({ children }) => children;
export const Routes = ({ children }) => children;
export const Route = ({ element }) => element;
export const Link = ({ to, children, ...props }) => (
  <a href={to} {...props}>{children}</a>
);
export const useLocation = () => ({ pathname: window.location.pathname });
export const useNavigate = () => (path) => { window.location.href = path; };


import { withRouter } from "react-router-dom";

const { useEffect } = require("react");

const ScrollsToTop = ({ children, location: { pathname } }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children;
};

export const ScrollToTop = withRouter(ScrollsToTop);

import useHashRouting, { HashRoutes } from "./common/useHashRouting";

// top-level pages
import Software from "./pages/Software"; 
import Renders from "./pages/Renders";
import PageNotFound from "./pages/PageNotFound";
import Blog from "./pages/Blog";
import About from "./pages/About";

// software subpages
import Ipt from "./pages/sw/Ipt";
import Gol from "./pages/sw/Gol";
import Stenor from "./pages/sw/Stenor";
import Chess from "./pages/sw/Chess";

// blog subpages
import Architecture from "./pages/blogs/Architecture";
import MemSaving from "./pages/blogs/MemSaving";

const routes: HashRoutes = {
    defaultPage: PageNotFound,

    index: Software,
    software: Software,
    renders: Renders,
    blog: Blog,
    about: About,

    ipt: Ipt,
    gol: Gol,
    stenor: Stenor,
    chess: Chess,

    architecture: Architecture,
    memsaving: MemSaving
};

export default function App() {
    const Route = useHashRouting(routes);
    return(<Route/>);
}
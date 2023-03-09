import useHashRouting, { HashRoutes } from "./common/useHashRouting";
import Software from "./pages/Software"; 
import Renders from "./pages/Renders";
import PageNotFound from "./pages/PageNotFound";
import Blog from "./pages/Blog";
import About from "./pages/About";

// software subpages
import Ipt from "./pages/sw/Ipt";
import Gol from "./pages/sw/Gol";
import Stenor from "./pages/sw/Stenor";

//blog subpages
import Architecture from "./pages/blogs/Architecture";
import MemSaving from "./pages/blogs/MemSaving";

const routes: HashRoutes = {
    software: Software,
    index: Software,
    renders: Renders,
    blog: Blog,
    about: About,
    ipt: Ipt,
    gol: Gol,
    stenor: Stenor,
    architecture: Architecture,
    memsaving: MemSaving,
    defaultPage: PageNotFound
};

export default function App() {
    const Route = useHashRouting(routes);
    return(<Route/>);
}
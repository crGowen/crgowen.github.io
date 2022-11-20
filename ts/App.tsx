import useHashRouting, { HashRoutes } from "./common/useHashRouting";
import Software from "./pages/Software"; 
import Renders from "./pages/Renders";
import PageNotFound from "./pages/PageNotFound";
import Extra from "./pages/Extra";
import About from "./pages/About";

// software subpages
import Ipt from "./pages/sw/Ipt";
import Gol from "./pages/sw/Gol";

const routes: HashRoutes = {
    software: Software,
    index: Software,
    renders: Renders,
    extra: Extra,
    about: About,
    ipt: Ipt,
    gol: Gol,
    defaultPage: PageNotFound
};

export default function App() {
    const Route = useHashRouting(routes);
    return(<Route/>);
}
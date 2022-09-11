import useHashRouting, { HashRoutes } from "./hooks/useHashRouting";
import Software from "./pages/Software"; 
import Renders from "./pages/Renders";
import PageNotFound from "./pages/PageNotFound";
import Extra from "./pages/Extra";
import About from "./pages/About";

// software subpages
import Ipt from "./pages/sw/Ipt";

const routes: HashRoutes = {
    software: Software,
    index: Software,
    renders: Renders,
    extra: Extra,
    about: About,
    ipt: Ipt,
    defaultPage: PageNotFound
};

export default function App() {
    const Route = useHashRouting(routes);
    return(<Route/>);
}
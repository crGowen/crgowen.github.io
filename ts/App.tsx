import useHashRouting, { HashRoutes } from "./hooks/useHashRouting";
import Software from "./pages/Software"; 
import Renders from "./pages/Renders";
import PageNotFound from "./pages/PageNotFound";

const routes: HashRoutes = {
    software: Software,
    index: Software,
    renders: Renders,
    defaultPage: PageNotFound
};

export default function App() {
    const Route = useHashRouting(routes);
    return(<Route/>);
}
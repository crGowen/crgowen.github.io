import useHashRouting, { HashRoutes } from "./hashRouting";
import Software from "./pages/Software"; 
import PageNotFound from "./pages/PageNotFound";

const routes: HashRoutes = {
    sw: Software,
    index: Software,
    defaultPage: PageNotFound
};

export default function App() {
    const Route = useHashRouting(routes);
    return(<Route/>);
}
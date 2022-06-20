import useHashRouting, { HashRoutes } from "./hash";
import Software from "./pages/Software"; 
import PageNotFound from "./pages/PageNotFound";

const routes: HashRoutes = {
    software: Software,
    index: Software,
    defaultPage: PageNotFound
};

export default function App() {
    const Route = useHashRouting(routes);
    return(<Route/>);
}
import { Home } from "./pages/Home";
import { Analytics } from "@vercel/analytics/react"

function App() {
    return (
        <>     
            <Analytics />
            <Home />
        </>
    );
}

export default App;

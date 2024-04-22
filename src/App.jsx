import AppMobile from "./components/AppMobile/AppMobile";
import AppDesktop from "./components/AppDesktop/AppDesktop";
import { useEffect, useState } from "react";

function App() {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            {screenWidth < 900 ? <AppMobile /> : <AppDesktop />}
        </>
    );

}

export default App;

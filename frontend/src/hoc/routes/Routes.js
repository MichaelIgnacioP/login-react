import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';

import Home from "../../containers/pages/Home";
import Signin from "../../containers/pages/Signin"
import PrivateRoute from "../../Guard/PrivateRoute";

function AnimatedRoutes() {

    const location = useLocation()

    return (
        <AnimatePresence mode='wait'>
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} 
        >
            <Routes location={location} key={location.pathname}>
                {/* Error Display */}
                {/* <Route path="*" element={<Error404 />} /> */}
                {/* Sing in Display */}
                <Route path="/" element={<Signin />} />
                {/* Home Display */}
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    } 
                />
            </Routes>
            </motion.div>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;

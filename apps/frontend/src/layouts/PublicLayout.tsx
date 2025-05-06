import { AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Transition from '@components/effects/Transition';

const PublicLayout = () => {
  const location = useLocation();
  const [showTransition, setShowTransition] = useState(true);

  // Trigger animation khi pathname thay đổi
  useEffect(() => {
    setShowTransition(true);
  }, [location.pathname]);

  return (
    <div className="relative light-mode dark:dark-mode font-Quicksand">
      <Outlet />

      <AnimatePresence mode="wait">
        {showTransition && <Transition key={location.pathname} />}
      </AnimatePresence>
    </div>
  );
};

export default PublicLayout;

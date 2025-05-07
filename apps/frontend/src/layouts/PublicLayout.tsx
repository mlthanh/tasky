import { AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Transition from '@components/effects/Transition';

const PublicLayout = () => {
  const location = useLocation();

  return (
    <div className="relative light-mode dark:dark-mode font-Quicksand">
      <Outlet />
    </div>
  );
};

export default PublicLayout;

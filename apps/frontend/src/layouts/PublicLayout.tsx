import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PublicLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'oauth-google-success') {
        navigate('/dashboard');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <div className="relative light-mode dark:dark-mode font-Quicksand">
      <Outlet />
    </div>
  );
};

export default PublicLayout;

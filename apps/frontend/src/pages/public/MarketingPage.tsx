import { Button } from '@components/common/Button';
import { Medal } from '@components/common/Icon';
import { useNavigate } from 'react-router-dom';

const MarketingPage = () => {
  const navigate = useNavigate();

  const handleGoPage = () => {
    navigate('/register', { state: { from: 'getting' } });
  };

  return (
    <div className="w-full h-screen pt-40 pb-20 bg-slate-100">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center p-4 mb-4 uppercase border rounded-full shadow-sm bg-amber-100 text-amber-700">
            <Medal className="w-6 h-6 mr-2 " /> No 1 task management
          </div>
          <h1 className="mb-6 text-3xl text-center md:text-6xl text-neutral-800">
            tasky. helps team move
          </h1>
          <div className="p-2 px-4 pb-4 text-3xl text-white rounded-md md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 w-fit">
            work forward.
          </div>
        </div>
        <div className="max-w-xs mx-auto mt-4 text-sm text-center md:text-xl text-neutral-400 md:max-w-2xl">
          Collaborate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team work is unique -
          accomplish it all with tasky.
        </div>
        <Button className="mt-2 bg-white group" onClick={handleGoPage}>
          Get
          <span className="font-bold underline">
            task
            <span className="text-primary group-hover:text-white">y</span>.
          </span>
          for free
        </Button>
      </div>
    </div>
  );
};

export default MarketingPage;

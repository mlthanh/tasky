import { HeaderBreadcrumb } from './HeaderBreadcrumb';

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <HeaderBreadcrumb />
      </div>
    </div>
  );
};

export default Header;

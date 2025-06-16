import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@components/common/SideBar';
import Logo from '@components/Logo';
import { getSideBarList } from '@constants/SideBarList';
import { Link, NavLink } from 'react-router-dom';

const sideBarList = getSideBarList();

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="items-center justify-center py-1 overflow-hidden cursor-pointer">
        <Link to={'/dashboard'} className="select-none">
          {open ? (
            <Logo />
          ) : (
            <span className="text-3xl font-extrabold text-primary">t.</span>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sideBarList.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex justify-center gap-3 ${
                          isActive ? 'text-primary font-bold' : ''
                        }`
                      }
                    >
                      {item.icon && <item.icon className="w-4 h-auto" />}
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

import { NotificationBell } from '@common/Icon';
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
} from '@common/SideBar';
import Logo from '@components/Logo';
import { NavLink, Link } from 'react-router-dom';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: NotificationBell,
  },
  {
    title: 'Study',
    url: '/study',
    icon: NotificationBell,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="items-center justify-center py-1 overflow-hidden cursor-pointer">
        {open ? (
          <Logo />
        ) : (
          <span className="text-3xl font-extrabold text-primary">t.</span>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
                      <item.icon classname="w-4 h-auto" />
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

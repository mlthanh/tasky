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
  useSidebar
} from '@components/common/SideBar';
import Logo from '@components/Logo';
import { useSidebarList } from '@frontend/constants/sidebar';
import { Link, NavLink } from 'react-router-dom';
import { WorkspaceSwitcher } from './workspaceswitcher/WorkspaceSwitcher';
import { Separator } from '@frontend/components/common/Separator';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

export function AppSidebar() {
  const { open } = useSidebar();
  const SideBarList = useSidebarList();

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
        <SidebarGroup className="">
          <Separator
            variant="dot"
            orientation="horizontal"
            className="group-data-[collapsible=icon]:hidden"
          />
          <SidebarGroupLabel className="h-full py-5">
            <WorkspaceSwitcher />
          </SidebarGroupLabel>
          <Separator
            variant="dot"
            orientation="horizontal"
            className="group-data-[collapsible=icon]:hidden"
          />
        </SidebarGroup>
        {SideBarList.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel className="uppercase">
              {group.group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {group.items.map((item) => (
                <SidebarMenu key={item.title}>
                  <SidebarMenuItem>
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
                      </NavLink>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex justify-center gap-3 ${
                            isActive ? 'text-primary font-bold' : ''
                          }`
                        }
                      >
                        <span className="text-sm">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

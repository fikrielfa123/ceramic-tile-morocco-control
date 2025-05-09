
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Box, 
  ClipboardCheck, 
  FileText, 
  Home, 
  LogOut, 
  Menu, 
  Settings, 
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useLanguage();

  const navigation = [
    { name: t('dashboard'), href: "/dashboard", icon: Home },
    { name: t('batches'), href: "/batches", icon: Box },
    { name: t('qualityControl'), href: "/quality-control", icon: ClipboardCheck },
    { name: t('reports'), href: "/reports", icon: FileText },
    { name: t('analytics'), href: "/analytics", icon: BarChart3 },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 bg-industrial-blue rounded-md flex items-center justify-center text-white font-bold">
              CT
            </div>
            <span className="ml-3 font-semibold text-lg">{t('appName')}</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          <Menu size={20} />
        </Button>
      </div>

      <div className="flex flex-col flex-grow p-2 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.href
                ? "bg-industrial-blue text-white"
                : "text-gray-600 hover:bg-gray-100",
              collapsed && "justify-center"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </div>

      <div className="p-2 border-t">
        <Link
          to="/settings"
          className={cn(
            "flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors",
            location.pathname === "/settings" && "bg-gray-100",
            collapsed && "justify-center"
          )}
        >
          <Settings size={20} />
          {!collapsed && <span className="ml-3">{t('settings')}</span>}
        </Link>
        <Link
          to="/profile"
          className={cn(
            "flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors",
            location.pathname === "/profile" && "bg-gray-100",
            collapsed && "justify-center"
          )}
        >
          <User size={20} />
          {!collapsed && <span className="ml-3">{t('profile')}</span>}
        </Link>
        <Link
          to="/"
          className={cn(
            "flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">{t('logout')}</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

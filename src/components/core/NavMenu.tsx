import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavItem {
    href: string;
    label: string;
    special?: boolean;
    blank?: boolean;
}

interface NavMenuProps {
    items: NavItem[];
    pathname: string;
}

export function NavMenu({ items, pathname }: NavMenuProps) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {items.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                        <NavigationMenuItem key={item.href}>
                            <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle()}
                                data-active={isActive}
                            >
                                <a
                                    href={item.href}
                                    target={item.blank ? "_blank" : "_self"}
                                    rel={item.blank ? "noopener noreferrer" : undefined}
                                >
                                    {item.label}
                                </a>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

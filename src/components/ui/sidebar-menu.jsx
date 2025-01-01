import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { ChevronRight } from "lucide-react";
import { Fragment, useRef } from "react";

/**
 * 
 * @param {*} param0 {
 *  className: string,
 * }
 */
const SidebarTitle = ({ children, className }) =>
    <div
        className={cn(
            "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
            "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
            className
        )}
    >
        {children}
    </div>

const SidebarSeparator = () => "separator";

/**
 * 
 * @param {*} param0 {
 *  menu: {
 *      items: [{
 *          key: string
 *          title: string,
 *          icon: any,
 *      }],
 *      actions: array | (item) => array: [{
 *          key: string,
 *          tooltip: string,
 *          icon: any,
 *      }],
 *      onClick: function,
 *      variant: default | outline,
 *      size: default | sm | lg,
 *      className: string,
 *      icon: any,
 *      menuItemHoverClassName: string,
 *  },
 *  className: string,
 *  showEmptyChildren: boolean = false,
 *  emptyChildrenContent: string = "No items",
 *  variant: "default" | "notion",
 * }
 */
const SidebarMenu = ({ menu, className, showEmptyChildren = false, emptyChildrenContent = "No items", childrenProperty = "children", variant = "default" }) => {

    const { items, size, className: menuItemClassName, menuItemHoverClassName, icon, onClick, actions } = menu;

    const sidebarMenuButtonVariants = cva(
        "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 cursor-pointer dark:bg-sidebar dark:text-zinc-50 dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground dark:focus-visible:ring-zinc-300",
        {
            variants: {
                variant: {
                    default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    outline:
                        "bg-white shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))] dark:bg-zinc-950",
                },
                size: {
                    default: "h-8 text-sm",
                    sm: "h-7 text-xs",
                    lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
                },
            },
            defaultVariants: {
                variant: "default",
                size: "default",
            },
        }
    )

    const prepareCn = () => {

        let _cn = {
            icon: "opacity-50 item-icon size-4 [&_svg]:size-4 [&_svg]:shrink-0",
            subMenu: "",
            menuItem: ""
        }

        switch (variant) {
            case "notion":
                _cn.icon = _cn.icon;
                _cn.subMenu = "pl-2";
                _cn.menuItem = cn(
                    sidebarMenuButtonVariants({ variant: "default", size }),
                    "relative menu-item",
                    menuItemClassName,
                    menuItemHoverClassName && (Array.isArray(menuItemHoverClassName) ? menuItemHoverClassName.map(m => `hover:${m}`).join(" ") : `hover:${menuItemHoverClassName}`),
                    "[&_.collapse-icon]:hover:block", // show the collapse icon when hovering
                    "[&_.item-icon]:hover:hidden", // hide the item icon when hovering
                    "[&_.menu-actions]:hover:flex", // show the collapse icon when hovering
                );
                break;
            default:
                _cn.icon = _cn.icon;
                _cn.subMenu = "ml-3.5 pl-2.5 border-l border-l-sidebar-border";
                _cn.menuItem = cn(
                    sidebarMenuButtonVariants({ variant: "default", size }),
                    "relative menu-item",
                    menuItemClassName
                );
                break;
        }

        return _cn;
    }
    const refCn = useRef(prepareCn())

    const renderActions = (item) => {
        let _actions = typeof actions === "function" ? actions(item) : actions;
        if (_actions?.length) {
            return <div
                className={cn(
                    "absolute right-2 top-0 flex gap-1 h-full items-center hidden menu-actions z-10",
                )}
            >
                {_actions.map((action, index) => (<Fragment key={action.key || index}>
                    <action.icon
                        className="opacity-50 hover:opacity-80 hover:cursor-pointer size-4"
                        onClick={e => {
                            e.stopPropagation();
                            action?.onClick(item, action.key)
                        }}
                    />
                </Fragment>))}
            </div>
        }
    }

    const renderItem = (item, index) => {
        return (
            <Collapsible key={item.id || index} asChild defaultOpen={item.isActive}>
                <li
                    key={item.key || index}
                >
                    <div
                        data-sidebar-menu-item={item.key || index}
                        className={cn(sidebarMenuButtonVariants({ variant: "default", size }),
                            "relative menu-item",
                            refCn.current.menuItem,
                            // ...(variant === "notion" ? [
                            //     menuItemHoverClassName && (Array.isArray(menuItemHoverClassName) ? menuItemHoverClassName.map(m => `hover:${m}`).join(" ") : `hover:${menuItemHoverClassName}`),
                            //     "[&_.collapse-icon]:hover:block", // show the collapse icon when hovering
                            //     "[&_.item-icon]:hover:hidden", // hide the item icon when hovering
                            //     "[&_.menu-actions]:hover:flex", // show the collapse icon when hovering
                            // ] : []),
                            // menuItemClassName
                        )}
                        onClick={e => {
                            e.stopPropagation();
                            onClick?.(item);
                        }}
                    >
                        {renderActions(item)}
                        {(item[childrenProperty]?.length || showEmptyChildren) && (<>
                            <CollapsibleTrigger asChild>
                                <button className="data-[state=open]:rotate-90 collapse-icon hidden ">
                                    <ChevronRight className="opacity-50 hover:opacity-80 size-4" />
                                </button>
                            </CollapsibleTrigger>
                        </>)}
                        <button className={refCn.current.icon}>
                            {item.icon ? <item.icon /> : (icon && <menu.icon />)}
                        </button>
                        <span>{item.title}</span>
                    </div>
                    <CollapsibleContent>
                        <ul
                            data-sidebar="menu-sub"
                            className={cn(
                                " flex min-w-0 translate-x-px flex-col gap-1 border-r border-r-transparent py-0.5",
                                // indentSize === "sm" ? "pl-2" : "ml-3.5 pl-2.5 border-l border-l-sidebar-border",
                                refCn.current.subMenu,
                                "group-data-[collapsible=icon]:hidden",
                            )}
                        >
                            {item[childrenProperty]?.length ? item[childrenProperty]?.map((subItem) => renderItem(subItem)) : <div className="opacity-50 flex p-0 m-0"><ChevronRight className="opacity-0" />{emptyChildrenContent}</div>}
                        </ul>
                    </CollapsibleContent>
                </li>
            </Collapsible >
        )
    }

    return (
        <div className={cn("relative flex w-full min-w-0 flex-col", className)}>
            <div className="w-full text-sm">
                <ul className="flex w-full min-w-0 flex-col gap-1">
                    {items.map((item, index) => renderItem(item, index))}
                </ul>
            </div>
        </div>
    )
};

export { SidebarTitle, SidebarSeparator, SidebarMenu }
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { ChevronRight } from "lucide-react";

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
 *          actions: [{
 *              key: string,
 *              tooltip: string,
 *              icon: any,
 *          }],
 *      }],
 *      onClick: function,
 *      variant: default | outline,
 *      size: default | sm | lg,
 *      className: string,
 *      icon: any,
 *  },
 *  className: string,
 *  showEmptyChildren: boolean = false,
 *  emptyChildrenContent: string = "No items",
 *  indentSize: "default" | "sm",
 * }
 */
const SidebarMenu = ({ menu, className, showEmptyChildren = false, emptyChildrenContent = "No items", childrenProperty = "children", indentSize = "default" }) => {

    const { items, variant, size, className: menuItemClassName, icon, onClick } = menu

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

    const renderItem = (item, index) => {
        return (
            <Collapsible key={item.id} asChild defaultOpen={item.isActive}>
                <li className="group/menu-item relative" key={item.key || index}>
                    <div
                        className={cn(sidebarMenuButtonVariants({ variant, size }),
                            "[&_.collapse-icon]:hover:block", // show the collapse icon when hovering
                            "[&_.item-icon]:hover:hidden", // hide the item icon when hovering
                            menuItemClassName
                        )}
                        onClick={() => onClick(item)}
                    >
                        {(item[childrenProperty]?.length || showEmptyChildren) && (<>
                            <CollapsibleTrigger asChild>
                                <ChevronRight className="data-[state=open]:rotate-90 collapse-icon hidden" />
                            </CollapsibleTrigger>
                        </>)}
                        {item.icon ? <item.icon className="opacity-60 item-icon hidden" /> : (icon && <menu.icon className="opacity-60 item-icon" />)}
                        <span>{item.title}</span>
                    </div>
                    <CollapsibleContent>
                        <ul
                            data-sidebar="menu-sub"
                            className={cn(
                                " flex min-w-0 translate-x-px flex-col gap-1 border-r border-r-transparent py-0.5",
                                indentSize === "sm" ? "pl-2" : "ml-3.5 pl-2.5 border-l border-l-sidebar-border",
                                "group-data-[collapsible=icon]:hidden",
                            )}
                        >
                            {item[childrenProperty]?.length ? item[childrenProperty]?.map((subItem) => renderItem(subItem)) : <div className="opacity-50 flex p-0 m-0"><ChevronRight className="opacity-0" />{emptyChildrenContent}</div>}
                        </ul>
                        {/* <SidebarMenuSub>
                            {item.items?.length ? item.items?.map((subItem) => renderItem(subItem)) : "No items"}
                        </SidebarMenuSub> */}
                    </CollapsibleContent>
                </li>
            </Collapsible>
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
import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva } from "class-variance-authority";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ViewVerticalIcon } from "@radix-ui/react-icons";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

interface SidebarContext {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = ({
  ref,
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex has-[[data-variant=inset]]:bg-sidebar w-full min-h-svh",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
};

const Sidebar = ({
  ref,
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn(
          "flex h-full w-48 xl:w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="[&>button]:hidden bg-sidebar p-0 w-(--sidebar-width) text-sidebar-foreground md:"
          style={
            { "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties
          }
          side={side}
        >
          <div className="flex flex-col w-full h-full">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="group peer hidden md:block text-sidebar-foreground"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      <div
        className={cn(
          "duration-200 relative h-svh w-48 xl:w-(--sidebar-width) bg-transparent transition-[width] ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        className={cn(
          "duration-200 fixed inset-y-0 z-10 hidden h-svh w-48 xl:w-(--sidebar-width) transition-[left,right,width] ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex flex-col bg-sidebar group-data-[variant=floating]:shadow group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:rounded-lg w-full h-full"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const SidebarTrigger = ({
  ref,
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & {
  ref: React.RefObject<React.ElementRef<typeof Button>>;
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("w-7 h-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <ViewVerticalIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

const SidebarRail = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  ref: React.RefObject<HTMLButtonElement>;
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hidden group-data-[side=left]:-right-4 after:left-1/2 group-data-[side=right]:left-0 z-20 absolute after:absolute inset-y-0 after:inset-y-0 sm:flex hover:after:bg-sidebar-border w-4 after:w-[2px] transition-all -translate-x-1/2 ease-linear",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
};

const SidebarInset = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"main"> & { ref: React.RefObject<HTMLDivElement> }) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex flex-col flex-1 bg-background min-h-svh",
        "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
};

const SidebarInput = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Input> & {
  ref: React.RefObject<React.ElementRef<typeof Input>>;
}) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring w-full h-8",
        className,
      )}
      {...props}
    />
  );
};

const SidebarHeader = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div"> & { ref: React.RefObject<HTMLDivElement> }) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
};

const SidebarFooter = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div"> & { ref: React.RefObject<HTMLDivElement> }) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
};

const SidebarSeparator = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  ref: React.RefObject<React.ElementRef<typeof Separator>>;
}) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 bg-sidebar-border w-auto", className)}
      {...props}
    />
  );
};

const SidebarContent = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div"> & { ref: React.RefObject<HTMLDivElement> }) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex flex-col flex-1 gap-2 min-h-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
};

const SidebarGroup = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div"> & { ref: React.RefObject<HTMLDivElement> }) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex flex-col p-2 w-full min-w-0", className)}
      {...props}
    />
  );
};

const SidebarGroupLabel = ({ ref, className, asChild = false, ...props }) => {
  const Comp = asChild ? SlotPrimitive.Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex items-center px-2 rounded-md outline-none ring-sidebar-ring focus-visible:ring-2 h-8 [&>svg]:size-4 font-medium text-sidebar-foreground/70 text-xs transition-[margin,opa] duration-200 ease-linear shrink-0 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
};

const SidebarGroupAction = ({ ref, className, asChild = false, ...props }) => {
  const Comp = asChild ? SlotPrimitive.Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "top-3.5 right-3 absolute flex justify-center items-center hover:bg-sidebar-accent p-0 rounded-md outline-none ring-sidebar-ring focus-visible:ring-2 w-5 [&>svg]:size-4 aspect-square text-sidebar-foreground transition-transform hover:text-sidebar-accent-foreground [&>svg]:shrink-0",
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
};

const SidebarGroupContent = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div"> & { ref: React.RefObject<HTMLDivElement> }) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
);

const SidebarMenu = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"ul"> & { ref: React.RefObject<HTMLUListElement> }) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex flex-col gap-[0.1rem] w-full min-w-0", className)}
    {...props}
  />
);

const SidebarMenuItem = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"li"> & { ref: React.RefObject<HTMLLIElement> }) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
);

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex items-center gap-2 data-[active=true]:bg-sidebar-accent data-[state=open]:hover:bg-sidebar-accent hover:bg-sidebar-accent active:bg-sidebar-accent aria-disabled:opacity-50 disabled:opacity-50 p-2 group-data-[collapsible=icon]:p-2! group-has-data-[sidebar=menu-action]/menu-item:pr-8 rounded-md outline-none ring-sidebar-ring focus-visible:ring-2 w-full [&>svg]:size-4 group-data-[collapsible=icon]:size-8! overflow-hidden data-[active=true]:font-medium text-sm text-left [&>span:last-child]:truncate transition-[width,height,padding] data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:text-sidebar-accent-foreground hover:text-sidebar-accent-foreground active:text-sidebar-accent-foreground aria-disabled:pointer-events-none disabled:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

const SidebarMenuButton = ({
  ref,
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) => {
  const Comp = asChild ? SlotPrimitive.Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = { children: tooltip };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
};

const SidebarMenuAction = ({
  ref,
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) => {
  const Comp = asChild ? SlotPrimitive.Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "top-1.5 right-1 absolute flex justify-center items-center hover:bg-sidebar-accent p-0 rounded-md outline-none ring-sidebar-ring focus-visible:ring-2 w-5 [&>svg]:size-4 aspect-square text-sidebar-foreground transition-transform hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:shrink-0",
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
};

const SidebarMenuBadge = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div"> & { ref: React.RefObject<HTMLDivElement> }) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "right-1 absolute flex justify-center items-center px-1 rounded-md min-w-5 h-5 font-medium tabular-nums text-sidebar-foreground text-xs pointer-events-none select-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
);

const SidebarMenuSkeleton = ({
  ref,
  className,
  showIcon = false,
  ...props
}) => {
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex items-center gap-2 px-2 rounded-md h-8", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="rounded-md size-4"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="flex-1 max-w-(--skeleton-width) h-4"
        data-sidebar="menu-skeleton-text"
        style={{ "--skeleton-width": width } as React.CSSProperties}
      />
    </div>
  );
};

const SidebarMenuSub = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"ul"> & { ref: React.RefObject<HTMLUListElement> }) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "flex flex-col gap-1 mx-3.5 px-2.5 py-0.5 border-sidebar-border border-l min-w-0 translate-x-px",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
);

const SidebarMenuSubItem = ({
  ref,
  ...props
}: React.ComponentProps<"li"> & { ref: React.RefObject<HTMLLIElement> }) => (
  <li ref={ref} {...props} />
);

const SidebarMenuSubButton = ({
  ref,
  asChild = false,
  size = "md",
  isActive,
  className,
  ...props
}) => {
  const Comp = asChild ? SlotPrimitive.Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex items-center gap-2 hover:bg-sidebar-accent active:bg-sidebar-accent aria-disabled:opacity-50 disabled:opacity-50 px-2 rounded-md outline-none ring-sidebar-ring focus-visible:ring-2 min-w-0 h-7 [&>svg]:size-4 overflow-hidden text-sidebar-foreground [&>span:last-child]:truncate -translate-x-px [&>svg]:text-sidebar-accent-foreground hover:text-sidebar-accent-foreground active:text-sidebar-accent-foreground aria-disabled:pointer-events-none disabled:pointer-events-none [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
};

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

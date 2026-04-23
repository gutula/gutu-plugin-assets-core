import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "assets",
      label: "Assets",
      icon: "building-2",
      description: "Asset register, capitalization posture, and lifecycle control.",
      permission: "assets.register.read",
      homePath: "/admin/business/assets",
      quickActions: ["assets-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "assets",
      group: "control-room",
      items: [
        {
          id: "assets-core.overview",
          label: "Control Room",
          icon: "building-2",
          to: "/admin/business/assets",
          permission: "assets.register.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "assets-core.page",
      kind: "dashboard",
      route: "/admin/business/assets",
      label: "Assets Control Room",
      workspace: "assets",
      group: "control-room",
      permission: "assets.register.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "assets-core.open.control-room",
      label: "Open Assets Core",
      permission: "assets.register.read",
      href: "/admin/business/assets",
      keywords: ["assets core","assets","business"]
    })
  ]
};

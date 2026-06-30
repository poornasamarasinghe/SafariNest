// Shared types for Analytics page components
import React from "react";

export type ModalType = "none" | "tracker" | "coordinates" | "deploy" | "logs";

export interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
}

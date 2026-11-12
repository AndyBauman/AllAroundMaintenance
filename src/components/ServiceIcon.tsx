import {
  House, CloudRain, Layers, HardHat, Sprout, Droplets, Wrench, Ruler, Grid2x2, SprayCan,
  PanelTop, Fence, Search, Frame, Waves, ShowerHead, Warehouse, Lightbulb, BrickWall, Hammer,
  Building2, Trees, Trash2, DoorOpen, Leaf, type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/lib/services";

const ICONS: Record<ServiceIconName, LucideIcon> = {
  roof: House,
  leak: CloudRain,
  layers: Layers,
  hardhat: HardHat,
  moss: Sprout,
  gutter: Droplets,
  wrench: Wrench,
  ruler: Ruler,
  deck: Grid2x2,
  spray: SprayCan,
  siding: PanelTop,
  fence: Fence,
  rot: Search,
  trim: Frame,
  drain: Waves,
  pipe: ShowerHead,
  cabinet: Warehouse,
  light: Lightbulb,
  drywall: BrickWall,
  hammer: Hammer,
  hoa: Building2,
  landscape: Trees,
  junk: Trash2,
  guest: DoorOpen,
  yard: Leaf,
};

export default function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className ?? "h-7 w-7"} strokeWidth={1.5} aria-hidden />;
}

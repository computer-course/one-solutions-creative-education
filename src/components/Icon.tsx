import {
  ArrowRight, ArrowUpRight, BookOpen, Briefcase, Building2, ChevronDown, CircleCheck, CodeXml, Compass,
  Factory, FileText, Gem, Globe, GraduationCap, Hammer, Handshake, HeartPulse, Hotel, Infinity as InfinityIcon,
  Layers, LifeBuoy, Lightbulb, Mail, Map as MapIcon, MapPin, Megaphone, Menu, MessageSquare, Moon, Palette, Phone,
  Puzzle, Rocket, Ruler, Search, Settings, Share2, ShieldCheck, ShoppingCart, Sparkles, Sprout, Sun, Target,
  TrendingUp, Users, Workflow, X, Plus, MessageCircle, Clock, type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  arrow: ArrowRight, "arrow-up": ArrowUpRight, book: BookOpen, briefcase: Briefcase, building: Building2,
  chevron: ChevronDown, check: CircleCheck, code: CodeXml, compass: Compass, factory: Factory, file: FileText,
  gem: Gem, globe: Globe, graduation: GraduationCap, hammer: Hammer, handshake: Handshake, heart: HeartPulse,
  hotel: Hotel, infinity: InfinityIcon, layers: Layers, lifebuoy: LifeBuoy, lightbulb: Lightbulb, mail: Mail,
  map: MapIcon, pin: MapPin, megaphone: Megaphone, menu: Menu, message: MessageSquare, moon: Moon, palette: Palette,
  phone: Phone, puzzle: Puzzle, rocket: Rocket, ruler: Ruler, search: Search, settings: Settings, share: Share2,
  shield: ShieldCheck, cart: ShoppingCart, sparkles: Sparkles, sprout: Sprout, sun: Sun, target: Target,
  trending: TrendingUp, users: Users, workflow: Workflow, x: X, plus: Plus, whatsapp: MessageCircle, clock: Clock,
};

export function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const C = map[name] ?? Sparkles;
  return <C size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.88 2.5 4.88 5.9V21h-4v-5.1c0-1.4-.03-3.1-1.9-3.1s-2.2 1.45-2.2 3V21h-4V9.75Z" />
    </svg>
  );
}

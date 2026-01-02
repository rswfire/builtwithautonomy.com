// components/Icon.tsx
import {
    ChevronDown,
    ChevronRight,
    ChevronUp,
    Compass,
    FileText,
    HelpCircle,
    Layers,
    Lock,
    LucideProps,
    Mail,
    Menu,
    Mic,
    Network,
    ShieldCheck,
    TreeDeciduous,
    Video,
    X,
    // Admin additions
    Home,
    Radio,
    FolderOpen,
    Sparkles,
    Settings,
    LogOut,
    Plus,
    BarChart3,
    Users
} from 'lucide-react';

const iconMap = {
    ChevronDown,
    ChevronRight,
    ChevronUp,
    FileText,
    HelpCircle,
    Mail,
    Menu,
    Mic,
    TreeDeciduous,
    Video,
    X,
    Compass,
    ShieldCheck,
    Layers,
    Network,
    Lock,
    // Admin
    Home,
    Radio,          // Signal
    FolderOpen,     // Clusters
    Sparkles,       // Synthesis
    Settings,
    LogOut,
    Plus,
    BarChart3,      // Dashboard/Stats
    Users
} as const;

export type IconName = keyof typeof iconMap;

type IconProps = Omit<LucideProps, 'ref'> & {
    name: IconName;
    className?: string;
};

export default function Icon({
                                 name,
                                 className = '',
                                 size = 20,
                                 strokeWidth = 2,
                                 ...props
                             }: IconProps) {
    const IconComponent = iconMap[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in whitelist.`);
        return <HelpCircle className={className} size={size} strokeWidth={strokeWidth} {...props} />;
    }

    return <IconComponent className={className} size={size} strokeWidth={strokeWidth} {...props} />;
}

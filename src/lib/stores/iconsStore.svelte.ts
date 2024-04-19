import {
  AppleIcon,
  AwardIcon,
  BookmarkIcon,
  BoxIcon,
  CatIcon,
  CloudIcon,
  DatabaseIcon,
  DogIcon,
  DumbbellIcon,
  FileIcon,
  FlagIcon,
  GamepadIcon,
  GithubIcon,
  GitlabIcon,
  GlassesIcon,
  HandMetalIcon,
  HeartIcon,
  KeyIcon,
  LayersIcon,
  LeafIcon,
  LibraryBig,
  LightbulbIcon,
  MailIcon,
  MapPinIcon,
  MoonIcon,
  NewspaperIcon,
  PhoneIcon,
  PlaneIcon,
  SaladIcon,
  ShieldIcon,
  SquareTerminalIcon,
  TreePineIcon,
  UserIcon,
  VideoIcon,
  WrenchIcon,
  ZapIcon,
} from 'lucide-svelte';
import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';

type IconsList = Record<string, ComponentType<Icon>>;

const initIconsStore = () => {
  let list = $state<IconsList>({
    apple: AppleIcon,
    award: AwardIcon,
    bookmark: BookmarkIcon,
    box: BoxIcon,
    cat: CatIcon,
    cloud: CloudIcon,
    database: DatabaseIcon,
    dog: DogIcon,
    dumbbell: DumbbellIcon,
    file: FileIcon,
    flag: FlagIcon,
    gamepad: GamepadIcon,
    github: GithubIcon,
    gitlab: GitlabIcon,
    glasses: GlassesIcon,
    handMetal: HandMetalIcon,
    heart: HeartIcon,
    key: KeyIcon,
    layers: LayersIcon,
    library: LibraryBig,
    lightbulb: LightbulbIcon,
    leaf: LeafIcon,
    mail: MailIcon,
    mapPin: MapPinIcon,
    moon: MoonIcon,
    newspaper: NewspaperIcon,
    phone: PhoneIcon,
    plane: PlaneIcon,
    salad: SaladIcon,
    shield: ShieldIcon,
    terminal: SquareTerminalIcon,
    thunder: ZapIcon,
    treePine: TreePineIcon,
    user: UserIcon,
    video: VideoIcon,
    wrench: WrenchIcon,
  });

  return {
    get list() {
      return list;
    },
  };
};

export const iconsStore = initIconsStore();

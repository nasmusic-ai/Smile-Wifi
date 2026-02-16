
export interface AppItem {
  id: string;
  name: string;
  href: string;
  img: string;
  external?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
  icon: string;
  isExternal?: boolean;
}

export enum PortalTheme {
  DARK = 'dark',
  SPACE = 'space'
}

interface HeaderProps {
  name: string;
}

interface ContentProps {
  content: { name: string; exerciseCount: number }[];
}

export type { HeaderProps, ContentProps };

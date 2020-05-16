export interface Attributes {
  url?: string;
  medium?: string;
  width?: string;
  height?: string;
  version: string;
  encoding?: string;
  "xmlns:media"?: string;
  "xmlns:atom"?: string;
  "xmlns:dc"?: string;
  href?: string;
  rel?: string;
  type?: string;
}

export interface Declaration {
  _attributes: Attributes;
}

export interface Title {
  _text: string;
}

export interface Description {
  _text: string;
}

export interface PubDate {
  _text: string;
}

export interface Generator {
  _text: string;
}

export interface Link {
  _text: string;
}

export interface AtomLink {
  _attributes: Attributes;
}

export interface Url {
  _text: string;
}

export interface Image {
  link: Link;
  url: Url;
  title: Title;
}

export interface Title3 {
  _text: string;
}

export interface DcCreator {
  _text: string;
}

export interface MediaContent {
  _attributes: Attributes;
}

export interface Guid {
  _text: string;
}

export interface Item {
  title: Title;
  link: Link;
  description: Description;
  "dc:creator": DcCreator;
  pubDate: PubDate;
  "media:content": MediaContent;
  guid: Guid;
}

export interface Channel {
  title: Title;
  description: Description;
  pubDate: PubDate;
  generator: Generator;
  link: Link;
  "atom:link": AtomLink;
  image: Image;
  item: Item[];
}

export interface Rss {
  _attributes: Attributes;
  channel: Channel;
}

export interface RootFeed {
  _declaration: Declaration;
  rss: Rss;
}

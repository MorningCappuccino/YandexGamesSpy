export type Games = {
  games: Game[];
};

export type Game = {
  appID: number;
  playersCount: number;
  firstPublished: number;
};

export type Config = {
  colorsBy: ColorsBy;
};

export enum ColorsBy {
  DatePublished,
  PlayersCount,
}

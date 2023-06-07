// Copyright 2023 MornigCappuccino
import * as moment from "moment";
import { numBeautifier, getRidOfDuplicates } from "./numBeautifier";
import { Games, Game, Config, ColorsBy } from "./types";

export function YandexGamesSpy(config: Config): void {
  let appIDs: number[] = [];
  // const gameIdSelector = +el.getAttribute('href').match(/\d+/)[0];

  document.querySelectorAll(".game-card__game-url").forEach((el) => {
    appIDs.push(+el.getAttribute("href").match(/\d+/)[0]);
  });

  appIDs = getRidOfDuplicates(appIDs);
  console.log(appIDs);

  async function getGamesInfo() {
    const gameInfoUrl = "https://yandex.com/games/api/catalogue/v2/get_games?lang=en&draft=false";

    let result = await fetch(gameInfoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ appIDs: appIDs, format: "long" }),
    });

    return result.json();
  }

  function ColorWrapperByPublishedDate(wrapper: Element, datePublished: number) {
    let monthPassed: number = moment().diff(datePublished, "month");
    let daysPassed: number = moment().diff(datePublished, "days");

    if (monthPassed < 12) {
      wrapper.classList.add("yellow");
    }

    if (daysPassed < 30) {
      wrapper.classList.add("green");
    }
  }

  function ColorWrapperByPlayersCount(wrapper: Element, playersCount: number, playersVsDays: number): void {
    if (playersCount > 100000) {
      wrapper.classList.add("yellow");
    }

    if (playersCount > 500000) {
      wrapper.classList.add("green");
    }
  }

  function PlayersVSDaysPublished(playersCount: number, datePublished: number): number {
    let daysPassed: number = moment().diff(datePublished, "days");

    console.log("playersCount: " + playersCount);
    console.log("daysPassed: " + daysPassed);

    return Math.ceil(playersCount / daysPassed);
  }

  function renderGameInfo(el: Element, game: Game) {
    const wrapper = document.createElement("div");
    const playersEl = document.createElement("div");
    const firstPublished = document.createElement("div");
    const playersCountVSdaysOfPublished = document.createElement("div");
    const firstPublishedMs = game.firstPublished * 1000;

    playersEl.classList.add("egs-players-count");
    playersCountVSdaysOfPublished.classList.add("egs-players-vs-days");
    wrapper.classList.add("egs-wrapper");

    const playersVsDays = PlayersVSDaysPublished(game.playersCount, firstPublishedMs);

    if (config.colorsBy == ColorsBy.DatePublished) {
      ColorWrapperByPublishedDate(wrapper, firstPublishedMs);
    } else if (config.colorsBy == ColorsBy.PlayersCount) {
      ColorWrapperByPlayersCount(wrapper, game.playersCount, playersVsDays);
    }

    playersEl.innerHTML = "<span class='egs-label'>Players </span>" + numBeautifier(game.playersCount);
    firstPublished.innerHTML = "<span class='egs-label'>Release </span>" + moment(firstPublishedMs).format("ll");
    playersCountVSdaysOfPublished.innerHTML = "<span class='egs-label'>Players/Days </span>" + playersVsDays;

    wrapper.append(playersEl);
    wrapper.append(firstPublished);
    wrapper.append(playersCountVSdaysOfPublished);
    el.append(wrapper);
  }

  function seedInfo(gamesInfo: Promise<Games>) {
    gamesInfo.then((res) => {
      console.log(res);
      res.games.map((game) => {
        // console.log(game.playersCount)
        document.querySelectorAll(".game-card__game-url").forEach((el) => {
          if (+el.getAttribute("href").match(/\d+/)[0] == game.appID) {
            renderGameInfo(el, game);
          }
        });
      });
    });
  }

  seedInfo(getGamesInfo());
}

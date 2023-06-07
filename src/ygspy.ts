// Copyright 2023 MornigCappuccino
import * as moment from "moment";
import { numBeautifier, getRidOfDuplicates } from "./numBeautifier";

export function YandexGamesSpy() {
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

  type Games = {
    games: Game[];
  };

  type Game = {
    appID: number;
    playersCount: number;
    firstPublished: number;
  };

  function ColorWrapperByPublishedDate(wrapper: Element, datePublished: number) {
    let monthPassed: number = moment().diff(datePublished, "month");
    let daysPassed: number = moment().diff(datePublished, "days");

    console.log("monthPassed: " + monthPassed);

    if (monthPassed < 12) {
      wrapper.classList.add("yellow");
    }

    if (daysPassed < 30) {
      wrapper.classList.add("green");
    }
  }

  function renderGameInfo(el: Element, game: Game) {
    const wrapper = document.createElement("div");
    const playersEl = document.createElement("div");
    const firstPublished = document.createElement("div");

    playersEl.classList.add("egs-players-count");
    wrapper.classList.add("egs-wrapper");

    ColorWrapperByPublishedDate(wrapper, game.firstPublished * 1000);

    playersEl.innerHTML = "<span class='egs-label'>Players </span>" + numBeautifier(game.playersCount);
    firstPublished.innerHTML =
      "<span class='egs-label'>Release </span>" + moment(game.firstPublished * 1000).format("ll");
    wrapper.append(playersEl);
    wrapper.append(firstPublished);
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

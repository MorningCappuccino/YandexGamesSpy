// Copyright 2023 MornigCappuccino
import * as moment from "moment";

export function YandexGamesSpy() {
  let appIDs: number[] = [];
  // const gameIdSelector = +el.getAttribute('href').match(/\d+/)[0];

  document.querySelectorAll(".game-card__game-url").forEach((el) => {
    appIDs.push(+el.getAttribute("href").match(/\d+/)[0]);
  });

  console.log(appIDs);

  async function getGamesInfo() {
    const gameInfoUrl =
      "https://yandex.com/games/api/catalogue/v2/get_games?lang=en&draft=false";

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

  function seedInfo(gamesInfo: Promise<Games>) {
    gamesInfo.then((res) => {
      console.log(res);
      res.games.map((game) => {
        // console.log(game.playersCount)
        document.querySelectorAll(".game-card__game-url").forEach((el) => {
          if (+el.getAttribute("href").match(/\d+/)[0] == game.appID) {
            const wrapper = document.createElement("div");
            const playersEl = document.createElement("div");
            const firstPublished = document.createElement("div");

            wrapper.style.backgroundColor = "#fc8b83";
            wrapper.style.fontSize = "14px";

            playersEl.innerHTML = "Players: " + game.playersCount;
            firstPublished.innerHTML =
              "Release: " + moment(game.firstPublished * 1000).format("ll");
            wrapper.append(playersEl);
            wrapper.append(firstPublished);
            el.append(wrapper);
          }
        });
      });
    });
  }

  seedInfo(getGamesInfo());
}

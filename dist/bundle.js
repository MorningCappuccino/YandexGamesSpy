(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
// Copyright 2023 MornigCappuccino
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YandexGamesSpy = void 0;
function YandexGamesSpy() {
    var appIDs = [];
    // const gameIdSelector = +el.getAttribute('href').match(/\d+/)[0];
    document.querySelectorAll(".game-card__game-url").forEach(function (el) {
        appIDs.push(+el.getAttribute('href').match(/\d+/)[0]);
    });
    console.log(appIDs);
    function getGamesInfo() {
        return __awaiter(this, void 0, void 0, function () {
            var gameInfoUrl, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gameInfoUrl = 'https://yandex.com/games/api/catalogue/v2/get_games?lang=en&draft=false';
                        return [4 /*yield*/, fetch(gameInfoUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ appIDs: appIDs, format: 'long' })
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.json()];
                }
            });
        });
    }
    function beautifyDate(date) {
        var d = new Date(date * 1000);
        return d.getFullYear() + ":" + d.getMonth() + ":" + d.getDate();
    }
    function seedInfo(gamesInfo) {
        gamesInfo.then(function (res) {
            console.log(res);
            res.games.map(function (game) {
                // console.log(game.playersCount)
                document.querySelectorAll(".game-card__game-url").forEach(function (el) {
                    if (+el.getAttribute('href').match(/\d+/)[0] == game.appID) {
                        var wrapper = document.createElement('div');
                        var playersEl = document.createElement('div');
                        var firstPublished = document.createElement('div');
                        wrapper.style.backgroundColor = '#fc8b83';
                        wrapper.style.fontSize = '14px';
                        playersEl.innerHTML = 'Players: ' + game.playersCount;
                        firstPublished.innerHTML = 'Release: ' + beautifyDate(game.firstPublished);
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
exports.YandexGamesSpy = YandexGamesSpy;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var content_1 = require("./content");
function hello(compiler) {
    console.log("Hello from ".concat(compiler));
}
hello("TypeScript");
(0, content_1.YandexGamesSpy)();

},{"./content":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29udGVudC50cyIsInNyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBLGtDQUFrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxDLFNBQWdCLGNBQWM7SUFDOUIsSUFBSSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBQzFCLG1FQUFtRTtJQUVuRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFO1FBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3ZELENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVwQixTQUFlLFlBQVk7Ozs7Ozt3QkFDbkIsV0FBVyxHQUFHLHlFQUF5RSxDQUFDO3dCQUVqRixxQkFBTSxLQUFLLENBQUMsV0FBVyxFQUFFO2dDQUNwQyxNQUFNLEVBQUUsTUFBTTtnQ0FDZCxPQUFPLEVBQUU7b0NBQ1AsY0FBYyxFQUFFLGtCQUFrQjtpQ0FDbkM7Z0NBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQzs2QkFDekQsQ0FBQyxFQUFBOzt3QkFORSxNQUFNLEdBQUcsU0FNWDt3QkFFRixzQkFBTyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUM7Ozs7S0FDdEI7SUFFRCxTQUFTLFlBQVksQ0FBQyxJQUFZO1FBQ2hDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztRQUU5QixPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbEUsQ0FBQztJQVlELFNBQVMsUUFBUSxDQUFDLFNBQXlCO1FBQ3pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJO2dCQUNqQixpQ0FBaUM7Z0JBQ2pDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7b0JBQzFELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUMxRCxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUM5QyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNoRCxJQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUVyRCxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7d0JBQzFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQzt3QkFFaEMsU0FBUyxDQUFDLFNBQVMsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzt3QkFDdEQsY0FBYyxDQUFDLFNBQVMsR0FBRyxXQUFXLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDM0UsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDL0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDcEI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBRXpCLENBQUM7QUFuRUQsd0NBbUVDOzs7OztBQ3JFRCxxQ0FBMkM7QUFFM0MsU0FBUyxLQUFLLENBQUMsUUFBZ0I7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBYyxRQUFRLENBQUUsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFDRCxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFcEIsSUFBQSx3QkFBYyxHQUFFLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBDb3B5cmlnaHQgMjAyMyBNb3JuaWdDYXBwdWNjaW5vXG5cbmV4cG9ydCBmdW5jdGlvbiBZYW5kZXhHYW1lc1NweSgpIHtcbmxldCBhcHBJRHM6IG51bWJlcltdID0gW107XG4vLyBjb25zdCBnYW1lSWRTZWxlY3RvciA9ICtlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5tYXRjaCgvXFxkKy8pWzBdO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWUtY2FyZF9fZ2FtZS11cmxcIikuZm9yRWFjaChlbCA9PiB7XG4gIGFwcElEcy5wdXNoKCtlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5tYXRjaCgvXFxkKy8pWzBdKVxufSlcblxuY29uc29sZS5sb2coYXBwSURzKTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0R2FtZXNJbmZvKCkge1xuICBjb25zdCBnYW1lSW5mb1VybCA9ICdodHRwczovL3lhbmRleC5jb20vZ2FtZXMvYXBpL2NhdGFsb2d1ZS92Mi9nZXRfZ2FtZXM/bGFuZz1lbiZkcmFmdD1mYWxzZSc7XG5cbiAgbGV0IHJlc3VsdCA9IGF3YWl0IGZldGNoKGdhbWVJbmZvVXJsLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBhcHBJRHM6IGFwcElEcywgZm9ybWF0OiAnbG9uZycgfSlcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdC5qc29uKCk7XG59XG5cbmZ1bmN0aW9uIGJlYXV0aWZ5RGF0ZShkYXRlOiBudW1iZXIpIHtcbiAgbGV0IGQgPSBuZXcgRGF0ZShkYXRlICogMTAwMCk7XG5cbiAgcmV0dXJuIGQuZ2V0RnVsbFllYXIoKSArIFwiOlwiICsgZC5nZXRNb250aCgpICsgXCI6XCIgKyBkLmdldERhdGUoKTtcbn1cblxudHlwZSBHYW1lcyA9IHtcbiAgZ2FtZXM6IEdhbWVbXVxufVxuXG50eXBlIEdhbWUgPSB7XG4gIGFwcElEOiBudW1iZXJcbiAgcGxheWVyc0NvdW50OiBudW1iZXJcbiAgZmlyc3RQdWJsaXNoZWQ6IG51bWJlclxufVxuXG5mdW5jdGlvbiBzZWVkSW5mbyhnYW1lc0luZm86IFByb21pc2U8R2FtZXM+KSB7XG4gIGdhbWVzSW5mby50aGVuKChyZXMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIHJlcy5nYW1lcy5tYXAoKGdhbWUpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUucGxheWVyc0NvdW50KVxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lLWNhcmRfX2dhbWUtdXJsXCIpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBpZiAoK2VsLmdldEF0dHJpYnV0ZSgnaHJlZicpLm1hdGNoKC9cXGQrLylbMF0gPT0gZ2FtZS5hcHBJRCkge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjb25zdCBwbGF5ZXJzRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjb25zdCBmaXJzdFB1Ymxpc2hlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgd3JhcHBlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZjOGI4Myc7XG4gICAgICAgICAgd3JhcHBlci5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcblxuICAgICAgICAgIHBsYXllcnNFbC5pbm5lckhUTUwgPSAnUGxheWVyczogJyArIGdhbWUucGxheWVyc0NvdW50O1xuICAgICAgICAgIGZpcnN0UHVibGlzaGVkLmlubmVySFRNTCA9ICdSZWxlYXNlOiAnICsgYmVhdXRpZnlEYXRlKGdhbWUuZmlyc3RQdWJsaXNoZWQpO1xuICAgICAgICAgIHdyYXBwZXIuYXBwZW5kKHBsYXllcnNFbCk7XG4gICAgICAgICAgd3JhcHBlci5hcHBlbmQoZmlyc3RQdWJsaXNoZWQpO1xuICAgICAgICAgIGVsLmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KTtcbiAgfSk7XG59XG5cbnNlZWRJbmZvKGdldEdhbWVzSW5mbygpKTtcbiAgXG59IiwiaW1wb3J0IHsgWWFuZGV4R2FtZXNTcHkgfSBmcm9tICcuL2NvbnRlbnQnO1xuXG5mdW5jdGlvbiBoZWxsbyhjb21waWxlcjogc3RyaW5nKSB7XG4gIGNvbnNvbGUubG9nKGBIZWxsbyBmcm9tICR7Y29tcGlsZXJ9YCk7XG59XG5oZWxsbyhcIlR5cGVTY3JpcHRcIik7XG5cbllhbmRleEdhbWVzU3B5KCk7Il19

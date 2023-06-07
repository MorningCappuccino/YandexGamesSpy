import { Rank } from "./types";

const playersCountRankTable = [
    { 1: [0, 25000] },
    { 2: [25000, 50000] },
    { 3: [50000, 100000] },
    { 4: [100000, 200000] },
    { 5: [200000, Infinity] },
];

const playersVsDaysPublishedTable = [
    { 1: [0, 500] },
    { 2: [500, 1000] },
    { 3: [1000, 2000] },
    { 4: [2000, 5000] },
    { 5: [5000, Infinity] },
];

const RankColorTable = {
    1: "--wrapper-red2",
    2: "--wrapper-yellow2",
    3: "--wrapper-light-green2",
    4: "--wrapper-green2",
    5: "--wrapper-violet",
};

export function GetPlayersCountRank(playersCount: number) {
    let rankRes: number = 1;

    // TODO: fix type any
    playersCountRankTable.forEach((rank: any, index) => {
        const [min, max] = rank[index + 1];

        if (playersCount > min && playersCount < max) {
            rankRes = index + 1;
        }
    });

    return rankRes;
}

export function GetPlayersVsDaysRank(playersVsDays: number) {
    let rankRes: number = 1;

    // TODO: fix type any
    playersVsDaysPublishedTable.forEach((rank: any, index) => {
        const [min, max] = rank[index + 1];

        if (playersVsDays > min && playersVsDays < max) {
            rankRes = index + 1;
        }
    });

    return rankRes;
}

// return color as css var
export function CompareRanks(playersCountRank: number, playersVsDaysRank: number): string {
    const maxRank = Math.max(playersCountRank, playersVsDaysRank);

    // hmmm??
    return RankColorTable[maxRank as keyof typeof RankColorTable];
}

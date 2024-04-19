import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import SteamStrategy from "passport-steam";
import passportSteam from "passport-steam";
import SteamApi, { IGetNewsForAppParams, IGetNewsForAppResponse } from '@varandas/steam'

const steamApi = new SteamApi(process.env.API_STEAM)

// Get the user service
const newsService = steamApi.getNewsService()
const playerService = steamApi.getPlayerService()
const userService = steamApi.getUserService()
const userStatsService = steamApi.getUserStatsService()


const app = express();
const port = 3000;

async function NewsService() {
  const news = await newsService.getNewsForApp({
      appid: 440,
      count: 3,
      maxlength: 300,
  })
  console.log("News service--------------------------------")
  return {news}
}

async function UserServices() {
    const users = await userService.getPlayerSummaries({
        steamids: ['76561198000000000', '76561198000000001'],
    })

    // Get IFriend List
    const friends = await userService.getFriendList({
        steamid: '76561198000000000',
        relationship: 'all',
    })
    console.log("User services--------------------------------")
    return {users, friends}
}


async function UserStatsService() {
// Get Player Achievements
const achievements = await userStatsService.getPlayerAchievements({
  steamid: '76561198000000000',
  appid: 440,
})

// Get Global Achievements Percentages For App
const achievementsPrecent = await userStatsService.getGlobalAchievementPercentagesForApp({
  gameid: 440,
})

// Get User Stats For Game
const stats = await userStatsService.getUserStatsForGame({
  steamid: '76561198000000000',
  appid: 440,
})
console.log("User stats service--------------------------------")
return{achievements, achievementsPrecent, stats}
}

async function PlayerService() {
    // Get Owned Games
    const games = await playerService.getOwnedGames({
        steamid: '76561198000000000',
        includeAppInfo: true,
        includePlayedFreeGames: true,
    })
    
    // Get Recently Played Games
    const gamesRecently = await playerService.getRecentlyPlayedGames({
        steamid: '76561198000000000',
        count: 3,
    })

    console.log("Player service--------------------------------") 
    return {games, gamesRecently}
}

async function steamtest() {
  console.log('News Service', await NewsService())
  console.log('Player Service', await PlayerService())
  console.log('User Services', await UserServices())
  // console.log('User Stats Service', await UserStatsService())
}

steamtest()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
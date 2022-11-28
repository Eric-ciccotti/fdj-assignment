import { League } from "src/app/interfaces/League";

export const mockLeagueArray: League[] = [{
  _id: "1",
  name: "Supercopa de Espana",
  sport: "sport1",
  teams: ["t1", "t11"],
}, {
  _id: "2",
  name: "English Premier League",
  sport: "sport2",
  teams: ["t2", "t22"],
}]

export const mockLeagueArrayImageLink: League[] = [{
  _id: "1",
  name: "Supercopa de Espana",
  sport: "sport1",
  teams: ["t1", "t11"],
  imgLink: "https://www.thesportsdb.com/images/media/league/badge/sp4q7d1641378531.png",
}, {
  _id: "2",
  name: "English Premier League",
  sport: "sport2",
  teams: ["t2", "t22"],
  imgLink: "https://www.thesportsdb.com/images/media/league/badge/pdd43f1610891709.png",
}]

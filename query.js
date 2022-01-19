import axios from "axios";
import cheerio from "cheerio";
import { DBMovies } from "./model.js";

export { getPage };

let getPage = (num) => {
  axios
    .get("https://movie.douban.com/top250", {
      params: {
        start: num,
      },
    })
    .then(function (response) {
      console.log(`正在抓取第${num / 25 + 1}页`);
      queryHTML(response.data);
    })
    .catch(function (error) {
      console.log("!!error:" + error);
    });
};

let queryHTML = async (cont) => {
  for (let i = 0; i < 25; i++) {
    let $ = cheerio.load(cont);
    $ = cheerio.load($(`.grid_view>li:eq(${i})`).html());
    let link = $(`.hd`)
      .html()
      .match(/http.*\//)[0];

    let dbID = link.match(/\d+/)[0];
    let IMDb = await detailPage(link);
    let chTitle = $(".title:eq(0)").text().trim();
    let title = $(".title:eq(1)").text().split("/ ")[1];
    let dbRank = $("em").text();
    let bd = $(".bd").html();
    let director = bd.split("导演: ")[1].split("&nbsp;")[0];
    let releaseDate = bd.split("<br>")[1].split("&nbsp;")[0].trim();
    let dbScore = $(".rating_num").text();
    let detail = $(".inq").text();
    let posterUrl = $(".pic")
      .html()
      .match(/http.*\//)[0];

    console.log({
      dbID: dbID,
      chTitle: chTitle,
      title: title,
      dbRank: dbRank,
      director: director,
      releaseDate: releaseDate,
      dbScore: dbScore,
      IMDb: IMDb,
      detail: detail,
      posterUrl: posterUrl,
    });
    DBMovies.create({
      dbID: dbID,
      chTitle: chTitle,
      title: title,
      dbRank: dbRank,
      director: director,
      releaseDate: releaseDate,
      dbScore: dbScore,
      IMDb: IMDb,
      detail: detail,
      posterUrl: posterUrl,
    });
  }
};

let detailPage = (link) => {
  return new Promise((res, rej) => {
    axios
      .get(link)
      .then((response) => {
        let $ = cheerio.load(response.data);
        let IMDb = $("#info")
          .html()
          .split('<span class="pl">IMDb:</span> ')[1]
          .split("<br>")[0];
        res(IMDb);
        return IMDb;
      })
      .catch((e) => {
        rej(e);
      });
  });
};

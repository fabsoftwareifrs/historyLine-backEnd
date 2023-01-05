const HttpResponse = require("../http/httpResponse.js");
const { User, Room, Data, UsersRooms } = require("../models");
const calcYear = require("../functions/calcYear.js");

module.exports = {
  async playerTry(req, res) {
    const { dataYear, id, roomIndex, datas } = req.body;
    const { userId } = req;
    const userExist = await UsersRooms.findOne({
      where: { room_id: roomIndex, user_id: userId },
    });

    if (!userExist) {
      await UsersRooms.create(
        {
          roomId: roomIndex,
          userId: userId,
        },
        { include: { model: Room, User } }
      );
    }
    try {
      const answer = await Data.findOne({ where: { id: id } });
      const thereDatas = await Data.findAll({
        where: { room_id: roomIndex },
      });

      const originalDatas = thereDatas.filter((e) => {
        return datas.find((el) => el.id === e.id);
      });

      if (!originalDatas.length) {
        return HttpResponse.badRequest(
          res,
          "Esses dados não existem nessa sala"
        );
      } else if (datas.length === thereDatas.length) {
        return HttpResponse.badRequest(res, "Acabaram as tentativas!");
      }

      if (dataYear !== answer.year) {
        const queryYears = originalDatas.map((e) => e.year);
        const allYears = thereDatas.map((e) => e.year);
        const newData = originalDatas.map((e) => {
          const { year, id, hint, data } = e;
          return {
            year,
            id,
            hint,
            data,
          };
        });
        //
        const filtredData = allYears.filter((e) => {
          const x = queryYears.find((el) => el === e);
          return dataYear > answer.year
            ? x !== e && e < dataYear
            : x !== e && e > dataYear;
        });
        const subDatas = filtredData.map((e) => {
          return Math.abs(e - dataYear);
        });

        const lessData = thereDatas.find((e) => {
          return (
            e.year === filtredData[subDatas.indexOf(Math.min(...subDatas))]
          );
        });
        const { year, id, hint, data } = lessData;
        newData.push({ year, id, hint, data });

        const dataDates = newData.map((e) => e.year);
        const orderFunc = (x, y) => {
          return parseInt(x) - parseInt(y);
        };
        const orderNewData = dataDates.sort(orderFunc);
        console.log(orderNewData);

        const rigthDatas = orderNewData.map((e) => {
          const findData = newData.find((el) => el.year === e);
          if (e === findData.year) {
            return findData;
          }
        });

        const calc = calcYear(...orderNewData);
        calc.map((e, i) => {
          rigthDatas[i].calcYear = e;
        });

        const responseYears = rigthDatas.map((e) => e.year);
        const indexResponse = responseYears.indexOf(answer.year);
        rigthDatas[indexResponse].answer = true;

        try {
          HttpResponse.ok(res, rigthDatas);
        } catch (error) {
          HttpResponse.badRequest(res, error.message);
        }
      } else if (dataYear === answer.year) {
        const rightDatas = datas.filter((e) => e.id).length + 1;
        userExist.pointsRoom += ((10 - rightDatas) / 10) * 100;
        try {
          const newPoints = await UsersRooms.update(
            {
              pointsRoom: userExist.pointsRoom,
            },
            {
              where: {
                room_id: roomIndex,
                user_id: userId,
              },
            }
          );
          return HttpResponse.ok(res, "CONGRATULATIONS!!");
        } catch (error) {
          return HttpResponse.badRequest(res, error.message);
        }
      }
    } catch (error) {
      return HttpResponse.badRequest(res, error.message);
    }
  },
};

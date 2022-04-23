import rankData from "./data.js";

export const getFundAllList = () => rankData.datas.map((item) => {
    const list = item.split(",");
    return {
        code: list[0],// 基金代码
        name: list[1],// 基金名称
        daily_growth: Number(list[6]),// 日增长
        nearly_week_1: Number(list[7]),
        nearly_month_1: Number(list[8]),
        nearly_month_3: Number(list[9]),
        nearly_month_6: Number(list[10]),
        nearly_year_1: Number(list[11]),
        nearly_year_2: Number(list[12]),
        nearly_year_3: Number(list[13]),
        this_year: Number(list[14]),
        all_year: Number(list[15]),
        custom_time: Number(list[18]),
        create_time: list[16],
        update_time: list[3],
    }
})
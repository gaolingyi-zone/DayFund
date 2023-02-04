//三年涨幅不存在
export const defaultFilter = (list) => list.filter((r) => r.nearly_year_3 !== 0); 

//债券: 一年涨幅大于3, 三年涨幅12-30之间
export const debentureFund = (list) => list.filter((r) => {
    const year_1 = r.nearly_year_1 > 3;
    const year_3 = r.nearly_year_3 > 12 && r.nearly_year_3 < 30;
    const condition = [year_1, year_3];
    return !condition.some((res) => !res);
});

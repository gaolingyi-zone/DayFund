export const defaultFilter = (list)=>{
    return list.filter((r) => {
        const year_3 = r.nearly_year_3 === 0; //三年涨幅大于0
        return !year_3
    })
}   


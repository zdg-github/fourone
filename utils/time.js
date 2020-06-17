// 放置工具方法
function getYearMonthDay(value){
    const year = value.getFullYear()
    const month = value.getMonth()
    const day = value.getDate()
    return {year,month,day}
}
function getDate(year,month,day){
    return new Date(year,month,day)
}
export {getYearMonthDay,getDate}
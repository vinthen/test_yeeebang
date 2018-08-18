/* ----- 將日期格式轉換為 2018年8月18日 ----- */
export const formateDate = (source) => {

    const dataArray = source.split(' ');
    const date = dataArray[0];
    const dateArray = date.split('-');

    return `${dateArray[0]}年${dateArray[1].replace(/^0+/, '')}月${dateArray[2].replace(/^0+/, '')}日`;

} // formateDate
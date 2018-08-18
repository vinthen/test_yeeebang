/* ----- 將日期格式轉換為 2018年8月18日 ----- */
export const formateDate = (source) => {

    const dataArray = source.split(' ');
    const date = dataArray[0];
    const dateArray = date.split('-');

    return `${dateArray[0]}年${dateArray[1].replace(/^0+/, '')}月${dateArray[2].replace(/^0+/, '')}日`;

} // formateDate

/* ----- 計算去掉空白後的字數 ----- */
export const characterCountCheck = (target,hintCount,hintQualified) => {

    // target: textarea
    // hintCount: 顯示目前字數
    // hintQualified: 顯示提示文字 (已符合贈送資格)

    // 去掉空白
    let originValue = target.value;
    let trimValue = originValue.replace(/\s+|　+/g,'');     

    // 計算字數
    let inputCount = trimValue.length;

    hintCount.textContent = inputCount;

        if(inputCount > 10){
            hintQualified.classList.add('show');
        } else {
            hintQualified.classList.remove('show');
        }

} // characterCountCheck
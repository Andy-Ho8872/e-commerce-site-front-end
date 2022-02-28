export default {
    data() {
        return {
            //* 驗證規則 
            rules: {
                required: value => !!value || '此欄位必填',
                numbersOnly: value => {
                    const pattern = /^[\d ]*$/
                    return pattern.test(value) || '電話號碼只能有數字。'
                },
                lettersOnly: value => {
                    const pattern = /^\D*$/
                    return pattern.test(value) || '名字不能包含數字。'
                },
                shouldContainOne: value => value.length > 0 || '請至少選擇一個選項',
                maxLetterLength: value => value.length <= 4 || '字串長度不可超過 4 ex: 0.005',
                maxLetterLength2: value => value.length <= 3 || '字串長度不可超過 3 ex: 4.55',
                maxValue: value => value <= 1 || '請依照範圍輸入: 0 ~ 1 ex: 1.00',
                minValue: value => value > 0  || '請依照範圍輸入: 0 ~ 1 ex: 0.45',
                maxValue2: value => value <= 5  || '請依照範圍輸入: 1 ~ 5 ex: 4.5',
                minValue2: value => value >= 1  || '請依照範圍輸入: 1 ~ 5 ex: 1.1',
            },
        }
    }
}
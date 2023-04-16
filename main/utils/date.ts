export function getChineseWeekDay(weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6 | number) {
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return weekDays[weekday]
}

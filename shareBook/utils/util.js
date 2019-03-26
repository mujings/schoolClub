var common = {
    /**
     * 获取明天后一周的日期（7月12日  ）
     * @returns {Array}
     */
    getWeek() {
        let week = [];
        for (let i = 0; i < 7; i++) {
            let Stamp = new Date();
            let num = 1 + i;
            Stamp.setDate(Stamp.getDate() + num);
            week[i] = (Stamp.getMonth() + 1) + '月' + Stamp.getDate() + '日';
        }
        return week;
    },

    /**
     * 获取明天后一周的日期 (周五 7月12日)
     * @returns {*|Array}
     */
    getOneWeek() {
        let week = common.getWeek(), date = new Date(),
            weekIndex = 1, secondDay = date.getDay() + 1;  //从明天开始
        if (secondDay == 7) {
            week[0] = "周" + "日一二三四五六".charAt(0) + ' ' + week[0];
        } else if (secondDay < 7) {
            week[0] = "周" + "日一二三四五六".charAt(secondDay) + ' ' + week[0];
        }
        for (let i = 1; i < 7; i++) {
            let nextDay = secondDay + i;
            if (nextDay == 7) {
                week[i] = "周" + "日一二三四五六".charAt(0) + ' ' + week[i];
            } else if (nextDay < 7) {
                week[i] = "周" + "日一二三四五六".charAt(nextDay) + ' ' + week[i];

            } else if (nextDay > 7) {
                week[i] = "周" + "日一二三四五六".charAt(weekIndex) + ' ' + week[i];
                weekIndex = weekIndex + 1;
            }
        }
        return week;
    },

    /**
     * 返回明天后一周的日期（2018-01-10...2018-01-16）
     * @returns {Array}
     */
    getWeekDate() {
        let week = [], monthDate = common.getWeek(), arr = [], d = new Date(), year = d.getFullYear();  //7月12日
        for (let i=0; i<monthDate.length; i++) {
            arr = monthDate[i].split('月');
            let month = parseInt(arr[0]), day = parseInt(arr[1].split('日')[0]);
            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;

            week[i] = year + '-' + month + '-' + day;
        }
        return week;
    },

    /**
     * 返回今天的日期
     * @returns {string}
     */
    getToday() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (date < 10) {
            date = '0' + date;
        }
        return year + '-' + month + '-' + date;
    },

    /**
     * 根据日期返回星期
     * @param date （2018-07-24）
     * @returns {string}  一，二，三。。六，日
     */
    dateToWeek(date) {
        var arys1 = new Array();
        arys1 = date.split('-');     //日期为输入日期，格式为 2013-3-10
        var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
        // var week1 = String(ssdate.getDay()).replace("0", "日").replace("1", "一").replace("2", "二").replace("3", "三").replace("4", "四").replace("5", "五").replace("6", "六")//就是你要的星期几
        var week1 = String(ssdate.getDay())//就是你要的星期几
        return week1;
    },

    /**
     * 日期相减，得到天数
     * @param date1 小日期
     * @param date2 大日期
     * @returns {Number}
     * @constructor
     */
    DateMinus(date1, date2) {
        var sdate = new Date(date1);
        var now = new Date(date2);
        var days = now.getTime() - sdate.getTime();
        var day = parseInt(days / (1000 * 60 * 60 * 24));
        return day;
    },

    /**
     * 计算 日期+ 天数
     * @param date 2018-07-23
     * @param days  3
     * @returns {string}  2018-07-26
     */
    addDate(date, days) {
        // if (days == undefined || days == '') {
        //     days = 1;
        // } else if(days == 0) {
        //     days = 0;
        // }
        var date = new Date(date);
        date.setDate(date.getDate() + days);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return date.getFullYear() + '-' + this.getFormatDate(month) + '-' + this.getFormatDate(day);
    },
    getFormatDate(arg) {
        if (arg == undefined || arg == '') {
            return '';
        }

        var re = arg + '';
        if (re.length < 2) {
            re = '0' + re;
        }

        return re;
    },

    /**
     * 比较两个日期字符串的大小 ('2015-10-10','2015-10-11')
     * @param date1
     * @param date2
     */
    compareDate(date1, date2) {
        var oDate1 = new Date(date1);
        var oDate2 = new Date(date2);

        if (oDate1.getTime() > oDate2.getTime()) {
            return 'lg'
        } else if (oDate1.getTime() < oDate2.getTime()){
            return 'm'
        } else if(oDate1.getTime() == oDate2.getTime()) {
            return 'eq'
        }
    },

    /**
     * 按照字母或某个字段过滤
     * @param data  需要处理的data
     * @param arrs  暂时存放的数组
     * @param map   数组中的每个对象
     * @returns {*} 返回处理结果
     */
    selectLetter(data, arrs, map) {
        let arr = data;
        for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];  //数组中的每一项数据

            if (!map[ai.initial]) {  //如果map 中没有某个字母
                arrs.push({
                    initial: ai.initial,
                    data: [ai]
                });
                map[ai.initial] = ai;  //字母分隔的那一项数据
            } else {
                for (var j = 0; j < arrs.length; j++) {
                    var dj = arrs[j];
                    if (ai.initial == dj.initial) {
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        return arrs;
    },

    //首页车辆问题，按区域划分：前后左右中
    selectArea(data, arrs, map) {
        let arr = data;
        for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];  //数组中的每一项数据

            if (!map[ai.area]) {  //如果map 中没有某个字母
                arrs.push({
                    area: ai.area,
                    data: [ai]
                });
                map[ai.area] = ai;  //字母分隔的那一项数据
            } else {
                for (var j = 0; j < arrs.length; j++) {
                    var dj = arrs[j];
                    if (ai.area == dj.area) {
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        return arrs;
    },
    //首页按照车辆问题区分：轮胎，漆面，玻璃。。。
    selectBlock(data, arrs, map) {
        let arr = data;
        for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];  //数组中的每一项数据

            if (!map[ai.block]) {  //如果map 中没有某个字母
                arrs.push({
                    block: ai.block,
                    data: [ai]
                });
                map[ai.block] = ai;  //字母分隔的那一项数据
            } else {
                for (var j = 0; j < arrs.length; j++) {
                    var dj = arrs[j];
                    if (ai.block == dj.block) {
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        return arrs;
    },

    /**
     * 过滤数组中的重复项
     * @param array  需要过滤的数组
     * @returns {Array}  返回过滤后的数据
     */
    arrFilter(array) {
        var arr = [];
        for (var i = 0; i < array.length; i++) {
            if (arr.indexOf(array[i]) == -1) {
                arr.push(array[i]);
            }
        }
        return arr;
    },

    /** js 浮点陷阱
     * parseFloat(1.4000000000000001.toPrecision(12)) === 1.4  // True
     * @param num
     * @param precision
     * @returns {number}
     */
    strip(num) {
        return +parseFloat(num.toPrecision(12));
    },

    /**
     * 时间戳转为yyyy-mm-dd hh:mm:ss, 传入参数为时间戳
     * @param timeStamp
     */
    timeStamp(timeStamp) {
        let date = new Date();
        date.setTime(timeStamp);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;

    },

}

export {
    common
}


export default {
    list: [{
            name: "签到",
            flow_step: 1,
            present: "清点到会场人数",
            router: "/home",
            src: require("../public/assets/image/icon @2x.png"),
            stempSrc: require("../public//assets//image/开始按钮@2x_n.png"),
            stempEndSrc: require("../public/assets/image/icon09.png"),
            stempSrcFlag: true,
            stempEndSrcFlag: false,
            status: "0"
        },
        {
            name: "九严禁",
            flow_step: 2,
            present: '重申 "九严禁" 严肃换届纪律',
            router: "/nineStrictness",
            src: require("../public/assets/image/icon @2x(1).png"),
            stempSrc: require("../public/assets/image/icon09.png"),
            stempEndSrc: require("../public/assets/image/icon09.png"),
            status: "0",
            stempSrcFlag: false,
            stempEndSrcFlag: false
        },
        {
            name: "宣布批复",
            flow_step: 3,
            present: "宣布正式候选人名单的批复",
            router: "/candidateApproval",
            src: require("../public/assets/image/icon @2x(2).png"),
            stempSrc: require("../public/assets/image/icon09.png"),
            stempEndSrc: require("../public/assets/image/icon09.png"),
            stempSrcFlag: false,
            stempEndSrcFlag: false,
            status: "0"
        },
        {
            name: "候选人介绍",
            flow_step: 4,
            present: "宣布正式候选人名单的批复",
            router: "/candidateIntroduction",
            src: require("../public/assets/image/icon @2x(3).png"),
            stempSrc: require("../public/assets/image/icon09.png"),
            stempEndSrc: require("../public/assets/image/icon09.png"),
            stempSrcFlag: false,
            stempEndSrcFlag: false,
            status: "0"
        },
        {
            name: "选举办法",
            flow_step: 5,
            present: "宣布正式候选人名单的批复",
            router: "/scrutellers",
            src: require("../public/assets/image/icon @2x(4).png"),
            stempSrc: require("../public/assets/image/icon09.png"),
            stempEndSrc: require("../public/assets/image/icon09.png"),
            stempSrcFlag: false,
            stempEndSrcFlag: false,
            status: "0"
        },
        {
            name: "监票人建议名单",
            flow_step: 6,
            present: "宣布正式候选人名单的批复",
            router: "/CheckList",
            src: require("../public/assets/image/icon @2x(5).png"),
            stempSrc: require("../public/assets/image/icon09.png"),
            stempEndSrc: require("../public/assets/image/icon09.png"),
            stempSrcFlag: false,
            stempEndSrcFlag: false,
            status: "0"
        },
        {
            name: "投票说明",
            flow_step: 7,
            present: "宣布正式候选人名单的批复",
            router: "/votingInstructions",
            src: require("../public/assets/image/icon @2x(6).png"),
            stempSrc: require("../public/assets/image/icon09.png"),
            stempEndSrc: require("../public/assets/image/icon09.png"),
            stempSrcFlag: false,
            stempEndSrcFlag: false,
            status: "0"
        },
        {
            name: "投票计票",
            flow_step: 8,
            present: "宣布正式候选人名单的批复",
            router: "/voteCount",
            src: require("../public/assets/image/icon @2x(7).png"),
            stempSrc: require("../public/assets/image/icon09.png"),
            stempEndSrc: require("../public/assets/image/icon09.png"),
            stempSrcFlag: false,
            stempEndSrcFlag: false,
            status: "0"
        },
        {
            name: "投票结果",
            flow_step: 9,
            present: "宣布正式候选人名单的批复",
            router: "/votingResults",
            src: require("../public/assets/image/icon @2x(8).png"),
            stempSrc: require("../public/assets/image/icon09.png"),
            stempEndSrc: require("../public/assets/image/icon09.png"),
            stempSrcFlag: false,
            stempEndSrcFlag: false,
            status: "0"
        },
        {
            name: "表态发言",
            flow_step: 10,
            present: "宣布正式候选人名单的批复",
            router: "/Statement",
            src: require("../public/assets/image/icon @2x(9).png"),
            stempSrc: require("../public/assets/image/icon09.png"),
            stempEndSrc: require("../public/assets/image/icon09.png"),
            stempSrcFlag: false,
            stempEndSrcFlag: false,
            status: "0"
        }
    ],

    // 数组对象排序
    scort(property) {

        return function (obj1, obj2) {
            var value1 = obj1[property];
            var value2 = obj2[property];
            return value2 - value1; // 升序
        }

    },

    // 时间格式化

    dateFormate(date) {
        let Y = date.getFullYear();
        let M = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        let D = (date.getDate() > 9 ? (date.getDate()) : '0' + (date.getDate()));
        let h = (date.getHours()) > 9 ? (date.getHours()) : '0' + (date.getHours());
        let m = (date.getMinutes()) > 9 ? (date.getMinutes()) : '0' + (date.getMinutes());
        let s = (date.getSeconds()) > 9 ? (date.getSeconds()) : '0' + (date.getSeconds());
        let str = {
            Y: Y,
            M: M,
            D: D,
            h: h,
            m: m,
            s: s

        };
        return str
    },



}
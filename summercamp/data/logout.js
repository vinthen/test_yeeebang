var screviews = {
  sc_id: 528,
  counts: 3,
  average: 3.2999999999999998,
  stars: [0, 1, 0, 2, 0],
  myreview: null,
  list: [
    {
      id: 35,
      user_id: 1,
      summercamp_id: 528,
      tutorcenter_id: 5,
      organization_id: 50121,
      season: 20182,
      scores: 4,
      review: "nice summercamp 2",
      created_at: "2018-08-18 09:37:11",
      updated_at: "2018-08-18 09:37:11",
      name: "Jackson Huang",
      avatar:
        "https://graph.facebook.com/v2.10/10213655718801538/picture?type=normal"
    },
    {
      id: 22,
      user_id: 1761,
      summercamp_id: 528,
      tutorcenter_id: 5,
      organization_id: 50121,
      season: 20182,
      scores: 2,
      review: "\u7de8\u8f2f\u8a55\u8ad6\u6e2c\u8a66 12345",
      created_at: "2018-08-18 04:47:12",
      updated_at: "2018-08-18 13:31:45",
      name: "Lucita Sky",
      avatar:
        "https://graph.facebook.com/v2.10/2304904296192523/picture?type=normal"
    },
    {
      id: 1,
      user_id: 1,
      summercamp_id: 528,
      tutorcenter_id: 5,
      organization_id: 50121,
      season: 20182,
      scores: 4,
      review: "\u9019\u500b\u590f\u4ee4\u71df\u771f\u7684\u5f88\u68d2\uff01!",
      created_at: "2018-08-09 14:46:44",
      updated_at: "2018-08-18 08:57:02",
      name: "Jackson Huang",
      avatar:
        "https://graph.facebook.com/v2.10/10213655718801538/picture?type=normal"
    }
  ]
};
// console.log("screviews:");
// console.log(screviews);
var userinfo = null;
// console.log("userinfo:");
// console.log(userinfo);
var logingroup = {
  "0": [
    "https://devlp.yeeebang.com/auth/facebook/grp_general",
    "https://devlp.yeeebang.com/auth/google/grp_general"
  ],
  "1": [
    "https://devlp.yeeebang.com/auth/facebook/grp_tcmgr",
    "https://devlp.yeeebang.com/auth/google/grp_tcmgr"
  ],
  logout: "https://devlp.yeeebang.com/logout"
};
// console.log("logingroup:");
// console.log(logingroup);

// 測試用
// var userLogin = true;
var campName = "表演工作坊說唱藝術夏令營";
// 測試用

// $.ajaxSetup({
//   headers: {
//     "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
//   }
// });

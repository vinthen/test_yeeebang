var screviews = {
  sc_id: 528, // 夏令營 ID
  counts: 5,
  average: 4.5999999999999996,
  stars: [0, 0, 0, 2, 3],
  myreview: {
    id: 10,
    user_id: 1,
    summercamp_id: 528,
    tutorcenter_id: 5,
    organization_id: 50121,
    season: 20182,
    scores: 4,
    review: "灣落此腦保品保多使滿為轉變急信有育過四北友父不多天中，公專新景異比言自；難而用又苦的己能，化讀來突活客生才廣人去於義成以近大人體學手就破車子法不應除；整化適需。治的不出金夜！世投全已市在而傳環他照間包見在突人地開夜校子上生車真人道境，坐原能臺的列看現表器度養成動完。",
    created_at: "2018-08-17 22:42:09",
    updated_at: "2018-08-17 22:42:09",
    name: "Vinthen Kuan",
    avatar:
      "https://graph.facebook.com/v2.10/1989733554375496/picture?type=normal"
  },
  list: [
    {
      id: 10,
      user_id: 1,
      summercamp_id: 528,
      tutorcenter_id: 5,
      organization_id: 50121,
      season: 20182,
      scores: 4,
      review: "nice summercamp 2",
      created_at: "2018-08-17 22:42:09",
      updated_at: "2018-08-17 22:42:09",
      name: "Jackson Huang",
      avatar:
        "https://graph.facebook.com/v2.10/10213655718801538/picture?type=normal"
    },
    {
      id: 8,
      user_id: 1,
      summercamp_id: 528,
      tutorcenter_id: 5,
      organization_id: 50121,
      season: 20182,
      scores: 5,
      review: "nice summercamp",
      created_at: "2018-08-17 22:21:22",
      updated_at: "2018-08-17 22:21:22",
      name: "Jackson Huang",
      avatar:
        "https://graph.facebook.com/v2.10/10213655718801538/picture?type=normal"
    },
    {
      id: 5,
      user_id: 1,
      summercamp_id: 528,
      tutorcenter_id: 5,
      organization_id: 50121,
      season: 20182,
      scores: 5,
      review: "nice summercamp",
      created_at: "2018-08-17 17:10:48",
      updated_at: "2018-08-17 17:10:48",
      name: "Jackson Huang",
      avatar:
        "https://graph.facebook.com/v2.10/10213655718801538/picture?type=normal"
    },
    {
      id: 2,
      user_id: 1,
      summercamp_id: 528,
      tutorcenter_id: 5,
      organization_id: 50121,
      season: 20182,
      scores: 5,
      review:
        "\u7b2c\u4e8c\u6b21\u53c3\u52a0\uff0c\u9084\u662f\u89ba\u5f97\u5f88\u68d2\uff01",
      created_at: "2018-08-09 14:47:51",
      updated_at: "2018-08-09 14:47:51",
      name: "Jackson Huang",
      avatar:
        "https://graph.facebook.com/v2.10/10213655718801538/picture?type=normal"
    },
    {
      id: 1,
      user_id: 1,
      summercamp_id: 528,
      tutorcenter_id: 5,
      organization_id: 50121,
      season: 20182,
      scores: 4,
      review: "\u9019\u500b\u590f\u4ee4\u71df\u771f\u7684\u5f88\u68d2\uff01",
      created_at: "2018-08-09 14:46:44",
      updated_at: "2018-08-09 14:46:44",
      name: "Jackson Huang",
      avatar:
        "https://graph.facebook.com/v2.10/10213655718801538/picture?type=normal"
    }
  ]
};

var userinfo = {
  id: 11,
  name: "Vinthen Kuan",
  avatar:
    "https://graph.facebook.com/v2.10/1989733554375496/picture?type=normal",
  logingroup: 1
};

// 未登入的話
// userinfo = null
// screviews.myreview = null;

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


// 測試用
// var userLogin = true;
var campName = "表演工作坊說唱藝術夏令營";
// 測試用

// $.ajaxSetup({
//   headers: {
//     "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
//   }
// });

/* --------- Create ---------- */
/*
$( "#screview_create" ).click(function() {
	console.log( "screview_create ready!" );
	$.ajax({
        type: "POST",
        url: '/summercamp/screview',
        data:{
        	sc_id: screviews['sc_id'],
            crud: 'c',
            scores: 5,
            review: 'nice summercamp',
        },           
        success: function(result) {
            console.log(result);
        },
        error: function(result) {
            console.log(result);
        }
    });
});
*/

/* AJAX 
**** Input data:
    sc_id: summercamp id, get form screviews['sc_id']
    crud: operation, allowed operation is 'c' 'r' 'u' 'd'
    scores: rating score
    reivew: rating description


**** return result:
ajaxcode: 0 - OK,  <0 - Error Code
msg: some useful debug message
data: return data
inputdata: same as AJAX request 'data' field
*/
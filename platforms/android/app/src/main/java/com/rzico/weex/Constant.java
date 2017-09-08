package com.rzico.weex;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by shiweiwei on 2015/11/2.
 * http://helper.tiaohuo.com
 * http://www.ruishangquan.com/
 * http://192.168.0.63:8080/tiaohuo/
 */
public class Constant {
    public static String app = "com.rzico.weex";
    public static String uid;
    public static String xkey;
    public static int isVipTab = 1;

    //生产环境服务器地址
    public static final String SERVER = "http://zmai.rzico.com";

    //商品预览与文章预览地址
    public static final String SHARE_SERVER = "http://weixin.rzico.com";

    //测试环境服务器地址
//    public static final String SERVER = "http://dev.tiaohuo.com";

    public static final String helperUrl = SERVER + "/dmao/";
    // public static final String helperUrl = "http://192.168.1.188:8080/dmao/";


    //public static final String helperUrl = "http://192.168.1.42/dmao/";
    //public static final String helperUrl = "http://192.168.1.107/dmao/";
//    public static final String helperUrl = "http://192.168.1.46:8080/assistant/";
//    public static final String helperUrl = "http://192.168.1.89:8080/assistant/";
//    public static final String helperUrl = "http://192.168.1.40:8080/assistant/";
    //联调
    //public static final String helperUrl ="http://debug.tiaohuo.com/assistant/";
    //public static final String helperUrl ="http://192.168.1.216:8080/tiaohuo/";

    //    public static final String secretKey = "vst@2014-2020$$";
    //ERP接口
    public static final String erp = "http://120.26.93.109:82/";
    public static final String secretKey = "vst@2014-2020$$";
    public static final int COUNT = 20;
    public static final int START = 1;
    public static final int BANNER_COUNT = 5;


    public static List<String> roleArray = Arrays.asList("owner", "manager", "guide", "account", "cashier");
    public static List<String> roleName = Arrays.asList("店主", "店长", "导购", "财务", "收银");
    public static List<String> myRoleList = new ArrayList<>();

    public static final String UserName = "userName";
    public static final String NickName = "nickName";
    public static final String HeadIcon = "headImg";
    public static final String TenantName = "tenantName";
    public static final String NickNameReceive = "nickNameReceive";
    public static final String HeadIconReceive = "headIconReceive";
    public static final String REFRESH_MESSAGE = "refresh_message";//刷新消息
    public static boolean NOTIFICATION_CHAT = false;
    //public static boolean ISHOME = false;

    public static String RED_ID;
    public static int WEIXIN_AGREEMENT = 2;
    public static int WEIXIN_TOUFANG = 3;
    public static int WEIXIN_RED = 1;
    public static int WEIXIN_DEFAULT = -1;
    public static int WEIXIN_TYPE = WEIXIN_DEFAULT;

    public static double Bro = 0;
//    public static final String LECHANGE_APPID = "lc25aff8de7874493c";//乐橙appid0
//    public static final String LECHANGE_APPSECRET = "aa011c38875a459d8f790450b3ab5a";//乐橙appkey
//    public static final String LECHANGE_APPURL = "openapi.lechange.cn:443";//乐橙appurl
//    public static final String LECHANGE_HTTPURL = "https://openapi.lechange.cn:443/openapi/";//乐橙appurl

    public static int SALES_RANK = 1;
    public static int CATEGORY_RANK = 2;
    public static int GROSSRANKING = 3;
    public static int GROSSClassRANKING = 4;

    /**
     * 账单
     */
    public static Map<String, String> billType = new HashMap<String, String>() {
        {
            put("recharge", "充值");
            put("payment", "购物");
            put("withdraw", "提现");
            put("receipts", "货款");
            put("profit", "分润");
            put("rebate", "折扣");
            put("cashier", "收款");
            put("income", "其他收入");
            put("outcome", "其他支出");
            put("coupon", "红包收入");
            put("couponuse", "红包支出");
        }
    };

    /**
     * 消息类型
     */
    public static enum Type {
        /**
         * 订单提醒
         */
        order,
        /**
         * 账单提醒
         */
        account,
        /**
         * 系统公告
         */
        notice,
        /**
         * 系统消息
         */
        message,
        /**
         * 咨询回复
         */
        consultation,
        /**
         * 社交圈
         */
        contact,
        /**
         * 社交圈
         */
        article
    }

    //七天退换规则
    public static int isReturnSeven = 0;
    public static int isSecured = 0;
    /*打折模式*/
//    public static Map<String, Integer> promoptionsIcon = new HashMap<String, Integer>() {
//        {
//            put("buyfree", R.drawable.zeng);
//            put("discount", R.drawable.zhe);
//            put("mail", R.drawable.you);
//            put("coupon", R.drawable.quan);
//            put("activity", R.drawable.zhe);
//            put("points", R.drawable.quan);
//            put("seckill", R.drawable.zhe);
//        }
//    };

    public static final String TODAY = "今天";
    public static final String YESTERDAY = "昨天";
    public static final String SHAREDPREFERENCENAME = "sharedpreferenceName";
    public static final String USER_ID = "user_id";
    public static final String MEMBERTIME = "memberTime";
    //public static final String MOBILE = "mobile";
    //public static final String TENANTID = "tenantid";
    public static final String ISFRISTLOGIN = "isfristlogin";
    //public static final String HONGDIAN = "hongdian";
    public static final String HUIYUAN = "huiyuan";
    public static final String ZHONGMAI = "zhongmai";
    public static final String TONGXUNLU = "tongxunlu";
    public static final String WEIXIN = "weixin";
    public static final String KAIDIAN = "kaidian";
    public static final String HEHOUREN = "hehouren";
    public static final String COOKIE = "cooKie";


    //分享类型
    public static final String TENANT_COUPON = "tenantCoupon";//优惠券分享
    public static final String TENANT_BONUS = "tenantBonus";//红包分享
    public static final String MULTIPLE_COUPON = "multipleCoupon";//现金券分享
    public static final String ARTICLE = "article";//文章分享
    public static final String PRODUCT = "product";//商品分享

    //网络常用字符
    public static final String NETWPRK_SUCCESS = "success";//网络请求成功

}

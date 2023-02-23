export namespace Netease {
  type URI = string;
  type Tags = string;

  interface User {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    avatarUrl: URI;
    accountStatus: number;
    gender: number;
    city: number;
    birthday: number;
    userId: number;
    userType: number;
    nickname: string;
    signature: string;
    description: string;
    detailDescription: string;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: URI;
    authority: 0;
    mutual: boolean;
    expertTags: any;
    experts: any;
    djStatus: number;
    vipType: number;
    remarkName: any;
    authenticationTypes: number;
    avatarDetail: any;
    anchor: boolean;
    backgroundImgIdStr: string;
    avatarImgIdStr: string;
    avatarImgId_str: string;
  }

  interface Tracks {
    name: string;
    id: number;
    pst: number;
    t: number;
    ar: [
      {
        id: number;
        name: string;
        tns: any[];
        alias: any[];
      },
      {
        id: number;
        name: string;
        tns: any[];
        alias: any[];
      }
    ];
    alia: any[];
    pop: number;
    st: number;
    rt: "";
    fee: number;
    v: number;
    crbt: any;
    cf: "";
    al: {
      id: number;
      name: string;
      picUrl: URI;
      tns: any[];
      pic_str: string;
      pic: number;
    };
    dt: number;
    h: {
      br: number;
      fid: number;
      size: number;
      vd: number;
    };
    m: {
      br: number;
      fid: number;
      size: number;
      vd: number;
    };
    l: {
      br: number;
      fid: number;
      size: number;
      vd: number;
    };
    sq: {
      br: number;
      fid: number;
      size: number;
      vd: number;
    };
    hr: any;
    a: any;
    cd: string;
    no: number;
    rtUrl: any;
    ftype: number;
    rtUrls: [];
    djId: number;
    copyright: number;
    s_id: number;
    mark: number;
    originCoverType: number;
    originSongSimpleData: any;
    tagPicList: any;
    resourceState: boolean;
    version: number;
    songJumpInfo: any;
    entertainmentTags: any;
    single: number;
    noCopyrightRcmd: any;
    mst: number;
    cp: number;
    mv: number;
    rtype: number;
    rurl: any;
    publishTime: number;
  }

  export interface TrackIds {
    id: number;
    v: number;
    t: number;
    at: number;
    alg: any;
    uid: number;
    rcmdReason: string;
    sc: any;
    f: any;
    sr: any;
  }

  export interface PlaylistInfo {
    id: number;
    name: string;
    coverImgId: number;
    coverImgUrl: URI;
    coverImgId_str: string;
    adType: number;
    userId: number;
    createTime: number;
    status: number;
    opRecommend: boolean;
    highQuality: boolean;
    newImported: boolean;
    updateTime: number;
    trackCount: number;
    specialType: number;
    privacy: number;
    trackUpdateTime: number;
    commentThreadId: string;
    playCount: number;
    trackNumberUpdateTime: number;
    subscribedCount: number;
    cloudTrackCount: number;
    ordered: true;
    description: string;
    tags: Tags[];
    updateFrequency: string | any;
    backgroundCoverId: number;
    backgroundCoverUrl: string | any;
    titleImage: number;
    titleImageUrl: string | any;
    englishTitle: string | any;
    officialPlaylistType: string | any;
    copied: boolean;
    relateResType: string | any;
    subscribers: User[];
    subscribed: false;
    creator: User;
    tracks: Tracks[];
    videoIds: any;
    videos: any;
    trackIds: TrackIds[];
    bannedTrackIds: any;
    shareCount: number;
    commentCount: number;
    remixVideo: any;
    sharedUsers: any;
    historySharedUsers: any;
    gradeStatus: string;
    score: any;
    algTags: Tags[];
  }

  type EncodeType = "mp3" | string

  export interface SongUrl {
    id: number,
    url: URI,
    br: number,
    size: number,
    md5: string,
    code: number,
    expi: number,
    type: EncodeType,
    gain: number,
    peak: number,
    fee: number,
    uf: any,
    payed: number,
    flag: number,
    canExtend: false,
    freeTrialInfo: any,
    level: string,
    encodeType: EncodeType,
    freeTrialPrivilege: {
      resConsumable: false,
      userConsumable: false,
      listenType: any,
      cannotListenReason: any
    },
    freeTimeTrialPrivilege: {
      resConsumable: false,
      userConsumable: false,
      type: number,
      remainTime: number
    },
    urlSource: number,
    rightSource: number,
    podcastCtrp: any,
    effectTypes: any,
    time: number
  }

  enum SongDetailEnumT {
    COMMON = 0, //一般类型
    NO_PUBLIC = 1, /*通过云盘上传的音乐，网易云不存在公开对应
      如果没有权限将不可用，除了歌曲长度以外大部分信息都为null。
      可以通过 `/api/v1/playlist/manipulate/tracks` 接口添加到播放列表。
      如果添加到“我喜欢的音乐”，则仅自己可见，除了长度意外各种信息均为未知，且无法播放。
      如果添加到一般播放列表，虽然返回code 200，但是并没有效果。
      网页端打开会看到404画面。
      属于这种歌曲的例子: https://music.163.com/song/1345937107*/
    PUBLIC = 2 /*通过云盘上传的音乐，网易云存在公开对应
      如果没有权限则只能看到信息，但无法直接获取到文件。
      可以通过 `/api/v1/playlist/manipulate/tracks` 接口添加到播放列表。
      如果添加到“我喜欢的音乐”，则仅自己可见，且无法播放。
      如果添加到一般播放列表，则自己会看到显示“云盘文件”，且云盘会多出其对应的网易云公开歌曲。其他人看到的是其对应的网易云公开歌曲。
      网页端打开会看到404画面。
      属于这种歌曲的例子: https://music.163.com/song/435005015*/
  }
  
  enum SongDetailEnumFee {
    FREE = 0, //免费
    TWO_YUAN = 1, //2元购买单曲
    BUY_ALBUM = 4, //购买专辑
    LOW_FREE = 8 //低音质免费
  }
  
  enum SongDetailEnumOriginal {
  UNKNOWN = 0, //未知
  ORIGINAL = 1, //原曲
  COVER = 2 //翻唱
  }
  
  enum SongDetailEnumAlbum {
  ALBUM_OR_DJ = 0, //有专辑信息或者是DJ节目
  UNKNOWN = 1 //未知专辑
  }
  
  interface SongDetailArtist {
    id: number,
    name: string,
    tns: string[],
    alias: string[]
  }
  
  interface SongDetailAlbum {
    id: number,
    name: string,
    picUrl: URI,
    tns: string[],
    pic_str: string,
    pic: number
  }
  
  interface SongDetailQuality {
    br: number,
    fid: number,
    size: number,
    vd: number,
    sr: number
  }
  
  export interface SongDetail {
    name: string, //歌曲标题
    id: number, //歌曲ID
    pst: 0, //功能未知
    t: SongDetailEnumT,
    ar: SongDetailArtist[], //歌手列表
    alia: string[],
    //别名列表，第一个别名会被显示作副标题
    //例子: https://music.163.com/song/536623501
    pop: number,//小数，常取[0.0, 100.0]中离散的几个数值, 表示歌曲热度
    st: 0, //功能未知
    rt: string | null, // None、空白字串、或者类似`600902000007902089`的字符串，功能未知
    fee: SongDetailEnumFee
    v: number, //常为[1, ?]任意数字, 功能未知
    crbt: string | null, // None或字符串表示的十六进制，功能未知
    cf: String | null, //空白字串或者None，功能未知
    al: SongDetailAlbum, //专辑，如果是DJ节目(dj_type != 0)或者无专辑信息(single == 1)，则专辑id为0
    dt: number, //功能未知
    h: SongDetailQuality | null, //高质量文件信息
    m: SongDetailQuality | null, //中质量文件信息
    l: SongDetailQuality | null, //低质量文件信息
    a: unknown | null, //常为None, 功能未知
    cd: String | null, //None或如"04", "1/2", "3", "null"的字符串，表示歌曲属于专辑中第几张CD，对应音频文件的Tag
    no: number, //表示歌曲属于CD中第几曲，0表示没有这个字段，对应音频文件的Tag
    rtUrl: string | null, //常为None, 功能未知
    rtUrls: string[] | null, //常为空列表, 功能未知
    dj_id: number, /*0: 不是DJ节目
                  其他：是DJ节目，表示DJ ID*/
    copyright: number, //0, 1, 2: 功能未知
    s_id: number, //对于t == 2的歌曲，表示匹配到的公开版本歌曲ID
    mark: number, //功能未知
    originCoverType: SongDetailEnumOriginal
    originSongSimpleData: unknown | null, //对于翻唱曲，可选提供原曲简单格式的信息
    single: SongDetailEnumAlbum,
    noCopyrightRcmd: unknown | null, //None表示可以播，非空表示无版权
    mv: number, //非零表示有MV ID
    rtype: 0 //常为0，功能未知
    rurl: string[] | null, //常为None，功能未知
    mst: number, //偶尔为0, 常为9，功能未知
    cp: number, //功能未知
    publish_time: number, //毫秒为单位的Unix时间戳
  }

  export interface SongUrlResponse {
    data: SongUrl[],
    code: number
  }

  export interface SongDetailResponse {
    songs: SongDetail[],
    code: number,
    privileges: unknown[]
  }
}
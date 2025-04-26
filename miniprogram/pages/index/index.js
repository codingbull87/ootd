// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    gender: 'male', // 默认性别为男性
    selectedStyle: '日系潮流风', // 默认选中的风格
    showPopup: false, // 是否显示弹出层
    
    // 天气信息
    weatherData: {
      city: '北京',
      date: '10月15日 周五',
      temperature: '21°C',
      condition: '晴朗',
      humidity: '45%',
      windSpeed: '3km/h',
      uvIndex: '中等',
      sunrise: '06:30',
      sunset: '18:15'
    },
    
    // 天气预报
    forecast: [
      { day: '今天', icon: '☀️', temp: '21°C' },
      { day: '周六', icon: '⛅', temp: '19°C' },
      { day: '周日', icon: '☁️', temp: '17°C' },
      { day: '周一', icon: '🌧️', temp: '15°C' },
      { day: '周二', icon: '⛅', temp: '18°C' }
    ]
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  // 生命周期函数-监听页面加载
  onLoad() {
    // 从本地存储获取用户性别
    const gender = wx.getStorageSync('userGender') || 'male';
    // 从本地存储获取选中的风格
    const selectedStyle = wx.getStorageSync('selectedStyle') || this.data.selectedStyle;
    
    this.setData({
      gender,
      selectedStyle
    });
    
    // 获取定位和天气信息（这里只是模拟，实际开发需要调用API）
    this.getLocationAndWeather();
  },
  
  // 获取位置和天气信息
  getLocationAndWeather() {
    // 实际开发中，这里应该调用微信的定位API和天气API
    // 这里只是模拟数据
    console.log('获取位置和天气信息');
  },
  
  // 选择风格
  selectStyle(e) {
    const style = e.currentTarget.dataset.style;
    this.setData({
      selectedStyle: style
    });
    
    // 存储选中的风格到本地
    wx.setStorageSync('selectedStyle', style);
  },
  
  // 切换性别
  switchGender(gender) {
    this.setData({
      gender
    });
    
    // 存储性别到本地
    wx.setStorageSync('userGender', gender);
  },
  
  // 生成OOTD
  generateOotd() {
    this.setData({
      showPopup: true
    });
  },
  
  // 关闭弹出层
  closePopup() {
    this.setData({
      showPopup: false
    });
  },
  
  // 导航到个人页面
  navigateToProfile() {
    wx.navigateTo({
      url: '../profile/profile'
    });
  }
})

// profile.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    defaultAvatarUrl: defaultAvatarUrl,
    isProfileCompleted: false,
    selectedCity: '北京',
    selectedGender: 'male',
    userDescription: '',
    descriptionLength: 0,
    
    userInfo: {
      nickName: '刘哲',
      avatarUrl: defaultAvatarUrl,
      city: '北京',
      gender: 'male',
      description: '潮流穿搭爱好者'
    },
    
    collections: [
      {
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        title: '日系潮流风夏日穿搭',
        date: '10月15日'
      },
      {
        image: 'https://images.unsplash.com/photo-1613591785690-970ce6ed5d94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        title: '韩系简约风格造型',
        date: '10月12日'
      }
    ]
  },
  
  onLoad() {
    // 检查是否已完成设置
    const isCompleted = wx.getStorageSync('userProfileCompleted');
    
    if (isCompleted) {
      // 从本地存储获取用户信息
      const city = wx.getStorageSync('userCity') || '北京';
      const gender = wx.getStorageSync('userGender') || 'male';
      const description = wx.getStorageSync('userDescription') || '潮流穿搭爱好者';
      const nickName = wx.getStorageSync('userNickName') || '刘哲';
      
      this.setData({
        isProfileCompleted: true,
        'userInfo.city': city,
        'userInfo.gender': gender,
        'userInfo.description': description,
        'userInfo.nickName': nickName
      });
    } else {
      // 默认选择项
      this.setData({
        isProfileCompleted: false,
        selectedCity: '北京',
        selectedGender: 'male'
      });
    }
  },
  
  // 城市输入
  onCityInput(e) {
    // 实际应用中可以根据输入实现城市搜索功能
    console.log('城市输入:', e.detail.value);
  },
  
  // 选择城市
  selectCity(e) {
    const city = e.currentTarget.dataset.city;
    this.setData({
      selectedCity: city
    });
  },
  
  // 选择性别
  selectGender(e) {
    const gender = e.currentTarget.dataset.gender;
    this.setData({
      selectedGender: gender
    });
  },
  
  // 个人描述输入
  onDescriptionInput(e) {
    const text = e.detail.value;
    const length = text.length;
    
    // 限制字数不超过100
    if (length <= 100) {
      this.setData({
        userDescription: text,
        descriptionLength: length
      });
    } else {
      this.setData({
        userDescription: text.substring(0, 100),
        descriptionLength: 100
      });
    }
  },
  
  // 完成设置
  completeSetup() {
    // 保存用户信息到本地存储
    wx.setStorageSync('userCity', this.data.selectedCity);
    wx.setStorageSync('userGender', this.data.selectedGender);
    wx.setStorageSync('userDescription', this.data.userDescription || '潮流穿搭爱好者');
    wx.setStorageSync('userProfileCompleted', true);
    
    // 更新页面状态
    this.setData({
      isProfileCompleted: true,
      'userInfo.city': this.data.selectedCity,
      'userInfo.gender': this.data.selectedGender,
      'userInfo.description': this.data.userDescription || '潮流穿搭爱好者'
    });
    
    // 提示用户
    wx.showToast({
      title: '设置完成',
      icon: 'success',
      duration: 2000
    });
  },
  
  // 编辑城市
  editCity() {
    wx.showActionSheet({
      itemList: ['北京', '上海', '广州', '深圳', '杭州', '成都'],
      success: (res) => {
        const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都'];
        const selectedCity = cities[res.tapIndex];
        
        this.setData({
          'userInfo.city': selectedCity
        });
        
        wx.setStorageSync('userCity', selectedCity);
      }
    });
  },
  
  // 切换性别
  switchGender() {
    const currentGender = this.data.userInfo.gender;
    const newGender = currentGender === 'male' ? 'female' : 'male';
    
    this.setData({
      'userInfo.gender': newGender
    });
    
    wx.setStorageSync('userGender', newGender);
  },
  
  // 编辑描述
  editDescription() {
    wx.showModal({
      title: '编辑个人描述',
      content: '描述一下你的穿衣风格喜好、身材特点等',
      editable: true,
      placeholderText: '输入描述',
      success: (res) => {
        if (res.confirm && res.content) {
          this.setData({
            'userInfo.description': res.content
          });
          
          wx.setStorageSync('userDescription', res.content);
        }
      }
    });
  },
  
  // 查看所有收藏
  viewAllCollections() {
    wx.showToast({
      title: '暂无更多收藏',
      icon: 'none'
    });
  },
  
  // 查看历史记录
  viewHistory() {
    wx.showToast({
      title: '暂无历史记录',
      icon: 'none'
    });
  },
  
  // 分享给好友
  shareToFriends() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  
  // 评价我们
  rateUs() {
    wx.showToast({
      title: '感谢您的支持',
      icon: 'success'
    });
  },
  
  // 帮助与反馈
  getHelp() {
    wx.showModal({
      title: '帮助与反馈',
      content: '如有问题或建议，请联系我们：support@ootd.com',
      showCancel: false
    });
  },
  
  // 导航到首页
  navigateToIndex() {
    wx.navigateTo({
      url: '../index/index'
    });
  }
}) 
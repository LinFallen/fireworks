(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  // 使用 lunar-javascript 库计算农历新年日期
  const Lunar = window.Lunar;

  function getNextLunarNewYearDate() {
    const now = new Date();
    
    // 获取当前年份的农历正月初一
    const currentYear = now.getFullYear();
    const currentLunarNewYear = Lunar.fromYmd(currentYear, 1, 1);
    
    // 转换为公历日期（中国时区UTC+8）
    const solarDate = currentLunarNewYear.getSolar();
    
    // 正确构造中国时区日期对象
    const springFestival = new Date(
        solarDate.getYear(),         // 年
        solarDate.getMonth() - 1,    // 月（JS月份从0开始）
        solarDate.getDay(),          // 日
        0, 0, 0                      // 00:00:00 中国时间
    );
    
    console.log('计算出的春节日期：', springFestival.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));

    // 如果今年春节已过，计算明年春节
    if (now > springFestival) {
        const nextLunarNewYear = Lunar.fromYmd(currentYear + 1, 1, 1).getSolar();
        return new Date(
            nextLunarNewYear.getYear(),
            nextLunarNewYear.getMonth() - 1,
            nextLunarNewYear.getDay(),
            0, 0, 0
        );
    }

    return springFestival;
}

  // 获取目标日期（农历新年）
  const lunarNewYearDate = getNextLunarNewYearDate();
  const countDown = lunarNewYearDate.getTime();

  // 倒计时更新函数
  const x = setInterval(function() {    
    const now = new Date().getTime();
    const distance = countDown - now;

    // 时间计算
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // 更新显示
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    // 倒计时结束处理
    if (distance < 0) {
      location.href = "fireworksimulator.html";
      document.getElementById("countdown").style.display = "none";
      document.getElementById("content").style.display = "block";
      clearInterval(x);
    }
  }, 1000); // 改为1秒更新一次
})();
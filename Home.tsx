/*
 * Home Page - Egypt Trip Itinerary (Luxury Mystery Edition)
 * Design Philosophy: Luxury Egyptian Mystery
 * - Deep black background with gold accents
 * - Mysterious, elegant lighting effects
 * - Sharp, refined corners and typography
 * - Complete flight information with times and durations
 */

import DayCard from "@/components/DayCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Plane, MapPin, Calendar } from "lucide-react";
import { itineraryData } from "@/data/itinerary";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Luxury dark with mysterious lighting */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background with multiple layers */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/20 to-background" />
          
          {/* Hero image with overlay */}
          <div className="absolute inset-0">
            <img 
              src="/images/hero-luxury-pyramid.png" 
              alt="Luxury Pyramid" 
              className="w-full h-full object-cover mix-blend-screen opacity-40"
            />
          </div>

          {/* Animated orbs */}
          <motion.div
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-block mb-6 px-6 py-2 bg-accent/20 border border-accent/50 rounded-full">
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">奢华之旅</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 drop-shadow-2xl leading-tight">
              西九龙厦门新年埃及行
            </h1>
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-foreground/80 font-light mb-4">
              穿越时空,探寻法老的永恒秘密
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-wrap sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <div className="bg-card/80 backdrop-blur-md rounded-lg px-4 sm:px-6 py-3 sm:py-4 shadow-xl border border-primary/30 flex items-center gap-3 w-full sm:w-auto">
              <Calendar className="w-5 h-5 text-accent flex-shrink-0" />
              <div className="text-left min-w-0">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">出发日期</div>
                <div className="font-semibold text-foreground text-sm sm:text-base">2026年2月11日</div>
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur-md rounded-lg px-4 sm:px-6 py-3 sm:py-4 shadow-xl border border-primary/30 flex items-center gap-3 w-full sm:w-auto">
              <Plane className="w-5 h-5 text-accent flex-shrink-0" />
              <div className="text-left min-w-0">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">行程天数</div>
                <div className="font-semibold text-foreground text-sm sm:text-base">9天8晚</div>
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur-md rounded-lg px-4 sm:px-6 py-3 sm:py-4 shadow-xl border border-primary/30 flex items-center gap-3 w-full sm:w-auto">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
              <div className="text-left min-w-0">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">目的地</div>
                <div className="font-semibold text-foreground text-sm sm:text-base">埃及</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg rounded-lg shadow-2xl"
            >
              开始探索行程
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Itinerary Section */}
      <section className="py-16 sm:py-20 px-6 bg-gradient-to-b from-background to-primary/5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container max-w-5xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground mb-12 sm:mb-16">
            完整行程安排
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {itineraryData.map((day: any, index: number) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <DayCard {...day} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Travel Tips Section */}
      <section className="py-16 sm:py-20 px-6 bg-gradient-to-b from-primary/5 to-background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container max-w-5xl mx-auto"
        >
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-2">
              出行准备清单
            </h2>
            <p className="text-center text-foreground/60 text-lg">
              为了确保您有最舒适的旅行体验,请提前准备以下物品
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-primary/20 mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
              📋 出行物品清单
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-accent mb-3 sm:mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <span>📋</span> 重要证件
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>护照及复印件</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>埃及签证(电子或贴纸)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>机票及酒店确认单</span>
                  </li>
                </ul>

                <h3 className="text-lg sm:text-xl font-semibold text-accent mb-3 sm:mb-4 mt-6 sm:mt-8 flex items-center gap-2 uppercase tracking-wide">
                  <span>👕</span> 衣物装备
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>轻便外套(早晚温差大)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>T恤、长裤、连衣裙</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>泳衣(赫尔嘎达必备)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>舒适的步行鞋和拖鞋</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-accent mb-3 sm:mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <span>☀️</span> 防晒用品
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>高倍数防晒霜(SPF 50+)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>太阳镜和遮阳帽</span>
                  </li>
                </ul>

                <h3 className="text-lg sm:text-xl font-semibold text-accent mb-3 sm:mb-4 mt-6 sm:mt-8 flex items-center gap-2 uppercase tracking-wide">
                  <span>🎒</span> 个人用品
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>常用药品(肠胃药、感冒药)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>洗漱用品</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>转换插头(欧标)和移动电源</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>25美元现金(落地签证费用)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>一次性牙刷、内裤、拖鞋</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>飞机枕头、耳塞、眼罩、口罩</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>褪黑素(调整时差)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>少量美元现金(用于小费)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 p-4 sm:p-6 bg-accent/20 rounded-lg border border-accent/30">
              <h3 className="text-lg sm:text-xl font-semibold text-accent mb-3 sm:mb-4 flex items-center gap-2 uppercase tracking-wide">
                <span>✨</span> 特别提示
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 flex-shrink-0">•</span>
                  <span><strong>导游服务:</strong> 除赫尔嘎达躺平日外,全程配备中文导游讲解历史并陪同</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 flex-shrink-0">•</span>
                  <span><strong>交通工具:</strong> 全程Toyota HIACE 8人豪华商务车,舒适宽敞,配备专业司机</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 flex-shrink-0">•</span>
                  <span><strong>气候:</strong> 2月埃及气候宜人,白天温暖(25-28°C),早晚较凉(15-18°C),注意增减衣物</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 flex-shrink-0">•</span>
                  <span><strong>心情:</strong> 最重要的是带上愉快的心情,期待这场穿越时空的奇妙之旅!</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Vehicle Section */}
      <section className="py-16 sm:py-20 px-6 bg-gradient-to-b from-background to-primary/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">豪华交通工具</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/images/toyota-hiace-luxury-8seater.png" 
                alt="Toyota HIACE Luxury Van" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-accent mb-4">Toyota HIACE 8人豪华商务车</h3>
              <p className="text-foreground/80 text-lg mb-4">
                为了确保您的舒适体验,我们为全程配备了全新的Toyota HIACE 8人豪华商务车。这不是普通的旅游车,而是专为高端旅游团队设计的豪华交通工具。
              </p>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="text-accent flex-shrink-0">✓</span>
                  <span>宽敞舒适的内部空间,每位乘客都有充足的活动空间</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent flex-shrink-0">✓</span>
                  <span>高级空调系统,即使在炎热的埃及也能保持舒适温度</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent flex-shrink-0">✓</span>
                  <span>专业司机,熟悉埃及道路,确保安全舒适的行程</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent flex-shrink-0">✓</span>
                  <span>现代化设施,配备USB充电口和娱乐系统</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>


      {/* Download PDF Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-primary/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">查看小汪刘准备的贴心小信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-accent to-primary rounded-lg p-8 shadow-2xl text-white border border-accent/50">
              <h3 className="text-2xl font-bold mb-4">行程小册子</h3>
              <p className="text-base mb-6 opacity-90">
                完整的行程安排、酒店信息、交通详情和出行提示,方便随时查阅
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="w-full text-lg px-6 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
                onClick={() => {
                  window.open('/pdfs/Egypt_Attractions_Guide.pdf', '_blank');
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                查看
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-8 shadow-2xl text-white border border-primary/50">
              <h3 className="text-2xl font-bold mb-4">景点导览指引</h3>
              <p className="text-base mb-6 opacity-90">
                专业导游小汪刘的深度景点解说,包含历史故事、观赏建议和合影地点
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="w-full text-lg px-6 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
                onClick={() => {
                  window.open('/pdfs/Egypt_Comprehensive_Guide.pdf', '_blank');
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                查看
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-primary/20 border-t border-primary/30">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-2xl font-semibold text-foreground mb-4">
            祝大家旅途愉快,新年快乐!
          </p>
          <p className="text-muted-foreground mb-4">
            西九龙厦门新年埃及行 · 2026年2月 · 奢华之旅
          </p>
          <p className="text-sm text-muted-foreground">
            行程导游: 小汪刘 | 全程中文导游讲解 | Toyota HIACE豪华商务车
          </p>
        </div>
      </footer>
    </div>
  );
}

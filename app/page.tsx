"use client";

import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Mail, 
  UserCheck, 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  TrendingUp, 
  Star,
  ArrowRight,
  GraduationCap,
  Play,
  Zap,
  Shield,
  Heart,
  Target,
  Lightbulb,
  Globe,
  Check,
  Sparkles,
  Laptop
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Counter({ from = 0, to, duration = 2 }: { from?: number; to: number; duration?: number }) {
  const count = useMotionValue(from);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return controls.stop;
  }, [to, duration, count]);

  return <span>{value}</span>;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="relative py-10 mb-5 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            {/* School Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/School_Logo.png"
                alt="Government High School Logo"
                width={80}
                height={80}
                className="rounded-full"
                priority
              />
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                GHS No.1 Hasilpur Mandi
              </h1>
              <p className="text-lg text-green-700 font-semibold">
                Quality Education for Every Student
              </p>
              
              <p className="text-base text-gray-700 max-w-2xl mx-auto">
                Providing free, quality education from Play Group to Class 10 with experienced faculty and modern facilities in a safe learning environment.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
              <Link href="/portal/student">
                <button className="bg-green-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student Portal
                </button>
              </Link>
              
              <Link href="/portal/faculty">
                <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Faculty Login
                </button>
              </Link>
            </div>
          </div>
        </div>

      </section>

  <section id="admissions" className="py-16 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="text-white">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 font-medium mb-6">
                <Laptop className="w-4 h-4 mr-2" />
                Digital Platform
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                Student Information System
              </h2>
              
              <p className="text-slate-300 text-lg mb-8">
                Access your academic records, attendance history, and performance analytics through our secure student portal.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: Calendar, title: "Attendance Records", desc: "Daily attendance tracking and history" },
                  { icon: TrendingUp, title: "Grade Reports", desc: "Subject-wise marks and progress" },
                  { icon: BookOpen, title: "Study Materials", desc: "Access notes and resources" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-slate-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/portal/student">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center gap-2">
                  Access Portal
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Visual Side */}
            <div className="relative">
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-semibold">Student Dashboard</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                {/* Mock Content */}
                <div className="space-y-4">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700 rounded-lg p-4">
                      <div className="text-slate-400 text-sm">Attendance</div>
                      <div className="text-white text-2xl font-bold">95%</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <div className="text-slate-400 text-sm">Average Grade</div>
                      <div className="text-white text-2xl font-bold">A-</div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="text-white font-medium mb-3">Recent Updates</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-300">Math test results posted</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-300">Attendance marked for today</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Live
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            >
              Our Achievements
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-700 max-w-2xl mx-auto font-medium"
            >
              Proud numbers that reflect our commitment to excellence in education
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, number: 2000, suffix: "+", label: "Students Enrolled", color: "text-green-600" },
              { icon: GraduationCap, number: 150, suffix: "+", label: "Qualified Faculty", color: "text-green-600" },
              { icon: Award, number: 98, suffix: "%", label: "Success Rate", color: "text-purple-600" },
              { icon: Star, number: 1, suffix: "", label: "Top Ranked School", color: "text-yellow-600" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6 group-hover:scale-110 transition-transform ${stat.color}`}>
                  <stat.icon size={32} />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                  <Counter to={stat.number} duration={2} />{stat.suffix}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Campus Life Gallery */}
  <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-4">
              <Users className="w-4 h-4 mr-2" />
              Campus Life
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Life at Our School
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the vibrant atmosphere of our campus where students learn, grow, and create lasting memories in a nurturing environment designed for excellence.
            </p>
          </div>

          {/* Featured Campus Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/image3.jpg"
                  alt="Main Campus Building"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-3">
                    <Award className="w-4 h-4 mr-2" />
                    Main Campus
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Modern Learning Spaces</h3>
                  <p className="text-white/90">State-of-the-art classrooms equipped with the latest technology</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative h-44 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="/image7.jpg"
                  alt="Science Laboratory"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold mb-1">Science Labs</h4>
                  <p className="text-sm text-white/90">Hands-on experiments</p>
                </div>
              </div>
              
              <div className="relative h-44 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="/image8.jpg"
                  alt="Library"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold mb-1">Digital Library</h4>
                  <p className="text-sm text-white/90">Vast collection of books</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Bento Grid Campus Gallery */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Campus Life Moments
            </h3>
            
            {/* Perfect Bento Grid - No Gaps, Full Coverage */}
            <div className="hidden lg:grid grid-cols-6 grid-rows-4 gap-2 h-[700px]">
              {/* Row 1 */}
              <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image2.jpg" alt="Sports Excellence" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-4">
                    <h4 className="text-xl font-bold mb-2">Sports Excellence</h4>
                    <p className="text-sm text-white/90">Athletic achievements and team spirit</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image3.jpg" alt="Modern Classrooms" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-2">
                    <h4 className="text-lg font-bold mb-1">Modern Classrooms</h4>
                    <p className="text-xs text-white/90">Smart learning spaces</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image4.jpg" alt="Cultural Events" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-2">
                    <h4 className="text-lg font-bold mb-1">Cultural Events</h4>
                    <p className="text-xs text-white/90">Student celebrations</p>
                  </div>
                </div>
              </div>

              <div className="col-span-2 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image7.jpg" alt="Science Labs" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-4">
                    <h4 className="text-xl font-bold mb-2">Science Labs</h4>
                    <p className="text-sm text-white/90">Hands-on experiments and discovery</p>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image8.jpg" alt="Digital Library" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-2">
                    <h4 className="text-lg font-bold mb-1">Digital Library</h4>
                    <p className="text-xs text-white/90">Knowledge center</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image9.jpg" alt="Study Groups" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-2">
                    <h4 className="text-lg font-bold mb-1">Study Groups</h4>
                    <p className="text-xs text-white/90">Collaborative learning</p>
                  </div>
                </div>
              </div>

              <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image10.png" alt="Art & Creativity" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-4">
                    <h4 className="text-2xl font-bold mb-3">Art & Creativity</h4>
                    <p className="text-base text-white/90">Creative expression and innovation</p>
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="col-span-2 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image11.png" alt="Campus Activities" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-4">
                    <h4 className="text-xl font-bold mb-2">Campus Activities</h4>
                    <p className="text-sm text-white/90">Daily school life and fun</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image12.jpg" alt="Student Achievements" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-2">
                    <h4 className="text-lg font-bold mb-1">Achievements</h4>
                    <p className="text-xs text-white/90">Student success stories</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image13.jpg" alt="Community" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-2">
                    <h4 className="text-lg font-bold mb-1">Community</h4>
                    <p className="text-xs text-white/90">School family bonds</p>
                  </div>
                </div>
              </div>

              {/* Row 4 */}
              <div className="col-span-3 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image14.png" alt="Learning Environment" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-4">
                    <h4 className="text-2xl font-bold mb-2">Learning Environment</h4>
                    <p className="text-lg text-white/90">Where knowledge meets opportunity</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Image src="/image15.png" alt="Future Ready" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-2">
                    <h4 className="text-lg font-bold mb-1">Future Ready</h4>
                    <p className="text-xs text-white/90">Preparing leaders</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet Grid */}
            <div className="hidden md:grid lg:hidden grid-cols-4 grid-rows-3 gap-1 h-[500px]">
              {[
                { img: "/image2.jpg", title: "Sports Excellence", desc: "Athletic achievements", span: "col-span-2 row-span-1" },
                { img: "/image3.jpg", title: "Modern Classrooms", desc: "Learning spaces", span: "col-span-1 row-span-2" },
                { img: "/image4.jpg", title: "Cultural Events", desc: "Student celebrations", span: "col-span-1 row-span-1" },
                { img: "/image7.jpg", title: "Science Labs", desc: "Hands-on experiments", span: "col-span-1 row-span-1" },
                { img: "/image8.jpg", title: "Digital Library", desc: "Knowledge center", span: "col-span-2 row-span-1" },
                { img: "/image9.jpg", title: "Study Groups", desc: "Collaborative learning", span: "col-span-1 row-span-1" },
                { img: "/image10.png", title: "Art & Creativity", desc: "Creative expression", span: "col-span-1 row-span-1" },
                { img: "/image11.png", title: "Campus Activities", desc: "Daily school life", span: "col-span-2 row-span-1" }
              ].map((item, i) => (
                <div key={i} className={`${item.span} group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer`}>
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="text-center text-white px-2">
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-xs text-white/90">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile Bento Grid - No Gaps */}
            <div className="md:hidden grid grid-cols-3 grid-rows-4 gap-1 h-[400px]">
              {/* Row 1 */}
              <div className="col-span-2 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <Image src="/image2.jpg" alt="Sports Excellence" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-2">
                    <h4 className="text-sm font-bold mb-1">Sports Excellence</h4>
                    <p className="text-xs text-white/90">Athletic achievements</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 row-span-2 group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <Image src="/image3.jpg" alt="Modern Classrooms" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-2">
                    <h4 className="text-sm font-bold mb-1">Classrooms</h4>
                    <p className="text-xs text-white/90">Learning spaces</p>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <Image src="/image4.jpg" alt="Cultural Events" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-1">
                    <h4 className="text-xs font-bold mb-1">Cultural Events</h4>
                  </div>
                </div>
              </div>

              <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <Image src="/image7.jpg" alt="Science Labs" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-1">
                    <h4 className="text-xs font-bold mb-1">Science Labs</h4>
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="col-span-2 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <Image src="/image8.jpg" alt="Digital Library" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-2">
                    <h4 className="text-sm font-bold mb-1">Digital Library</h4>
                    <p className="text-xs text-white/90">Knowledge center</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <Image src="/image9.jpg" alt="Study Groups" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-1">
                    <h4 className="text-xs font-bold mb-1">Study Groups</h4>
                  </div>
                </div>
              </div>

              {/* Row 4 */}
              <div className="col-span-3 row-span-1 group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <Image src="/image10.png" alt="Art & Creativity" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white px-2">
                    <h4 className="text-base font-bold mb-1">Art & Creativity</h4>
                    <p className="text-xs text-white/90">Creative expression and innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 justify-center">
                <Calendar className="w-5 h-5" />
                Schedule Campus Tour
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center">
                <Phone className="w-5 h-5" />
                Contact Admissions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Our School Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-green-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-800 font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Excellence in Every Aspect
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover what makes our institution the preferred choice for quality education, comprehensive development, and student success in the region.
            </p>
          </div>

          {/* Main Features with Enhanced Design */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                img: "/image7.jpg",
                title: "100% Free Education",
                subtitle: "No Financial Barriers",
                desc: "Complete education from Play Group to Class 10 with absolutely no fees. Books, uniforms, meals, and all educational materials provided free of cost.",
                icon: GraduationCap,
                color: "from-emerald-500 to-green-600",
                features: ["Free Books & Supplies", "Free Uniforms", "Free Nutritious Meals", "Zero Admission Fees"]
              },
              {
                img: "/image8.jpg", 
                title: "World-Class Facilities",
                subtitle: "Modern Infrastructure",
                desc: "State-of-the-art science laboratories, digital library with thousands of books, computer lab with latest technology, and well-maintained sports facilities.",
                icon: BookOpen,
                color: "from-green-500 to-emerald-600",
                features: ["Science Laboratories", "Digital Library", "Computer Lab", "Sports Complex"]
              },
              {
                img: "/image9.jpg",
                title: "Expert Faculty Team",
                subtitle: "Qualified & Dedicated",
                desc: "Highly qualified teachers with advanced degrees, government certification, and years of experience in modern teaching methodologies and student mentorship.",
                icon: Users,
                color: "from-purple-500 to-pink-600",
                features: ["M.Ed Qualified", "Govt Certified", "5+ Years Experience", "Continuous Training"]
              }
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-1">
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Icon Badge */}
                    <div className={`absolute top-4 left-4 p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium text-white/90 mb-1">{item.subtitle}</p>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-6">{item.desc}</p>
                    
                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                      {item.features.map((feature, idx) => (
                        <div key={feature} className="flex items-center gap-3">
                          <div className={`p-1 rounded-full bg-gradient-to-r ${item.color}`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Excellence Score</span>
                        <span className="font-bold text-gray-900">{95 + i}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${item.color}`} 
                          style={{ width: `${95 + i}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Benefits with Better Contrast */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Shield, title: "Safe & Secure Campus", desc: "24/7 CCTV monitoring and trained security", color: "bg-emerald-500", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
              { icon: Heart, title: "Student Wellbeing", desc: "Health services and counseling support", color: "bg-rose-500", bgColor: "bg-rose-50", borderColor: "border-rose-200" },
              { icon: Target, title: "Outstanding Results", desc: "98% pass rate with top district rankings", color: "bg-green-500", bgColor: "bg-green-50", borderColor: "border-green-200" },
              { icon: Globe, title: "Modern Curriculum", desc: "Updated syllabus with digital literacy", color: "bg-purple-500", bgColor: "bg-purple-50", borderColor: "border-purple-200" }
            ].map((item, i) => (
              <div key={i} className={`${item.bgColor} ${item.borderColor} border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group`}>
                <div className={`inline-flex items-center justify-center w-14 h-14 ${item.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Enhanced Call to Action */}
          </div>
      </section>

      {/* Enhanced Contact Section */}
  <section id="contact" className="relative py-24 bg-gradient-to-br from-green-800 via-emerald-800 to-green-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 font-medium mb-6">
              <Mail className="w-4 h-4 mr-2" />
              Contact Information
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join Our School?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our admissions team to learn more about enrollment, programs, and how we can help your child succeed.
            </p>
          </div>

          {/* Main Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Contact Details</h3>
                <div className="space-y-6">
                  {[
                    { 
                      icon: Phone, 
                      title: "Phone Number", 
                      info: "+92 300 1234567",
                      desc: "Call us during school hours for immediate assistance",
                      action: "Call Now"
                    },
                    { 
                      icon: Mail, 
                      title: "Email Address", 
                      info: "info@ghshasilpur.edu.pk",
                      desc: "Send us your questions and we'll respond within 24 hours", 
                      action: "Send Email"
                    },
                    { 
                      icon: UserCheck, 
                      title: "Visit Our Office", 
                      info: "GHS No.1 Hasilpur Mandi, Bahawalpur",
                      desc: "Monday - Saturday, 8:00 AM - 4:00 PM",
                      action: "Get Directions"
                    }
                  ].map((contact, i) => (
                    <div key={i} className="group">
                      <div className="flex items-start gap-4 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-green-500/50 transition-all duration-300">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                          <contact.icon className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white mb-1">{contact.title}</h4>
                          <p className="text-green-400 font-medium mb-2">{contact.info}</p>
                          <p className="text-slate-400 text-sm mb-3">{contact.desc}</p>
                          <button className="text-green-400 text-sm font-medium hover:text-green-300 transition-colors flex items-center gap-1">
                            {contact.action}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="+92 300 0000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                    <option>Admission Information</option>
                    <option>Academic Programs</option>
                    <option>School Fees</option>
                    <option>Campus Tour</option>
                    <option>Other Questions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Office Hours & Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mb-4">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Office Hours</h4>
              <p className="text-slate-400 text-sm">Monday - Saturday<br />8:00 AM - 4:00 PM</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mb-4">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Location</h4>
              <p className="text-slate-400 text-sm">Hasilpur Mandi<br />Bahawalpur, Punjab</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mb-4">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Response Time</h4>
              <p className="text-slate-400 text-sm">Within 24 hours<br />on business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Join Our School Family */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-700 font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Join Our Family
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Ready to Join Our School Family?
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              Take the next step in your child's educational journey. Join thousands of families who have chosen excellence, and watch your child thrive in our nurturing environment.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: GraduationCap,
                title: "Free Admission",
                desc: "No fees, no barriers to quality education"
              },
              {
                icon: Users,
                title: "Expert Faculty",
                desc: "Qualified teachers dedicated to your child's success"
              },
              {
                icon: Award,
                title: "Proven Results",
                desc: "98% success rate with top district rankings"
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-green-50 border border-green-100 rounded-2xl p-6 hover:bg-green-100 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                  <benefit.icon className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portal/student">
              <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                <GraduationCap className="w-5 h-5" />
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            
            <button className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call Now: +92 300 1234567
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-4">Trusted by over 2000+ families in our community</p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Top Ranked School</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Government Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">2000+ Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
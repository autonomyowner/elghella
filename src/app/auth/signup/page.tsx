'use client'

// Force fresh deployment - TypeScript fix
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext'
import { 
  Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, User, Phone, MapPin,
  Tractor, Shield, Users, Zap, CheckCircle, Star, UserCheck, 
  MessageCircle, Globe, Award, TrendingUp, Clock
} from 'lucide-react'

export default function SignupPage(): React.JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    location: '',
    userType: 'farmer' as 'farmer' | 'buyer',
    acceptTerms: false
  })
  const { signUp } = useSupabaseAuth();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      // Validate form data
      if (!formData.fullName || !formData.email || !formData.password) {
        setError('يرجى ملء جميع الحقول المطلوبة')
        return
      }

      if (!formData.acceptTerms) {
        setError('يرجى الموافقة على الشروط والأحكام')
        return
      }

      if (formData.password.length < 6) {
        setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
        return
      }

      // Sign up user
      const { data, error: signUpError } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        phone: formData.phone,
        location: formData.location,
        user_type: formData.userType
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (data?.user) {
        setMessage('تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب.')
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      }
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.')
      console.error('Signup error:', err)
    } finally {
      setLoading(false)
    }
  }

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('يرجى ملء جميع الحقول المطلوبة')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError('يرجى إدخال كلمة المرور وتأكيدها')
      return false
    }
    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة')
      return false
    }
    return true
  }

  const handleNextStep = () => {
    setError('')
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const { error: signUpError } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        phone: formData.phone,
        user_type: formData.userType
      })
      
      if (signUpError) {
        setError(signUpError.message)
        return
      }

      setMessage('تم إنشاء الحساب بنجاح! جاري تحويلك...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err) {
      console.error('Unexpected signup error:', err)
      setError('حدث خطأ غير متوقع')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      console.error('Unexpected Google signup error:', err)
      setError('حدث خطأ غير متوقع')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookSignup = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const { error } = await signInWithFacebook()
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      console.error('Unexpected Facebook signup error:', err)
      setError('حدث خطأ غير متوقع')
    } finally {
      setIsLoading(false)
    }
  }

  const userTypes = [
    {
      id: 'farmer',
      name: 'مزارع',
      description: 'أبيع المنتجات الزراعية والمعدات',
      icon: <Tractor className="w-8 h-8" />,
      color: 'green'
    },
    {
      id: 'buyer',
      name: 'مشتري',
      description: 'أشتري المنتجات والمعدات الزراعية',
      icon: <Users className="w-8 h-8" />,
      color: 'blue'
    },
    {
      id: 'both',
      name: 'مزارع وتاجر',
      description: 'أبيع وأشتري المنتجات والمعدات الزراعية',
      icon: <Award className="w-8 h-8" />,
      color: 'orange'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-green-500/25"
            >
              <UserCheck className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold text-white mb-2"
            >
              انضم إلى الغلة
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-400"
            >
              ابدأ رحلتك في عالم الزراعة الذكية
            </motion.p>
          </div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {message && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-400 text-sm">
                  {message}
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="أدخل اسمك الكامل"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">رقم الهاتف</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="+213 123 456 789"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">الموقع</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="الولاية، المدينة"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="كلمة مرور قوية"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* User Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">نوع المستخدم</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: 'farmer' })}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      formData.userType === 'farmer'
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <Tractor className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">مزارع</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: 'buyer' })}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      formData.userType === 'buyer'
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">مشتري</span>
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 text-green-600 bg-white/5 border-white/10 rounded focus:ring-green-500 focus:ring-2"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  أوافق على <span className="text-green-400 hover:underline cursor-pointer">شروط الاستخدام</span> و <span className="text-green-400 hover:underline cursor-pointer">سياسة الخصوصية</span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>جاري التسجيل...</span>
                  </>
                ) : (
                  <>
                    <span>إنشاء حساب</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-400">
                لديك حساب بالفعل؟{' '}
                <Link href="/auth/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                  تسجيل الدخول
                </Link>
              </p>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="text-center p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-white font-medium mb-1">آمن ومحمي</h3>
              <p className="text-gray-400 text-sm">بياناتك محمية بأعلى معايير الأمان</p>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-white font-medium mb-1">سريع وسهل</h3>
              <p className="text-gray-400 text-sm">واجهة بسيطة وسهلة الاستخدام</p>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <Star className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-white font-medium mb-1">مجتمع نشط</h3>
              <p className="text-gray-400 text-sm">انضم إلى آلاف المزارعين</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 
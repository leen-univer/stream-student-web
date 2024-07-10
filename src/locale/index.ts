import { CompleteDataType } from "./../types/courseCard.d";
import { Discount, Password } from "@mui/icons-material";
import { LanguageType } from "types";

//?  Navbar Section LANGUAGE
export const navbarMenu = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Register: "Register",
      Login: "Login",
      Tutor: "Tutor",
      Courses: "Courses",
      testYourKnowledge: "Test Your Knowledge",
      MyAccount: "My Account",
      placeholder: "Type Courses...",
    },
    ar: {
      MyAccount: "حسابي",
      Register: "يسجل",
      Login: "تسجيل الدخول",
      Tutor: "مدرس خاص",
      Courses: "الدورات",
      testYourKnowledge: "اختبر معلوماتك",
      placeholder: "اكتب الدورات ...",
    },
  };
  return CONTENT[lang];
};

//?  Hero Section LANGUAGE
export const heroContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      heroTitle: "Make Your Dream Career With",
      highlightedText: "Stream Student",
      heroDescription:
        "Learn and study your lessons from home by enrolling in various lessons.",
      testPageTitle: "Elevate Your Knowledge with Engaging Quizzes",
      testPagehighlightedText: "and Assessments",
      testPageDesc:
        "Challenge yourself with our thoughtfully crafted quizzes covering a wide range of topics. Reinforce your learning, identify areas for improvement, and enhance your understanding through interactive assessments.",
      testPageQuizSecTitle: "Now Test Your Knowledge!",
      testPageQuizSecDesc:
        "Choose a quiz below and dive into a rewarding learning experience. Test your comprehension, critical thinking, and problem-solving skills. Unleash your potential and discover new insights through our dynamic quizzes.",
    },
    ar: {
      heroTitle: "اجعل مهنة أحلامك مع",
      highlightedText: "تيار الطالب",
      heroDescription:
        "تعلم ودراسة دروسك من المنزل من خلال التسجيل في دروس مختلفة.",
      testPageTitle: "ارتقِ بمعرفتك من خلال اختبارات شيقة",
      testPagehighlightedText: "وتقييمات",
      testPageDesc:
        "تحد نفسك من خلال اختباراتنا المصممة بعناية تغطي مجموعة واسعة من المواضيع. قوِّي تعلُّمك، احدِد المجالات التي تحتاج للتحسِّن، وزِد فهمك من خلال تقييمات تفاعلية.",
      testPageQuizSecTitle: "الآن اختبر معرفتك!",
      testPageQuizSecDesc:
        "اختر اختبارًا أدناه وانغمس في تجربة تعلُّم مجزية. اختبر فهمك، ومهارات التفكير النقدي، ومهارات حل المشكلات. أطلِق إمكانياتك واكتشف رؤى جديدة من خلال اختباراتنا الديناميكية.",
    },
  };
  return CONTENT[lang];
};

//?  About Section LANGUAGE
export const aboutContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      FastPerformance: "Fast Performance",
      FastPerformanceDescription:
        "Optimized for a smaller build size, faster dev compilation and dozens of other improvements.",
      PerfectResponsive: "Perfect Responsive",
      PerfectResponsiveDescription:
        "Our platform is fully perfect for all devices. You can visit our platform all device easily.",
      FriendlySupport: "Fast & Friendly Support",
      FriendlySupportDescription:
        "We are provide 24 hours support for all clients.You can purchase without hesitation.",
      EasyToUse: "Easy to Use",
      EasyToUseDescription:
        "Our platform is very user friendly and anyone can access with ease",
    },
    ar: {
      FastPerformance: "أداء سريع",
      FastPerformanceDescription:
        "تم تحسينه لحجم البناء الأصغر ، وتجميع DEV أسرع وعشرات من التحسينات الأخرى.",
      PerfectResponsive: "استجابة مثالية",
      PerfectResponsiveDescription:
        "منصتنا مثالية تمامًا لجميع الأجهزة.يمكنك زيارة النظام الأساسي لدينا بسهولة.",
      FriendlySupport: "دعم سريع وودود",
      FriendlySupportDescription:
        "نحن نقدم دعم 24 ساعة لجميع العملاء. يمكنك الشراء دون تردد.",
      EasyToUse: "سهل الاستخدام",
      EasyToUseDescription:
        "نظامنا الأساسي سهل الاستخدام ويمكن لأي شخص الوصول بسهولة",
    },
  };
  return CONTENT[lang];
};

//?  Feature Section LANGUAGE
export const featureContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      oneForEducation: "ALL IN ONE FOR EDUCATION",
      layoutReady: "Layout Ready, Build Everything.",
      coursesLayout: "Courses Layout",
      HeaderLayout: "Header Layout",
      toolkit: "Complete Design toolkit",
      infiniteFlexible: "Infinitely Flexible",
    },
    ar: {
      oneForEducation: "الكل في واحد للتعليم",
      layoutReady: "تخطيط جاهز ، بناء كل شيء.",
      coursesLayout: "تخطيط الدورات",
      HeaderLayout: "تخطيط الرأس",
      toolkit: "مجموعة أدوات التصميم الكاملة",
      infiniteFlexible: "مرنة بلا حدود",
    },
  };
  return CONTENT[lang];
};

//?  Profile Section LANGUAGE
export const profileSectionContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      expertEducators: "Expert Educators",
      name_1: "Sarah Ali",
      title_1: "2nd grade primary",
      description_1: "I choose the product design track because I love solv...",
      name_2: "Murat Muhammad",
      title_2: "1st grade secondary",
      description_2: "I choose the product design track because I love solv...",
      name_3: "Ada khan",
      title_3: "1st grade primary",
      description_3: "I choose the product design track because I love solv...",
      name_4: "Sarkan Bolat",
      title_4: "1st grade primary",
      description_4: "I choose the product design track because I love solv...",
    },
    ar: {
      expertEducators: "معلمون خبراء",
      name_1: "ساره علي",
      title_1: "الصف الثاني الابتدائي",
      description_1: "اخترت مسار تصميم المنتج لأنني أحب سولف ...",
      name_2: "مرات محمد",
      title_2: "الصف الأول الثانوي",
      description_2: "اخترت مسار تصميم المنتج لأنني أحب سولف ...",
      name_3: "أدى خان",
      title_3: "الصف الأول الابتدائي",
      description_3: "اخترت مسار تصميم المنتج لأنني أحب سولف ...",
      name_4: "تعلق بولات",
      title_4: "الصف الأول الابتدائي",
      description_4: "اخترت مسار تصميم المنتج لأنني أحب سولف ...",
    },
  };
  return CONTENT[lang];
};

//?  Career Section LANGUAGE
export const careerContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      careerTitle: "Reserve your spot",
      careerDescription:
        "Learn with StreamStudent and start your career in reaching success and focus on honing your skills",
      GetStartedButton: "Get started",
    },
    ar: {
      careerTitle: "احجز مكانك",
      careerDescription:
        "تعلم مع Streamstudent وابدأ حياتك المهنية في الوصول إلى النجاح والتركيز على شحذ مهاراتك",
      GetStartedButton: "البدء",
    },
  };
  return CONTENT[lang];
};

//?  Lecture Section LANGUAGE
export const lectureContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      NewCourses: " New Courses",
      StartVideo: "Start Video",
      ViewCourse: "View Course",
    },
    ar: {
      NewCourses: " دورات جديدة",
      StartVideo: "ابدأ الفيديو",
      ViewCourse: "عرض الدورة",
    },
  };
  return CONTENT[lang];
};

//?  homepage form Section LANGUAGE
export const formContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      GetInTouch: "Get In Touch",
      EnterYourName: "Enter Your Name",
      EnterName: "Enter Name",
      EnterEmail: "Enter Email",
      Message: "Message",
      WriteMessage: "Write Message Here",
      SendMessage: "Send Message",
      nameRequired: "Name is required",
      minmum_3_letter: "Minimum 3 letter",
      emailRequired: "Email is required",
      InvalidEmailAddress: "Invalid Email Address",
      MessageRequired: "Message is required",
      Minimum_10_letter: "Minimum 10 letter",
      Maximum_250_letter: "Maximum 250 letter",
      Success: "Success",
      YourMessageHasBeenSentSuccessfully:
        "Your Message has been sent Successfully",
    },
    ar: {
      GetInTouch: "ابقى على تواصل",
      EnterYourName: "أدخل أسمك",
      EnterName: "أدخل الاسم",
      EnterEmail: "أدخل البريد الإلكتروني",
      Message: "رسالة",
      WriteMessage: "اكتب رسالة هنا",
      SendMessage: "أرسل رسالة",
      nameRequired: "مطلوب اسم",
      minmum_3_letter: "الحد الأدنى 3 أحرف",
      emailRequired: "البريد الالكتروني مطلوب",
      InvalidEmailAddress: "عنوان البريد الإلكتروني غير صالح",
      MessageRequired: "الرسالة مطلوبة",
      Minimum_10_letter: "الحد الأدنى 10 حرف",
      Maximum_250_letter: "أقصى 250 رسالة",
      Success: "نجاح",
      YourMessageHasBeenSentSuccessfully: "تم ارسال رسالتك بنجاح",
    },
  };
  return CONTENT[lang];
};

//?  footer Section LANGUAGE
export const footerContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      description:
        "Learn with StreamStudent and start your career in reaching success. Learn with StreamStudent and start your career in reaching success.",
      Category: "Category",
      Technology: "Technology",
      Business: "Business",
      Finance: "Finance",
      Journalism: "Journalism",
      Sports: "Sports",
      TopCourses: "Top Courses",
      Javascript: "Javascript",
      Python: "Python",
      Accounting: "Accounting",
      DigitalMarketing: "Digital Marketing",
      MachineLearning: "Machine Learning",
      Contacts: "Contacts",
      phone: "(+971) 6367690002",
      email: "Info@streamstudent.io",
      address: "Sharjah , UAE",
      copyright: "StreamStudent. All Rights Reserved.",
    },
    ar: {
      description:
        "تعلم مع Streamstudent وابدأ حياتك المهنية في الوصول إلى النجاح.تعلم مع Streamstudent وابدأ حياتك المهنية في الوصول إلى النجاح.",
      Category: "فئة",
      Technology: "تكنولوجيا",
      Business: "عمل",
      Finance: "تمويل",
      Journalism: "الصحافة",
      Sports: "رياضات",
      TopCourses: "الدورات العليا",
      Javascript: "جافا سكريبت",
      Python: "بيثون",
      Accounting: "محاسبة",
      DigitalMarketing: "التسويق الرقمي",
      MachineLearning: "و / مل",
      Contacts: "جهات الاتصال",
      phone: "(+971)6367690002",
      email: "Info@streamstudent.io",
      address: "الشارقة, الإمارات العربية المتحدة",
      copyright: "Streamstudent.كل الحقوق محفوظة.",
    },
  };
  return CONTENT[lang];
};

//?  register Section LANGUAGE
export const registerContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      CreateAccount: " Create an account",
      me: "I am a",
      tutor: "TUTOR",
      student: "STUDENT",
      YourName: "Your name",
      YourName_required: "Name is required!",
      email: "Email",
      email_required: "Email is required!",
      phone_number: "Phone Number",
      phone_number_required: "Number is required!",
      experience: "Years of Experience",
      experience_required: "This field is required!",
      experience_option_1: "0 yrs",
      experience_option_2: "1-5 yrs",
      experience_option_3: "6-10 yrs",
      experience_option_4: "10+ yrs",
      Expertise: "Expertise in Subject",
      Expertise_required: "This field is required!",
      password: "Password",
      password_required: "Password is required!",
      confirmPassword: "Confirm Password",
      PasswordLength: "Password must be 8 characters long",
      PasswordRequiresNumber: "Password requires a number",
      PasswordRequiresLowercase: "Password requires a lowercase letter",
      PasswordRequiresUppercase: "Password requires an uppercase letter",
      PasswordRequiresSymbol: "Password requires a symbol",
      confirmPassword_required: "Confirmed password is required!",
      SelectYourCountry: "Select Your Country",
      haveAnAccount: "Already have an account",
      login: "login",
      now: "now.",
      Register: "Register",
    },
    ar: {
      CreateAccount: " إنشاء حساب",
      me: "أنا",
      tutor: "مدرس خاص",
      student: "طالب",
      YourName: "اسمك",
      YourName_required: "مطلوب اسم!",
      email: "بريد إلكتروني",
      email_required: "البريد الالكتروني مطلوب!",
      phone_number: "رقم التليفون",
      phone_number_required: "الرقم مطلوب!",
      experience: "سنوات من الخبرة",
      experience_required: "هذه الخانة مطلوبه!",
      experience_option_1: "0 سنة",
      experience_option_2: "1-5 سنوات",
      experience_option_3: "6-10 سنوات",
      experience_option_4: "10+ سنوات",
      Expertise: "الخبرة في الموضوع",
      Expertise_required: "هذه الخانة مطلوبه!",
      password: "كلمة المرور",
      password_required: "كلمة المرور مطلوبة!",
      PasswordLength: "يجب أن يكون طول كلمة المرور 8 أحرف",
      PasswordRequiresNumber: "تتطلب كلمة المرور رقمًا",
      PasswordRequiresLowercase: "تتطلب كلمة المرور حرفًا صغيرًا",
      PasswordRequiresUppercase: "كلمة المرور تتطلب حرفًا كبيرًا",
      PasswordRequiresSymbol: "كلمة المرور تتطلب رمزًا",
      confirmPassword: "تأكيد كلمة المرور",
      confirmPassword_required: "كلمة المرور المؤكدة مطلوبة!",
      SelectYourCountry: "اختر بلدك",
      haveAnAccount: "هل لديك حساب",
      login: "تسجيل الدخول",
      now: "الآن.",
      Register: "يسجل",
    },
  };
  return CONTENT[lang];
};

//?  login Section LANGUAGE
export const loginContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Login: "Login",
      Description: "Hey enter your details to sign in to your account",
      LoginAs: "Login as",
      tutor: "TUTOR",
      student: "STUDENT",
      UserEmail: "User Email",
      Password: "Password",
      ForgotPassword: "Forgot Password?",
      AlreadyHavingAccount: "Don't have an account",
      register: "register",
      now: "now.",
      login: "Login",
      InvalidEmail: "Invalid Email",
      EmailRequired: "Email is required",
      PasswordLength: "Password must be at least 6 characters",
      passwordRequired: "Password is required",
    },
    ar: {
      Login: "تسجيل الدخول",
      Description: "مرحبًا ، أدخل بياناتك لتسجيل الدخول إلى حسابك",
      LoginAs: "سجل دخول",
      tutor: "مدرس خاص",
      student: "طالب",
      UserEmail: "البريد الالكتروني للمستخدم",
      Password: "كلمة المرور",
      ForgotPassword: "هل نسيت كلمة السر?",
      AlreadyHavingAccount: "ليس لديك حساب",
      register: "يسجل",
      now: "الآن.",
      login: "تسجيل الدخول",
      InvalidEmail: "بريد إلكتروني خاطئ",
      EmailRequired: "البريد الالكتروني مطلوب",
      PasswordLength: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
      passwordRequired: "كلمة المرور مطلوبة",
    },
  };
  return CONTENT[lang];
};

//?  forget password Section LANGUAGE
export const forgetPasswordContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      ForgetPassword: "Forget Password",
      Description:
        "Forgot your password! Don't worry. Just enter your email and we will send you with an One Time Password(OTP).",
      enterEmail: "Enter Your Email Address",
      validEmail: "Enter a valid Email",
      emailRequired: "Required!",
      submit: "SUBMIT",
      selectRole: "Select Role",
    },
    ar: {
      ForgetPassword: "ننسى كلمة المرور",
      Description:
        "نسيت كلمة السر!لا تقلق.ما عليك سوى إدخال بريدك الإلكتروني وسنرسل لك كلمة مرور لمرة واحدة (OTP).",
      enterEmail: "أدخل عنوان بريدك الالكتروني",
      validEmail: "أدخل بريد إلكتروني متاح",
      emailRequired: "مطلوب!",
      submit: "يُقدِّم",
      selectRole: "حدد الدور",
    },
  };
  return CONTENT[lang];
};

//?  reset password Section LANGUAGE
export const resetPasswordContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      ResetPassword: "Reset Password",
      enterOTP: "Enter OTP send to your registered email",
      CreatePassword: "Create Your Password",
      ConfirmYourPassword: "Confirm Your Password",
      password: "Password *",
      confirmPassword: "Confirm Password *",
      submit: "Submit",
      Required: "Required!",
      PasswordLength: "Password must be 8 characters long",
      requireNumber: "Password requires a number",
      requireLowercase: "Password requires a lowercase letter",
      requireUppercase: "Password requires an uppercase letter",
      requireSymbol: "Password requires a symbol",
    },
    ar: {
      ResetPassword: "إعادة تعيين كلمة المرور",
      enterOTP: "أدخل OTP إرسال إلى بريدك الإلكتروني المسجل",
      CreatePassword: "إنشاء كلمة مرورك",
      ConfirmYourPassword: "أكد رقمك السري",
      password: "كلمة المرور *",
      confirmPassword: "تأكيد كلمة المرور *",
      submit: "يُقدِّم",
      Required: "مطلوب!",
      PasswordLength: "يجب أن تكون كلمة المرور 8 أحرف طويلة",
      requireNumber: "تتطلب كلمة المرور رقمًا",
      requireLowercase: "تتطلب كلمة المرور حرفًا صغيرًا",
      requireUppercase: "كلمة المرور تتطلب حرفًا كبيرًا",
      requireSymbol: "كلمة المرور تتطلب رمزًا",
    },
  };
  return CONTENT[lang];
};

//?  tutors page LANGUAGE
export const tutorsContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      filters: "FILTERS",
      Categories: "Categories",
      Experience: "Experience",
      Price: "Price",
      Ratings: "Ratings",
      Above: "Above",
      years: "years",
      ratingsAbove: "& above",
      Above_10_: "Above 10 years",
      years_6_to_10: "6 to 10 years",
      years_1_to_5: "1 to 5 years",
      years_0_to_1: "0 to 1 years",
      PriceRange: "PRICE: ₹",
    },
    ar: {
      filters: "المرشحات",
      Categories: "فئات",
      Experience: "خبرة",
      Price: "سعر",
      Ratings: "تقييمات",
      Above: "فوق",
      years: "سنين",
      ratingsAbove: "& فوق",
      Above_10_: "فوق 10 سنين",
      years_6_to_10: "6 ل 10 سنين",
      years_1_to_5: "1 ل 5 سنين",
      years_0_to_1: "0 ل 1 سنين",
      PriceRange: "السعر: $",
    },
  };
  return CONTENT[lang];
};

//?  tutorID page LANGUAGE
export const tutorIdContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Expertise: "Expertise in",
      TechnicalSkills: "Technical Skills",
      Courses: "Courses",
    },
    ar: {
      Expertise: "خبرة ب",
      TechnicalSkills: "مهارات تقنية",
      Courses: "الدورات",
    },
  };
  return CONTENT[lang];
};

//?  courses page LANGUAGE
export const coursesContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      bundles: "Course Bundles",
      filters: "FILTERS",
      language: "Language",
      Categories: "Categories",
      subCategories: "All Sub Categories",
      Trending: "Trending",
      Ratings: "Ratings",
      ratingsAbove: "& above",
      NewArrival: "New arrival",
      MostPopular: "Most Popular",
    },
    ar: {
      bundles: "حزم الدورة",
      filters: "المرشحات",
      language: "لغة",
      Categories: "فئات",
      subCategories: "جميع الفئات الفرعية",
      Trending: "الشائع",
      Ratings: "تقييمات",
      ratingsAbove: "& فوق",
      NewArrival: "قادم جديد",
      MostPopular: "الأكثر شعبية",
    },
  };
  return CONTENT[lang];
};

//?  courseID page LANGUAGE
export const coursesIdContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      CourseContent: "Course Content",
      CourseProgress: "Course Progress",
      CourseIncludes: "This course includes",
      courseRating: "course rating",
      ratings: "ratings",
      GiveReview: "Give Review",
      BuyNow: "Buy Now",
      sale: "Sale!",
      off: "off",
      Pricing: "Pricing",
      lifetimeAccess: "Full lifetime access",
      AccessonmobileandTV: "Access on mobile and TV",
      completionCertificate: "Certificate of completion",
      BuythisCourse: "Buy this Course",
      AddToCart: "Add To Cart",
      CourseAuthor: "Course Author",
      Name: "Name",
      Experience: "Year of Experience",
      Email: "Email",
      AlreadyPurchased: "You have already purchased this Course",
      ViewMyCourses: "View My Courses",
    },
    ar: {
      CourseContent: "محتوى الدورة",
      CourseProgress: "تقدم الدورة",
      CourseIncludes: "تشمل هذه الدورة",
      courseRating: "تصنيف الدورة",
      ratings: "تقييمات",
      GiveReview: "إعطاء المراجعة",
      BuyNow: "اشتري الآن",
      sale: "أُوكَازيُون!",
      off: "عن",
      Pricing: "التسعير",
      lifetimeAccess: "الوصول الكامل مدى الحياة",
      AccessonmobileandTV: "الوصول على الهاتف المحمول والتلفزيون",
      completionCertificate: "شهادة إتمام",
      BuythisCourse: "شراء هذه الدورة",
      AddToCart: "أضف إلى السلة",
      CourseAuthor: "مؤلف الدورة",
      Name: "اسم",
      Experience: "سنة الخبرة",
      Email: "بريد إلكتروني",
      AlreadyPurchased: "لقد اشتريت هذه الدورة بالفعل",
      ViewMyCourses: "عرض دوراتي",
    },
  };
  return CONTENT[lang];
};

//?  reviewDialog page LANGUAGE
export const reviewDialogContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      GiveReview: "Give Review",
      Review: "Review",
      RequiredFieldsMarked: "Required fields are marked",
      YourRating: "Your rating",
      Submit: "Submit",
      YourReview: "Your Review",
      ReviewRequired: "Review Required",
      RatingRequired: "Rating is required",
    },
    ar: {
      GiveReview: "إعطاء المراجعة",
      Review: "مراجعة",
      RequiredFieldsMarked: "الحقول المطلوبة ماركيd",
      YourRating: "تقييمك",
      Submit: "يُقدِّم",
      YourReview: "مراجعتك",
      ReviewRequired: "المراجعة المطلوبة",
      RatingRequired: "التصنيف مطلوب",
    },
  };
  return CONTENT[lang];
};

//Tutor Main DashBoard
export const tutorMainDashboard = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      courseSold: "Total Courses Sold",
      top3PurchasedCourse: "Top 3 Purchased Courses",
      totalNumberOfCourse: "Total no. of Courses",
      totalNumberOfAssignment: "Total no. of Lessons",
      myCourses: "My Courses",
      myBundles: "My Bundles",
      submittedAssignmentG: "Submitted Assignments",
      allCourses: "Top 7 Purchased Course",
      noOfPurchasedCourse: "No. of Student Purchased",
      TotalEarnings: "Total Earnings",
      LiveClassEarnings: "Live Class Earnings",
      TotalCourseEarnings: "Total Course Earnings",
      nocoursesoldyet: "NO COURSE SOLD YET",
      classStatistics: "Class Statistics",
      TotalClass: "Total Classes",
      PaidClass: "Paid Classes",
      FreeClass: "Free Classes",
    },

    ar: {
      myBundles: "حزمتي",
      TotalClass: "مجموع الفصول",
      PaidClass: "دروس مدفوعة الأجر",
      FreeClass: "دروس مجانية",
      nocoursesoldyet: "لم يتم بيع أي دورة حتى الآن",
      classStatistics: "إحصائيات الطبقة",
      courseSold: "إجمالي الدورات المباعة",
      top3PurchasedCourse: "أعلى 3 دورات تم شراؤها",
      totalNumberOfCourse: "إجمالي لا.بالطبع",
      totalNumberOfAssignment: "المجموع لا. من الدروس",
      myCourses: "دوراتي",
      submittedAssignmentG: "المهام المقدمة",
      allCourses: "أعلى 7 دورات تم شراؤها",
      noOfPurchasedCourse: "عدد الطلاب الذين تم شراؤهم",
      TotalEarnings: "الأرباح الكلية",
      LiveClassEarnings: "أرباح الطبقة الحية",
      TotalCourseEarnings: "إجمالي أرباح الدورة",
    },
  };
  return CONTENT[lang];
};

// Tutor Course Dashboard
export const tutorCourseDashboard = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      courseStatus: "Top 5 Purchased Course Status",
      courseCompleted: "Course completion report of top 5 courses",
      completedCourse: "Students Who completed the course",
      notCompletedCourse: "Students Who haven't completed the course",
      videoWatched: "Student who watched videos",
      videoDoNotWatch: "Student who have't watched video",
    },
    ar: {
      courseStatus: "أعلى 5 حالة الدورة التدريبية التي تم شراؤها",
      courseCompleted: "تقرير إتمام الدورة لأفضل 5 دورات",
      videoWatched: "الطالب الذي شاهد مقاطع الفيديو",
      videoDoNotWatch: "الطالب الذي لم يشاهد الفيديو",
      completedCourse: "الطلاب الذين أكملوا الدورة",
      notCompletedCourse: "الطلاب الذين لم يكملوا الدورة",
    },
  };
  return CONTENT[lang];
};

// Add and View Course Page in Tutor Panel
export const tutorAddCoursePage = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Bundles: "Bundles",
      bundleName: "Bundle Name",
      bundleDescription: "Bundle Description",
      Adding: "Adding",
      selectLanguage: "Select Languages",
      selectCourses: "Select Courses",
      yourCourses: "YOUR COURSES",
      searchCourses: "Search Courses..",
      searchBundles: "Search Bundles..",
      filter: "Filter",
      totalLec: "Total Lectures",
      enrollStudents: "Enroll Students",
      price: "Price",
      duration: "Duration",
      addCourse: "Add Course",
      addBunlde: "Add Bundle",

      title: "Title",
      titlePlace: "Enter Title",
      titleSpan: "Title Required",

      courseName: "Course Name",
      courseNamePlace: "Enter Course Name",
      courseNameSpan: "Course Name Required",
      BundleNamePlace: "Enter Bundle Name",
      BundleNameSpan: "Bundle Name Required",
      description: "Description",
      descriptionPlace: "Enter Description",
      descriptionSpan: "Description Required",

      category: "Category",
      categorySpan: "Category Required",

      subCategory: "Subcategory",
      subCategorySapn: "Subcategory Required",

      mrpPrice: "Price",
      mrpPricePlace: "Enter Price",
      mrpPriceSpan: "Price Required",
      salePrice: "Sale Price",
      salePricePlace: "Enter Sale Price",
      salePriceSpan: "Sale Price Required",
      thumbnail: "Thumbnail",
      addcourseBtn: "ADD COURSE",
      courseFilter: "Course Filter",
      updateCourse: "Update Course",
      updateBundle: "Update Bundle",
      updateCourseBtn: "UPDATE COURSE",
      Updating: "Updating",

      Min3letter: "Minimum 3 Letters",
      Min5letter: "Minimum 5 Letters",
      Min10letter: "Minimum 10 Letters",
      Min1digit: "Minimum 1 Digit Number",
      Max100letter: "Maximum 100 Letters",
      ValuePositive: "Value must be positive",
      Salegreaterprice: "Sale Price must be less than or equal to Cost Price",
      thumbnailreq: "Thumbnail image is required",

      courseBundle: "Course Bundle",
      deleteBundle: "Delete Bundle",
      editBundle: "Edit Bundle",
      courses: "Courses",
      viewCourses: "View Courses",
      details: "Details",
      bundleCourses: "Bundle Courses",
      Addvideo: "Add Video",
      Adddocument: "Add Document",
      Addlink: "Add Link",
    },

    ar: {
      Min5letter: "الحد الأدنى 5 أحرف",
      Addvideo: "أضف فيديو",
      Adddocument: "إضافة مستند",
      Addlink: "إضافة رابط",
      editBundle: "تحرير الحزمة",
      courseBundle: "حزمة الدورة",
      deleteBundle: "حذف الحزمة",
      courses: "الدورات",
      viewCourses: "عرض الدورات",
      details: "تفاصيل",
      bundleCourses: "دورات الحزمة",
      thumbnailreq: "الصورة المصغرة مطلوبة",
      Min3letter: "الحد الأدنى 3 أحرف",
      Min10letter: "الحد الأدنى 10 رسائل",
      Min1digit: "الحد الأدنى رقم مكون من رقم واحد",
      Max100letter: "الحد الأقصى 100 حرف",
      ValuePositive: "يجب أن تكون القيمة موجبة",
      Salegreaterprice: "يجب أن يكون سعر البيع أقل من أو يساوي سعر التكلفة",
      Bundles: "حزم",
      bundleName: "اسم الحزمة",
      bundleDescription: "وصف الحزمة",
      Adding: "إضافة",
      selectLanguage: "حدد اللغات",
      selectCourses: "حدد الدورات",
      yourCourses: "دوراتك",
      searchCourses: "البحث في الدورات..",
      searchBundles: "بحث في الحزم..",
      filter: "منقي",
      totalLec: "إجمالي المحاضرات",
      enrollStudents: "تسجيل الطلاب",
      price: "سعر",
      duration: "مدة",

      title: "عنوان",
      titlePlace: "أدخل العنوان",
      titleSpan: "العنوان مطلوب",

      addCourse: "أضف الدورة",
      addBunlde: "أضف حزمة",

      courseName: "اسم الدورة التدريبية",
      courseNamePlace: "أدخل اسم الدورة",
      courseNameSpan: "اسم الدورة المطلوبة",
      BundleNamePlace: "أدخل اسم الحزمة",
      BundleNameSpan: "اسم الحزمة مطلوب",
      description: "وصف",
      descriptionPlace: "أدخل الوصف",
      descriptionSpan: "الوصف المطلوب",
      category: "فئة",
      categorySpan: "الفئة المطلوبة",
      subCategory: "تصنيف فرعي",
      subCategorySapn: "الفئة الفرعية المطلوبة",
      mrpPrice: "سعر",
      mrpPricePlace: "أدخل سعر",
      mrpPriceSpan: "سعر  مطلوب",
      salePrice: "سعر البيع",
      salePricePlace: "أدخل سعر البيع",
      salePriceSpan: "سعر البيع المطلوب",
      thumbnail: "ظفري",
      addcourseBtn: "أضف الدورة",
      courseFilter: "مرشح الدورة",
      updateCourse: "تحديث الدورة",
      updateBundle: "تحديث الحزمة",
      updateCourseBtn: "تحديث الدورة",
      Updating: "تحديث",
    },
  };
  return CONTENT[lang];
};

// course section page of tutor panel
export const courseSectionPage = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      studentAskedQuestion: "Students Asked Questions",
      ansnotprovided: "Answer is not provided yet.",
      enterQuestion: "Write the Question",
      AddExercise: "Add Question",
      updateQuestion: "Update Question",
      Information: "Share Your Info",
      InformationDesc:
        "Please provide your information before participating in the quiz.",
      name: "Name",
      email: "Email",
      nameSpan: "Name is Required",
      namePlace: "Enter Your Name",
      emailSpan: "Email is Required",
      emailPlace: "Enter Your Email",
      lec: "Lecture",
      addSection: "Add Lesson",
      topicName: "Lesson Name",
      topicNamePlace: "Enter Lesson Name",
      topicNameSpan: "Lesson Name required",
      description: "Description",
      descriptionPlace: "Description required",
      addSectionBtn: "ADD LESSON",
      updateSection: "Update Lesson",
      updateSectionBtn: "UPDATE LESSON",
      Adding: "Adding",
      Updating: "Updating",
      update: "Update",
      hour: "hr",
      minute: "min",
      AddFaq: "Add Faq",
      UpdateFaq: "Update Faq",
      question: "Question",
      addQuestions: "Ask Question",
      answer: "Answer",
      questionPlace: "Write Your Question",
      answerPlace: "Write The Answer",
      linkPlace: "Add the links",
      questionSpan: "Question Required",
      submit: "Submit",
      submitting: "Submitting",
      addLinks: "Links",
      Giveanswer: "Give Answer",
      UpdateAnswer: "Update Answer",
      preview: "Attached Document preview",
    },
    ar: {
      studentAskedQuestion: "أسئلة طلاب",
      ansnotprovided: "الإجابة لم يتم توفيرها بعد.",
      enterQuestion: "اكتب السؤال",
      AddExercise: "أضف سؤال",
      updateQuestion: "تحديث السؤال",
      Information: "شارك معلوماتك",
      InformationDesc:
        "يرجى تقديم المعلومات الخاصة بك قبل المشاركة في المسابقة.",
      name: "اسم",
      email: "بريد إلكتروني",
      nameSpan: "مطلوب اسم",
      namePlace: "أدخل أسمك",
      emailSpan: "البريد الالكتروني مطلوب",
      emailPlace: "أدخل بريدك الإلكتروني",
      Updating: "تحديث",
      update: "Update",
      Adding: "إضافة",
      lec: "محاضرة",
      addSection: "أضف الدرس",
      topicName: "اسم الدرس",
      topicNamePlace: "أدخل اسم الدرس",
      topicNameSpan: "اسم الدرس مطلوب",
      description: "وصف",
      descriptionPlace: "الوصف المطلوب",
      addSectionBtn: "إضافة درس",
      updateSection: "تحديث الدرس",
      updateSectionBtn: "تحديث الدرس",
      hour: "ساعات",
      minute: "دقائق",
      AddFaq: "أضف الأسئلة الشائعة",
      addQuestions: "اسأل سؤالا",
      question: "سؤال",
      answer: "إجابة",
      questionPlace: "اكتب سؤالك",
      answerPlace: "اكتب الاجابة",
      linkPlace: "أضف الروابط",
      questionSpan: "سؤال مطلوب",
      submit: "يُقدِّم",
      submitting: "Submitting",
      addLinks: "روابط",
      UpdateFaq: "تحديث الأسئلة الشائعة",
      Giveanswer: "إعطاء الجواب",
      UpdateAnswer: "تحديث الإجابة",
      preview: "معاينة الوثيقة المرفقة",
    },
  };
  return CONTENT[lang];
};

//lecture page of tutor panel
export const lectureSectionPage = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      addMcqAssessment: "Add MCQ Self-Assessment",
      submit: "Submit",
      submitting: "Submitting",
      answerExplanation: "Answer Explanation",
      answeExplainPlace: "Explain the Answer",
      hint: "Hint",
      HintPlace: "Write hint for the question",
      UpdateQuiz: "Update Quiz",
      minutes: "minutes",
      videoTime: "time",
      addStudyMaterials: "Add Study Material",
      createFinalTest: "Create Final Assignment",
      creating: "Creating",
      finalTestCreated: "Final Assignment Created",
      addAssignment: "Add Assignment",
      discriptionPlace: "Add Discription",
      discriptionTitle: "Discription",
      title: "Title",
      link: "Link",
      addLink: "Add Link",
      titlePlace: "Enter Title",
      titleSpan: "Title Required",
      videoDuration: "Video Duration",
      videoDurationPlace: "Enter Video Duration",
      videoDurationSpan: "Video Duration Required",
      description: "Description",
      descriptionPlace: "Enter Description",
      descriptionSpan: "Description Required",
      linkSpan: "Link Required",
      documentSpan: "Document Required",
      video: "Video",
      document: "Document",
      addVideoBtn: "ADD VIDEO",
      updateVideo: "Update Video",
      updateVideoBtn: "UPDATE VIDEO",
      createAssignment: "CREATE ASSIGNMENT",
      addQuestion: "Add Question",
      question: "Question",
      questionSpan: "Question Required",
      answer: "Answer",
      answerSpan: "Answer Required",
      answerPlace: "Enter Answer of the Question",
      mark: "Mark",
      markPlace: "Enter Mark Of Question",
      markSpan: "Mark Required",
      options: "Options",
      optionsPlace: "Enter Your Option",
      addQuestionBtn: "ADD QUESTION",
      adding: "Adding",
      add: "Add",
      update: "update",
      Updating: "Updating",
      remove: "Remove",
      updateQuestion: "Update Question",
      DeleteQuestion: "Delete Question",
      editDeleteQuestion: "Edit or Delete Questions",
      updateQuestionBtn: "UPDATE QUESTION",
    },
    ar: {
      addMcqAssessment: "إضافة التقييم الذاتي MCQ",
      submit: "يُقدِّم",
      submitting: "تقديم",
      answerExplanation: "شرح الإجابة",
      answeExplainPlace: "اشرح الجواب",
      hint: "تَلمِيح",
      HintPlace: "اكتب تلميحًا للسؤال",
      Updating: "تحديث",
      UpdateQuiz: "تحديث مسابقة",
      editDeleteQuestion: "تحرير أو حذف الأسئلة",
      DeleteQuestion: "حذف السؤال",
      minutes: "دقائق",
      videoTime: "وقت الفيديو",
      addStudyMaterials: "أضف مادة الدراسة",
      createFinalTest: "إنشاء التقييم الذاتي",
      creating: "خلق",
      finalTestCreated: "تم إنشاء التقييم الذاتي",
      addAssignment: "أضف المهمة",
      discriptionPlace: "اضف وصفا",
      link: "وصلة",
      addLink: "إضافة رابط",
      discriptionTitle: "وصف",
      title: "عنوان",
      titlePlace: "أدخل العنوان",
      titleSpan: "العنوان مطلوب",
      videoDuration: "مدة الفيديو",
      videoDurationPlace: "أدخل مدة الفيديو",
      videoDurationSpan: "مدة الفيديو مطلوبة",
      description: "وصف الفيديو",
      documentSpan: "المستند مطلوب",
      linkSpan: "الرابط مطلوب",
      descriptionPlace: "أدخل وصف الفيديو",
      descriptionSpan: "وصف الفيديو مطلوب",
      video: "فيديو",
      document: "مستند",
      addVideoBtn: "أضف الفيديو",
      updateVideo: "تحديث الفيديو",
      updateVideoBtn: "تحديث الفيديو",
      createAssignment: "إنشاء مهمة",
      addQuestion: "أضف سؤالا",
      question: "سؤال",
      questionSpan: "السؤال المطلوب",
      answer: "الجواب",
      answerSpan: "مطلوب الجواب",
      answerPlace: "أدخل الجواب على السؤال",
      mark: "علامة",
      markPlace: "أدخل علامة السؤال",
      markSpan: "مارك مطلوب",
      options: "خيارات",
      optionsPlace: "أدخل الخيار الخاص بك",
      addQuestionBtn: "أضف سؤالا",
      add: "يضيف",
      adding: "إضافة",
      update: "تحديث",
      remove: "يزيل",
      updateQuestion: "تحديث السؤال",
      updateQuestionBtn: "تحديث السؤال",
    },
  };

  return CONTENT[lang];
};

//Assignemnt dashboard of tutor panel
export const assignmentDashboard = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      totalAssignWithSub: "Self Assesment with Total submissions",
      numberOfAssignments: "Number of Submissions",
      submittedAssignments: "Number of Submissions",
      courses: "Courses",
      assignments: "Assignments",
      coursewiseTotalsections: "Coursewise Total Sections",
    },
    ar: {
      totalAssignWithSub: "التقييم الذاتي مع إجمالي التقديمات",
      numberOfAssignments: "عدد التقديمات",
      submittedAssignments: "عدد التقديمات",
      courses: "الدورات",
      assignments: "تعيينات",
      coursewiseTotalsections: "بالطبع إجمالي الأقسام",
    },
  };
  return CONTENT[lang];
};
export const studymaterial = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      NoStudyMaterial: "No Study Material created yet, create one.",
      VideoMaterial: "Video Material",
      DocumentMaterial: "Document Material",
      AttachedLinks: "Attached Links",
      preview: "Preview",
      Free: "Free",
      DeleteVideo: "Delete Video",
      DeleteDocument: "Delete Document",
      DeleteLink: "Delete Link",
    },
    ar: {
      NoStudyMaterial: "لم يتم إنشاء مواد دراسية بعد، قم بإنشاء واحدة.",
      VideoMaterial: "مواد الفيديو",
      DocumentMaterial: "مادة الوثيقة",
      AttachedLinks: "الروابط المرفقة",
      preview: "معاينة",
      Free: "حر",
      DeleteVideo: "حذف الفيديو",
      DeleteDocument: "حذف المستند",
      DeleteLink: "حذف الرابط",
    },
  };
  return CONTENT[lang];
};
export const assignmentexam = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      SkillsSpan: "Skills are required",
      SkillsPlace: "Write the skills here",
      SkillsGain: "Skills to be gained",
      Theremustbeatleast5questions: "There must be at least 5 questions",
      Title: "Title",
      TotalMarkCount: "Total Mark Count",
      TotalQuestionCreated: "Total Questions Created",
      PassMark: "Pass Mark",
      setpassmark: "Set Pass Mark",
      EnterTitle: "Enter Title",
      Valuepositive: "Value must be Positive",
      entervalue: "Please enter a value for each option",
      atleast2option: "Please provide at least 2 options",
      correctanswer: "Please select a correct answer",
      Passmarkreq: "Pass Mark is required",
      Titlereq: "Title is required",
      passmarkpositive: "Pass Mark must be a positive number",
      totalmarkgreater: "Pass Mark cannot be greater than Total Marks",
      updateQuestion: "Update Question",
      Pleaseaddoptionsbelowandselectthecorrectanswerbycheckingthebox:
        "Please add options below and select the correct answer by checking the box",
      remove: "Remove",
    },
    ar: {
      SkillsSpan: "المهارات المطلوبة",
      SkillsPlace: "اكتب المهارات هنا",
      SkillsGain: "المهارات المطلوب اكتسابها",
      remove: "يزيل",
      Pleaseaddoptionsbelowandselectthecorrectanswerbycheckingthebox:
        "الرجاء إضافة الخيارات أدناه وتحديد الإجابة الصحيحة عن طريق تحديد المربع",
      Passmarkreq: "علامة المرور مطلوبة",
      Titlereq: "العنوان مطلوب",
      passmarkpositive: "يجب أن تكون علامة المرور رقمًا موجبًا",
      totalmarkgreater:
        "لا يمكن أن تكون علامة النجاح أكبر من العلامات الإجمالية",
      correctanswer: "الرجاء اختيار الإجابة الصحيحة",
      Theremustbeatleast5questions: "يجب أن يكون هناك 5 أسئلة على الأقل",
      Title: "عنوان",
      TotalMarkCount: "إجمالي عدد العلامات",
      TotalQuestionCreated: "إجمالي الأسئلة التي تم إنشاؤها",
      PassMark: "علامة المرور",
      setpassmark: "تعيين علامة المرور",
      EnterTitle: "أدخل العنوان",
      Valuepositive: "يجب أن تكون القيمة موجبة",
      entervalue: "الرجاء إدخال قيمة لكل خيار",
      atleast2option: "يرجى تقديم خيارين على الأقل",
      updateQuestion: "تحديث السؤال",
    },
  };
  return CONTENT[lang];
};

// Assignment page of tutor panel
export const assignmentPage = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      noOfAssignments: "No. of Assignment",
      assignemnts: "Assignments",
      coursewiseTotalsections: "Coursewise Total Sections",
    },
    ar: {
      noOfAssignments: "عدد المهمة",
      assignemnts: "تعيينات",
      coursewiseTotalsections: "بالطبع إجمالي الأقسام",
    },
  };
  return CONTENT[lang];
};

//submitted assignments page in tutor panel
export const submitAssignments = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      submittedAssign: "Submitted Assignments",
      course: "Course",
      topic: "Topic",
      studentName: "Student Name",
      percentage: "Percentage",
      dateOfSubmission: "Date of Submission",
    },
    ar: {
      submittedAssign: "المهام المقدمة",
      course: "دورة",
      topic: "عنوان",
      studentName: "أسم الطالب",
      percentage: "نسبة مئوية",
      dateOfSubmission: "تاريخ التقديم",
    },
  };
  return CONTENT[lang];
};

//live class page of tutorPanel
export const tutorLiveClassPage = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      createCoupon: "Create Coupon",
      couponTitle: "Enter Coupon Title",
      discount: "Enter Discount Price in percent",
      title: "Title",
      description: "Description",
      Discount: "Discount",
      scheduleLiveClass: "Schedule Live Class",
      upComingLiveClass: "Upcoming Live Classes",
      pastLiveClasses: "Past Live Classes",
      createdOn: "Created On",
      startedOn: "Started On",
      endedOn: "Ended On",
      startAt: "Start At",
      endAt: "End At",
      on: "On",
      AM: "AM",
      PM: "PM",
      AddLiveClass: "Add Live Class",
      EditLiveClass: "Edit Live Class",
      DeleteLiveClass: "Delete Live Class",
      courseName: "Course Name",
      topicName: "Topic Name",
      topicNamePlaceholder: "Enter Topic Name",
      date: "Date",
      time: "Time",
      ScheduleLiveClass: "Schedule Live Class",
      StartLiveClass: "Start Live Class",
      StartTime: "Start Time",
      EndTime: "End Time",
      CreateLiveClass: "Create Live Class",
      Creating: "Creating",
      UpdateLiveClass: "Update Live Class",
      Updating: "Updating",
      ShareLink: "Share Invitation",
      StudentList: "Student List",
      StudentName: "Student Name",
      StudentEmail: "Student Email",
      JoinDate: "Join Date",
      ShareLiveClassLink: "Share Live Class Invitation",
      Starttimefuture: "Start time must be in the future",
      EndTimefuture: "End time must be after start time",
      Starttimerequired: "Start Time Required!",
      Endtimerequired: "End Time Required!",
      CourseNamequired: "Course Name Required!",
      TopicNamequired: "Topic Name Required!",
    },
    ar: {
      CourseNamequired: "اسم الدورة مطلوب!",
      DeleteLiveClass: "حذف الفصل المباشر",
      TopicNamequired: "اسم الموضوع مطلوب!",
      Starttimefuture: "يجب أن يكون وقت البدء في المستقبل",
      EndTimefuture: "يجب أن يكون وقت الانتهاء بعد وقت البدء",
      Starttimerequired: "وقت البدء مطلوب!",
      Endtimerequired: "وقت الانتهاء مطلوب!",
      title: "العنوان",
      description: "الوصف",
      couponTitle: "أدخل عنوان الكوبون",
      discount: "أدخل سعر الخصم بالنسبة المئوية",
      Discount: "الخصم",
      createCoupon: "إنشاء الكوبون",
      scheduleLiveClass: "يرتب موعد للاجتماع",
      upComingLiveClass: "الاجتماعات القادمة",
      pastLiveClasses: "الاجتماعات السابقة",
      createdOn: "تم إنشاؤها على",
      startedOn: "بدأ في",
      endedOn: "انتهى يوم",
      startAt: "تبدأ في",
      endAt: "يغلق عند مستوى",
      on: "على",
      AM: "أكون",
      PM: "مساءً",
      AddLiveClass: "أضف فئة مباشرة",
      EditLiveClass: "تحرير الفصل المباشر",
      courseName: "اسم الدورة التدريبية",
      topicName: "اسم الموضوع",
      topicNamePlaceholder: "أدخل اسم الموضوع",
      date: "تاريخ",
      time: "وقت",
      ScheduleLiveClass: "جدولة فئة الحية",
      StartLiveClass: "ابدأ فئة مباشرة",
      StartTime: "وقت البدء",
      EndTime: "وقت النهاية",
      CreateLiveClass: "إنشاء فئة مباشرة",
      Creating: "إنشاء",
      UpdateLiveClass: "تحديث الفصل المباشر",
      Updating: "تحديث",
      ShareLink: "مشاركة الدعوة",
      StudentList: "قائمة الطلاب",
      StudentName: "أسم الطالب",
      StudentEmail: "البريد الإلكتروني للطالب",
      JoinDate: "تاريخ الانضمام",
      ShareLiveClassLink: "مشاركة دعوة الفصل المباشر",
    },
  };
  return CONTENT[lang];
};

//profile page of tutor panel
export const profilePage = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      profile: "Profile",
      information: " Information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      designation: "Designation",
      experience: "Experience",
      expertiseIn: "Expertise In",
      country: "Country",
      countryPlace: "Select Your Country",
      about: "About",
      nameSpan: "Name is required",
      emailSpan: "Email is required",
      phoneNumber: "Phone Number",
      phoneNumberPlace: "Phone Number Required",
      expertiseInSubject: "Expertise In Subject",
      expertiseInSubjectSpan: "This field is required",
      yearOfExperience: "Year Of Experience",
      yearOfExperienceSpan: "This field is required",
      save: "Save",
      edit: "Edit",
      selectYourCountry: "Select your country",
      Profileupdatesuccessfully: "Profile update successfully",
      phonemax15: "Phone number should be of Max 15 digits",
      phonemin6: "Phone number should be of Min 6 digits",
    },
    ar: {
      phonemax15: "يجب أن يتكون رقم الهاتف من 15 رقمًا كحد أقصى",
      phonemin6: "يجب أن يتكون رقم الهاتف من 6 أرقام على الأقل",
      Profileupdatesuccessfully: "تم تحديث الملف الشخصي بنجاح",
      profile: "حساب تعريفي",
      information: " معلومة",
      name: "اسم",
      email: "بريد إلكتروني",
      phone: "هاتف",
      designation: "تعيين",
      experience: "خبرة",
      expertiseIn: "خبرة ب",
      country: "دولة",
      about: "عن",
      nameSpan: "مطلوب اسم",
      emailSpan: "البريد الالكتروني مطلوب",
      phoneNumber: "رقم التليفون",
      phoneNumberPlace: "رقم الهاتف المطلوب",
      expertiseInSubject: "الخبرة في الموضوع",
      expertiseInSubjectSpan: "هذه الخانة مطلوبه",
      save: "يحفظ",
      edit: "يحرر",
      countryPlace: "اختر بلدك",
      yearOfExperience: "سنة الخبرة",
      yearOfExperienceSpan: "هذه الخانة مطلوبه",
      selectYourCountry: "اختر بلدك",
    },
  };
  return CONTENT[lang];
};

export const forgotPassAndNotificationPage = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      all: "All",
      notifications: "Notifications",
      oldPassword: "Old Password",
      oldPasswordSpan: "Required",
      newPassword: "New Password",
      newPasswordSpan: "Required",
      confirmPassword: "Confirm Password",
      confirmPasswordSpan: "Required",
      changePasswordBtn: "Change Password",
      required: "required!",
      passwordLengthMustBe8Characters: "Password must be 8 characters long",
      passwordRequiresANumber: "Password requires a number",
      passwordRequiresALowercaseLetter: "Password requires a lowercase letter",
      passwordRequiresAnUppercaseLetter:
        "Password requires an uppercase letter",
      PasswordRequiresASymbol: "Password requires a symbol",
      ChangePassword: "Change Password",
    },
    ar: {
      all: "الجميع",
      notifications: "إشعارات",
      oldPassword: "كلمة المرور القديمة",
      oldPasswordSpan: "مطلوب",
      newPassword: "كلمة المرور الجديدة",
      newPasswordSpan: "مطلوب",
      confirmPassword: "تأكيد كلمة المرور",
      confirmPasswordSpan: "مطلوب",
      changePasswordBtn: "تغيير كلمة المرور",
      required: "مطلوب!",
      passwordLengthMustBe8Characters: "يجب أن تكون كلمة المرور 8 أحرف طويلة",
      passwordRequiresANumber: "تتطلب كلمة المرور رقمًا",
      passwordRequiresALowercaseLetter: "تتطلب كلمة المرور حرفًا صغيرًا",
      passwordRequiresAnUppercaseLetter: "كلمة المرور تتطلب حرفًا كبيرًا",
      PasswordRequiresASymbol: "كلمة المرور تتطلب رمزًا",
      ChangePassword: "تغيير كلمة المرور",
    },
  };
  return CONTENT[lang];
};

//?  my account page LANGUAGE
export const studentAccountContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      ProfileInformation: "Profile Information",
      YourName: "Your Name",
      YourEmail: "Your Email",
      YourPhoneNumber: "Your Phone Number",
      SelectYourGender: "Select Your Gender",
      Male: "Male",
      Female: "Female",
      Other: "Other",
      Save: "SAVE",
      NameRequired: "Name is required!",
      EmailRequired: "Email is required!",
      PhoneNumberRequired: "Phone number is required!",
      Cancel: "CANCEL",
      Edit: "EDIT",
      Verify: "Verify",
    },
    ar: {
      ProfileInformation: "معلومات الملف الشخصي",
      YourName: "اسمك",
      YourEmail: "بريدك الالكتروني",
      YourPhoneNumber: "رقم تليفونك",
      SelectYourGender: "اختر جنسك",
      Male: "ذكر",
      Female: "أنثى",
      Other: "آخر",
      Save: "يحفظ",
      NameRequired: "مطلوب اسم!",
      EmailRequired: "البريد الالكتروني مطلوب!",
      PhoneNumberRequired: "رقم الهاتف مطلوب!",
      Cancel: "يلغي",
      Edit: "يحرر",
      Verify: "يؤكد",
    },
  };
  return CONTENT[lang];
};

//?  account layout page LANGUAGE
export const accountLayoutContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      StudentNameHere: "Student Name Here",
      MyProfile: "My Profile",
      MyDashboard: "Dashboard",
      MyCourses: "My Courses",
      MyCertificates: "My Certificates",
      MyReviews: "My Reviews",
      LiveClasses: "Live Classes",
      MyCart: "My Cart",
      Notifications: "Notifications",
      ChangePassword: "Change Password",
      Logout: "Logout",
    },
    ar: {
      LiveClasses: "دروس حية",
      StudentNameHere: "اسم الطالب هنا",
      MyProfile: "ملفي",
      MyDashboard: "لوحة القيادة",
      MyCourses: "دوراتي",
      MyCertificates: "شهادات بلدي",
      MyReviews: "تعليقاتي",
      MyCart: "سلة التسوق الخاصة بي",
      Notifications: "إشعارات",
      ChangePassword: "تغيير كلمة المرور",
      Logout: "تسجيل خروج",
    },
  };
  return CONTENT[lang];
};

//?  student Notification page LANGUAGE
export const studentNotificationContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      All: "All",
      Notifications: "Notifications",
      ReadMore: "Read More",
    },
    ar: {
      All: " الجميعميعl",
      Notifications: "إشعارات",
      ReadMore: "اقرأ أكثر",
    },
  };
  return CONTENT[lang];
};

//?  student Change Password  page LANGUAGE
export const studentChangePasswordContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      OldPassword: "Old Password",
      OldPasswordRequired: "Old password is required!",
      NewPassword: "New Password",
      newPasswordRequired: "New password is required!",
      PasswordLength: "Password must be 8 characters long",
      PasswordRequiresNumber: "Password requires a number",
      PasswordRequiresLowercase: "Password requires a lowercase letter",
      PasswordRequiresUppercase: "Password requires an uppercase letter",
      PasswordRequiresSymbol: "Password requires a symbol",
      ConfirmPassword: "Confirm Password",
      ConfirmPasswordRequired: "Confirm password is required!",
      PasswordsMustMatch: "Passwords must match",
      ChangePassword: " Change Password",
    },
    ar: {
      OldPassword: "كلمة المرور القديمة",
      OldPasswordRequired: "كلمة المرور القديمة مطلوبة!",
      NewPassword: "كلمة المرور الجديدة",
      newPasswordRequired: "مطلوب كلمة مرور جديدة!",
      PasswordLength: "يجب أن يكون طول كلمة المرور 8 أحرف",
      PasswordRequiresNumber: "تتطلب كلمة المرور رقمًا",
      PasswordRequiresLowercase: "تتطلب كلمة المرور حرفًا صغيرًا",
      PasswordRequiresUppercase: "كلمة المرور تتطلب حرفًا كبيرًا",
      PasswordRequiresSymbol: "كلمة المرور تتطلب رمزًا",
      ConfirmPassword: "تأكيد كلمة المرور",
      ConfirmPasswordRequired: "تأكيد كلمة المرور مطلوب!",
      PasswordsMustMatch: "يجب أن تتطابق كلمات المرور",
      ChangePassword: " تغيير كلمة المرور",
    },
  };
  return CONTENT[lang];
};

//?  student my course page LANGUAGE
export const myCoursesContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      My: "My",
      Courses: "Courses",
    },
    ar: {
      My: "لي",
      Courses: "الدورات",
    },
  };
  return CONTENT[lang];
};
export const myDashboardContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      welcome: "Welcome",
      NoofCoursePurchased: "Course Purchased",
      NoofCourseCompleted: "Course Completed",
      NoofCourseOngoing: "On-going Courses",
      NoofCertificateEarned: "Certificate Earned",
      CourseAuthor: "Course Author",
      Name: "Name",
      Experience: "Year of Experience",
      Email: "Email",
      SummaryReport: "Summary Report",
      UpcomingClasses: "Upcoming Classes",
      NoUpcomingClasses: "No Upcoming Classes",
      MyTeachers: "My Teachers",
      YouHaveNotPurchasedanyCourseyet: "You Have Not Purchased any Course yet",
      StartTime: "Start Time:",
      EndTime: "End Time:",
    },
    ar: {
      welcome: "مرحباً",
      NoofCoursePurchased: "عدد الدورات التي تم شراؤها",
      NoofCourseCompleted: "عدد الدورات المكتملة",
      NoofCourseOngoing: "عدد الدورات الجارية",
      NoofCertificateEarned: "عدد الشهادة المكتسبة",
      CourseAuthor: "مؤلف الدورة",
      Name: "اسم",
      Experience: "سنة الخبرة",
      Email: "بريد إلكتروني",
      SummaryReport: "تقرير ملخص",
      UpcomingClasses: "الفصول القادمة",
      NoUpcomingClasses: "لا توجد فصول قادمة",
      MyTeachers: "أساتذتي",
      YouHaveNotPurchasedanyCourseyet: "لم تقم بشراء أي دورة حتى الآن",
      StartTime: "وقت البدء:",
      EndTime: "وقت النهاية:",
    },
  };
  return CONTENT[lang];
};
//?  student my course page LANGUAGE
export const myReviewsContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      My: "My",
      Reviews: "Reviews",
      courseName: "Course Name",
    },
    ar: {
      My: "لي",
      Reviews: "التعليقات",
      courseName: "اسم الدورة التدريبية",
    },
  };
  return CONTENT[lang];
};

//?  student my Certificate page LANGUAGE
export const myCertificateContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      My: "My",
      Certificates: "Certificates",
      myCertificates: "My Certificates",
      courseName: "Course Name",
      tutorName: "Tutor Name",
      download: "Download Certificate",
      CompletionDate: "Completion Date",
    },
    ar: {
      My: "لي",
      CompletionDate: "موعد الإكمال",
      Certificates: "الشهادات",
      myCertificates: "شهاداتي",
      courseName: "اسم الدورة التدريبية",
      tutorName: "اسم المعلم",
      download: "تحميل الشهادة",
    },
  };
  return CONTENT[lang];
};
export const myCartContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      My: "My",
      Cart: "Cart",
      Product: "Product",
      Detail: "Detail",
      Cost: "Cost",
      Action: "Action",
      Total: "Total",
      Checkout: "Checkout",
    },
    ar: {
      My: "لي",
      Cart: "عربة التسوق",
      Product: "منتج",
      Detail: "التفاصيل",
      Cost: "يكلف",
      Action: "فعل",
      Total: "المجموع",
      Checkout: "الدفع",
    },
  };
  return CONTENT[lang];
};
export const onlineClassContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      responseTimeOut: "Response Time Out",
      Price: "Price",
      LiveClassOn: "Live Class On:",
      Course: "Course:",
      Tutor: "Tutor:",
      StartTime: "Start Time:",
      EndTime: "End Time:",
      Pay: "Pay",
      PayNow: "Pay Now",
      NotAvailable: "Sorry, This class is not available at the moment.",
      NotYetStarted: "Not Yet Started",
      free: "Free",
      Response: "Interested / Not Interested",
      Responded: "Responded",
      Yes: "Yes",
      No: "No",
      Willjoinclass: "Are You Interested to Join This Class?",
      SuccessfullyResponded: "You have Successfully Responded!",
      Success: "Success",
      Interested: "Interested",
      NotInterested: "Not Interested",
    },
    ar: {
      Interested: "مهتم",
      NotInterested: "غير مهتم",
      responseTimeOut: "مهلة الاستجابة",
      Yes: "نعم",
      No: "لا",
      Willjoinclass: "هل أنت مهتم بالانضمام إلى هذا الفصل؟",
      SuccessfullyResponded: "لقد استجابت بنجاح!",
      Success: "نجاح",
      Response: "مهتم/غير مهتم",
      Responded: "استجاب",
      free: "حر",
      PayNow: "ادفع الآن",
      Price: "سعر",
      LiveClassOn: "الفصل المباشر على:",
      Course: "دورة:",
      Tutor: "مدرس خاص:",
      StartTime: "وقت البدء:",
      EndTime: "وقت النهاية:",
      Pay: "يدفع",
      NotAvailable: "عذرا، هذا الفصل غير متوفر في الوقت الراهن",
      NotYetStarted: "لم يبدأ بعد",
    },
  };
  return CONTENT[lang];
};

//?  admin panel admin navbar page LANGUAGE
export const adminNavbarContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      AdminNameHere: "Admin Name Here",
      MyProfile: "My Profile",
      ChangePassword: "Change Password",
      LogOut: "Log Out",
    },
    ar: {
      AdminNameHere: "اسم المسؤول هنا",
      MyProfile: "ملفي",
      ChangePassword: "تغيير كلمة المرور",
      LogOut: "تسجيل خروج",
    },
  };
  return CONTENT[lang];
};

//?  admin panel notification page LANGUAGE
export const adminNotificationContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      all: "All",
      Notifications: "Notifications",
    },
    ar: {
      all: "الجميع",
      Notifications: "إشعارات",
    },
  };
  return CONTENT[lang];
};

//?  admin panel my profile page LANGUAGE
export const adminProfileContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Profile: "Profile",
      Information: "Information",
      Edit: "EDIT",
      Name: "Name:",
      Email: "Email:",
      Phone: "Phone:",
      Designation: "Designation:",
      Country: "Country:",
    },
    ar: {
      Profile: "حساب تعريفي",
      Information: "معلومة",
      Edit: "يحرر",
      Name: "اسم:",
      Email: "بريد إلكتروني:",
      Phone: "هاتف:",
      Designation: "تعيين:",
      Country: "دولة:",
    },
  };
  return CONTENT[lang];
};

//?  admin panel my profile edit form page LANGUAGE
export const adminProfileEditFormContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      YourName: "Your Name",
      NameRequired: "Name is required!",
      Email: "Email",
      EmailRequired: "Email is required!",
      PhoneNumber: "Phone Number",
      PhoneNumberRequired: "Number is required!",
      Designation: "Designation",
      About: "About",
      Save: "Save",
      SelectYourCountry: "Select Your Country",
      Profileupdatesuccessfully: "Profile update successfully",
      phonemax15: "Phone number should be of Max 15 digits",
      phonemin6: "Phone number should be of Min 6 digits",
    },
    ar: {
      phonemax15: "يجب أن يتكون رقم الهاتف من 15 رقمًا كحد أقصى",
      phonemin6: "يجب أن يتكون رقم الهاتف من 6 أرقام على الأقل",
      Profileupdatesuccessfully: "تم تحديث الملف الشخصي بنجاح",
      YourName: "اسمك",
      NameRequired: "مطلوب اسم!",
      Email: "بريد إلكتروني",
      EmailRequired: "البريد الالكتروني مطلوب!",
      PhoneNumber: "رقم التليفون",
      PhoneNumberRequired: "الرقم مطلوب!",
      Designation: "تعيين",
      About: "عن",
      Save: "يحفظ",
      SelectYourCountry: "اختر بلدك",
    },
  };
  return CONTENT[lang];
};

//?  admin panel change password form page LANGUAGE
export const adminChangePasswordContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      OldPassword: "Old Password",
      OldPasswordRequired: "Old password is required!",
      NewPassword: "New Password",
      NewPasswordRequired: "required!",
      PasswordLength_8: "Password must be 8 characters long",
      PasswordRequiresNumber: "Password requires a number",
      PasswordRequiresLowercase: "Password requires a lowercase letter",
      PasswordRequiresUppercase: "Password requires an uppercase letter",
      PasswordRequiresSymbol: "Password requires a symbol",
      ConfirmPassword: "Confirm Password",
      ConfirmPasswordRequired: "required!",
      PasswordsMustMatch: "Passwords must match",
      ChangePassword: "Change Password",
    },
    ar: {
      OldPassword: "كلمة المرور القديمة",
      OldPasswordRequired: "كلمة المرور القديمة مطلوبة!",
      NewPassword: "كلمة المرور الجديدة",
      NewPasswordRequired: "مطلوب!",
      PasswordLength_8: "يجب أن يكون طول كلمة المرور 8 أحرف",
      PasswordRequiresNumber: "تتطلب كلمة المرور رقمًا",
      PasswordRequiresLowercase: "تتطلب كلمة المرور حرفًا صغيرًا",
      PasswordRequiresUppercase: "كلمة المرور تتطلب حرفًا كبيرًا",
      PasswordRequiresSymbol: "كلمة المرور تتطلب رمزًا",
      ConfirmPassword: "تأكيد كلمة المرور",
      ConfirmPasswordRequired: "مطلوب!",
      PasswordsMustMatch: "يجب أن تتطابق كلمات المرور",
      ChangePassword: "تغيير كلمة المرور",
    },
  };
  return CONTENT[lang];
};

//?  admin dashboard page LANGUAGE
export const adminDashboardContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      TotalNoOfStudents: "Total No. of Students",
      TotalNoOfTutors: "Total No. of Tutors",
      TotalNoOfQuizzes: "Total No. of Quizzes",
      TotalNoOfResponses: "Total No. of Responses",
      TotalNoOfQuizzesTakers: "Total No. of Quizzes Takers",
      TotalCourses: "Total Courses",
      TotalEarnings: "Total Earnings",
      TotalTutorsDue: "Total Tutors Due",
      TopTutors: "Top Tutors",
      TopQuizzes: "Top Performing Quizzes",
      TotalPayouts: "Total Payouts",
      TotalTutorsPending: "Total Tutors Pending",
      Experience: "Experience (Years) :",
      Expertisein: "Expertise in :",
      NODATAAVAILABLE: "NO DATA AVAILABLE",
    },
    ar: {
      NODATAAVAILABLE: "لا تتوافر بيانات",
      Expertisein: "خبرة ب :",
      Experience: "الخبرة (سنوات):",
      TotalTutorsPending: "مجموع المعلمين المعلقين",
      TotalPayouts: "إجمالي الدفعات",
      TotalTutorsDue: "مجموع المعلمين المستحقين",
      TotalNoOfQuizzes: "المجموع لا. من الاختبارات",
      TotalNoOfResponses: "المجموع لا. من الردود",
      TotalNoOfQuizzesTakers: "المجموع لا. من المتقدمين للاختبارات",
      TotalNoOfStudents: "إجمالي لا.عن الطلاب",
      TotalNoOfTutors: "إجمالي لا.من المعلمين",
      TotalCourses: "إجمالي الدورات",
      TotalEarnings: "الأرباح الكلية",
      TopTutors: "أفضل المعلمين",
      TopQuizzes: "أعلى أداء مسابقات",
    },
  };
  return CONTENT[lang];
};

//?  admin earning graph page LANGUAGE
export const adminEarningGraphContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      TotalNoOfStudents: "Total No. of Students",
      TotalNoOfTutors: "Total No. of Tutors",
      TotalEarnings: "Total Earnings",
      TopTutors: "Top Tutors",
      Tutors: "Tutors",
      Students: "Students",
      Earnings: "Earnings",
      Top12TutorAndStudentReportWithEarnings:
        "Top 12 Tutor and Student Report with Earnings",
    },
    ar: {
      TotalNoOfStudents: "إجمالي لا.عن الطلاب",
      TotalNoOfTutors: "إجمالي لا.من المعلمين",
      TotalEarnings: "الأرباح الكلية",
      Tutors: "المعلمون",
      Students: "طلاب",
      Earnings: "الأرباح",
      Top12TutorAndStudentReportWithEarnings:
        "أعلى 12 تقرير المعلم والطالب مع الأرباح",
    },
  };
  return CONTENT[lang];
};

//?  admin pie graph in dashbord page LANGUAGE
export const adminPieGraphContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      HighestCategorizedCourses: "Highest Categorized Courses",
    },
    ar: {
      HighestCategorizedCourses: "أعلى دورات تصنيف",
    },
  };
  return CONTENT[lang];
};

//?  admin visitors graph page LANGUAGE
export const adminVisitorsGraphContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      PageViewStatus: "Page View Status",
      TotalVisitors: "Total Visitors",
      FromMobile: "From Mobile",
      FromTablet: "From Tablet",
      FromDesktop: "From Desktop",
      FromMac: "From Mac",
      OtherVisitors: "Other Visitors",
    },
    ar: {
      PageViewStatus: "حالة عرض الصفحة",
      TotalVisitors: "إجمالي الزوار",
      FromMobile: "من الجوال",
      FromTablet: "من التابلت",
      FromDesktop: "من سطح المكتب",
      FromMac: "من ماك",
      OtherVisitors: "زوار آخرين",
    },
  };
  return CONTENT[lang];
};

//?  admin course dashboard page LANGUAGE
export const adminCourseDashboardContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      TotalUploadedCoursesByCategory: "Total Uploaded Courses by Category",
      SuCategories: "Sub-Categories",
      Courses: "Courses",
      UploadedCourses: "Uploaded Courses",
      CreatedCategories: "Created Categories",
    },
    ar: {
      TotalUploadedCoursesByCategory: "إجمالي الدورات المرفوعة حسب الفئة",
      SuCategories: "الفئات الفرعية",
      Courses: "الدورات",
      UploadedCourses: "الدورات المرفوعة",
      CreatedCategories: "الفئات التي تم إنشاؤها",
    },
  };
  return CONTENT[lang];
};

//?  admin manage category page LANGUAGE
export const adminManageCategoryContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      hint: "Hint",
      correctAnsExplanation: "Correct Answer Explanation",
      quizTaker: "Quiz Takers",
      viewQuizTaker: "View Quiz Takers",
      name: "Name",
      email: "Email",
      response: "Resposnse",
      allresposnse: "All Responses",
      queAndAns: "Quiz Questions & Answers",
      AllQuizzes: "All Quizzes",
      AllCategories: "All Categories",
      AllLanguage: "All Languages",
      AddQuiz: "Add Quiz",
      AddCategory: "Add Category",
      AddLanguage: "Add Language",
      EditCategory: "Edit Category",
      Subcategories: "Sub-Categories",
      noLanguage: "No Language Found",
      noQuiz: "No Quiz Found",
      NoCategoriesFound: "No Categories Found",
    },
    ar: {
      hint: "Hint",
      correctAnsExplanation: "Correct Answer Explanation",
      quizTaker: "Quiz Takers",
      viewQuizTaker: "View Quiz Takers",
      name: "Name",
      email: "Email",
      response: "Resposnse",
      allresposnse: "All Responses",
      queAndAns: "أسئلة وأجوبة المسابقة",
      AllQuizzes: "أعلى أداء مسابقات",
      NoCategoriesFound: "لم يتم العثور على فئات",
      noLanguage: "لم يتم العثور على لغة",
      noQuiz: "لم يتم العثور على أي اختبار",
      Subcategories: "الفئات الفرعية",
      AllCategories: "جميع الفئات",
      AllLanguage: "كل اللغات",
      AddLanguage: "إضافة لغة",
      AddQuiz: "إضافة مسابقة",
      AddCategory: "إضافة فئة",
      EditCategory: "تحرير الفئة",
    },
  };
  return CONTENT[lang];
};
export const deleteContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Warning: "Warning?",
      Areyousureyouwanttoremovethis: "Are you sure you want to remove this ?",
      Areyousureyouwanttodelete: "Are you sure you want to Delete?",
      YesRemoveit: "Yes, Remove it!!",
      Nocancel: "No, cancel!",
      yeslogout: "Yes, Logout!",
      No: "No",
      yes: "Yes",
      areyousure: "Are You Sure?",
      wanttologout: "Do you want to logout?",
      Deleting: "Deleting...",
      Block: "Block",
      Unblock: "Unblock",
      Active: "Active",
      inactive: "Inactive",
      thistutor: "this tutor",
      thisstudent: "this student",
      logoutSuccess: "You have Successfully logged out!",
    },
    ar: {
      thisstudent: "هذا الطالب",
      logoutSuccess: "لقد قمت بتسجيل الخروج بنجاح!",
      Deleting: "جارٍ الحذف...",
      No: "لا",
      yes: "نعم",
      Areyousureyouwanttodelete: "هل أنت متأكد أنك تريد حذف؟",
      areyousure: "هل أنت متأكد؟",
      yeslogout: "نعم، تسجيل الخروج!",
      wanttologout: "هل ترغب بالخروج؟",
      Warning: "تحذير؟",
      Areyousureyouwanttoremovethis: "هل أنت متأكد أنك تريد إزالة هذا؟",
      YesRemoveit: "نعم، قم بإزالته!!",
      Nocancel: "لا، إلغاء!",
      Block: "حاجز",
      Unblock: "رفع الحظر",
      Active: "نشيط",
      inactive: "غير نشط",
      thistutor: "هذا المعلم",
    },
  };
  return CONTENT[lang];
};
export const SuccessContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Success: "Success",
      Paymentmethodsavedsuccessfully: "Payment method saved successfully.",
      Error: "Error",
      Failedtosavepaymentmethod: "Failed To Save Payment Method",
      Anerroroccurredwhilesavingthepaymentmethod:
        "An Error Occurred While Saving the Payment Method",
    },
    ar: {
      Error: "خطأ",
      Failedtosavepaymentmethod: "فشل في حفظ طريقة الدفع",
      Anerroroccurredwhilesavingthepaymentmethod:
        "حدث خطأ أثناء حفظ طريقة الدفع",
      Paymentmethodsavedsuccessfully: "تم حفظ طريقة الدفع بنجاح.",
      Success: "نجاح",
    },
  };
  return CONTENT[lang];
};

//?  category form page LANGUAGE
export const CategoryFormContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      CategoryName: "Category Name",
      EnterCategoryName: "Enter category name",
      Thumbnail: "Thumbnail",
      description: "Description",
      EnterDescription: "Enter description ",
      ClickHereToUploadImage: "Click here to upload image.",
      Update: "UPDATE",
      AddCategory: "ADD CATEGORY",
      CategoryNameIsRequired: "Category Name is Required!",
      CategoryDescriptionIsRequired: "Category Description is Required!",
      MinimumLetters: "Minimum 3 letter",
      MaximumLetters: "Maximum 80 letter",
      ThisFieldIsRequired: "This field is required!",
      Pleaseprovideanimage: "Please provide an image",
    },
    ar: {
      Pleaseprovideanimage: "يرجى تقديم صورة",
      CategoryName: "اسم التصنيف",
      EnterCategoryName: "أدخل اسم الفئة",
      description: "وصف",
      EnterDescription: "أدخل الوصف",
      Thumbnail: "ظفري",
      ClickHereToUploadImage: "انقر هنا لتحميل الصورة.",
      Update: "تحديث",
      AddCategory: "إضافة فئة",
      CategoryNameIsRequired: "اسم الفئة مطلوب!",
      CategoryDescriptionIsRequired: "الفئة الوصف مطلوبة",
      MinimumLetters: "الحد الأدنى 3 أحرف",
      MaximumLetters: "أقصى 25 رسالة",
      ThisFieldIsRequired: "هذه الخانة مطلوبه!",
    },
  };
  return CONTENT[lang];
};

export const LanguageFormContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      LanguageName: "Language Name",
      EnterLanguageName: "Enter language name",
      AddLanguage: "ADD LANGUAGE",
      Adding: "Adding",
      LanguageNameIsRequired: "Language Name is Required!",
      LanguageNameOnlyCharacters: "Only Alphabets are allowed.",
      ThisFieldIsRequired: "This field is required!",
    },
    ar: {
      LanguageNameOnlyCharacters: "يُسمح باستخدام الحروف الهجائية فقط.",
      LanguageName: "اسم اللغة",
      EnterLanguageName: "أدخل اسم اللغة",
      AddLanguage: "إضافة لغة",
      Adding: "إضافة",
      LanguageNameIsRequired: "اسم اللغة مطلوب!",
      ThisFieldIsRequired: "هذه الخانة مطلوبة!",
    },
  };
  return CONTENT[lang];
};
export const dataContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      AllQuestions: "All Questions",
      Longtypeques: "Add Long-Type Self-Assessment",
      DownloadCSV: "Download CSV",
      NODATAAVAILABLE: "NO DATA AVAILABLE",
      AllReview: "All Reviews",
      Notgiven: "Not Given",
      CreateCoupon: "Create Coupon",
      CouponCreated: "Coupon Created",
      CouponTitle: "Coupon Title",
      Discount: "Discount",
      Code: "Code",
      EnterFee: "Enter Fee",
      Selectstructure: "Select Structure",
      NoCourse: "No Course Created Yet",
      NoAssignment: "No Assignments Created Yet, Create One",
      TotalMarks: "Total Marks",
      NoofQuestions: "No of Questions",
      ViewDetails: "View Details",
      NoQuestionCreatedYet: "No Question Created Yet!",
      Assignment: "Assignment",
      Marks: "Marks",
      Answer: "Answer",
      Viewall: "View All Lectures",
      EditLesson: "Edit Lesson",
      DeleteLesson: "Delete Lesson",
      NoLecture: "No lectures created yet, create one.",
      Addintro: "Add Introduction Video",
      Previewintro: "Preview Introduction Video",
      preview: "Preview",
      videoReq: "Video is Required",
      LessonReq: "Lesson Name is Required",
      DescriptionReq: "Description is Required",
      FAQs: "FAQs",
      studentsQuestions: "Students Questions",
      questionreq: "Question Required",
      answerreq: "Answer Required",
      Min10letter: " Minimum 10 letter ",
      Min3letter: " Minimum 3 letter ",
      Max1000letter: "Maximum 1000 letter",
    },
    ar: {
      AllQuestions: "جميع الأسئلة",
      Longtypeques: "إضافة التقييم الذاتي من النوع الطويل",
      LessonReq: "اسم الدرس مطلوب",
      DescriptionReq: "الوصف مطلوب",
      videoReq: "الفيديو مطلوب",
      Addintro: "إضافة فيديو مقدمة",
      Previewintro: "معاينة مقدمة الفيديو",
      preview: "معاينة",
      EditLesson: "تحرير الدرس",
      Viewall: "عرض جميع المحاضرات",
      DeleteLesson: "حذف الدرس",
      NoLecture: "لم يتم إنشاء أي محاضرات بعد، قم بإنشاء واحدة.",
      Marks: "ماركس",
      Answer: "إجابة",
      Assignment: "تكليف",
      TotalMarks: "مجموع علامات",
      NoofQuestions: "عدد الأسئلة",
      ViewDetails: "عرض التفاصيل",
      NoQuestionCreatedYet: "لم يتم إنشاء أي سؤال بعد!",
      NoAssignment: "لم يتم إنشاء أي واجبات بعد، قم بإنشاء واحدة",
      NoCourse: "لم يتم إنشاء أي دورة حتى الآن",
      EnterFee: "أدخل الرسوم",
      Selectstructure: "حدد الهيكل",
      CreateCoupon: "إنشاء قسيمة",
      CouponCreated: "تم إنشاء القسيمة",
      CouponTitle: "عنوان القسيمة",
      Discount: "تخفيض",
      Code: "شفرة",
      AllReview: "جميع التقييمات",
      NODATAAVAILABLE: "لا تتوافر بيانات",
      DownloadCSV: "قم بتنزيل ملف CSV",
      Notgiven: "غير معطى",
      FAQs: "الأسئلة الشائعة",
      studentsQuestions: "أسئلة الطلاب",
      questionreq: "سؤال مطلوب",
      answerreq: "الإجابة المطلوبة",
      Min10letter: "الحد الأدنى 10 حرف",
      Min3letter: "الحد الأدنى 3 حرف",
      Max1000letter: "الحد الأقصى 1000 حرف",
    },
  };
  return CONTENT[lang];
};
export const payoutdata = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      TotalSales: "Total Sales",
      FromLastPayout: "From Last Payout",
      SS: "SS%",
      SSAmount: "SS Amount",
      TutorPayout: "Tutor Payout",
      TutorTotalBalance: "Tutor Total Balance",
      TutorTotalPending: "Tutor Total Pending",
      PayoutList: "Payout List",
      Slno: "Sl No.",
      Amount: "Amount",
      Payout: "PayOut",
      Remainbalance: "Pending",
      Date: "Date",
      Nopayout: "No PayOuts Yet",
      pay: "Pay",
      paying: "Paying",
      PayoutSuccessful: "PayOut was Successfull!",
      PayoutFailed: "Payout failed. Please try again",
      error: "An error occurred while processing the Payout",
    },
    ar: {
      Remainbalance: "قيد الانتظار",
      PayoutSuccessful: "تم الدفع بنجاح!",
      PayoutFailed: "فشل الدفع. حاول مرة اخرى",
      error: "حدث خطأ أثناء معالجة الدفع",
      Nopayout: "لا يوجد دفعات حتى الآن",
      pay: "يدفع",
      paying: "الدفع",
      TutorPayout: "دفع تعويضات المعلم",
      TotalSales: "إجمالي المبيعات",
      FromLastPayout: "من الدفعة الأخيرة",
      SS: "%SS",
      SSAmount: "مبلغ سس",
      TutorTotalBalance: "الرصيد الإجمالي للمدرس",
      TutorTotalPending: "إجمالي المعلم معلق",
      PayoutList: "قائمة الدفع",
      Slno: "Sl No.",
      Amount: "كمية",
      Payout: "سيصرف",
      Date: "تاريخ",
    },
  };
  return CONTENT[lang];
};
export const individualTutorContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Name: "Name",
      Namenotgiven: "Name is Not Given",
      Country: "Country",
      Countrynotgiven: "Country is Not Given",
      Designation: "Designation",
      Designationnotgiven: "Designation is Not Given",
      About: "About",
      Aboutnotgiven: "About is Not Given",
      YearofExperience: "Year of Experience",
      YearofExperiencenotgiven: "Year of Experience is Not Given",
      email: "E-mail",
      emailnotgiven: "E-mail is Not Given",
      MobileNumber: "Mobile Number",
      MobileNumbernotgiven: "Mobile Number is Not Given",
      NoCourse: "No Course Created Yet",
      Expertise: "Expertise in",
      Expertisenotgiven: "Subject is not given",
    },
    ar: {
      Name: "اسم",
      Namenotgiven: "لم يتم إعطاء الاسم",
      Country: "دولة",
      Countrynotgiven: "البلد لا يعطى",
      Designation: "تعيين",
      Designationnotgiven: "لم يتم إعطاء التعيين",
      About: "عن",
      Aboutnotgiven: "حول لم يتم إعطاء",
      YearofExperience: "سنة الخبرة",
      YearofExperiencenotgiven: "لا يتم إعطاء سنة الخبرة",
      email: "بريد إلكتروني",
      emailnotgiven: "لم يتم إعطاء البريد الإلكتروني",
      MobileNumber: "رقم الهاتف المحمول",
      MobileNumbernotgiven: "لم يتم إعطاء رقم الجوال",
      NoCourse: "لم يتم إنشاء أي دورة حتى الآن",
      Expertise: "خبرة ب",
      Expertisenotgiven: "لا يتم إعطاء الموضوع",
    },
  };
  return CONTENT[lang];
};

//?  admin category ID page LANGUAGE
export const adminCategoryIDContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      AddSubCategory: "Add Sub-Category",
      EditSubCategory: "Edit Sub-Category",
      SubCategories: "Sub-Categories",
      NoSubcategory: "No Sub-Categories Found",
    },
    ar: {
      NoSubcategory: "لم يتم العثور على فئات فرعية",
      EditSubCategory: "تحرير الفئة الفرعية",
      AddSubCategory: "إضافة الفئة الفرعية",
      SubCategories: "الفئات الفرعية",
    },
  };
  return CONTENT[lang];
};

//?  admin sub-category form page LANGUAGE
export const adminSubCategoryFormContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      SubCategoryName: "Sub Category Name",
      EnterSubCategoryName: "Enter sub category name",
      Description: "Description",
      EnterDescriptions: "Enter descriptions...",
      Thumbnail: "Thumbnail",
      ClickHereToUploadImage: "Click here to upload image.",
      Update: "UPDATE",
      AddCategory: "ADD SUB CATEGORY",
      CategoryNameIsRequired: "Sub Category name is required!",
      SubCategoryMinimum3LetterRequired: "Minimum 3 letter required!",
      DescriptionIsRequired: "Description is required!",
      DescriptionMinimum3LetterRequired: "Minimum 3 letter required!",
      DescriptionMaximum80LetterRequired: "Maximum 80 letter allowed!",
      ThisFieldIsRequired: "This field is required!",
      imgFieldIsRequired: "Image field is required!",
    },
    ar: {
      SubCategoryName: "اسم الفئة الفرعية",
      EnterSubCategoryName: "أدخل اسم الفئة الفرعية",
      Description: "وصف",
      EnterDescriptions: "أدخل الأوصاف ...",
      Thumbnail: "ظفري",
      ClickHereToUploadImage: "انقر هنا لتحميل الصورة.",
      Update: "تحديث",
      AddCategory: "إضافة فئة فرعية",
      CategoryNameIsRequired: "اسم الفئة مطلوب!",
      SubCategoryMinimum3LetterRequired: "الحد الأدنى 3 أحرف مطلوبة!",
      DescriptionIsRequired: "الوصف مطلوب!",
      DescriptionMinimum3LetterRequired: "الحد الأدنى 3 أحرف مطلوبة!",
      DescriptionMaximum80LetterRequired: "الحد الأقصى المسموح به هو 80 حرفًا!",
      ThisFieldIsRequired: "هذه الخانة مطلوبه!",
      imgFieldIsRequired: "حقل الصورة مطلوب!",
    },
  };
  return CONTENT[lang];
};

//?  admin's tutor dashboard page LANGUAGE
export const adminTutorDashboardContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      HighestNoOfTutorsInTop7Categories:
        "Highest no. of tutors in top 7 categories",
      TotalNoOfTutors: "Total no. of tutors",
      AcceptedTutors: "Accepted tutors",
      PendingRequests: "Pending requests",
      BlockTutors: "Block tutors",
      TotalStudents: "total students",
      TotalTutors: "total tutors",
      TotalTutorsWithStudents: "Total tutors with students",
      NoOfTutorsAndStudents: "No. of tutors and students",
      Categories: "Categories",
    },
    ar: {
      HighestNoOfTutorsInTop7Categories: "أعلى لا. من المعلمين في أعلى 7 فئات",
      TotalNoOfTutors: "إجمالي لا.من المعلمين",
      AcceptedTutors: "المعلمين المقبولين",
      PendingRequests: "الطلبات المعلقة",
      BlockTutors: "كتلة المعلمين",
      TotalStudents: "إجمالي الطلاب",
      TotalTutors: "إجمالي المعلمين",
      TotalTutorsWithStudents: "إجمالي المعلمين مع الطلاب",
      NoOfTutorsAndStudents: "عدد المعلمين والطلاب",
      Categories: "فئات",
    },
  };
  return CONTENT[lang];
};

//?  admin's pending tutor page LANGUAGE
export const adminPendingTutorContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      PendingRequests: "Pending Requests",
      Profile: "Profile",
      // Name: "Name",
      // Email: "Email",
      // Phone: "Phone",
      Expertise: "Expertise",
      Experience: "Experience",
      Time: "Time",
      country: "Country",
      Method: "Method",
      Date: "Date",
      AcceptReject: "Accept / Reject",
      Action: "Action",
      AreYouSure: "Are you sure?",
      ACCEPT: "ACCEPT",
      REJECT: "REJECT",
      RejectButton: "Reject",
      AcceptButton: "Accept",
      SelectMethod: "Select Method:",
      EnterPercentage: "Enter Percentage:",
      save: "Save",
      saving: "Saving...",
    },
    ar: {
      save: "يحفظ",
      saving: "إنقاذ...",
      SelectMethod: "اختر الطريقة:",
      EnterPercentage: "أدخل النسبة المئوية:",
      PendingRequests: "الطلبات المعلقة",
      Profile: "حساب تعريفي",
      // Name: "اسم",
      // Email: "بريد إلكتروني",
      // Phone: "هاتف",
      Expertise: "خبرة",
      Experience: "خبرة",
      Time: "وقت",
      country: "دولة",
      Method: "الطريقة",
      Date: "تاريخ",
      AcceptReject: "اقبل ارفض",
      Action: "فعل",
      AreYouSure: "هل أنت متأكد؟",
      ACCEPT: "يقبل",
      REJECT: "يرفض",
      RejectButton: "يرفض",
      AcceptButton: "يقبل",
    },
  };
  return CONTENT[lang];
};

//?  admin's accepted tutor page LANGUAGE
export const adminAcceptedTutorContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      contactInfo: "Contact Info",
      salesinfo: "Sales Info ($)",
      AcceptedTutors: "Accepted Tutors",
      payouts: "Tutors Payouts",
      Details: "Details",
      courseSale: "Course Sales",
      LiveClassSales: "Live Class Sales",
      Profile: "Profile",
      Name: "Name",
      Phone: "Phone",
      Subject: "Subject",
      Method: "Method",
      TotalSales: "Total Sales",
      BlockUnblock: "Block / Unblock",
      Action: "Action",
      SetPaymentMethod: "Set Payment Method",
      ViewTutorProfile: "View Tutor Profile",
    },
    ar: {
      SetPaymentMethod: "قم بتعيين طريقة الدفع",
      ViewTutorProfile: "عرض ملف المعلم",
      contactInfo: "معلومات الاتصال",
      salesinfo: "معلومات المبيعات",
      AcceptedTutors: "المعلمين المقبولين",
      payouts: "جميع مدفوعات المعلمين",
      Details: "تفاصيل",
      courseSale: "مبيعات الدورة",
      LiveClassSales: "مبيعات الدرجة الحية",
      Profile: "حساب تعريفي",
      Name: "اسم",
      Phone: "هاتف",
      Subject: "موضوع",
      Method: "الطريقة",
      TotalSales: "إجمالي المبيعات",
      BlockUnblock: "كتلة / إلغاء الحظر",
      Action: "فعل",
    },
  };
  return CONTENT[lang];
};

//?  admin's rejected tutor page LANGUAGE
export const adminRejectedTutorContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      RejectedTutors: "Rejected Tutors",
      Image: "Image",
      Name: "Name",
      Phone: "Phone",
      Subject: "Subject",
      Status: "Status",
      Action: "Action",
    },
    ar: {
      RejectedTutors: "المعلمين رفضوا",
      Image: "صورة",
      Name: "اسم",
      Phone: "هاتف",
      Subject: "موضوع",
      Status: "حالة",
      Action: "فعل",
    },
  };
  return CONTENT[lang];
};

//?  admin's  tutor ID page LANGUAGE
export const adminTutorIDContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Expertise: "Expertise in:",
      TechnicalSkills: "Technical Skills:",
      Courses: "Courses",
    },
    ar: {
      Expertise: "خبرة ب:",
      TechnicalSkills: "مهارات تقنية:",
      Courses: "الدورات",
    },
  };
  return CONTENT[lang];
};

//?  admin's  tutorID's topic detail page LANGUAGE
export const adminTopicDetailsContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      CourseContent: "Course Content",
      AllReviews: "All Reviews",
    },
    ar: {
      CourseContent: "محتوى الدورة",
      AllReviews: "جميع المراجعات",
    },
  };
  return CONTENT[lang];
};

//?  admin  student dashboard page LANGUAGE
export const adminStudentDashboardContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      TotalStudents: "Total students",
      LastMonthAddedStudents: "Last month added students",
      Coursewisestudent: "Coursewise Students",
      students: "Students",
    },
    ar: {
      students: "طلاب",
      Coursewisestudent: "طلاب الدورة",
      TotalStudents: "إجمالي الطلاب",
      LastMonthAddedStudents: "أضاف الشهر الماضي الطلاب",
    },
  };
  return CONTENT[lang];
};

//?  admin  student graph page LANGUAGE
export const adminStudentGraphContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      TotalStudents: "Total Students",
      LastMonthAddedStudents: "Last month added students",
      StudentReport: "Student Report",
    },
    ar: {
      TotalStudents: "إجمالي الطلاب",
      LastMonthAddedStudents: "أضاف الشهر الماضي الطلاب",
      StudentReport: "تقرير الطالب",
    },
  };
  return CONTENT[lang];
};

//?  admin  student detail page LANGUAGE
export const adminStudentDetailContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      StudentDetails: " Student details",
      CourseDetails: " Course details",
      Name: "Name",
      Email: "Email",
      Course: "Course",
      Country: "Country",
      totalClasses: "Total Classes",
      totalFreeClasses: "Total Free Classes",
      totalPaidClasses: "Total Paid Classes",
      Phone: "Phone",
      Time: "Time",
      Date: "Date",
      BlockUnblock: "Block / Unblock",
      AllCoursesPurchasedByTheStudent: "All Courses purchased by the student",
      courseName: "Course Name",
      Description: "Description",
      Timestamp: "Timestamp",
      statistics: "Statistics",
      inTime: "Last Login",
      outTime: "Time of Exit",
      averageTime: "Average Time on Website",
      price: "Price($)",
    },
    ar: {
      price: "السعر($)",
      StudentDetails: " تفاصيل الطالب",
      CourseDetails: "تفاصيل الدورة",
      Name: "اسم",
      Email: "بريد إلكتروني",
      Course: "دورة",
      Country: "دولة",
      totalClasses: "مجموع الفصول",
      totalFreeClasses: "إجمالي الفصول المجانية",
      totalPaidClasses: "إجمالي الفصول المدفوعة",
      Phone: "هاتف",
      Time: "وقت",
      Date: "تاريخ",
      BlockUnblock: "كتلة / إلغاء الحظر",
      AllCoursesPurchasedByTheStudent: "جميع الدورات التي اشتراها الطالب",
      courseName: "اسم الدورة التدريبية",
      Description: "وصف",
      Timestamp: "الطابع الزمني",
      statistics: "إحصائيات",
      inTime: "آخر تسجيل دخول",
      outTime: "وقت الخروج",
      averageTime: "متوسط ​​الوقت على الموقع",
    },
  };
  return CONTENT[lang];
};

//?  admin  Course detail page LANGUAGE
export const adminCourseDetailContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      CourseDetails: " Course details",
      tutorName: "Tutor Name",
      studentCount: "Total Students",
      createDate: "Created On",
      studentList: "Students List",
      Name: "Name",
      Email: "Email",
      Course: "Course",
      Country: "Country",
      Phone: "Phone",
      Time: "Time",
      Date: "Date",
      Price: "Price($)",
      status: "Status",
      purchaseDate: "Purchase Date",
      BlockUnblock: "Block / Unblock",
      AllCoursesPurchasedByTheStudent: "All Courses purchased by the student",
      courseName: "Course Name",
      Description: "Description",
      Timestamp: "Timestamp",
    },
    ar: {
      Price: "السعر($)",
      CourseDetails: "تفاصيل الدورة",
      tutorName: "اسم المعلم",
      studentCount: "إجمالي الطلاب",
      createDate: "تم إنشاؤها على",
      studentList: "قائمة الطلاب",
      status: "حالة",
      purchaseDate: "تاريخ الشراء",
      Name: "اسم",
      Email: "بريد إلكتروني",
      Course: "دورة",
      Country: "دولة",
      Phone: "هاتف",
      Time: "وقت",
      Date: "تاريخ",
      BlockUnblock: "كتلة / إلغاء الحظر",
      AllCoursesPurchasedByTheStudent: "جميع الدورات التي اشتراها الطالب",
      courseName: "اسم الدورة التدريبية",
      Description: "وصف",
      Timestamp: "الطابع الزمني",
    },
  };
  return CONTENT[lang];
};

//?  admin  manage review page LANGUAGE
export const adminManageReviewContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      ManageReviews: " Manage Reviews",
      CourseName: "Course Name",
      TutorName: "Tutor Name",
      TotalReviews: "Total Reviews",
      Action: "Action",
    },
    ar: {
      ManageReviews: " إدارة المراجعات",
      CourseName: "اسم الدورة التدريبية",
      TutorName: "اسم المعلم",
      TotalReviews: "إجمالي الاستعراضات",
      Action: "فعل",
    },
  };
  return CONTENT[lang];
};

//?  admin  use menu items page LANGUAGE
export const adminUseMenuItemsContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Dashboard: "Dashboard",
      payouts: "Payouts",
      quizzes: "Quizzes",
      Categories: "Categories",
      ManageCategories: "Manage Categories",
      ManageLanguages: "Manage Languages",
      Tutors: "Tutors",
      Courses: "Courses",
      PendingRequests: "Pending Tutors",
      AcceptedTutors: "Accepted Tutors",
      RejectedTutors: "Rejected Tutors",
      Students: "Students",
      statistics: "Statistics",
      Tutorstatistics: "Tutor Statistics",
      StudentDetails: "Student Details",
      CourseDetails: "Course Details",
      ManageReviews: "Manage Reviews",
      Settings: "Settings",
      MyProfile: "My Profile",
      Notifications: "Notifications",
      ChangePassword: "Change Password",
      LogOut: "Log Out",
    },
    ar: {
      Tutorstatistics: "إحصائيات المعلم",
      Dashboard: "لوحة القيادة",
      payouts: "دفعات",
      quizzes: "الإختبارات",
      Categories: "فئات",
      ManageCategories: "إدارة الفئات",
      ManageLanguages: "إدارة اللغات",
      Tutors: "المعلمون",
      Courses: "الدورات",
      PendingRequests: "الطلبات المعلقة",
      AcceptedTutors: "المعلمين المقبولين",
      RejectedTutors: "المعلمين رفضوا",
      Students: "طلاب",
      statistics: "إحصائيات",
      StudentDetails: "تفاصيل الطالب",
      CourseDetails: "تفاصيل الدورة",
      ManageReviews: "إدارة المراجعات",
      Settings: "إعدادات",
      MyProfile: "ملفي",
      Notifications: "إشعارات",
      ChangePassword: "تغيير كلمة المرور",
      LogOut: "تسجيل خروج",
    },
  };
  return CONTENT[lang];
};

export const tutorRevenueContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Revenue: "My Payments",
      ssCommission: "SS %",
      ssAmount: "SS Amount",
      Notifications: "Notifications",
      TotalEarns: "Total Sales",
      LiveClassEarn: "Live Class Sales",
      CourseEarn: "Course Sales",
      PayoutAmount: "Payout Amount",
      Date: "Date",
      ProcessPayouts: "Process Payouts",
      MyDueBalance: "Due Balance",
      viewDetails: "view Details",
      ContractMode: "You are in Contract Mode.",
      ReceiveingAmount: "Receiving Amount",
    },
    ar: {
      ReceiveingAmount: "استلام المبلغ",
      ContractMode: "أنت في وضع العقد",
      Revenue: "الإيرادات الخاصة بي",
      ssCommission: "سس٪",
      ssAmount: "مبلغ سس",
      TotalEarns: "إجمالي المبيعات",
      LiveClassEarn: "مبيعات الدروس المباشرة",
      CourseEarn: "مبيعات الدورات",
      PayoutAmount: "مبلغ السحب",
      Date: "تاريخ",
      ProcessPayouts: "معالجة السحب",
      MyDueBalance: "رصيدي المستحق",
      viewDetails: "عرض التفاصيل",
    },
  };
  return CONTENT[lang];
};
export const studentResponse = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      StudentName: "Student Name",
      classTitle: "Class Name",
      email: "E-mail",
      phone: "Phone Number",
      Response: "Response",
      date: "Date",
    },
    ar: {
      email: "بريد إلكتروني",
      phone: "رقم التليفون",
      StudentName: "أسم الطالب",
      classTitle: "اسم الفئة",
      Response: "إجابة",
      date: "تاريخ",
    },
  };
  return CONTENT[lang];
};
export const studentPanel = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      startQuiz: "Start Quiz",
      quizinfo: "Submit the quiz to view solutions and results.",
      viewSolution: "View Solutions",
      viewResult: "View Results",
      myQuestion: "My Questions",
      Longselfassessment: "Comprehensive Self-Assessment",
      mcqselfassessment: "MCQ Self-Assessment",
      youHavenotans: "You have not answered yet!",
      Quizzes: "Quizzes",
      results: "Results",
      solutions: "Solutions",
      hint: "Hint",
      skillGain: "Skills you can gain",
      viewattachment: "View Attachments",
      Price: "Price",
      Sale: "Sale",
      Enrolled: "Enrolled",
      nocourse: "No Course Found",
      nocourseavailable: "No courses available",
      Course: "Course",
      Experience: "Experience",
      Country: "Country",
      years: "Years",
      notgiven: "Not Given",
      mark: "Mark",
      viewCourse: "View Course",
      viewBundle: "View Bundle",
      Addtocart: "Add to Cart",
      Gotocart: "Go to Cart",
      CourseBundle: "Course Bundle",
      Courses: "Courses",
      FrequentlyBroughtTogether: "Frequently Brought Together",
      ClearFilter: "Clear Filter",
      Bundles: "BUNDLES",
      OverallProgress: "Overall Progress",
      Toearnyourcertificatepleasemakesureto:
        "To earn your certificate, please make sure to",
      Watchallcoursevideos: "Watch all Course Videos",
      Readallstudymaterials: "Read all Study Materials",
      Givethefinaltest: "Give the Final Assignment",
      videomaterialprogress: "Video Material Progress",
      TotalVideos: "Total Videos",
      Youhavewatched: "You have watched",
      outof: "out of",
      videos: "videos",
      Documentprogress: "Document Progress",
      TotalStudyMaterial: "Total Study Material",
      Youhaveread: "You have read",
      documents: "documents",
      linkmaterialprogress: "Link Material Progress",
      Totallinkmaterial: "Total Link Material",
      links: "links",
      FinalExamProgress: "Final Assignment Progress",
      Youhavenotcompletedthefinalexam:
        "You Have not completed the assignment test",
      Youhavepassedthefinalexam: "You have passed the assignment test",
      FinalAssignment: "Final Assignment",
      TestInformation: "Test Information",
      TotalNoofQuestions: "Total No. of Questions",
      PassMarks: "Pass Marks",
      CongratulationsYouhavepassedtheexam:
        "Congratulations! You have passed the exam",
      FinalTestReview: "Assignment Test Review",
      viewFinalAssignment: "View Assignment Solutions",
      viewAssignment: "View Assignment",
      Completethisfinalassignmenttoearnyourcertificate:
        "Complete this final assignment to earn your certificate",
      GiveFinalTest: "Give Assignment Test",
      NOVideoMaterial: "NO Video Material",
      NOStudyMaterial: "NO Study Material",
      NOLinkMaterial: "NO Link Material",
      NoAssignments: "NO Assignments",
      videoMaterial: "Video Materials",
      studyMaterial: "Study Materials",
      AttachedLinks: "Attached Links",
      Noreviewyet: "No Review Yet",
      Clickheretoopenthelink: "Click here to open the link",
      Youneedtopurchasethiscoursetogivethereview:
        "You need to purchase this course to give the review",
      Youneedtopurchasethiscoursetoaccessthevideomaterial:
        "You need to purchase this course to access the video material",
      Youneedtopurchasethiscoursetoaccessthestudymaterial:
        "You need to purchase this course to access the study material",
      Youneedtopurchasethiscoursetoaccessthelinkmaterial:
        "You need to purchase this course to access the link material",
      error: "Error!",
      success: "Success",
      Loginfirst: "Login First to Buy this Course",
      transactionsuccessfull: "Transaction Successfull",
      transactionUnsuccessfull: "Transaction Unsuccessfull",
      pleasewait: "Please Wait...",
      validatingtransaction: "We are validating your transaction",
      congratulation: "Congratulation!",
      Youhavesuccessfullycompletedallthecoursematerials:
        " You have successfully completed all the course materials.",
      Youcannowclickthebuttonbelowtogenerateyourcertificate:
        "You can now click the button below to generate your certificate",
      downloading: "Downloading...",
      DownloadCertificate: "Download Certificate",
      DownloadSuccessfully: "Download Successfully!!",
      testsubmittedsuccessfully: "Test Submitted Successfully",
      youcanreviewresult: "You Can review your results now",
      ErrorSubmittingTest: "Error Submitting Test",
      Thereanissue:
        "There was an issue submitting your test. Please try again.",
      Sorryyouhavenotpassed:
        "Sorry, you have not passed this time. Please try again",
      AccessDenied: "Access Denied",
      Youmustbeloggedintotakethisaction:
        "You must be logged in to take this action.",
      Choosethecorrectanswer: "Choose the correct answer",
      Pleaseanswerallquestionsbeforesubmitting:
        "Please answer all questions before submitting",
      TotalMarks: "Total Marks",
      Youneedtopurchasethiscoursetotakethefinaltest:
        "You need to purchase this course to take the assignment test",
      YouneedtopurchasethiscoursetoAskQuestions:
        "You need to purchase this course to ask questions.",
      Submitting: "Submitting",
      SubmitTest: "Submit Test",
      assignmentresults: "Assignment Results",
      TestReview: "Test Review",
      TestResults: "Test Results",
      TotalQuestions: "Total Questions",
      ObtainedMarks: "Obtained Marks",
      correctAnswer: "Correct Answer",
      Percentage: "Percentage",
      assignment: "Assignment",
      AssignmentReview: "Assignment Review",
      NoQuestion: "No Questions",
      ReviewQA: "Review Q&A",
      Marks: "Marks",
      Answer: "Answer",
      youneedtopurchasethiscoursetopracticetheassignment:
        "You need to purchase this course to practice the assignment",
      practiceAssignment: "Assignment",
      freepreviewmaterial: "Free Preview Materials",
    },
    ar: {
      startQuiz: "بدء الاختبار",
      quizinfo: "قدم الاختبار لعرض الحلول والنتائج.",
      viewSolution: "عرض الحلول",
      viewResult: "عرض النتائج",
      myQuestion: "أسئلتي",
      Longselfassessment: "التقييم الذاتي الشامل",
      mcqselfassessment: "التقييم الذاتي MCQ",
      youHavenotans: "لم تجب بعد!",
      correctAnswer: "اجابة صحيحة",
      Quizzes: "الإختبارات",
      results: "نتائج",
      solutions: "حلول",
      hint: "تَلمِيح",
      skillGain: "المهارات التي يمكنك اكتسابها",
      viewattachment: "عرض المرفقات",
      youneedtopurchasethiscoursetopracticetheassignment:
        "تحتاج إلى شراء هذه الدورة لممارسة المهمة",
      practiceAssignment: "مهمة الممارسة",
      freepreviewmaterial: "مواد معاينة مجانية",
      AssignmentReview: "مراجعة المهمة",
      NoQuestion: "لا أسئلة",
      ReviewQA: "مراجعة الأسئلة والأجوبة",
      Marks: "ماركس",
      Answer: "إجابة",
      Youneedtopurchasethiscoursetotakethefinaltest:
        "تحتاج إلى شراء هذه الدورة لإجراء الاختبار النهائي",
      YouneedtopurchasethiscoursetoAskQuestions:
        "تحتاج إلى شراء هذه الدورة لطرح الأسئلة.",
      Submitting: "تقديم",
      SubmitTest: "تقديم اختبار",
      assignmentresults: "نتائج المهمة",
      TestReview: "مراجعة الاختبار",
      TestResults: "نتائج الإختبار",
      TotalQuestions: "مجموع الأسئلة",
      ObtainedMarks: "العلامات التي تم الحصول عليها",
      Percentage: "نسبة مئوية",
      assignment: "تكليف",
      Choosethecorrectanswer: "اختر الاجابة الصحيحة",
      Pleaseanswerallquestionsbeforesubmitting:
        "يرجى الإجابة على جميع الأسئلة قبل الإرسال",
      AccessDenied: "تم الرفض",
      Youmustbeloggedintotakethisaction:
        "يجب عليك تسجيل الدخول لاتخاذ هذا الإجراء.",
      Sorryyouhavenotpassed: "عذرا، لم تمر هذه المرة. حاول مرة اخرى.",
      testsubmittedsuccessfully: "تم إرسال الاختبار بنجاح",
      youcanreviewresult: "يمكنك مراجعة نتائجك الآن",
      ErrorSubmittingTest: "خطأ في إرسال الاختبار",
      Thereanissue: "حدثت مشكلة أثناء إرسال الاختبار. حاول مرة اخرى.",
      congratulation: "تهنئة!",
      Youhavesuccessfullycompletedallthecoursematerials:
        "لقد أكملت بنجاح جميع المواد الدراسية.",
      Youcannowclickthebuttonbelowtogenerateyourcertificate:
        "يمكنك الآن النقر فوق الزر أدناه لإنشاء شهادتك",
      downloading: "جارى التحميل...",
      DownloadCertificate: "تحميل الشهادة",
      DownloadSuccessfully: "تم التحميل بنجاح!!",
      error: "خطأ!",
      success: "نجاح",
      Loginfirst: "قم بتسجيل الدخول أولا لشراء هذه الدورة",
      transactionsuccessfull: "الصفقة ناجحة",
      transactionUnsuccessfull: "الصفقة غير ناجحة",
      pleasewait: "انتظر من فضلك...",
      validatingtransaction: "نحن نقوم بالتحقق من صحة معاملتك",
      Price: "سعر",
      Enrolled: "المقيدين",
      Clickheretoopenthelink: "انقر هنا لفتح الرابط",
      mark: "علامة",
      Sale: "أُوكَازيُون",
      nocourse: "لم يتم العثور على دورة تدريبية",
      nocourseavailable: "لا توجد دورات متاحة",
      Course: "دورة",
      Experience: "خبرة",
      Country: "دولة",
      years: "سنين",
      notgiven: "غير معطى",
      viewCourse: "عرض الدورة",
      viewBundle: "عرض الحزمة",
      Addtocart: "أضف إلى السلة",
      Gotocart: "اذهب إلى سلة التسوق",
      CourseBundle: "حزمة الدورة",
      Courses: "الدورات",
      FrequentlyBroughtTogether: "كثيرا ما يتم جمعها معا",
      ClearFilter: "مرشح واضح",
      Bundles: "حزم",
      OverallProgress: "التقدم العام",
      Toearnyourcertificatepleasemakesureto:
        "للحصول على شهادتك، يرجى التأكد من ذلك",
      Watchallcoursevideos: "شاهد جميع فيديوهات الدورة",
      Readallstudymaterials: "قراءة جميع المواد الدراسية",
      Givethefinaltest: "إعطاء المهمة النهائية",
      videomaterialprogress: "تقدم مواد الفيديو",
      TotalVideos: "إجمالي مقاطع الفيديو",
      Youhavewatched: "لقد شاهدت",
      outof: "بعيدا عن المكان",
      videos: "أشرطة فيديو",
      Documentprogress: "تقدم الوثيقة",
      TotalStudyMaterial: "إجمالي المواد الدراسية",
      Youhaveread: "كنت قد قرأت",
      documents: "وثائق",
      linkmaterialprogress: "رابط تقدم المواد",
      Totallinkmaterial: "إجمالي مواد الارتباط",
      links: "الروابط",
      FinalExamProgress: "تقدم الامتحان النهائي",
      Youhavenotcompletedthefinalexam: "لم تكمل الامتحان النهائي",
      Youhavepassedthefinalexam: "لقد اجتزت الاختبار النهائي",
      FinalAssignment: "تقييم ذاتى",
      TestInformation: "معلومات الاختبار",
      TotalNoofQuestions: "إجمالي عدد الأسئلة",
      TotalMarks: "مجموع علامات",
      PassMarks: "علامة مرور",
      CongratulationsYouhavepassedtheexam: "تهانينا! لقد اجتزت الامتحان",
      FinalTestReview: "مراجعة الاختبار النهائي",
      viewFinalAssignment: "عرض الواجب النهائي",
      viewAssignment: "عرض الواجب",
      Completethisfinalassignmenttoearnyourcertificate:
        "أكمل هذا التقييم الذاتي لتحصل على شهادتك",
      GiveFinalTest: "إعطاء الاختبار النهائي",
      NOVideoMaterial: "لا توجد مواد فيديو",
      NOStudyMaterial: "لا توجد مواد دراسية",
      NOLinkMaterial: "لا يوجد رابط للمواد",
      NoAssignments: "لا المهام",
      videoMaterial: "مواد الفيديو",
      studyMaterial: "مواد دراسية",
      AttachedLinks: "الروابط المرفقة",
      Noreviewyet: "لا يوجد مراجعة بعد",
      Youneedtopurchasethiscoursetogivethereview:
        "تحتاج إلى شراء هذه الدورة لإعطاء المراجعة",
      Youneedtopurchasethiscoursetoaccessthevideomaterial:
        "تحتاج إلى شراء هذه الدورة للوصول إلى مواد الفيديو",
      Youneedtopurchasethiscoursetoaccessthestudymaterial:
        "تحتاج إلى شراء هذه الدورة للوصول إلى المواد الدراسية",
      Youneedtopurchasethiscoursetoaccessthelinkmaterial:
        "تحتاج إلى شراء هذه الدورة للوصول إلى مواد الرابط",
    },
  };
  return CONTENT[lang];
};

//?  tutor  use menu items page LANGUAGE
export const tutorUseMenuItemsContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Dashboard: "Dashboard",
      Revenue: "My Payments",
      Students: "Students",
      Courses: "Courses",
      ManageCourses: "Manage Courses",
      ManageBundles: "Manage Bundles",
      Assignments: "Assignments",
      ViewAllAssignments: "View All Assignments",
      SubmittedAssignments: "Submitted Assignments",
      LiveClass: "Live Class",
      UpcomingClasses: "Upcoming Classes",
      PastClasses: "Past Classes",
      Settings: "Settings",
      MyProfile: "My Profile",
      Notifications: "Notifications",
      ChangePassword: "Change Password",
      LogOut: "Log Out",
      courseStatistics: "Course Statistics",
      studentResponse: "Student Response",
    },
    ar: {
      studentResponse: "استجابة الطالب",
      Dashboard: "لوحة القيادة",
      courseStatistics: "إحصائيات الدورة",
      Revenue: "الإيرادات الخاصة بي",
      Students: "طلاب",
      Courses: "الدورات",
      ManageCourses: "إدارة الدورات",
      ManageBundles: "إدارة الحزم",
      Assignments: "تعيينات",
      ViewAllAssignments: "عرض جميع المهام",
      SubmittedAssignments: "المهام المقدمة",
      LiveClass: "فئة حية",
      UpcomingClasses: "الفصول القادمة",
      PastClasses: "الفصول السابقة",
      Settings: "إعدادات",
      MyProfile: "ملفي",
      Notifications: "إشعارات",
      ChangePassword: "تغيير كلمة المرور",
      LogOut: "تسجيل خروج",
    },
  };
  return CONTENT[lang];
};

//?  tutor panel tutor navbar page LANGUAGE
export const tutorNavbarContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      TutorNameHere: "Tutor Name Here",
      MyProfile: "My Profile",
      ChangePassword: "Change Password",
      LogOut: "Log Out",
    },
    ar: {
      TutorNameHere: "اسم المسؤول هنا",
      MyProfile: "ملفي",
      ChangePassword: "تغيير كلمة المرور",
      LogOut: "تسجيل خروج",
    },
  };
  return CONTENT[lang];
};

//?  admin  student detail page LANGUAGE
export const tutorStudentDetailContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      StudentDetails: " Student details",
      Name: "Name",
      Email: "Email",
      Course: "Course",
      Country: "Country",
      Phone: "Phone",
      Date: "Date",
      AllCoursesPurchasedByTheStudent: "All Courses purchased by the student",
      courseName: "Course Name",
      Description: "Description",
      Timestamp: "Timestamp",
      Price: "Price($)",
    },
    ar: {
      StudentDetails: " تفاصيل الطالب",
      Name: "اسم",
      Email: "بريد إلكتروني",
      Course: "دورة",
      Country: "دولة",
      Phone: "هاتف",
      Date: "تاريخ",
      AllCoursesPurchasedByTheStudent: "جميع الدورات التي اشتراها الطالب",
      courseName: "اسم الدورة التدريبية",
      Description: "وصف",
      Timestamp: "الطابع الزمني",
      Price: "السعر($)",
    },
  };
  return CONTENT[lang];
};

//?  admin  student detail page LANGUAGE
export const loadingContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      Adding: "Adding",
      Updating: "Updating",
      Submitting: "Submitting",
      Update: "Update",
    },
    ar: {
      Adding: "إضافة",
      Update: "تحديث",
      Updating: "تحديث",
      Submitting: "تقديم",
    },
  };
  return CONTENT[lang];
};

export const tutorCourseDetailContent = (lang: LanguageType) => {
  const CONTENT = {
    en: {
      CourseDetails: " Course details",
      studentCount: "Total Students",
      createDate: "Created On",
      studentList: "Students List",
      Name: "Name",
      Email: "Email",
      Course: "Course",
      Country: "Country",
      Phone: "Phone",
      Time: "Time",
      Date: "Date",
      Price: "Price($)",
      totalSale: "Total Sales($)",
      status: "Status",
      purchaseDate: "Purchase Date",
      AllCoursesPurchasedByTheStudent: "All Courses purchased by the student",
      courseName: "Course Name",
      Description: "Description",
      Timestamp: "Timestamp",
      Category: "Category",
      subCategory: "Sub-Category",
      Language: "Language",
      viewall: "View All Lessons",
      viewStudents: "View All Students",
      viewResponses: "View Responses",
      deletecourse: "Delete Course",
      response: "Response",
    },
    ar: {
      response: "إجابة",
      viewResponses: "عرض الردود",
      viewStudents: "عرض جميع الطلاب",
      Category: "فئة",
      subCategory: "تصنيف فرعي",
      Language: "لغة",
      viewall: "عرض جميع الدروس",
      deletecourse: "حذف الدورة",
      Price: "السعر($)",
      totalSale: "إجمالي المبيعات($)",
      CourseDetails: "تفاصيل الدورة",
      studentCount: "إجمالي الطلاب",
      createDate: "تم إنشاؤها على",
      studentList: "قائمة الطلاب",
      status: "حالة",
      purchaseDate: "تاريخ الشراء",
      Name: "اسم",
      Email: "بريد إلكتروني",
      Course: "دورة",
      Country: "دولة",
      Phone: "هاتف",
      Time: "وقت",
      Date: "تاريخ",
      AllCoursesPurchasedByTheStudent: "جميع الدورات التي اشتراها الطالب",
      courseName: "اسم الدورة التدريبية",
      Description: "وصف",
      Timestamp: "الطابع الزمني",
    },
  };
  return CONTENT[lang];
};

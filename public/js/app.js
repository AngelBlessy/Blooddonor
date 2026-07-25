const toastEl = document.querySelector('#toast');
const modalEl = document.querySelector('#modal');
const notifyPopupEl = document.querySelector('#notifyPopup');
const notifyPopupTitle = document.querySelector('#notifyPopupTitle');
const notifyPopupText = document.querySelector('#notifyPopupText');
const navLinks = document.querySelector('#navLinks');
const languageSelect = document.querySelector('#languageSelect');
const themeButton = document.querySelector('#themeButton');
const adminLoginButton = document.querySelector('#adminLogin');
const adminIntegration = document.querySelector('#adminIntegration');
const profileButton = document.querySelector('#profileButton');
const authModal = document.querySelector('#authModal');
const registerButton = document.querySelector('#registerDonor');
const loginButton = document.querySelector('#loginUser');
const closeAuthModalButton = document.querySelector('#closeAuthModal');
const registerForm = document.querySelector('#registerForm');
const loginForm = document.querySelector('#loginForm');
const otpForm = document.querySelector('#otpForm');
const otpTimerEl = document.querySelector('#otpTimer');
const otpMessageEl = document.querySelector('#otpMessage');
const resendOtpButton = document.querySelector('#resendOtp');
const registerPopup = document.querySelector('#registerPopup');
const closeRegisterPopupButton = document.querySelector('#closeRegisterPopup');
const lastDonationWrap = document.querySelector('#lastDonationWrap');
const travelToggle = document.querySelector('#travelToggle');
const travelModeStatement = document.querySelector('#travelModeStatement');
const logoutButton = document.querySelector('#logoutButton');
const profileBackButton = document.querySelector('#profileBackButton');
const profilePage = document.querySelector('#profilePage');
const hospitalPage = document.querySelector('#hospitalPage');
const hospitalNavLink = document.querySelector('#hospitalNavLink');
const hospitalBackButton = document.querySelector('#hospitalBackButton');
const hospitalNewRequest = document.querySelector('#hospitalNewRequest');
const hospitalRequestForm = document.querySelector('#hospitalRequestForm');
const hospitalRequestList = document.querySelector('#hospitalRequestList');
const hospitalOpenRequests = document.querySelector('#hospitalOpenRequests');
const hospitalUnitsNeeded = document.querySelector('#hospitalUnitsNeeded');
const hospitalDonorsMatched = document.querySelector('#hospitalDonorsMatched');
const bloodBankPage = document.querySelector('#bloodBankPage');
const bloodBankNavLink = document.querySelector('#bloodBankNavLink');
const bloodBankBackButton = document.querySelector('#bloodBankBackButton');
const bloodBankForm = document.querySelector('#bloodBankForm');
const inventoryGrid = document.querySelector('#inventoryGrid');
const adminPage = document.querySelector('#adminPage');
const adminNavLink = document.querySelector('#adminNavLink');
const adminBackButton = document.querySelector('#adminBackButton');
const adminDonors = document.querySelector('#adminDonors');
const adminRequests = document.querySelector('#adminRequests');
const adminLowStock = document.querySelector('#adminLowStock');
const adminAlertList = document.querySelector('#adminAlertList');
const adminRequestList = document.querySelector('#adminRequestList');
const profileTitle = document.querySelector('#profileTitle');
const profileSubtitle = document.querySelector('#profileSubtitle');
const profileRole = document.querySelector('#profileRole');
const profileName = document.querySelector('#profileName');
const profileEmail = document.querySelector('#profileEmail');
const profilePhone = document.querySelector('#profilePhone');
const profileBloodGroup = document.querySelector('#profileBloodGroup');
const profileAge = document.querySelector('#profileAge');
const profileDonationDate = document.querySelector('#profileDonationDate');
const profileTravelStatus = document.querySelector('#profileTravelStatus');
const travelCard = document.querySelector('#travelCard');
const donorAlertCard = document.querySelector('#donorAlertCard');
const donorAlertList = document.querySelector('#donorAlertList');
const liveCounter = document.querySelector('#liveCounter');
const liveRequestTitle = document.querySelector('#liveRequestTitle');
const liveRequestDetails = document.querySelector('#liveRequestDetails');
const liveDonorList = document.querySelector('#liveDonorList');
const liveAlertStatus = document.querySelector('#liveAlertStatus');
const registerName = document.querySelector('#registerName');
const registerAge = document.querySelector('#registerAge');
const registerPhone = document.querySelector('#registerPhone');
const registerEmail = document.querySelector('#registerEmail');
const registerPassword = document.querySelector('#registerPassword');
const registerConfirmPassword = document.querySelector('#registerConfirmPassword');
const registerBloodGroup = document.querySelector('#registerBloodGroup');
const lastDonationDate = document.querySelector('#lastDonationDate');
const registerMessage = document.querySelector('#registerMessage');
const passwordMatchMessage = document.querySelector('#passwordMatchMessage');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const otpInput = document.querySelector('#otpInput');
const sendEmailOtpButton = document.querySelector('#sendEmailOtp');
const verifyEmailOtpButton = document.querySelector('#verifyEmailOtp');
const emailOtpInput = document.querySelector('#emailOtpInput');
const emailVerifyStatus = document.querySelector('#emailVerifyStatus');
const sendPhoneOtpButton = document.querySelector('#sendPhoneOtp');
const verifyPhoneOtpButton = document.querySelector('#verifyPhoneOtp');
const phoneOtpInput = document.querySelector('#phoneOtpInput');
const phoneVerifyStatus = document.querySelector('#phoneVerifyStatus');
const forgotPasswordLink = document.querySelector('#forgotPasswordLink');
const forgotForm = document.querySelector('#forgotForm');
const forgotIdentifier = document.querySelector('#forgotIdentifier');
const sendForgotOtpButton = document.querySelector('#sendForgotOtp');
const forgotOtpInput = document.querySelector('#forgotOtpInput');
const forgotVerifyStatus = document.querySelector('#forgotVerifyStatus');
const forgotPassword = document.querySelector('#forgotPassword');
const forgotConfirmPassword = document.querySelector('#forgotConfirmPassword');
const forgotMessage = document.querySelector('#forgotMessage');
let toastTimer;
let currentLanguage = 'en';
const themeOrder = ['light', 'dark', 'comfort'];
const otpValidityMs = 10 * 60 * 1000;
const otpResendDelayMs = 30 * 1000;
const storedUsersKey = 'bloodnet.users';
const sessionKey = 'bloodnet.session';
const resetUsersKey = 'bloodnet.users.reset.v2';
const hospitalRequestsKey = 'bloodnet.hospitalRequests';
const inventoryKey = 'bloodnet.inventory';
const otpState = {
  hash: '',
  salt: '',
  expiresAt: 0,
  resendAt: 0,
  userKey: '',
  mode: '',
  target: ''
};
let otpCountdownTimer;
let resendCountdownTimer;
let users = [];
let currentSession = null;
let hospitalRequests = [];
let inventory = [];
const verificationState = {
  email: { verified: false, target: '', hash: '', salt: '', expiresAt: 0, resendAt: 0 },
  phone: { verified: false, target: '', hash: '', salt: '', expiresAt: 0, resendAt: 0 },
  forgot: { verified: false, target: '', hash: '', salt: '', expiresAt: 0, resendAt: 0 }
};

const baseStrings = {
  navHome: 'Home',
  navFeatures: 'Features',
  navRoles: 'Roles',
  navFaq: 'FAQ',
  brandTag: 'Smart Blood Donor Network',
  langLabel: 'Language',
  headerRequest: 'Raise request',
  adminLogin: 'Admin login',
  adminLogout: 'Admin logout',
  ctaRegister: 'Register donor',
  ctaLogin: 'Login',
  heroPill: '<i class="dot"></i> AI-powered - Real-time',
  heroTitle: 'Every second counts.',
  heroDesc: 'An AI-powered network connecting donors, hospitals, and blood banks so the right donor is found in seconds, not hours.',
  ctaPrimary: 'Emergency notification',
  statDonors: 'Active donors',
  statHospitals: 'Partner hospitals',
  statLives: 'Lives impacted',
  statResponse: 'Avg. response',
  criticalTag: '<i class="dot"></i> Critical request - 2 min ago',
  liveTag: 'Live',
  liveTitle: "St. Martha's Hospital - O+ blood",
  liveDesc: '2 units - 3.2 km away',
  notifyTop: 'Notify top donors',
  featuresEyebrow: 'Built for life-or-death moments',
  featuresTitle: 'Ten capabilities. One coordinated response.',
  feature1Title: 'Emergency Alerts',
  feature1Desc: 'Push notifications reach top-ranked donors the instant a request is raised.',
  feature2Title: 'AI Availability Prediction',
  feature2Desc: 'Availability scoring helps estimate who is most likely to respond now.',
  feature3Title: 'Priority Ranking',
  feature3Desc: 'Weighted by distance, recency, response history, and the AI signal.',
  feature4Title: 'History & Badges',
  feature4Desc: 'Donation milestones, certificates, and recognition for consistent donors.',
  feature5Title: 'Map Search',
  feature5Desc: 'Find nearby donors within a radius, ranked by relevance instead of random order.',
  feature6Title: 'Admin Analytics',
  feature6Desc: 'Monitor demand, fulfilment speed, and donor retention from one dashboard.',
  rolesEyebrow: 'One platform - Four roles',
  rolesTitle: 'Focused experience for every role.',
  role1Title: 'Receive alerts and track impact',
  role1Mark: 'Donor',
  role1Desc: 'See matched requests, respond quickly, and keep your donation history visible.',
  role2Title: 'Raise emergencies instantly',
  role2Mark: 'Hospital',
  role2Desc: 'Trigger a request, match eligible donors, and follow the response in real time.',
  role3Title: 'Manage live inventory',
  role3Mark: 'Blood Bank',
  role3Desc: 'Track blood units, monitor supply pressure, and coordinate fulfilment across hospitals.',
  role4Title: 'See the whole network',
  role4Mark: 'Admin',
  role4Desc: 'Use live metrics, retention insights, and regional activity to keep the system responsive.',
  faqTitle: 'Top 5 FAQ',
  faq1Question: 'How does BloodNet help during an emergency?',
  faq1Answer: 'BloodNet reduces search time by allowing a hospital to raise a request, find suitable nearby donors, and send alerts quickly. The aim is to move from phone calls and manual lists to a single response flow that is faster to track.',
  faq2Question: 'Who can use this platform?',
  faq2Answer: 'The platform is designed for donors, hospitals, blood banks, and administrators. Donors receive alerts, hospitals raise urgent requests, blood banks manage availability, and admins monitor the whole network.',
  faq3Question: 'How are donors selected for a request?',
  faq3Answer: 'Donors are shortlisted using blood group suitability, distance, recent donation history, and likely availability. This helps the request reach people who are more relevant instead of sending the same alert to everyone.',
  faq4Question: 'Which blood groups are compatible?',
  faq4Answer: 'Compatibility depends on the patient blood group. The table below shows common red blood cell receiving rules used for matching.',
  faq5Question: 'How are emergency notifications sent?',
  faq5Answer: 'When a request is created, top matched donors can receive a notification immediately. SMS or WhatsApp can act as backup channels, so the alert still has a route even if one channel is missed.',
  compatNeed: 'Patient needs',
  compatReceive: 'Can receive from',
  footerBrandDesc: 'Smart Blood Donor Network',
  footerTeam: 'Project Team',
  team1: 'Angel Blessy (2547213)',
  team2: 'Enrita Fernandes (2547223)',
  footerLinks: 'Quick Links',
  footerLink1: 'Features',
  footerLink2: 'Roles',
  modalTitle: 'Raise emergency request',
  modalDesc: 'This demo simulates the hospital-to-donor workflow.',
  fieldTitle: 'Patient detail',
  fieldTitlePlaceholder: 'e.g. Patient name, ward, hospital',
  fieldBloodGroup: 'Blood group',
  fieldUnits: 'Quantity needed',
  modalSubmit: 'Notify matched donors',
  notifyPopupKicker: 'Notification',
  notifyPopupTitle: 'Donors notified',
  notifyPopupDesc: 'The top matched donors have been notified for the current request.',
  authTitle: 'Register or sign in',
  authSubtitle: 'Registration OTP is sent to email and phone. Login uses your role, email, and password.',
  registerTab: 'Registration',
  loginTab: 'Login',
  registerSubmit: 'Send OTP',
  loginSubmit: 'Login',
  otpSubmit: 'Verify OTP',
  otpHint: 'Enter the OTP sent to your email and phone.',
  verifySuccess: 'OTP verified successfully.',
  otpExpired: 'OTP expired. Please request a new one.',
  profileHeading: 'Welcome back',
  profileSubtitle: 'Your verified account details are shown below.',
  profileAccount: 'Account details',
  profileRoleLabel: 'Role',
  profileNameLabel: 'Name',
  profileEmailLabel: 'Email',
  profilePhoneLabel: 'Phone',
  profileBloodLabel: 'Blood group',
  profileAgeLabel: 'Age',
  profileDonationLabel: 'Last donation date',
  profileTravelLabel: 'Travel mode',
  travelCardTitle: 'Travel mode',
  travelCardText: 'If you are travelling, you will not receive emergency notification for donation.',
  travelOn: 'Travel mode: On',
  travelOff: 'Travel mode: Off',
  logoutText: 'Logout',
  registerToast: 'Registration OTP sent to email and phone.',
  loginToast: 'Login successful.',
  invalidOtp: 'Invalid OTP. Check the code and try again.',
  duplicateUser: 'This email or phone already exists.',
  profileLoaded: 'Profile loaded successfully.',
  toastTravelOn: 'Travel mode enabled. Emergency notifications are paused.',
  toastTravelOff: 'Travel mode disabled. Emergency notifications will resume.',
  toastNoAccount: 'No matching account found.',
  toastOtpResent: 'OTP resent.',
  toastNotify: 'Top matched donors notified.',
  toastRequest: 'Emergency request sent.'
};

const translations = {
  en: baseStrings,
  hi: {
    navHome: 'à¤¹à¥‹à¤®', navFeatures: 'à¤µà¤¿à¤¶à¥‡à¤·à¤¤à¤¾à¤à¤‚', navRoles: 'à¤­à¥‚à¤®à¤¿à¤•à¤¾à¤à¤‚', navFaq: 'FAQ', brandTag: 'à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾ à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤•', langLabel: 'à¤­à¤¾à¤·à¤¾', headerRequest: 'à¤…à¤¨à¥à¤°à¥‹à¤§ à¤­à¥‡à¤œà¥‡à¤‚', adminLogin: 'à¤à¤¡à¤®à¤¿à¤¨ à¤²à¥‰à¤—à¤¿à¤¨', adminLogout: 'à¤à¤¡à¤®à¤¿à¤¨ à¤²à¥‰à¤—à¤†à¤‰à¤Ÿ', ctaRegister: 'à¤¦à¤¾à¤¤à¤¾ à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£', ctaLogin: 'à¤²à¥‰à¤—à¤¿à¤¨',
    heroPill: '<i class="dot"></i> AI à¤¸à¤‚à¤šà¤¾à¤²à¤¿à¤¤ - à¤°à¤¿à¤¯à¤² à¤Ÿà¤¾à¤‡à¤®', heroTitle: 'à¤¹à¤° à¤¸à¥‡à¤•à¤‚à¤¡ à¤®à¤¹à¤¤à¥à¤µà¤ªà¥‚à¤°à¥à¤£ à¤¹à¥ˆà¥¤', heroDesc: 'à¤à¤• AI-à¤¸à¤‚à¤šà¤¾à¤²à¤¿à¤¤ à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤• à¤œà¥‹ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾, à¤…à¤¸à¥à¤ªà¤¤à¤¾à¤² à¤”à¤° à¤°à¤•à¥à¤¤ à¤¬à¥ˆà¤‚à¤• à¤•à¥‹ à¤œà¥‹à¤¡à¤¼à¤¤à¤¾ à¤¹à¥ˆ à¤¤à¤¾à¤•à¤¿ à¤¸à¤¹à¥€ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾ à¤œà¤²à¥à¤¦à¥€ à¤®à¤¿à¤² à¤¸à¤•à¥‡à¥¤', ctaPrimary: 'à¤†à¤ªà¤¾à¤¤ à¤¸à¥‚à¤šà¤¨à¤¾',
    statDonors: 'à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾', statHospitals: 'à¤¸à¤¹à¤¯à¥‹à¤—à¥€ à¤…à¤¸à¥à¤ªà¤¤à¤¾à¤²', statLives: 'à¤ªà¥à¤°à¤­à¤¾à¤µà¤¿à¤¤ à¤œà¥€à¤µà¤¨', statResponse: 'à¤”à¤¸à¤¤ à¤ªà¥à¤°à¤¤à¤¿à¤•à¥à¤°à¤¿à¤¯à¤¾', criticalTag: '<i class="dot"></i> à¤—à¤‚à¤­à¥€à¤° à¤…à¤¨à¥à¤°à¥‹à¤§ - 2 à¤®à¤¿à¤¨à¤Ÿ à¤ªà¤¹à¤²à¥‡', liveTag: 'à¤²à¤¾à¤‡à¤µ', notifyTop: 'à¤¶à¥€à¤°à¥à¤· à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‹ à¤¸à¥‚à¤šà¤¿à¤¤ à¤•à¤°à¥‡à¤‚',
    featuresEyebrow: 'à¤†à¤ªà¤¾à¤¤ à¤•à¥à¤·à¤£à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾', featuresTitle: 'à¤à¤• à¤¹à¥€ à¤ªà¥à¤°à¤£à¤¾à¤²à¥€ à¤®à¥‡à¤‚ à¤¤à¥‡à¤œ à¤…à¤¨à¥à¤°à¥‹à¤§, à¤®à¤¿à¤²à¤¾à¤¨, à¤¸à¥‚à¤šà¤¨à¤¾ à¤”à¤° à¤Ÿà¥à¤°à¥ˆà¤•à¤¿à¤‚à¤—à¥¤', feature1Title: 'à¤†à¤ªà¤¾à¤¤ à¤…à¤²à¤°à¥à¤Ÿ', feature1Desc: 'à¤…à¤¨à¥à¤°à¥‹à¤§ à¤¬à¤¨à¤¤à¥‡ à¤¹à¥€ à¤‰à¤ªà¤¯à¥à¤•à¥à¤¤ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤¤à¤• à¤¸à¥‚à¤šà¤¨à¤¾ à¤ªà¤¹à¥à¤‚à¤šà¤¤à¥€ à¤¹à¥ˆà¥¤', feature2Title: 'à¤‰à¤ªà¤²à¤¬à¥à¤§à¤¤à¤¾ à¤…à¤¨à¥à¤®à¤¾à¤¨', feature2Desc: 'à¤¸à¥à¤•à¥‹à¤°à¤¿à¤‚à¤— à¤¸à¥‡ à¤ªà¤¤à¤¾ à¤šà¤²à¤¤à¤¾ à¤¹à¥ˆ à¤•à¤¿ à¤…à¤­à¥€ à¤•à¥Œà¤¨ à¤œà¤µà¤¾à¤¬ à¤¦à¥‡ à¤¸à¤•à¤¤à¤¾ à¤¹à¥ˆà¥¤', feature3Title: 'à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾ à¤•à¥à¤°à¤®', feature3Desc: 'à¤¦à¥‚à¤°à¥€, à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤”à¤° à¤‰à¤ªà¤²à¤¬à¥à¤§à¤¤à¤¾ à¤•à¥‡ à¤†à¤§à¤¾à¤° à¤ªà¤° à¤•à¥à¤°à¤® à¤¬à¤¨à¤¾à¤¯à¤¾ à¤œà¤¾à¤¤à¤¾ à¤¹à¥ˆà¥¤', feature4Title: 'à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤”à¤° à¤¬à¥ˆà¤œ', feature4Desc: 'à¤¦à¤¾à¤¨ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸, à¤ªà¥à¤°à¤®à¤¾à¤£à¤ªà¤¤à¥à¤° à¤”à¤° à¤¨à¤¿à¤¯à¤®à¤¿à¤¤ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥€ à¤ªà¤¹à¤šà¤¾à¤¨à¥¤', feature5Title: 'à¤®à¥ˆà¤ª à¤–à¥‹à¤œ', feature5Desc: 'à¤ªà¤¾à¤¸ à¤•à¥‡ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‹ à¤¦à¥‚à¤°à¥€ à¤”à¤° à¤ªà¥à¤°à¤¾à¤¸à¤‚à¤—à¤¿à¤•à¤¤à¤¾ à¤¸à¥‡ à¤–à¥‹à¤œà¥‡à¤‚à¥¤', feature6Title: 'à¤à¤¡à¤®à¤¿à¤¨ à¤µà¤¿à¤¶à¥à¤²à¥‡à¤·à¤£', feature6Desc: 'à¤®à¤¾à¤‚à¤—, à¤ªà¥‚à¤°à¥à¤¤à¤¿ à¤—à¤¤à¤¿ à¤”à¤° à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾ à¤ªà¥à¤°à¤¤à¤¿à¤§à¤¾à¤°à¤£ à¤¦à¥‡à¤–à¥‡à¤‚à¥¤',
    rolesEyebrow: 'à¤à¤• à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¥‰à¤°à¥à¤® - à¤šà¤¾à¤° à¤­à¥‚à¤®à¤¿à¤•à¤¾à¤à¤‚', rolesTitle: 'à¤¹à¤° à¤‰à¤ªà¤¯à¥‹à¤—à¤•à¤°à¥à¤¤à¤¾ à¤•à¥‹ à¤‰à¤¸à¤•à¥€ à¤­à¥‚à¤®à¤¿à¤•à¤¾ à¤•à¥‡ à¤…à¤¨à¥à¤¸à¤¾à¤° à¤…à¤¨à¥à¤­à¤µ à¤®à¤¿à¤²à¤¤à¤¾ à¤¹à¥ˆà¥¤', role1Title: 'à¤…à¤²à¤°à¥à¤Ÿ à¤ªà¤¾à¤à¤‚ à¤”à¤° à¤ªà¥à¤°à¤­à¤¾à¤µ à¤¦à¥‡à¤–à¥‡à¤‚', role1Mark: 'à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾', role1Desc: 'à¤®à¤¿à¤²à¥‡ à¤¹à¥à¤ à¤…à¤¨à¥à¤°à¥‹à¤§ à¤¦à¥‡à¤–à¥‡à¤‚, à¤œà¤²à¥à¤¦à¥€ à¤œà¤µà¤¾à¤¬ à¤¦à¥‡à¤‚ à¤”à¤° à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤¸à¤‚à¤­à¤¾à¤²à¥‡à¤‚à¥¤', role2Title: 'à¤¤à¥à¤°à¤‚à¤¤ à¤†à¤ªà¤¾à¤¤ à¤…à¤¨à¥à¤°à¥‹à¤§ à¤­à¥‡à¤œà¥‡à¤‚', role2Mark: 'à¤…à¤¸à¥à¤ªà¤¤à¤¾à¤²', role2Desc: 'à¤…à¤¨à¥à¤°à¥‹à¤§ à¤¬à¤¨à¤¾à¤à¤‚, à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‹ à¤®à¤¿à¤²à¤¾à¤à¤‚ à¤”à¤° à¤ªà¥à¤°à¤¤à¤¿à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤¦à¥‡à¤–à¥‡à¤‚à¥¤', role3Title: 'à¤²à¤¾à¤‡à¤µ à¤­à¤‚à¤¡à¤¾à¤° à¤¸à¤‚à¤­à¤¾à¤²à¥‡à¤‚', role3Mark: 'à¤°à¤•à¥à¤¤ à¤¬à¥ˆà¤‚à¤•', role3Desc: 'à¤°à¤•à¥à¤¤ à¤¯à¥‚à¤¨à¤¿à¤Ÿ, à¤•à¤®à¥€ à¤”à¤° à¤…à¤¸à¥à¤ªà¤¤à¤¾à¤²à¥‹à¤‚ à¤•à¥‡ à¤¸à¤®à¤¨à¥à¤µà¤¯ à¤•à¥‹ à¤Ÿà¥à¤°à¥ˆà¤• à¤•à¤°à¥‡à¤‚à¥¤', role4Title: 'à¤ªà¥‚à¤°à¤¾ à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤• à¤¦à¥‡à¤–à¥‡à¤‚', role4Mark: 'à¤à¤¡à¤®à¤¿à¤¨', role4Desc: 'à¤®à¥€à¤Ÿà¥à¤°à¤¿à¤• à¤”à¤° à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿ à¤¸à¥‡ à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤• à¤•à¥‹ à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤°à¤–à¥‡à¤‚à¥¤',
    faqTitle: 'à¤¶à¥€à¤°à¥à¤· 5 FAQ', faq1Question: 'à¤†à¤ªà¤¾à¤¤ à¤¸à¥à¤¥à¤¿à¤¤à¤¿ à¤®à¥‡à¤‚ BloodNet à¤•à¥ˆà¤¸à¥‡ à¤®à¤¦à¤¦ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ?', faq1Answer: 'BloodNet à¤…à¤¸à¥à¤ªà¤¤à¤¾à¤² à¤•à¥‹ à¤…à¤¨à¥à¤°à¥‹à¤§ à¤¬à¤¨à¤¾à¤¨à¥‡, à¤ªà¤¾à¤¸ à¤•à¥‡ à¤‰à¤ªà¤¯à¥à¤•à¥à¤¤ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‹ à¤–à¥‹à¤œà¤¨à¥‡ à¤”à¤° à¤¤à¥à¤°à¤‚à¤¤ à¤…à¤²à¤°à¥à¤Ÿ à¤­à¥‡à¤œà¤¨à¥‡ à¤®à¥‡à¤‚ à¤®à¤¦à¤¦ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤‡à¤¸à¤¸à¥‡ à¤«à¥‹à¤¨ à¤•à¥‰à¤² à¤”à¤° à¤®à¥ˆà¤¨à¥à¤…à¤² à¤¸à¥‚à¤šà¥€ à¤ªà¤° à¤¨à¤¿à¤°à¥à¤­à¤°à¤¤à¤¾ à¤•à¤® à¤¹à¥‹à¤¤à¥€ à¤¹à¥ˆà¥¤', faq2Question: 'à¤‡à¤¸ à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¥‰à¤°à¥à¤® à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¥Œà¤¨ à¤•à¤° à¤¸à¤•à¤¤à¤¾ à¤¹à¥ˆ?', faq2Answer: 'à¤¯à¤¹ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚, à¤…à¤¸à¥à¤ªà¤¤à¤¾à¤²à¥‹à¤‚, à¤°à¤•à¥à¤¤ à¤¬à¥ˆà¤‚à¤•à¥‹à¤‚ à¤”à¤° à¤à¤¡à¤®à¤¿à¤¨ à¤•à¥‡ à¤²à¤¿à¤ à¤¹à¥ˆà¥¤ à¤¹à¤° à¤­à¥‚à¤®à¤¿à¤•à¤¾ à¤•à¥‹ à¤…à¤ªà¤¨à¥‡ à¤•à¤¾à¤® à¤•à¥‡ à¤…à¤¨à¥à¤¸à¤¾à¤° à¤…à¤²à¤— à¤¦à¥ƒà¤¶à¥à¤¯ à¤®à¤¿à¤²à¤¤à¤¾ à¤¹à¥ˆà¥¤', faq3Question: 'à¤…à¤¨à¥à¤°à¥‹à¤§ à¤•à¥‡ à¤²à¤¿à¤ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾ à¤•à¥ˆà¤¸à¥‡ à¤šà¥à¤¨à¥‡ à¤œà¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚?', faq3Answer: 'à¤°à¤•à¥à¤¤ à¤¸à¤®à¥‚à¤¹, à¤¦à¥‚à¤°à¥€, à¤¹à¤¾à¤² à¤•à¥‡ à¤¦à¤¾à¤¨ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤”à¤° à¤¸à¤‚à¤­à¤¾à¤µà¤¿à¤¤ à¤‰à¤ªà¤²à¤¬à¥à¤§à¤¤à¤¾ à¤•à¥‡ à¤†à¤§à¤¾à¤° à¤ªà¤° à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‹ à¤šà¥à¤¨à¤¾ à¤œà¤¾à¤¤à¤¾ à¤¹à¥ˆà¥¤', faq4Question: 'à¤•à¥Œà¤¨ à¤¸à¥‡ à¤°à¤•à¥à¤¤ à¤¸à¤®à¥‚à¤¹ à¤¸à¤‚à¤—à¤¤ à¤¹à¥ˆà¤‚?', faq4Answer: 'à¤¸à¤‚à¤—à¤¤à¤¤à¤¾ à¤®à¤°à¥€à¤œ à¤•à¥‡ à¤°à¤•à¥à¤¤ à¤¸à¤®à¥‚à¤¹ à¤ªà¤° à¤¨à¤¿à¤°à¥à¤­à¤° à¤•à¤°à¤¤à¥€ à¤¹à¥ˆà¥¤ à¤¨à¥€à¤šà¥‡ à¤¦à¥€ à¤—à¤ˆ à¤¤à¤¾à¤²à¤¿à¤•à¤¾ à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤²à¤¾à¤² à¤°à¤•à¥à¤¤ à¤•à¥‹à¤¶à¤¿à¤•à¤¾ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤à¤¿ à¤¨à¤¿à¤¯à¤® à¤¦à¤¿à¤–à¤¾à¤¤à¥€ à¤¹à¥ˆà¥¤', faq5Question: 'à¤†à¤ªà¤¾à¤¤ à¤¸à¥‚à¤šà¤¨à¤¾à¤à¤‚ à¤•à¥ˆà¤¸à¥‡ à¤­à¥‡à¤œà¥€ à¤œà¤¾à¤¤à¥€ à¤¹à¥ˆà¤‚?', faq5Answer: 'à¤…à¤¨à¥à¤°à¥‹à¤§ à¤¬à¤¨à¤¤à¥‡ à¤¹à¥€ à¤¶à¥€à¤°à¥à¤· à¤®à¤¿à¤²à¤¾à¤¨ à¤µà¤¾à¤²à¥‡ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‹ à¤¸à¥‚à¤šà¤¨à¤¾ à¤®à¤¿à¤²à¤¤à¥€ à¤¹à¥ˆà¥¤ SMS à¤¯à¤¾ WhatsApp à¤¬à¥ˆà¤•à¤…à¤ª à¤šà¥ˆà¤¨à¤² à¤¹à¥‹ à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤', compatNeed: 'à¤®à¤°à¥€à¤œ à¤•à¥‹ à¤šà¤¾à¤¹à¤¿à¤', compatReceive: 'à¤‡à¤¨à¤¸à¥‡ à¤®à¤¿à¤² à¤¸à¤•à¤¤à¤¾ à¤¹à¥ˆ',
    footerBrandDesc: 'à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾ à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤•', footerTeam: 'à¤ªà¤°à¤¿à¤¯à¥‹à¤œà¤¨à¤¾ à¤Ÿà¥€à¤®', footerLinks: 'à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤²à¤¿à¤‚à¤•', footerLink1: 'à¤µà¤¿à¤¶à¥‡à¤·à¤¤à¤¾à¤à¤‚', footerLink2: 'à¤­à¥‚à¤®à¤¿à¤•à¤¾à¤à¤‚', modalTitle: 'à¤†à¤ªà¤¾à¤¤ à¤…à¤¨à¥à¤°à¥‹à¤§ à¤­à¥‡à¤œà¥‡à¤‚', modalDesc: 'à¤¯à¤¹ à¤¡à¥‡à¤®à¥‹ à¤…à¤¸à¥à¤ªà¤¤à¤¾à¤² à¤¸à¥‡ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾ à¤¤à¤• à¤•à¥€ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤¦à¤¿à¤–à¤¾à¤¤à¤¾ à¤¹à¥ˆà¥¤', fieldTitle: 'à¤®à¤°à¥€à¤œ / à¤…à¤¨à¥à¤°à¥‹à¤§ à¤¶à¥€à¤°à¥à¤·à¤•', fieldTitlePlaceholder: 'à¤œà¥ˆà¤¸à¥‡ à¤Ÿà¥à¤°à¥‰à¤®à¤¾ à¤®à¤°à¥€à¤œ', fieldBloodGroup: 'à¤°à¤•à¥à¤¤ à¤¸à¤®à¥‚à¤¹', fieldUnits: 'à¤¯à¥‚à¤¨à¤¿à¤Ÿ à¤šà¤¾à¤¹à¤¿à¤', modalSubmit: 'à¤®à¤¿à¤²à¥‡ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‹ à¤¸à¥‚à¤šà¤¿à¤¤ à¤•à¤°à¥‡à¤‚', notifyPopupKicker: 'à¤¸à¥‚à¤šà¤¨à¤¾', notifyPopupTitle: 'à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‹ à¤¸à¥‚à¤šà¤¨à¤¾ à¤­à¥‡à¤œà¥€ à¤—à¤ˆ', notifyPopupDesc: 'à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤…à¤¨à¥à¤°à¥‹à¤§ à¤•à¥‡ à¤²à¤¿à¤ à¤¶à¥€à¤°à¥à¤· à¤®à¤¿à¤²à¤¾à¤¨ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‹ à¤¸à¥‚à¤šà¤¿à¤¤ à¤•à¤° à¤¦à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤', authTitle: 'à¤¦à¤¾à¤¤à¤¾ à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤¯à¤¾ OTP à¤²à¥‰à¤—à¤¿à¤¨', authSubtitle: 'OTP à¤ˆà¤®à¥‡à¤² à¤”à¤° à¤«à¥‹à¤¨ à¤¦à¥‹à¤¨à¥‹à¤‚ à¤ªà¤° à¤­à¥‡à¤œà¤¾ à¤œà¤¾à¤à¤—à¤¾, à¤”à¤° 10 à¤®à¤¿à¤¨à¤Ÿ à¤¤à¤• à¤®à¤¾à¤¨à¥à¤¯ à¤°à¤¹à¥‡à¤—à¤¾à¥¤', registerTab: 'à¤¦à¤¾à¤¤à¤¾ à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£', loginTab: 'à¤²à¥‰à¤—à¤¿à¤¨', registerSubmit: 'OTP à¤­à¥‡à¤œà¥‡à¤‚', loginSubmit: 'OTP à¤­à¥‡à¤œà¥‡à¤‚', otpSubmit: 'OTP à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤•à¤°à¥‡à¤‚', otpHint: 'à¤…à¤ªà¤¨à¥‡ à¤ˆà¤®à¥‡à¤² à¤”à¤° à¤«à¥‹à¤¨ à¤ªà¤° à¤­à¥‡à¤œà¤¾ à¤—à¤¯à¤¾ OTP à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚à¥¤', verifySuccess: 'OTP à¤¸à¤«à¤²à¤¤à¤¾à¤ªà¥‚à¤°à¥à¤µà¤• à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤¹à¥à¤†à¥¤', otpExpired: 'OTP à¤¸à¤®à¤¾à¤ªà¥à¤¤ à¤¹à¥‹ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤ à¤¨à¤¯à¤¾ OTP à¤®à¤¾à¤‚à¤—à¥‡à¤‚à¥¤', profileHeading: 'à¤«à¤¿à¤° à¤¸à¥‡ à¤¸à¥à¤µà¤¾à¤—à¤¤ à¤¹à¥ˆ', profileSubtitle: 'à¤†à¤ªà¤•à¥‡ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤–à¤¾à¤¤à¥‡ à¤•à¤¾ à¤µà¤¿à¤µà¤°à¤£ à¤¨à¥€à¤šà¥‡ à¤¦à¤¿à¤–à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤', profileAccount: 'à¤–à¤¾à¤¤à¤¾ à¤µà¤¿à¤µà¤°à¤£', profileRoleLabel: 'à¤­à¥‚à¤®à¤¿à¤•à¤¾', profileNameLabel: 'à¤¨à¤¾à¤®', profileEmailLabel: 'à¤ˆà¤®à¥‡à¤²', profilePhoneLabel: 'à¤«à¥‹à¤¨', profileBloodLabel: 'à¤°à¤•à¥à¤¤ à¤¸à¤®à¥‚à¤¹', profileAgeLabel: 'à¤†à¤¯à¥', profileDonationLabel: 'à¤…à¤‚à¤¤à¤¿à¤® à¤¦à¤¾à¤¨ à¤¤à¤¿à¤¥à¤¿', profileTravelLabel: 'à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤®à¥‹à¤¡', travelCardTitle: 'à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤®à¥‹à¤¡', travelCardText: 'à¤¯à¤¦à¤¿ à¤†à¤ª à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤•à¤° à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚, à¤¤à¥‹ à¤†à¤ªà¤•à¥‹ à¤¦à¤¾à¤¨ à¤•à¥‡ à¤²à¤¿à¤ à¤†à¤ªà¤¾à¤¤ à¤¸à¥‚à¤šà¤¨à¤¾ à¤¨à¤¹à¥€à¤‚ à¤®à¤¿à¤²à¥‡à¤—à¥€à¥¤', travelOn: 'à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤®à¥‹à¤¡: à¤šà¤¾à¤²à¥‚', travelOff: 'à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤®à¥‹à¤¡: à¤¬à¤‚à¤¦', logoutText: 'à¤²à¥‰à¤—à¤†à¤‰à¤Ÿ', registerToast: 'à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ OTP à¤ˆà¤®à¥‡à¤² à¤”à¤° à¤«à¥‹à¤¨ à¤ªà¤° à¤­à¥‡à¤œà¤¾ à¤—à¤¯à¤¾à¥¤', loginToast: 'à¤²à¥‰à¤—à¤¿à¤¨ OTP à¤ˆà¤®à¥‡à¤² à¤”à¤° à¤«à¥‹à¤¨ à¤ªà¤° à¤­à¥‡à¤œà¤¾ à¤—à¤¯à¤¾à¥¤', invalidOtp: 'à¤—à¤²à¤¤ OTPà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤•à¥‹à¤¡ à¤œà¤¾à¤‚à¤šà¥‡à¤‚à¥¤', duplicateUser: 'à¤¯à¤¹ à¤ˆà¤®à¥‡à¤² à¤¯à¤¾ à¤«à¥‹à¤¨ à¤ªà¤¹à¤²à¥‡ à¤¸à¥‡ à¤®à¥Œà¤œà¥‚à¤¦ à¤¹à¥ˆà¥¤', profileLoaded: 'à¤ªà¥à¤°à¥‹à¤«à¤¾à¤‡à¤² à¤¸à¤«à¤²à¤¤à¤¾à¤ªà¥‚à¤°à¥à¤µà¤• à¤–à¥à¤²à¥€à¥¤', toastTravelOn: 'à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤®à¥‹à¤¡ à¤šà¤¾à¤²à¥‚ à¤¹à¥ˆà¥¤ à¤†à¤ªà¤¾à¤¤ à¤¸à¥‚à¤šà¤¨à¤¾à¤à¤‚ à¤°à¥‹à¤• à¤¦à¥€ à¤—à¤ˆ à¤¹à¥ˆà¤‚à¥¤', toastTravelOff: 'à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤®à¥‹à¤¡ à¤¬à¤‚à¤¦ à¤¹à¥ˆà¥¤ à¤†à¤ªà¤¾à¤¤ à¤¸à¥‚à¤šà¤¨à¤¾à¤à¤‚ à¤«à¤¿à¤° à¤¸à¥‡ à¤šà¤²à¥‡à¤‚à¤—à¥€à¥¤', toastNoAccount: 'à¤®à¥‡à¤² à¤–à¤¾à¤¨à¥‡ à¤µà¤¾à¤²à¤¾ à¤–à¤¾à¤¤à¤¾ à¤¨à¤¹à¥€à¤‚ à¤®à¤¿à¤²à¤¾à¥¤', toastOtpResent: 'OTP à¤¦à¥‹à¤¬à¤¾à¤°à¤¾ à¤­à¥‡à¤œà¤¾ à¤—à¤¯à¤¾à¥¤'
  }
};

const generatedLanguages = {
  ta: ['à®®à¯à®•à®ªà¯à®ªà¯', 'à®…à®®à¯à®šà®™à¯à®•à®³à¯', 'à®ªà®™à¯à®•à¯à®•à®³à¯', 'à®¸à¯à®®à®¾à®°à¯à®Ÿà¯ à®‡à®°à®¤à¯à®¤à®¤à®¾à®©à®¿ à®µà®²à¯ˆà®ªà¯à®ªà®¿à®©à¯à®©à®²à¯', 'à®…à®µà®šà®° à®…à®±à®¿à®µà®¿à®ªà¯à®ªà¯', 'à®®à¯à®¤à®²à¯ 5 FAQ'],
  te: ['à°¹à±‹à°®à±', 'à°²à°•à±à°·à°£à°¾à°²à±', 'à°ªà°¾à°¤à±à°°à°²à±', 'à°¸à±à°®à°¾à°°à±à°Ÿà± à°°à°•à±à°¤à°¦à°¾à°¤ à°¨à±†à°Ÿà±â€Œà°µà°°à±à°•à±', 'à°…à°¤à±à°¯à°µà°¸à°° à°¸à°®à°¾à°šà°¾à°°à°‚', 'à°Ÿà°¾à°ªà± 5 FAQ'],
  kn: ['à²®à³à²–à²ªà³à²Ÿ', 'à²…à²‚à²¶à²—à²³à³', 'à²ªà²¾à²¤à³à²°à²—à²³à³', 'à²¸à³à²®à²¾à²°à³à²Ÿà³ à²°à²•à³à²¤à²¦à²¾à²¨à²¿ à²œà²¾à²²', 'à²¤à³à²°à³à²¤à³ à²¸à³‚à²šà²¨à³†', 'à²Ÿà²¾à²ªà³ 5 FAQ'],
  ml: ['à´¹àµ‹à´‚', 'à´¸à´µà´¿à´¶àµ‡à´·à´¤à´•àµ¾', 'à´ªà´™àµà´•àµà´•àµ¾', 'à´¸àµà´®à´¾àµ¼à´Ÿàµà´Ÿàµ à´°à´•àµà´¤à´¦à´¾à´¤àµƒ à´¨àµ†à´±àµà´±àµâ€Œà´µàµ¼à´•àµà´•àµ', 'à´…à´Ÿà´¿à´¯à´¨àµà´¤à´° à´…à´±à´¿à´¯à´¿à´ªàµà´ªàµ', 'à´Ÿàµ‹à´ªàµà´ªàµ 5 FAQ'],
  or: ['à¬¹à­‹à¬®à­', 'à¬¬à¬¿à¬¶à­‡à¬·à¬¤à¬¾', 'à¬­à­‚à¬®à¬¿à¬•à¬¾', 'à¬¸à­à¬®à¬¾à¬°à­à¬Ÿ à¬°à¬•à­à¬¤à¬¦à¬¾à¬¤à¬¾ à¬¨à­‡à¬Ÿà­±à¬°à­à¬•', 'à¬œà¬°à­à¬°à­€ à¬¸à­‚à¬šà¬¨à¬¾', 'à¬Ÿà¬ªà­ 5 FAQ'],
  bn: ['à¦¹à§‹à¦®', 'à¦¬à§ˆà¦¶à¦¿à¦·à§à¦Ÿà§à¦¯', 'à¦­à§‚à¦®à¦¿à¦•à¦¾', 'à¦¸à§à¦®à¦¾à¦°à§à¦Ÿ à¦°à¦•à§à¦¤à¦¦à¦¾à¦¤à¦¾ à¦¨à§‡à¦Ÿà¦“à¦¯à¦¼à¦¾à¦°à§à¦•', 'à¦œà¦°à§à¦°à¦¿ à¦¬à¦¿à¦œà§à¦žà¦ªà§à¦¤à¦¿', 'à¦¶à§€à¦°à§à¦· à§« FAQ'],
  mr: ['à¤¹à¥‹à¤®', 'à¤µà¥ˆà¤¶à¤¿à¤·à¥à¤Ÿà¥à¤¯à¥‡', 'à¤­à¥‚à¤®à¤¿à¤•à¤¾', 'à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤°à¤•à¥à¤¤à¤¦à¤¾à¤¤à¤¾ à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤•', 'à¤†à¤ªà¤¤à¥à¤•à¤¾à¤²à¥€à¤¨ à¤¸à¥‚à¤šà¤¨à¤¾', 'à¤Ÿà¥‰à¤ª 5 FAQ'],
  gu: ['àª¹à«‹àª®', 'àªµàª¿àª¶à«‡àª·àª¤àª¾àª“', 'àª­à«‚àª®àª¿àª•àª¾àª“', 'àª¸à«àª®àª¾àª°à«àªŸ àª°àª•à«àª¤àª¦àª¾àª¤àª¾ àª¨à«‡àªŸàªµàª°à«àª•', 'àª¤àª¾àª¤à«àª•àª¾àª²àª¿àª• àª¸à«‚àªšàª¨àª¾', 'àªŸà«‹àªª 5 FAQ'],
  pa: ['à¨¹à©‹à¨®', 'à¨µà¨¿à¨¸à¨¼à©‡à¨¸à¨¼à¨¤à¨¾à¨µà¨¾à¨‚', 'à¨­à©‚à¨®à¨¿à¨•à¨¾à¨µà¨¾à¨‚', 'à¨¸à¨®à¨¾à¨°à¨Ÿ à¨°à¨•à¨¤à¨¦à¨¾à¨¤à¨¾ à¨¨à©ˆà©±à¨Ÿà¨µà¨°à¨•', 'à¨à¨®à¨°à¨œà©ˆà¨‚à¨¸à©€ à¨¸à©‚à¨šà¨¨à¨¾', 'à¨Ÿà¨¾à¨ª 5 FAQ'],
  ur: ['ÛÙˆÙ…', 'Ø®ØµÙˆØµÛŒØ§Øª', 'Ú©Ø±Ø¯Ø§Ø±', 'Ø§Ø³Ù…Ø§Ø±Ù¹ Ø®ÙˆÙ† Ø¹Ø·ÛŒÛ Ø¯ÛÙ†Ø¯Û Ù†ÛŒÙ¹ ÙˆØ±Ú©', 'ÛÙ†Ú¯Ø§Ù…ÛŒ Ø§Ø·Ù„Ø§Ø¹', 'Ù¹Ø§Ù¾ 5 FAQ']
};

Object.entries(generatedLanguages).forEach(([lang, labels]) => {
  translations[lang] = {
    ...baseStrings,
    navHome: labels[0],
    navFeatures: labels[1],
    navRoles: labels[2],
    navFaq: 'FAQ',
    brandTag: labels[3],
    ctaPrimary: labels[4],
    faqTitle: labels[5],
    headerRequest: labels[4],
    adminLogin: baseStrings.adminLogin,
    adminLogout: baseStrings.adminLogout,
    ctaRegister: baseStrings.ctaRegister,
    ctaLogin: baseStrings.ctaLogin,
    heroTitle: labels[4] + ' for every blood request',
    heroDesc: labels[3] + ' connects donors, hospitals, and blood banks in one place.',
    faq1Question: labels[4] + ' à®Žà®ªà¯à®ªà®Ÿà®¿ à®‰à®¤à®µà¯à®•à®¿à®±à®¤à¯? / How does it help?',
    faq1Answer: baseStrings.faq1Answer,
    faq2Question: 'Who can use this platform?',
    faq2Answer: baseStrings.faq2Answer,
    faq3Question: 'How are donors selected?',
    faq3Answer: baseStrings.faq3Answer,
    faq4Question: 'Which blood groups are compatible?',
    faq4Answer: baseStrings.faq4Answer,
    faq5Question: 'How are notifications sent?',
    faq5Answer: baseStrings.faq5Answer
  };
});

const localFaq = {
  ta: {
    heroTitle: 'à®’à®µà¯à®µà¯Šà®°à¯ à®¨à¯Šà®Ÿà®¿à®¯à¯à®®à¯ à®®à¯à®•à¯à®•à®¿à®¯à®®à¯. à®’à®µà¯à®µà¯Šà®°à¯ à®¤à®¾à®©à®¿à®¯à®°à¯à®®à¯ à®®à¯à®•à¯à®•à®¿à®¯à®®à¯.',
    faq1Question: 'à®…à®µà®šà®° à®¨à¯‡à®°à®¤à¯à®¤à®¿à®²à¯ BloodNet à®Žà®ªà¯à®ªà®Ÿà®¿ à®‰à®¤à®µà¯à®•à®¿à®±à®¤à¯?',
    faq1Answer: 'BloodNet à®®à®°à¯à®¤à¯à®¤à¯à®µà®®à®©à¯ˆà®•à¯à®•à¯ à®•à¯‹à®°à®¿à®•à¯à®•à¯ˆ à®‰à®°à¯à®µà®¾à®•à¯à®•, à®…à®°à¯à®•à®¿à®²à¯à®³à¯à®³ à®ªà¯Šà®°à¯à®¤à¯à®¤à®®à®¾à®© à®¤à®¾à®©à®¿à®¯à®°à¯à®•à®³à¯ˆ à®•à®£à¯à®Ÿà®±à®¿à®¯, à®‰à®Ÿà®©à®Ÿà®¿à®¯à®¾à®• à®…à®±à®¿à®µà®¿à®ªà¯à®ªà¯ˆ à®…à®©à¯à®ªà¯à®ª à®‰à®¤à®µà¯à®•à®¿à®±à®¤à¯. à®‡à®¤à®©à®¾à®²à¯ à®•à¯ˆà®®à¯à®±à¯ˆ à®…à®´à¯ˆà®ªà¯à®ªà¯à®•à®³à¯ à®•à¯à®±à¯ˆà®¨à¯à®¤à¯ à®ªà®¤à®¿à®²à¯ à®µà¯‡à®•à®®à¯ à®…à®¤à®¿à®•à®°à®¿à®•à¯à®•à¯à®®à¯.',
    faq2Question: 'à®‡à®¨à¯à®¤ à®¤à®³à®¤à¯à®¤à¯ˆ à®¯à®¾à®°à¯ à®ªà®¯à®©à¯à®ªà®Ÿà¯à®¤à¯à®¤à®²à®¾à®®à¯?',
    faq2Answer: 'à®¤à®¾à®©à®¿à®¯à®°à¯à®•à®³à¯, à®®à®°à¯à®¤à¯à®¤à¯à®µà®®à®©à¯ˆà®•à®³à¯, à®‡à®°à®¤à¯à®¤ à®µà®™à¯à®•à®¿à®•à®³à¯, à®¨à®¿à®°à¯à®µà®¾à®•à®¿à®•à®³à¯ à®…à®©à¯ˆà®µà®°à¯à®•à¯à®•à¯à®®à¯ à®‡à®¨à¯à®¤ à®¤à®³à®®à¯ à®µà®Ÿà®¿à®µà®®à¯ˆà®•à¯à®•à®ªà¯à®ªà®Ÿà¯à®Ÿà¯à®³à¯à®³à®¤à¯.',
    faq3Question: 'à®•à¯‹à®°à®¿à®•à¯à®•à¯ˆà®•à¯à®•à¯ à®¤à®¾à®©à®¿à®¯à®°à¯à®•à®³à¯ à®Žà®ªà¯à®ªà®Ÿà®¿ à®¤à¯‡à®°à¯à®µà¯ à®šà¯†à®¯à¯à®¯à®ªà¯à®ªà®Ÿà¯à®•à®¿à®±à®¾à®°à¯à®•à®³à¯?',
    faq3Answer: 'à®‡à®°à®¤à¯à®¤à®•à¯à®•à¯à®´à¯ à®ªà¯Šà®°à¯à®¤à¯à®¤à®®à¯, à®¤à¯‚à®°à®®à¯, à®šà®®à¯€à®ªà®¤à¯à®¤à®¿à®¯ à®¤à®¾à®© à®µà®°à®²à®¾à®±à¯, à®•à®¿à®Ÿà¯ˆà®•à¯à®•à¯à®®à¯ à®µà®¾à®¯à¯à®ªà¯à®ªà¯ à®†à®•à®¿à®¯à®µà®±à¯à®±à®¿à®©à¯ à®…à®Ÿà®¿à®ªà¯à®ªà®Ÿà¯ˆà®¯à®¿à®²à¯ à®¤à®¾à®©à®¿à®¯à®°à¯à®•à®³à¯ à®¤à¯‡à®°à¯à®µà¯ à®šà¯†à®¯à¯à®¯à®ªà¯à®ªà®Ÿà¯à®•à®¿à®±à®¾à®°à¯à®•à®³à¯.',
    faq4Question: 'à®Žà®¨à¯à®¤ à®‡à®°à®¤à¯à®¤à®•à¯à®•à¯à®´à¯à®•à¯à®•à®³à¯ à®ªà¯Šà®°à¯à®¨à¯à®¤à¯à®®à¯?',
    faq4Answer: 'à®ªà¯Šà®°à¯à®¤à¯à®¤à®®à¯ à®¨à¯‹à®¯à®¾à®³à®¿à®¯à®¿à®©à¯ à®‡à®°à®¤à¯à®¤à®•à¯à®•à¯à®´à¯à®µà¯ˆà®ªà¯ à®ªà¯Šà®±à¯à®¤à¯à®¤à®¤à¯. à®•à¯€à®´à¯‡ à®ªà¯Šà®¤à¯à®µà®¾à®© à®ªà¯†à®±à¯à®®à¯ à®µà®¿à®¤à®¿à®•à®³à¯ à®•à¯Šà®Ÿà¯à®•à¯à®•à®ªà¯à®ªà®Ÿà¯à®Ÿà¯à®³à¯à®³à®©.',
    faq5Question: 'à®…à®µà®šà®° à®…à®±à®¿à®µà®¿à®ªà¯à®ªà¯à®•à®³à¯ à®Žà®ªà¯à®ªà®Ÿà®¿ à®…à®©à¯à®ªà¯à®ªà®ªà¯à®ªà®Ÿà¯à®®à¯?',
    faq5Answer: 'à®•à¯‹à®°à®¿à®•à¯à®•à¯ˆ à®‰à®°à¯à®µà®¾à®©à®µà¯à®Ÿà®©à¯ à®®à¯à®¤à®©à¯à®®à¯ˆ à®ªà¯Šà®°à¯à®¤à¯à®¤à®®à®¾à®© à®¤à®¾à®©à®¿à®¯à®°à¯à®•à®³à¯à®•à¯à®•à¯ à®…à®±à®¿à®µà®¿à®ªà¯à®ªà¯ à®…à®©à¯à®ªà¯à®ªà®ªà¯à®ªà®Ÿà¯à®®à¯. SMS à®…à®²à¯à®²à®¤à¯ WhatsApp à®®à®¾à®±à¯à®±à¯ à®µà®´à®¿à®¯à®¾à®• à®ªà®¯à®©à¯à®ªà®Ÿà¯à®¤à¯à®¤à®²à®¾à®®à¯.'
  },
  te: {
    heroTitle: 'à°ªà±à°°à°¤à°¿ à°¸à±†à°•à°¨à± à°®à±à°–à±à°¯à°‚. à°ªà±à°°à°¤à°¿ à°¦à°¾à°¤ à°®à±à°–à±à°¯à°‚.',
    faq1Question: 'à°…à°¤à±à°¯à°µà°¸à°° à°¸à°®à°¯à°‚à°²à±‹ BloodNet à°Žà°²à°¾ à°¸à°¹à°¾à°¯à°ªà°¡à±à°¤à±à°‚à°¦à°¿?',
    faq1Answer: 'BloodNet à°†à°¸à±à°ªà°¤à±à°°à°¿ à°…à°­à±à°¯à°°à±à°¥à°¨à°¨à± à°¸à±ƒà°·à±à°Ÿà°¿à°‚à°šà°¿, à°¦à°—à±à°—à°°à°²à±‹ à°‰à°¨à±à°¨ à°¸à°°à±ˆà°¨ à°¦à°¾à°¤à°²à°¨à± à°—à±à°°à±à°¤à°¿à°‚à°šà°¿, à°¤à±à°µà°°à°—à°¾ à°¹à±†à°šà±à°šà°°à°¿à°•à°²à± à°ªà°‚à°ªà°¡à°¾à°¨à°¿à°•à°¿ à°¸à°¹à°¾à°¯à°ªà°¡à±à°¤à±à°‚à°¦à°¿.',
    faq2Question: 'à°ˆ à°µà±‡à°¦à°¿à°•à°¨à± à°Žà°µà°°à± à°‰à°ªà°¯à±‹à°—à°¿à°‚à°šà°—à°²à°°à±?',
    faq2Answer: 'à°¦à°¾à°¤à°²à±, à°†à°¸à±à°ªà°¤à±à°°à±à°²à±, à°°à°•à±à°¤ à°¬à±à°¯à°¾à°‚à°•à±à°²à± à°®à°°à°¿à°¯à± à°¨à°¿à°°à±à°µà°¾à°¹à°•à±à°² à°•à±‹à°¸à°‚ à°ˆ à°µà±‡à°¦à°¿à°• à°°à±‚à°ªà±Šà°‚à°¦à°¿à°‚à°šà°¬à°¡à°¿à°‚à°¦à°¿.',
    faq3Question: 'à°¦à°¾à°¤à°²à°¨à± à°Žà°²à°¾ à°Žà°‚à°ªà°¿à°• à°šà±‡à°¸à±à°¤à°¾à°°à±?',
    faq3Answer: 'à°°à°•à±à°¤ à°—à±à°°à±‚à°ªà± à°¸à°°à°¿à°ªà±‹à°µà°¡à°‚, à°¦à±‚à°°à°‚, à°‡à°Ÿà±€à°µà°²à°¿ à°¦à°¾à°¨à°‚ à°šà°°à°¿à°¤à±à°° à°®à°°à°¿à°¯à± à°…à°‚à°¦à±à°¬à°¾à°Ÿà± à°†à°§à°¾à°°à°‚à°—à°¾ à°¦à°¾à°¤à°²à°¨à± à°Žà°‚à°ªà°¿à°• à°šà±‡à°¸à±à°¤à°¾à°°à±.',
    faq4Question: 'à° à°°à°•à±à°¤ à°—à±à°°à±‚à°ªà±à°²à± à°…à°¨à±à°•à±‚à°²à°‚?',
    faq4Answer: 'à°…à°¨à±à°•à±‚à°²à°¤ à°°à±‹à°—à°¿ à°°à°•à±à°¤ à°—à±à°°à±‚à°ªà±à°ªà±ˆ à°†à°§à°¾à°°à°ªà°¡à°¿ à°‰à°‚à°Ÿà±à°‚à°¦à°¿. à°¸à°¾à°§à°¾à°°à°£ à°¸à±à°µà±€à°•à°°à°£ à°¨à°¿à°¯à°®à°¾à°²à± à°•à±à°°à°¿à°‚à°¦ à°‰à°¨à±à°¨à°¾à°¯à°¿.',
    faq5Question: 'à°…à°¤à±à°¯à°µà°¸à°° à°¨à±‹à°Ÿà°¿à°«à°¿à°•à±‡à°·à°¨à±à°²à± à°Žà°²à°¾ à°ªà°‚à°ªà°¬à°¡à°¤à°¾à°¯à°¿?',
    faq5Answer: 'à°…à°­à±à°¯à°°à±à°¥à°¨ à°¸à±ƒà°·à±à°Ÿà°¿à°‚à°šà°—à°¾à°¨à±‡ à°¸à°°à°¿à°ªà±‹à°¯à±‡ à°¦à°¾à°¤à°²à°•à± à°¨à±‹à°Ÿà°¿à°«à°¿à°•à±‡à°·à°¨à± à°µà±†à°³à±à°¤à±à°‚à°¦à°¿. SMS à°²à±‡à°¦à°¾ WhatsApp à°¬à±à°¯à°¾à°•à°ªà±â€Œà°—à°¾ à°‰à°ªà°¯à±‹à°—à°¿à°‚à°šà°µà°šà±à°šà±.'
  },
  kn: {
    heroTitle: 'à²ªà³à²°à²¤à²¿ à²•à³à²·à²£ à²®à³à²–à³à²¯. à²ªà³à²°à²¤à²¿ à²¦à²¾à²¨à²¿à²¯à³‚ à²®à³à²–à³à²¯.',
    faq1Question: 'à²¤à³à²°à³à²¤à³ à²¸à²‚à²¦à²°à³à²­à²¦à²²à³à²²à²¿ BloodNet à²¹à³‡à²—à³† à²¸à²¹à²¾à²¯ à²®à²¾à²¡à³à²¤à³à²¤à²¦à³†?',
    faq1Answer: 'BloodNet à²†à²¸à³à²ªà²¤à³à²°à³†à²—à³† à²®à²¨à²µà²¿ à²¸à³ƒà²·à³à²Ÿà²¿à²¸à²²à³, à²¹à²¤à³à²¤à²¿à²°à²¦ à²¸à³‚à²•à³à²¤ à²¦à²¾à²¨à²¿à²—à²³à²¨à³à²¨à³ à²¹à³à²¡à³à²•à²²à³ à²®à²¤à³à²¤à³ à²¤à²•à³à²·à²£ à²Žà²šà³à²šà²°à²¿à²•à³† à²•à²³à³à²¹à²¿à²¸à²²à³ à²¸à²¹à²¾à²¯ à²®à²¾à²¡à³à²¤à³à²¤à²¦à³†.',
    faq2Question: 'à²ˆ à²µà³‡à²¦à²¿à²•à³†à²¯à²¨à³à²¨à³ à²¯à²¾à²°à³ à²¬à²³à²¸à²¬à²¹à³à²¦à³?',
    faq2Answer: 'à²¦à²¾à²¨à²¿à²—à²³à³, à²†à²¸à³à²ªà²¤à³à²°à³†à²—à²³à³, à²°à²•à³à²¤ à²¬à³à²¯à²¾à²‚à²•à³à²—à²³à³ à²®à²¤à³à²¤à³ à²¨à²¿à²°à³à²µà²¾à²¹à²•à²°à²¿à²—à²¾à²—à²¿ à²ˆ à²µà³‡à²¦à²¿à²•à³† à²µà²¿à²¨à³à²¯à²¾à²¸à²—à³Šà²³à²¿à²¸à²²à²¾à²—à²¿à²¦à³†.',
    faq3Question: 'à²¦à²¾à²¨à²¿à²—à²³à²¨à³à²¨à³ à²¹à³‡à²—à³† à²†à²¯à³à²•à³† à²®à²¾à²¡à²²à²¾à²—à³à²¤à³à²¤à²¦à³†?',
    faq3Answer: 'à²°à²•à³à²¤ à²—à³à²‚à²ªà²¿à²¨ à²¹à³Šà²‚à²¦à²¾à²£à²¿à²•à³†, à²¦à³‚à²°, à²‡à²¤à³à²¤à³€à²šà²¿à²¨ à²¦à²¾à²¨ à²‡à²¤à²¿à²¹à²¾à²¸ à²®à²¤à³à²¤à³ à²²à²­à³à²¯à²¤à³† à²†à²§à²¾à²°à²µà²¾à²—à²¿ à²¦à²¾à²¨à²¿à²—à²³à²¨à³à²¨à³ à²†à²¯à³à²•à³† à²®à²¾à²¡à²²à²¾à²—à³à²¤à³à²¤à²¦à³†.',
    faq4Question: 'à²¯à²¾à²µ à²°à²•à³à²¤ à²—à³à²‚à²ªà³à²—à²³à³ à²¹à³Šà²‚à²¦à²¿à²•à³Šà²³à³à²³à³à²¤à³à²¤à²µà³†?',
    faq4Answer: 'à²¹à³Šà²‚à²¦à²¾à²£à²¿à²•à³† à²°à³‹à²—à²¿à²¯ à²°à²•à³à²¤ à²—à³à²‚à²ªà²¿à²¨ à²®à³‡à²²à³† à²…à²µà²²à²‚à²¬à²¿à²¤à²µà²¾à²—à²¿à²¦à³†. à²¸à²¾à²®à²¾à²¨à³à²¯ à²¸à³à²µà³€à²•à²°à²¿à²¸à³à²µ à²¨à²¿à²¯à²®à²—à²³à³ à²•à³†à²³à²—à³† à²‡à²µà³†.',
    faq5Question: 'à²¤à³à²°à³à²¤à³ à²¸à³‚à²šà²¨à³†à²—à²³à²¨à³à²¨à³ à²¹à³‡à²—à³† à²•à²³à³à²¹à²¿à²¸à²²à²¾à²—à³à²¤à³à²¤à²¦à³†?',
    faq5Answer: 'à²®à²¨à²µà²¿ à²¸à³ƒà²·à³à²Ÿà²¿à²¸à²¿à²¦à²¾à²— à²‰à²¤à³à²¤à²® à²¹à³Šà²‚à²¦à²¾à²£à²¿à²•à³†à²¯ à²¦à²¾à²¨à²¿à²—à²³à²¿à²—à³† à²¸à³‚à²šà²¨à³† à²¹à³‹à²—à³à²¤à³à²¤à²¦à³†. SMS à²…à²¥à²µà²¾ WhatsApp à²¬à³à²¯à²¾à²•à²ªà³ à²†à²—à²¿à²°à²¬à²¹à³à²¦à³.'
  },
  ml: {
    heroTitle: 'à´“à´°àµ‹ à´¨à´¿à´®à´¿à´·à´µàµà´‚ à´ªàµà´°à´§à´¾à´¨à´®à´¾à´£àµ. à´“à´°àµ‹ à´¦à´¾à´¤à´¾à´µàµà´‚ à´ªàµà´°à´§à´¾à´¨à´®à´¾à´£àµ.',
    faq1Question: 'à´…à´Ÿà´¿à´¯à´¨àµà´¤à´° à´¸à´¾à´¹à´šà´°àµà´¯à´¤àµà´¤à´¿àµ½ BloodNet à´Žà´™àµà´™à´¨àµ† à´¸à´¹à´¾à´¯à´¿à´•àµà´•àµà´¨àµà´¨àµ?',
    faq1Answer: 'à´†à´¶àµà´ªà´¤àµà´°à´¿à´•àµà´•àµ à´…à´­àµà´¯àµ¼à´¤àµà´¥à´¨ à´¸àµƒà´·àµà´Ÿà´¿à´šàµà´šàµ à´…à´Ÿàµà´¤àµà´¤àµà´³àµà´³ à´…à´¨àµà´¯àµ‹à´œàµà´¯à´°à´¾à´¯ à´¦à´¾à´¤à´¾à´•àµà´•à´³àµ† à´•à´£àµà´Ÿàµ†à´¤àµà´¤à´¿ à´‰à´Ÿàµ» à´…à´±à´¿à´¯à´¿à´ªàµà´ªàµ à´…à´¯à´¯àµà´•àµà´•à´¾àµ» BloodNet à´¸à´¹à´¾à´¯à´¿à´•àµà´•àµà´¨àµà´¨àµ.',
    faq2Question: 'à´ˆ à´ªàµà´²à´¾à´±àµà´±àµà´«àµ‹à´‚ à´†à´°àµ†à´²àµà´²à´¾à´‚ à´‰à´ªà´¯àµ‹à´—à´¿à´•àµà´•à´¾à´‚?',
    faq2Answer: 'à´¦à´¾à´¤à´¾à´•àµà´•àµ¾, à´†à´¶àµà´ªà´¤àµà´°à´¿à´•àµ¾, à´°à´•àµà´¤à´¬à´¾à´™àµà´•àµà´•àµ¾, à´…à´¡àµà´®à´¿àµ» à´Žà´¨àµà´¨à´¿à´µàµ¼à´•àµà´•àµ à´µàµ‡à´£àµà´Ÿà´¿à´¯à´¾à´£àµ à´ˆ à´¸à´‚à´µà´¿à´§à´¾à´¨à´‚.',
    faq3Question: 'à´¦à´¾à´¤à´¾à´•àµà´•à´³àµ† à´Žà´™àµà´™à´¨àµ† à´¤à´¿à´°à´žàµà´žàµ†à´Ÿàµà´•àµà´•àµà´¨àµà´¨àµ?',
    faq3Answer: 'à´°à´•àµà´¤à´—àµà´°àµ‚à´ªàµà´ªàµ à´ªàµŠà´°àµà´¤àµà´¤à´‚, à´¦àµ‚à´°à´‚, à´¸à´®àµ€à´ªà´•à´¾à´² à´¦à´¾à´¨à´šà´°à´¿à´¤àµà´°à´‚, à´²à´­àµà´¯à´¤ à´Žà´¨àµà´¨à´¿à´µà´¯àµà´Ÿàµ† à´…à´Ÿà´¿à´¸àµà´¥à´¾à´¨à´¤àµà´¤à´¿à´²à´¾à´£àµ à´¤à´¿à´°à´žàµà´žàµ†à´Ÿàµà´ªàµà´ªàµ.',
    faq4Question: 'à´à´¤àµ à´°à´•àµà´¤à´—àµà´°àµ‚à´ªàµà´ªàµà´•àµ¾ à´ªàµŠà´°àµà´¤àµà´¤à´ªàµà´ªàµ†à´Ÿàµà´‚?',
    faq4Answer: 'à´ªàµŠà´°àµà´¤àµà´¤à´‚ à´°àµ‹à´—à´¿à´¯àµà´Ÿàµ† à´°à´•àµà´¤à´—àµà´°àµ‚à´ªàµà´ªà´¿à´¨àµ† à´†à´¶àµà´°à´¯à´¿à´šàµà´šà´¿à´°à´¿à´•àµà´•àµà´¨àµà´¨àµ. à´¸à´¾à´§à´¾à´°à´£ à´¸àµà´µàµ€à´•à´°à´£ à´¨à´¿à´¯à´®à´™àµà´™àµ¾ à´¤à´¾à´´àµ† à´•àµŠà´Ÿàµà´•àµà´•àµà´¨àµà´¨àµ.',
    faq5Question: 'à´…à´Ÿà´¿à´¯à´¨àµà´¤à´° à´…à´±à´¿à´¯à´¿à´ªàµà´ªàµà´•àµ¾ à´Žà´™àµà´™à´¨àµ† à´…à´¯à´•àµà´•àµà´¨àµà´¨àµ?',
    faq5Answer: 'à´…à´­àµà´¯àµ¼à´¤àµà´¥à´¨ à´¸àµƒà´·àµà´Ÿà´¿à´•àµà´•àµà´®àµà´ªàµ‹àµ¾ à´®à´¿à´•à´šàµà´š à´ªàµŠà´°àµà´¤àµà´¤à´®àµà´³àµà´³ à´¦à´¾à´¤à´¾à´•àµà´•àµ¾à´•àµà´•àµ à´…à´±à´¿à´¯à´¿à´ªàµà´ªàµ à´ªàµ‹à´•àµà´‚. SMS à´…à´²àµà´²àµ†à´™àµà´•à´¿àµ½ WhatsApp à´¬à´¾à´•àµà´•à´ªàµà´ªà´¾à´¯à´¿ à´‰à´ªà´¯àµ‹à´—à´¿à´•àµà´•à´¾à´‚.'
  },
  bn: {
    heroTitle: 'à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦¸à§‡à¦•à§‡à¦¨à§à¦¡ à¦—à§à¦°à§à¦¤à§à¦¬à¦ªà§‚à¦°à§à¦£à¥¤ à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦¦à¦¾à¦¤à¦¾ à¦—à§à¦°à§à¦¤à§à¦¬à¦ªà§‚à¦°à§à¦£à¥¤',
    faq1Question: 'à¦œà¦°à§à¦°à¦¿ à¦…à¦¬à¦¸à§à¦¥à¦¾à¦¯à¦¼ BloodNet à¦•à§€à¦­à¦¾à¦¬à§‡ à¦¸à¦¾à¦¹à¦¾à¦¯à§à¦¯ à¦•à¦°à§‡?',
    faq1Answer: 'BloodNet à¦¹à¦¾à¦¸à¦ªà¦¾à¦¤à¦¾à¦²à¦•à§‡ à¦…à¦¨à§à¦°à§‹à¦§ à¦¤à§ˆà¦°à¦¿ à¦•à¦°à¦¤à§‡, à¦•à¦¾à¦›à§‡à¦° à¦‰à¦ªà¦¯à§à¦•à§à¦¤ à¦¦à¦¾à¦¤à¦¾à¦¦à§‡à¦° à¦–à§à¦à¦œà¦¤à§‡ à¦à¦¬à¦‚ à¦¦à§à¦°à§à¦¤ à¦¸à¦¤à¦°à§à¦•à¦¤à¦¾ à¦ªà¦¾à¦ à¦¾à¦¤à§‡ à¦¸à¦¾à¦¹à¦¾à¦¯à§à¦¯ à¦•à¦°à§‡à¥¤',
    faq2Question: 'à¦à¦‡ à¦ªà§à¦²à§à¦¯à¦¾à¦Ÿà¦«à¦°à§à¦® à¦•à§‡ à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦° à¦•à¦°à¦¤à§‡ à¦ªà¦¾à¦°à§‡?',
    faq2Answer: 'à¦¦à¦¾à¦¤à¦¾, à¦¹à¦¾à¦¸à¦ªà¦¾à¦¤à¦¾à¦², à¦¬à§à¦²à¦¾à¦¡ à¦¬à§à¦¯à¦¾à¦‚à¦• à¦à¦¬à¦‚ à¦…à§à¦¯à¦¾à¦¡à¦®à¦¿à¦¨à¦¦à§‡à¦° à¦œà¦¨à§à¦¯ à¦à¦‡ à¦ªà§à¦²à§à¦¯à¦¾à¦Ÿà¦«à¦°à§à¦® à¦¤à§ˆà¦°à¦¿à¥¤',
    faq3Question: 'à¦¦à¦¾à¦¤à¦¾ à¦•à§€à¦­à¦¾à¦¬à§‡ à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦•à¦°à¦¾ à¦¹à¦¯à¦¼?',
    faq3Answer: 'à¦°à¦•à§à¦¤à§‡à¦° à¦—à§à¦°à§à¦ª, à¦¦à§‚à¦°à¦¤à§à¦¬, à¦¸à¦¾à¦®à§à¦ªà§à¦°à¦¤à¦¿à¦• à¦¦à¦¾à¦¨à§‡à¦° à¦‡à¦¤à¦¿à¦¹à¦¾à¦¸ à¦à¦¬à¦‚ à¦¸à¦®à§à¦­à¦¾à¦¬à§à¦¯ à¦‰à¦ªà¦¸à§à¦¥à¦¿à¦¤à¦¿à¦° à¦­à¦¿à¦¤à§à¦¤à¦¿à¦¤à§‡ à¦¦à¦¾à¦¤à¦¾ à¦¬à¦¾à¦›à¦¾à¦‡ à¦•à¦°à¦¾ à¦¹à¦¯à¦¼à¥¤',
    faq4Question: 'à¦•à§‹à¦¨ à¦°à¦•à§à¦¤à§‡à¦° à¦—à§à¦°à§à¦ª à¦®à¦¿à¦²à¦¬à§‡?',
    faq4Answer: 'à¦®à¦¿à¦² à¦°à§‹à¦—à§€à¦° à¦°à¦•à§à¦¤à§‡à¦° à¦—à§à¦°à§à¦ªà§‡à¦° à¦‰à¦ªà¦° à¦¨à¦¿à¦°à§à¦­à¦° à¦•à¦°à§‡à¥¤ à¦¨à¦¿à¦šà§‡ à¦¸à¦¾à¦§à¦¾à¦°à¦£ à¦—à§à¦°à¦¹à¦£à§‡à¦° à¦¨à¦¿à¦¯à¦¼à¦® à¦¦à§‡à¦–à¦¾à¦¨à§‹ à¦¹à¦¯à¦¼à§‡à¦›à§‡à¥¤',
    faq5Question: 'à¦œà¦°à§à¦°à¦¿ à¦¨à§‹à¦Ÿà¦¿à¦«à¦¿à¦•à§‡à¦¶à¦¨ à¦•à§€à¦­à¦¾à¦¬à§‡ à¦ªà¦¾à¦ à¦¾à¦¨à§‹ à¦¹à¦¯à¦¼?',
    faq5Answer: 'à¦…à¦¨à§à¦°à§‹à¦§ à¦¤à§ˆà¦°à¦¿ à¦¹à¦²à§‡ à¦¸à§‡à¦°à¦¾ à¦®à¦¿à¦² à¦ªà¦¾à¦“à¦¯à¦¼à¦¾ à¦¦à¦¾à¦¤à¦¾à¦¦à§‡à¦° à¦¨à§‹à¦Ÿà¦¿à¦«à¦¿à¦•à§‡à¦¶à¦¨ à¦ªà¦¾à¦ à¦¾à¦¨à§‹ à¦¹à¦¯à¦¼à¥¤ SMS à¦¬à¦¾ WhatsApp à¦¬à§à¦¯à¦¾à¦•à¦†à¦ª à¦¹à¦¤à§‡ à¦ªà¦¾à¦°à§‡à¥¤'
  },
  mr: {
    heroTitle: 'à¤ªà¥à¤°à¤¤à¥à¤¯à¥‡à¤• à¤¸à¥‡à¤•à¤‚à¤¦ à¤®à¤¹à¤¤à¥à¤¤à¥à¤µà¤¾à¤šà¤¾. à¤ªà¥à¤°à¤¤à¥à¤¯à¥‡à¤• à¤¦à¤¾à¤¤à¤¾ à¤®à¤¹à¤¤à¥à¤¤à¥à¤µà¤¾à¤šà¤¾.',
    faq1Question: 'à¤†à¤ªà¤¤à¥à¤•à¤¾à¤²à¥€à¤¨ à¤µà¥‡à¤³à¥€ BloodNet à¤•à¤¸à¥‡ à¤®à¤¦à¤¤ à¤•à¤°à¤¤à¥‡?', faq1Answer: 'BloodNet à¤°à¥à¤—à¥à¤£à¤¾à¤²à¤¯à¤¾à¤²à¤¾ à¤µà¤¿à¤¨à¤‚à¤¤à¥€ à¤¤à¤¯à¤¾à¤° à¤•à¤°à¤£à¥‡, à¤œà¤µà¤³à¤šà¥‡ à¤¯à¥‹à¤—à¥à¤¯ à¤¦à¤¾à¤¤à¥‡ à¤¶à¥‹à¤§à¤£à¥‡ à¤†à¤£à¤¿ à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤¸à¥‚à¤šà¤¨à¤¾ à¤ªà¤¾à¤ à¤µà¤£à¥‡ à¤¸à¥‹à¤ªà¥‡ à¤•à¤°à¤¤à¥‡.',
    faq2Question: 'à¤¹à¥‡ à¤µà¥à¤¯à¤¾à¤¸à¤ªà¥€à¤  à¤•à¥‹à¤£ à¤µà¤¾à¤ªà¤°à¥‚ à¤¶à¤•à¤¤à¥‡?', faq2Answer: 'à¤¦à¤¾à¤¤à¥‡, à¤°à¥à¤—à¥à¤£à¤¾à¤²à¤¯à¥‡, à¤°à¤•à¥à¤¤à¤ªà¥‡à¤¢à¥à¤¯à¤¾ à¤†à¤£à¤¿ à¤ªà¥à¤°à¤¶à¤¾à¤¸à¤• à¤¯à¤¾à¤‚à¤šà¥à¤¯à¤¾à¤¸à¤¾à¤ à¥€ à¤¹à¥‡ à¤µà¥à¤¯à¤¾à¤¸à¤ªà¥€à¤  à¤†à¤¹à¥‡.',
    faq3Question: 'à¤¦à¤¾à¤¤à¥‡ à¤•à¤¸à¥‡ à¤¨à¤¿à¤µà¤¡à¤²à¥‡ à¤œà¤¾à¤¤à¤¾à¤¤?', faq3Answer: 'à¤°à¤•à¥à¤¤à¤—à¤Ÿ, à¤…à¤‚à¤¤à¤°, à¤…à¤²à¥€à¤•à¤¡à¥€à¤² à¤¦à¤¾à¤¨ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤†à¤£à¤¿ à¤‰à¤ªà¤²à¤¬à¥à¤§à¤¤à¤¾ à¤¯à¤¾à¤µà¤° à¤¦à¤¾à¤¤à¥‡ à¤¨à¤¿à¤µà¤¡à¤²à¥‡ à¤œà¤¾à¤¤à¤¾à¤¤.',
    faq4Question: 'à¤•à¥‹à¤£à¤¤à¥‡ à¤°à¤•à¥à¤¤à¤—à¤Ÿ à¤¸à¥à¤¸à¤‚à¤—à¤¤ à¤†à¤¹à¥‡à¤¤?', faq4Answer: 'à¤¸à¥à¤¸à¤‚à¤—à¤¤à¤¤à¤¾ à¤°à¥à¤—à¥à¤£à¤¾à¤šà¥à¤¯à¤¾ à¤°à¤•à¥à¤¤à¤—à¤Ÿà¤¾à¤µà¤° à¤…à¤µà¤²à¤‚à¤¬à¥‚à¤¨ à¤…à¤¸à¤¤à¥‡. à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤¨à¤¿à¤¯à¤® à¤–à¤¾à¤²à¥€ à¤¦à¤¿à¤²à¥‡ à¤†à¤¹à¥‡à¤¤.',
    faq5Question: 'à¤†à¤ªà¤¤à¥à¤•à¤¾à¤²à¥€à¤¨ à¤¸à¥‚à¤šà¤¨à¤¾ à¤•à¤¶à¤¾ à¤ªà¤¾à¤ à¤µà¤²à¥à¤¯à¤¾ à¤œà¤¾à¤¤à¤¾à¤¤?', faq5Answer: 'à¤µà¤¿à¤¨à¤‚à¤¤à¥€ à¤¤à¤¯à¤¾à¤° à¤à¤¾à¤²à¥à¤¯à¤¾à¤µà¤° à¤œà¥à¤³à¤£à¤¾à¤±à¥à¤¯à¤¾ à¤¦à¤¾à¤¤à¥à¤¯à¤¾à¤‚à¤¨à¤¾ à¤¸à¥‚à¤šà¤¨à¤¾ à¤ªà¤¾à¤ à¤µà¤²à¥€ à¤œà¤¾à¤¤à¥‡. SMS à¤•à¤¿à¤‚à¤µà¤¾ WhatsApp à¤¬à¥…à¤•à¤…à¤ª à¤…à¤¸à¥‚ à¤¶à¤•à¤¤à¥‡.'
  },
  gu: {
    heroTitle: 'àª¦àª°à«‡àª• àª¸à«‡àª•àª¨à«àª¡ àª®àª¹àª¤à«àªµàª¨à«€ àª›à«‡. àª¦àª°à«‡àª• àª¦àª¾àª¤àª¾ àª®àª¹àª¤à«àªµàª¨à«‹ àª›à«‡.',
    faq1Question: 'àª†àªªàª¾àª¤àª•àª¾àª²à«€àª¨ àª¸àª®àª¯à«‡ BloodNet àª•à«‡àªµà«€ àª°à«€àª¤à«‡ àª®àª¦àª¦ àª•àª°à«‡ àª›à«‡?', faq1Answer: 'BloodNet àª¹à«‹àª¸à«àªªàª¿àªŸàª²àª¨à«‡ àªµàª¿àª¨àª‚àª¤à«€ àª¬àª¨àª¾àªµàªµàª¾, àª¨àªœà«€àª•àª¨àª¾ àª¯à«‹àª—à«àª¯ àª¦àª¾àª¤àª¾àª“ àª¶à«‹àª§àªµàª¾ àª…àª¨à«‡ àª¤àª°àª¤ àª¸à«‚àªšàª¨àª¾ àª®à«‹àª•àª²àªµàª¾àª®àª¾àª‚ àª®àª¦àª¦ àª•àª°à«‡ àª›à«‡.',
    faq2Question: 'àª† àªªà«àª²à«‡àªŸàª«à«‹àª°à«àª® àª•à«‹àª£ àªµàª¾àªªàª°à«€ àª¶àª•à«‡?', faq2Answer: 'àª¦àª¾àª¤àª¾, àª¹à«‹àª¸à«àªªàª¿àªŸàª², àª¬à«àª²àª¡ àª¬à«‡àª¨à«àª• àª…àª¨à«‡ àªàª¡àª®àª¿àª¨ àª®àª¾àªŸà«‡ àª† àªªà«àª²à«‡àªŸàª«à«‹àª°à«àª® àª¬àª¨àª¾àªµàª¾àª¯à«àª‚ àª›à«‡.',
    faq3Question: 'àª¦àª¾àª¤àª¾àª“ àª•à«‡àªµà«€ àª°à«€àª¤à«‡ àªªàª¸àª‚àª¦ àª¥àª¾àª¯ àª›à«‡?', faq3Answer: 'àª°àª•à«àª¤ àªœà«‚àª¥, àª…àª‚àª¤àª°, àª¤àª¾àªœà«‡àª¤àª°àª¨à«‹ àª¦àª¾àª¨ àª‡àª¤àª¿àª¹àª¾àª¸ àª…àª¨à«‡ àª‰àªªàª²àª¬à«àª§àª¤àª¾ àª†àª§àª¾àª°à«‡ àª¦àª¾àª¤àª¾àª“ àªªàª¸àª‚àª¦ àª¥àª¾àª¯ àª›à«‡.',
    faq4Question: 'àª•àª¯àª¾ àª°àª•à«àª¤ àªœà«‚àª¥à«‹ àª¸à«àª¸àª‚àª—àª¤ àª›à«‡?', faq4Answer: 'àª¸à«àª¸àª‚àª—àª¤àª¤àª¾ àª¦àª°à«àª¦à«€àª¨àª¾ àª°àª•à«àª¤ àªœà«‚àª¥ àªªàª° àª†àª§àª¾àª°àª¿àª¤ àª›à«‡. àª¸àª¾àª®àª¾àª¨à«àª¯ àª¨àª¿àª¯àª®à«‹ àª¨à«€àªšà«‡ àª›à«‡.',
    faq5Question: 'àª†àªªàª¾àª¤àª•àª¾àª²à«€àª¨ àª¸à«‚àªšàª¨àª¾àª“ àª•à«‡àªµà«€ àª°à«€àª¤à«‡ àª®à«‹àª•àª²àª¾àª¯ àª›à«‡?', faq5Answer: 'àªµàª¿àª¨àª‚àª¤à«€ àª¬àª¨àª¾àªµà«àª¯àª¾ àªªàª›à«€ àª¯à«‹àª—à«àª¯ àª¦àª¾àª¤àª¾àª“àª¨à«‡ àª¸à«‚àªšàª¨àª¾ àª®à«‹àª•àª²àª¾àª¯ àª›à«‡. SMS àª…àª¥àªµàª¾ WhatsApp àª¬à«‡àª•àª…àªª àª¬àª¨à«€ àª¶àª•à«‡ àª›à«‡.'
  },
  pa: {
    heroTitle: 'à¨¹à¨° à¨¸à¨•à¨¿à©°à¨Ÿ à¨®à¨¹à©±à¨¤à¨µà¨ªà©‚à¨°à¨¨ à¨¹à©ˆà¥¤ à¨¹à¨° à¨¦à¨¾à¨¤à¨¾ à¨®à¨¹à©±à¨¤à¨µà¨ªà©‚à¨°à¨¨ à¨¹à©ˆà¥¤',
    faq1Question: 'à¨à¨®à¨°à¨œà©ˆà¨‚à¨¸à©€ à¨µà¨¿à©±à¨š BloodNet à¨•à¨¿à¨µà©‡à¨‚ à¨®à¨¦à¨¦ à¨•à¨°à¨¦à¨¾ à¨¹à©ˆ?', faq1Answer: 'BloodNet à¨¹à¨¸à¨ªà¨¤à¨¾à¨² à¨¨à©‚à©° à¨¬à©‡à¨¨à¨¤à©€ à¨¬à¨£à¨¾à¨‰à¨£, à¨¨à©‡à©œà¨²à©‡ à¨¢à©à©±à¨•à¨µà©‡à¨‚ à¨¦à¨¾à¨¤à¨¿à¨†à¨‚ à¨¨à©‚à©° à¨²à©±à¨­à¨£ à¨…à¨¤à©‡ à¨œà¨²à¨¦à©€ à¨¸à©‚à¨šà¨¨à¨¾ à¨­à©‡à¨œà¨£ à¨µà¨¿à©±à¨š à¨®à¨¦à¨¦ à¨•à¨°à¨¦à¨¾ à¨¹à©ˆà¥¤',
    faq2Question: 'à¨‡à¨¹ à¨ªà¨²à©‡à¨Ÿà¨«à¨¾à¨°à¨® à¨•à©Œà¨£ à¨µà¨°à¨¤ à¨¸à¨•à¨¦à¨¾ à¨¹à©ˆ?', faq2Answer: 'à¨¦à¨¾à¨¤à©‡, à¨¹à¨¸à¨ªà¨¤à¨¾à¨², à¨¬à¨²à©±à¨¡ à¨¬à©ˆà¨‚à¨• à¨…à¨¤à©‡ à¨à¨¡à¨®à¨¿à¨¨ à¨‡à¨¸ à¨ªà¨²à©‡à¨Ÿà¨«à¨¾à¨°à¨® à¨¨à©‚à©° à¨µà¨°à¨¤ à¨¸à¨•à¨¦à©‡ à¨¹à¨¨à¥¤',
    faq3Question: 'à¨¦à¨¾à¨¤à©‡ à¨•à¨¿à¨µà©‡à¨‚ à¨šà©à¨£à©‡ à¨œà¨¾à¨‚à¨¦à©‡ à¨¹à¨¨?', faq3Answer: 'à¨°à¨•à¨¤ à¨—à¨°à©à©±à¨ª, à¨¦à©‚à¨°à©€, à¨¤à¨¾à¨œà¨¼à¨¾ à¨¦à¨¾à¨¨ à¨‡à¨¤à¨¿à¨¹à¨¾à¨¸ à¨…à¨¤à©‡ à¨‰à¨ªà¨²à¨¬à¨§à¨¤à¨¾ à¨¦à©‡ à¨†à¨§à¨¾à¨° à¨¤à©‡ à¨šà©‹à¨£ à¨¹à©à©°à¨¦à©€ à¨¹à©ˆà¥¤',
    faq4Question: 'à¨•à¨¿à¨¹à©œà©‡ à¨°à¨•à¨¤ à¨—à¨°à©à©±à¨ª à¨…à¨¨à©à¨•à©‚à¨² à¨¹à¨¨?', faq4Answer: 'à¨…à¨¨à©à¨•à©‚à¨²à¨¤à¨¾ à¨®à¨°à©€à¨œà¨¼ à¨¦à©‡ à¨°à¨•à¨¤ à¨—à¨°à©à©±à¨ª à¨¤à©‡ à¨¨à¨¿à¨°à¨­à¨° à¨•à¨°à¨¦à©€ à¨¹à©ˆà¥¤ à¨†à¨® à¨¨à¨¿à¨¯à¨® à¨¹à©‡à¨ à¨¾à¨‚ à¨¹à¨¨à¥¤',
    faq5Question: 'à¨à¨®à¨°à¨œà©ˆà¨‚à¨¸à©€ à¨¸à©‚à¨šà¨¨à¨¾à¨µà¨¾à¨‚ à¨•à¨¿à¨µà©‡à¨‚ à¨­à©‡à¨œà©€à¨†à¨‚ à¨œà¨¾à¨‚à¨¦à©€à¨†à¨‚ à¨¹à¨¨?', faq5Answer: 'à¨¬à©‡à¨¨à¨¤à©€ à¨¬à¨£à¨¦à©‡ à¨¹à©€ à¨®à¨¿à¨²à¨¦à©‡ à¨¦à¨¾à¨¤à¨¿à¨†à¨‚ à¨¨à©‚à©° à¨¸à©‚à¨šà¨¨à¨¾ à¨­à©‡à¨œà©€ à¨œà¨¾à¨‚à¨¦à©€ à¨¹à©ˆà¥¤ SMS à¨œà¨¾à¨‚ WhatsApp à¨¬à©ˆà¨•à¨…à¨ª à¨¹à©‹ à¨¸à¨•à¨¦à©‡ à¨¹à¨¨à¥¤'
  },
  ur: {
    heroTitle: 'ÛØ± Ø³ÛŒÚ©Ù†Úˆ Ø§ÛÙ… ÛÛ’Û” ÛØ± Ø¹Ø·ÛŒÛ Ø¯ÛÙ†Ø¯Û Ø§ÛÙ… ÛÛ’Û”',
    faq1Question: 'Ø§ÛŒÙ…Ø±Ø¬Ù†Ø³ÛŒ Ù…ÛŒÚº BloodNet Ú©ÛŒØ³Û’ Ù…Ø¯Ø¯ Ú©Ø±ØªØ§ ÛÛ’ØŸ', faq1Answer: 'BloodNet Ø§Ø³Ù¾ØªØ§Ù„ Ú©Ùˆ Ø¯Ø±Ø®ÙˆØ§Ø³Øª Ø¨Ù†Ø§Ù†Û’ØŒ Ù‚Ø±ÛŒØ¨ÛŒ Ù…Ù†Ø§Ø³Ø¨ Ø¹Ø·ÛŒÛ Ø¯ÛÙ†Ø¯Ú¯Ø§Ù† ØªÙ„Ø§Ø´ Ú©Ø±Ù†Û’ Ø§ÙˆØ± ÙÙˆØ±ÛŒ Ø§Ø·Ù„Ø§Ø¹ Ø¨Ú¾ÛŒØ¬Ù†Û’ Ù…ÛŒÚº Ù…Ø¯Ø¯ Ú©Ø±ØªØ§ ÛÛ’Û”',
    faq2Question: 'ÛŒÛ Ù¾Ù„ÛŒÙ¹ ÙØ§Ø±Ù… Ú©ÙˆÙ† Ø§Ø³ØªØ¹Ù…Ø§Ù„ Ú©Ø± Ø³Ú©ØªØ§ ÛÛ’ØŸ', faq2Answer: 'ÛŒÛ Ù¾Ù„ÛŒÙ¹ ÙØ§Ø±Ù… Ø¹Ø·ÛŒÛ Ø¯ÛÙ†Ø¯Ú¯Ø§Ù†ØŒ Ø§Ø³Ù¾ØªØ§Ù„ÙˆÚºØŒ Ø¨Ù„Úˆ Ø¨ÛŒÙ†Ú©ÙˆÚº Ø§ÙˆØ± Ø§ÛŒÚˆÙ…Ù† Ú©Û’ Ù„ÛŒÛ’ Ø¨Ù†Ø§ÛŒØ§ Ú¯ÛŒØ§ ÛÛ’Û”',
    faq3Question: 'Ø¹Ø·ÛŒÛ Ø¯ÛÙ†Ø¯Ú¯Ø§Ù† Ú©ÛŒØ³Û’ Ù…Ù†ØªØ®Ø¨ ÛÙˆØªÛ’ ÛÛŒÚºØŸ', faq3Answer: 'Ø®ÙˆÙ† Ú©Û’ Ú¯Ø±ÙˆÙ¾ØŒ ÙØ§ØµÙ„Û’ØŒ Ø­Ø§Ù„ÛŒÛ Ø¹Ø·ÛŒÛ ØªØ§Ø±ÛŒØ® Ø§ÙˆØ± Ø¯Ø³ØªÛŒØ§Ø¨ÛŒ Ú©ÛŒ Ø¨Ù†ÛŒØ§Ø¯ Ù¾Ø± Ø§Ù†ØªØ®Ø§Ø¨ Ú©ÛŒØ§ Ø¬Ø§ØªØ§ ÛÛ’Û”',
    faq4Question: 'Ú©ÙˆÙ† Ø³Û’ Ø®ÙˆÙ† Ú©Û’ Ú¯Ø±ÙˆÙ¾ Ù…Ø·Ø§Ø¨Ù‚Øª Ø±Ú©Ú¾ØªÛ’ ÛÛŒÚºØŸ', faq4Answer: 'Ù…Ø·Ø§Ø¨Ù‚Øª Ù…Ø±ÛŒØ¶ Ú©Û’ Ø®ÙˆÙ† Ú©Û’ Ú¯Ø±ÙˆÙ¾ Ù¾Ø± Ù…Ù†Ø­ØµØ± ÛÛ’Û” Ø¹Ø§Ù… Ø§ØµÙˆÙ„ Ù†ÛŒÚ†Û’ Ø¯ÛŒÛ’ Ú¯Ø¦Û’ ÛÛŒÚºÛ”',
    faq5Question: 'Ø§ÛŒÙ…Ø±Ø¬Ù†Ø³ÛŒ Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ú©ÛŒØ³Û’ Ø¨Ú¾ÛŒØ¬ÛŒ Ø¬Ø§ØªÛŒ ÛÛŒÚºØŸ', faq5Answer: 'Ø¯Ø±Ø®ÙˆØ§Ø³Øª Ø¨Ù†ØªÛ’ ÛÛŒ Ø¨ÛØªØ±ÛŒÙ† Ù…Ø·Ø§Ø¨Ù‚Øª Ø±Ú©Ú¾Ù†Û’ ÙˆØ§Ù„ÙˆÚº Ú©Ùˆ Ø§Ø·Ù„Ø§Ø¹ Ø¨Ú¾ÛŒØ¬ÛŒ Ø¬Ø§ØªÛŒ ÛÛ’Û” SMS ÛŒØ§ WhatsApp Ø¨ÛŒÚ© Ø§Ù¾ ÛÙˆ Ø³Ú©ØªÛ’ ÛÛŒÚºÛ”'
  },
  or: {
    heroTitle: 'à¬ªà­à¬°à¬¤à­à­Ÿà­‡à¬• à¬¸à­‡à¬•à­‡à¬£à­à¬¡ à¬—à­à¬°à­à¬¤à­à­±à¬ªà­‚à¬°à­à¬£à­à¬£à¥¤ à¬ªà­à¬°à¬¤à­à­Ÿà­‡à¬• à¬¦à¬¾à¬¤à¬¾ à¬—à­à¬°à­à¬¤à­à­±à¬ªà­‚à¬°à­à¬£à­à¬£à¥¤', faq1Question: 'à¬œà¬°à­à¬°à­€ à¬¸à¬®à­Ÿà¬°à­‡ BloodNet à¬•à¬¿à¬ªà¬°à¬¿ à¬¸à¬¹à¬¾à­Ÿà¬¤à¬¾ à¬•à¬°à­‡?', faq1Answer: 'BloodNet à¬¹à¬¸à­à¬ªà¬¿à¬Ÿà¬¾à¬²à¬•à­ à¬…à¬¨à­à¬°à­‹à¬§ à¬¤à¬¿à¬†à¬°à¬¿, à¬¨à¬¿à¬•à¬Ÿà¬¸à­à¬¥ à¬¯à­‹à¬—à­à­Ÿ à¬¦à¬¾à¬¤à¬¾ à¬–à­‹à¬œà¬¿à¬¬à¬¾ à¬à¬¬à¬‚ à¬¶à­€à¬˜à­à¬° à¬¸à­‚à¬šà¬¨à¬¾ à¬ªà¬ à¬¾à¬‡à¬¬à¬¾à¬°à­‡ à¬¸à¬¹à¬¾à­Ÿà¬¤à¬¾ à¬•à¬°à­‡à¥¤',
    faq2Question: 'à¬à¬¹à¬¿ à¬ªà­à¬²à¬¾à¬Ÿà¬«à¬°à­à¬® à¬•à¬¿à¬ à¬¬à­à­Ÿà¬¬à¬¹à¬¾à¬° à¬•à¬°à¬¿à¬ªà¬¾à¬°à¬¿à¬¬?', faq2Answer: 'à¬¦à¬¾à¬¤à¬¾, à¬¹à¬¸à­à¬ªà¬¿à¬Ÿà¬¾à¬², à¬¬à­à¬²à¬¡ à¬¬à­à­Ÿà¬¾à¬™à­à¬• à¬à¬¬à¬‚ à¬à¬¡à¬®à¬¿à¬¨ à¬ªà¬¾à¬‡à¬ à¬à¬¹à¬¾ à¬¤à¬¿à¬†à¬°à¬¿à¥¤', faq3Question: 'à¬¦à¬¾à¬¤à¬¾à¬®à¬¾à¬¨à­‡ à¬•à¬¿à¬ªà¬°à¬¿ à¬šà­Ÿà¬¨ à¬¹à­à¬…à¬¨à­à¬¤à¬¿?', faq3Answer: 'à¬°à¬•à­à¬¤ à¬—à­‹à¬·à­à¬ à­€, à¬¦à­‚à¬°à¬¤à¬¾, à¬¸à¬®à­à¬ªà­à¬°à¬¤à¬¿ à¬¦à¬¾à¬¨ à¬‡à¬¤à¬¿à¬¹à¬¾à¬¸ à¬à¬¬à¬‚ à¬‰à¬ªà¬²à¬¬à­à¬§à¬¤à¬¾ à¬†à¬§à¬¾à¬°à¬°à­‡ à¬šà­Ÿà¬¨ à¬¹à­à¬à¥¤', faq4Question: 'à¬•à­‡à¬‰à¬ à¬°à¬•à­à¬¤ à¬—à­‹à¬·à­à¬ à­€ à¬¸à­à¬¸à¬™à­à¬—à¬¤?', faq4Answer: 'à¬¸à­à¬¸à¬™à­à¬—à¬¤à¬¤à¬¾ à¬°à­‹à¬—à­€à¬° à¬°à¬•à­à¬¤ à¬—à­‹à¬·à­à¬ à­€ à¬‰à¬ªà¬°à­‡ à¬¨à¬¿à¬°à­à¬­à¬° à¬•à¬°à­‡à¥¤ à¬¸à¬¾à¬§à¬¾à¬°à¬£ à¬¨à¬¿à­Ÿà¬® à¬¤à¬³à­‡ à¬…à¬›à¬¿à¥¤', faq5Question: 'à¬œà¬°à­à¬°à­€ à¬¸à­‚à¬šà¬¨à¬¾ à¬•à¬¿à¬ªà¬°à¬¿ à¬ªà¬ à¬¾à¬¯à¬¾à¬?', faq5Answer: 'à¬…à¬¨à­à¬°à­‹à¬§ à¬¤à¬¿à¬†à¬°à¬¿ à¬¹à­‡à¬²à­‡ à¬®à¬¿à¬³à­à¬¥à¬¿à¬¬à¬¾ à¬¦à¬¾à¬¤à¬¾à¬®à¬¾à¬¨à¬™à­à¬•à­ à¬¸à­‚à¬šà¬¨à¬¾ à¬ªà¬ à¬¾à¬¯à¬¾à¬à¥¤ SMS à¬•à¬¿à¬®à­à¬¬à¬¾ WhatsApp à¬¬à­à­Ÿà¬¾à¬•à¬…à¬ª à¬¹à­‹à¬‡à¬ªà¬¾à¬°à­‡à¥¤'
  }
};

Object.entries(localFaq).forEach(([lang, values]) => {
  translations[lang] = { ...translations[lang], ...values };
});

const adminPanels = {
  donor: {
    title: 'Donor network',
    text: 'Track active donors, response rates, donation history, and recent availability updates.'
  },
  hospital: {
    title: 'Hospital requests',
    text: 'Review emergency requests, matched donors, units needed, and response progress in real time.'
  },
  bank: {
    title: 'Blood bank inventory',
    text: 'Monitor live blood stock, low-supply groups, expiry pressure, and fulfilment status.'
  },
  admin: {
    title: 'Admin analytics',
    text: 'Use dashboards for demand trends, donor retention, fulfilment speed, and regional activity.'
  }
};

function showToast(message) {
  if (!toastEl) return;
  window.clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add('show');
  toastTimer = window.setTimeout(() => toastEl.classList.remove('show'), 2600);
}

function strings() {
  return { ...baseStrings, ...(translations[currentLanguage] || {}) };
}

function saveUsers() {
  window.localStorage.setItem(storedUsersKey, JSON.stringify(users));
}

function resetStoredUsersOnce() {
  if (window.localStorage.getItem(resetUsersKey) === 'done') return;
  window.localStorage.removeItem(storedUsersKey);
  window.localStorage.removeItem(sessionKey);
  window.localStorage.setItem(resetUsersKey, 'done');
}

function loadUsers() {
  try {
    users = JSON.parse(window.localStorage.getItem(storedUsersKey) || '[]');
    users = Array.isArray(users) ? users : [];
  } catch {
    users = [];
  }
}

function saveSession(session) {
  currentSession = session;
  window.localStorage.setItem(sessionKey, JSON.stringify(session));
}

function loadSession() {
  try {
    currentSession = JSON.parse(window.localStorage.getItem(sessionKey) || 'null');
  } catch {
    currentSession = null;
  }
}

function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '');
}

function isFutureDate(value) {
  if (!value) return false;
  const selected = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected > today;
}

function validateUniqueUser(email, phone, role, ignoreKey = '') {
  return !users.some((user) => user.key !== ignoreKey && user.role === role && (user.email === email || user.phone === phone));
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function loadHospitalRequests() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(hospitalRequestsKey) || '[]');
    hospitalRequests = Array.isArray(saved) ? saved : [];
  } catch {
    hospitalRequests = [];
  }
}

function saveHospitalRequests() {
  window.localStorage.setItem(hospitalRequestsKey, JSON.stringify(hospitalRequests));
}

function loadInventory() {
  try { inventory = JSON.parse(window.localStorage.getItem(inventoryKey) || '[]'); } catch { inventory = []; }
  if (!inventory.length) inventory = ['O+','O-','A+','A-','B+','B-','AB+','AB-'].map((group, index) => ({ group, units: [18, 4, 15, 3, 12, 4, 7, 2][index], expiry: '2026-08-15', location: 'Cold room A' }));
}
function saveInventory() { window.localStorage.setItem(inventoryKey, JSON.stringify(inventory)); }

function randomSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function hashOtp(otp, salt, target, purpose) {
  const text = `${salt}:${target}:${purpose}:${otp}`;
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, salt) {
  const bytes = new TextEncoder().encode(`${salt}:bloodnet-password:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function createPasswordRecord(password) {
  const passwordSalt = randomSalt();
  return { passwordSalt, passwordHash: await hashPassword(password, passwordSalt) };
}

async function passwordMatches(user, password) {
  if (!user?.passwordHash || !user.passwordSalt) return false;
  return (await hashPassword(password, user.passwordSalt)) === user.passwordHash;
}

async function migrateLegacyPasswords() {
  let changed = false;
  for (const user of users) {
    if (user.password && !user.passwordHash) {
      Object.assign(user, await createPasswordRecord(user.password));
      delete user.password;
      changed = true;
    }
  }
  if (changed) saveUsers();
}

async function createOtpRecord(target, purpose) {
  const otp = generateOtp();
  const salt = randomSalt();
  const hash = await hashOtp(otp, salt, target, purpose);
  return {
    otp,
    record: {
      hash,
      salt,
      target,
      expiresAt: Date.now() + otpValidityMs,
      resendAt: Date.now() + otpResendDelayMs
    }
  };
}

async function sendOtpDelivery(channel, target, otp, purpose) {
  const payload = {
    channel,
    target,
    otp,
    purpose,
    subject: 'Blood Donation Portal - Email Verification OTP',
    body: `Hello,\n\nYour Blood Donation Portal OTP is ${otp}.\n\nThis OTP expires in 5 minutes. Do not share the OTP with anyone.`
  };
  try {
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const details = await response.json().catch(() => ({}));
      throw new Error(details.error || 'OTP provider unavailable');
    }
    return { delivered: true };
  } catch (error) {
    return { delivered: false, error: error.message };
  }
}

function setStatus(node, message, type = 'info') {
  if (!node) return;
  node.textContent = message;
  node.dataset.type = type;
}

function setResendCooldown(button, record, label = 'Send OTP') {
  if (!button || !record) return;
  const tick = () => {
    const remaining = Math.max(0, Math.ceil((record.resendAt - Date.now()) / 1000));
    button.disabled = remaining > 0;
    button.textContent = remaining > 0 ? `Resend in ${remaining}s` : label;
    if (remaining <= 0) window.clearInterval(button._otpTimer);
  };
  window.clearInterval(button._otpTimer);
  tick();
  button._otpTimer = window.setInterval(tick, 1000);
}

function resolveForgotIdentifier(value) {
  const raw = (value || '').trim();
  const email = raw.toLowerCase();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { target: email, channel: 'email', label: 'email address' };
  }
  const phone = normalizePhone(raw);
  if (/^[0-9]{10}$/.test(phone)) {
    return { target: phone, channel: 'sms', label: 'mobile number' };
  }
  return null;
}

async function requestVerificationOtp(kind) {
  const isEmail = kind === 'email';
  const isPhone = kind === 'phone';
  const input = isEmail ? registerEmail : isPhone ? registerPhone : forgotIdentifier;
  const otpInputEl = isEmail ? emailOtpInput : isPhone ? phoneOtpInput : forgotOtpInput;
  const statusEl = isEmail ? emailVerifyStatus : isPhone ? phoneVerifyStatus : forgotVerifyStatus;
  const button = isEmail ? sendEmailOtpButton : isPhone ? sendPhoneOtpButton : sendForgotOtpButton;
  const targetInfo = kind === 'forgot' ? resolveForgotIdentifier(input?.value) : null;
  const target = kind === 'forgot' ? targetInfo?.target || '' : isPhone ? normalizePhone(input?.value) : (input?.value || '').trim().toLowerCase();
  const channel = kind === 'forgot' ? targetInfo?.channel || '' : isPhone ? 'sms' : 'email';
  const purpose = kind === 'forgot' ? 'forgot-password' : `${kind}-verification`;
  if (isPhone && !/^[0-9]{10}$/.test(target)) return setStatus(statusEl, 'Enter a valid 10-digit mobile number.', 'error');
  if (!isPhone && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target)) return setStatus(statusEl, 'Enter a valid email address.', 'error');
  const selectedRole = document.querySelector('input[name="forgotRole"]:checked')?.value || '';
  if (kind === 'forgot' && !selectedRole) return setStatus(statusEl, 'Select the account role first.', 'error');
  if (kind === 'forgot') {
    if (!targetInfo) return setStatus(statusEl, 'Enter a valid email address or 10-digit mobile number.', 'error');
    const hasAccount = targetInfo.channel === 'email'
      ? users.some((user) => user.email === targetInfo.target && user.role === selectedRole)
      : users.some((user) => user.phone === targetInfo.target && user.role === selectedRole);
    if (!hasAccount) return setStatus(statusEl, `No account was found for this ${targetInfo.label} and role.`, 'error');
  }
  const state = verificationState[kind];
  if (Date.now() < state.resendAt) return;
  const { otp, record } = await createOtpRecord(target, purpose);
  Object.assign(state, record, { verified: false, role: selectedRole });
  if (otpInputEl) otpInputEl.value = '';
  const delivery = await sendOtpDelivery(channel, target, otp, purpose);
  const baseMessage = kind === 'forgot'
    ? `OTP has been sent to your ${targetInfo.channel === 'email' ? 'email address' : 'mobile number'}.`
    : isPhone ? 'OTP has been sent to your mobile number.' : 'OTP has been sent to your email.';
  if (!delivery.delivered) {
    state.hash = '';
    state.salt = '';
    return setStatus(statusEl, `Could not send OTP: ${delivery.error}`, 'error');
  }
  setStatus(statusEl, baseMessage, 'success');
  setResendCooldown(button, state);
}

async function verifyOtp(kind) {
  const isEmail = kind === 'email';
  const isPhone = kind === 'phone';
  const input = isEmail ? registerEmail : isPhone ? registerPhone : forgotIdentifier;
  const otpInputEl = isEmail ? emailOtpInput : isPhone ? phoneOtpInput : forgotOtpInput;
  const statusEl = isEmail ? emailVerifyStatus : isPhone ? phoneVerifyStatus : forgotVerifyStatus;
  const targetInfo = kind === 'forgot' ? resolveForgotIdentifier(input?.value) : null;
  const target = kind === 'forgot' ? targetInfo?.target || '' : isPhone ? normalizePhone(input?.value) : (input?.value || '').trim().toLowerCase();
  const state = verificationState[kind];
  const purpose = kind === 'forgot' ? 'forgot-password' : `${kind}-verification`;
  const otp = normalizePhone(otpInputEl?.value).slice(0, 6);
  if (!state.hash || state.target !== target) return setStatus(statusEl, 'Please request a new OTP.', 'error');
  if (Date.now() > state.expiresAt) return setStatus(statusEl, 'OTP expired. Please request a new OTP.', 'error');
  const hash = await hashOtp(otp, state.salt, target, purpose);
  if (hash !== state.hash) return setStatus(statusEl, 'Invalid OTP.', 'error');
  state.verified = true;
  state.hash = '';
  state.salt = '';
  setStatus(statusEl, kind === 'forgot' ? 'OTP verified. You can now reset your password.' : kind === 'phone' ? 'Mobile number verified.' : 'Email verified.', 'success');
}

function openRegisterPopup() {
  registerPopup?.classList.add('open');
  registerPopup?.setAttribute('aria-hidden', 'false');
}

function closeRegisterPopup() {
  registerPopup?.classList.remove('open');
  registerPopup?.setAttribute('aria-hidden', 'true');
}

function hideAuthForms() {
  registerForm?.classList.add('hidden');
  loginForm?.classList.add('hidden');
  forgotForm?.classList.add('hidden');
  otpForm?.classList.add('hidden');
}

function todayValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset() * 60000;
  return new Date(today.getTime() - offset).toISOString().slice(0, 10);
}

function setRegisterMessage(message = '', type = 'error') {
  if (!registerMessage) return;
  registerMessage.textContent = message;
  registerMessage.dataset.type = type;
}

function updatePasswordMatchMessage() {
  if (!passwordMatchMessage) return;
  const password = registerPassword?.value || '';
  const confirmPassword = registerConfirmPassword?.value || '';
  passwordMatchMessage.textContent = '';
  passwordMatchMessage.dataset.type = '';
  registerConfirmPassword?.setCustomValidity('');
  if (!password || !confirmPassword) return;
  if (password === confirmPassword) {
    passwordMatchMessage.textContent = 'Passwords match.';
    passwordMatchMessage.dataset.type = 'success';
  } else {
    passwordMatchMessage.textContent = 'Passwords do not match.';
    passwordMatchMessage.dataset.type = 'error';
    registerConfirmPassword?.setCustomValidity('Passwords do not match.');
  }
}

function resetRegistrationForm() {
  registerForm?.reset();
  setRegisterMessage('');
  if (passwordMatchMessage) {
    passwordMatchMessage.textContent = '';
    passwordMatchMessage.dataset.type = '';
  }
  if (lastDonationWrap) lastDonationWrap.hidden = true;
  if (lastDonationDate) {
    lastDonationDate.value = '';
    lastDonationDate.setCustomValidity('');
    lastDonationDate.max = todayValue();
  }
  registerConfirmPassword?.setCustomValidity('');
  updateRegistrationRoleFields();
}

function selectedRegistrationRole() {
  return registerForm?.querySelector('input[name="registerRole"]:checked')?.value || '';
}

function updateRegistrationRoleFields() {
  const donor = selectedRegistrationRole() === 'Donor';
  document.querySelectorAll('.role-donor').forEach((field) => { field.hidden = !donor; });
  if (registerBloodGroup) registerBloodGroup.required = donor;
  registerForm?.querySelectorAll('input[name="donatedEver"]').forEach((input) => { input.required = donor; });
  if (!donor) {
    registerForm?.querySelectorAll('input[name="donatedEver"]').forEach((input) => { input.checked = false; });
    if (lastDonationWrap) lastDonationWrap.hidden = true;
    if (lastDonationDate) lastDonationDate.value = '';
    if (registerBloodGroup) registerBloodGroup.value = '';
  }
}

function setAuthStep(step) {
  hideAuthForms();
  if (step === 'otp') {
    otpForm?.classList.remove('hidden');
  } else if (step === 'login') {
    loginForm?.classList.remove('hidden');
  } else if (step === 'forgot') {
    forgotForm?.classList.remove('hidden');
  } else {
    registerForm?.classList.remove('hidden');
  }
}

function clearAuthInputs() {
  registerForm?.reset();
  loginForm?.reset();
  forgotForm?.reset();
  otpForm?.reset();
  setRegisterMessage('');
  setStatus(forgotVerifyStatus, '');
  setStatus(forgotMessage, '');
  if (loginEmail) loginEmail.value = '';
  if (loginPassword) loginPassword.value = '';
  if (forgotIdentifier) forgotIdentifier.value = '';
  if (forgotOtpInput) forgotOtpInput.value = '';
  if (forgotPassword) forgotPassword.value = '';
  if (forgotConfirmPassword) forgotConfirmPassword.value = '';
  if (forgotVerifyStatus) forgotVerifyStatus.textContent = '';
  if (forgotMessage) forgotMessage.textContent = '';
}

function openAuthModal(mode = 'register') {
  if (mode === 'register') resetRegistrationForm();
  if (mode === 'login') {
    if (loginEmail) loginEmail.value = '';
    if (loginPassword) loginPassword.value = '';
  }
  authModal?.classList.add('open');
  authModal?.setAttribute('aria-hidden', 'false');
  authModal?.querySelectorAll('[data-auth-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.authTab === mode);
  });
  setAuthStep(mode);
}

function closeAuthModal() {
  authModal?.classList.remove('open');
  authModal?.setAttribute('aria-hidden', 'true');
  hideAuthForms();
  clearAuthInputs();
  window.clearInterval(otpCountdownTimer);
  window.clearInterval(resendCountdownTimer);
}

function closeModal() {
  modalEl?.classList.remove('open');
  modalEl?.setAttribute('aria-hidden', 'true');
}

function openNotifyPopup(title = '', message = '') {
  if (notifyPopupTitle && title) notifyPopupTitle.textContent = title;
  if (notifyPopupText && message) notifyPopupText.textContent = message;
  notifyPopupEl?.classList.add('open');
  notifyPopupEl?.setAttribute('aria-hidden', 'false');
}

function closeNotifyPopup() {
  notifyPopupEl?.classList.remove('open');
  notifyPopupEl?.setAttribute('aria-hidden', 'true');
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  if (themeButton) {
    themeButton.setAttribute('aria-pressed', String(theme === 'light'));
    themeButton.dataset.theme = theme;
  }
}

function hideProfileView() {
  if (!profilePage) return;
  profilePage.classList.remove('open');
  profilePage.hidden = true;
  profilePage.setAttribute('aria-hidden', 'true');
}

function syncProfileView() {
  if (!currentSession?.user || !profilePage) return;
  const user = currentSession.user;
  profileTitle.textContent = user.name || strings().profileHeading;
  profileSubtitle.textContent = strings().profileSubtitle;
  profileRole.textContent = user.role || 'Donor';
  profileName.textContent = user.name || '-';
  profileEmail.textContent = user.email || '-';
  profilePhone.textContent = user.phone || '-';
  profileBloodGroup.textContent = user.bloodGroup || '-';
  profileAge.textContent = user.age ? String(user.age) : '-';
  profileDonationDate.textContent = user.lastDonationDate || 'N/A';
  profileTravelStatus.textContent = user.traveling ? strings().travelOn : strings().travelOff;
  if (travelModeStatement) {
    travelModeStatement.textContent = `Currently travel mode is ${user.traveling ? 'on' : 'off'}.`;
  }
  if (travelToggle) {
    travelToggle.classList.toggle('active', Boolean(user.traveling));
    travelToggle.setAttribute('aria-pressed', String(Boolean(user.traveling)));
    const switchText = travelToggle.querySelector('.switch-text');
    if (switchText) switchText.textContent = user.traveling ? 'On' : 'Off';
  }
  if (logoutButton) logoutButton.textContent = strings().logoutText;
  if (travelCard) travelCard.classList.toggle('hidden', user.role !== 'Donor');
  if (donorAlertCard) donorAlertCard.hidden = user.role !== 'Donor';
  profilePage.querySelectorAll('.donor-only').forEach((node) => { node.hidden = user.role !== 'Donor'; });
  renderDonorAlerts();
  profilePage.classList.add('open');
  profilePage.hidden = false;
  profilePage.setAttribute('aria-hidden', 'false');
}

function completeLogin(user) {
  saveSession({ userKey: user.key, user });
  closeAuthModal();
  hideProfileView();
  if (user.role === 'Hospital') showHospitalPage();
  else if (user.role === 'Blood Bank') { openWorkspace(bloodBankPage); renderInventory(); }
  else if (user.role === 'Admin') { openWorkspace(adminPage); renderAdmin(); }
  else syncProfileView();
  showToast('Login successful.');
}

function renderHospitalRequests() {
  if (!hospitalRequestList) return;
  const openRequests = hospitalRequests.filter((request) => request.status !== 'Completed');
  const units = openRequests.reduce((total, request) => total + request.units, 0);
  const matches = openRequests.reduce((total, request) => total + request.matches, 0);
  if (hospitalOpenRequests) hospitalOpenRequests.textContent = String(openRequests.length);
  if (hospitalUnitsNeeded) hospitalUnitsNeeded.textContent = String(units);
  if (hospitalDonorsMatched) hospitalDonorsMatched.textContent = String(matches);
  if (!hospitalRequests.length) {
    hospitalRequestList.innerHTML = '<p class="hospital-empty">No requests raised yet. Create an emergency request to notify matched donors.</p>';
    return;
  }
  hospitalRequestList.innerHTML = hospitalRequests.slice(0, 8).map((request, index) => `<article class="hospital-request"><div><h4>${escapeHtml(request.patient)}</h4><p>${request.bloodGroup} - ${request.units} units - ${request.matches} donors notified</p><p>${request.status} - ${request.createdAt}</p>${renderResponseSummary(request)}<div class="request-actions"><button class="text-button" data-request-action="notify" data-request-index="${index}" type="button">Request donors</button><button class="text-button" data-request-action="edit" data-request-index="${index}" type="button">Edit</button>${request.status !== 'Completed' ? `<button class="text-button" data-request-action="complete" data-request-index="${index}" type="button">Mark completed</button>` : ''}</div></div><span class="request-priority">${request.priority}</span></article>`).join('');
}

function renderResponseSummary(request) {
  const responses = Object.entries(request.responses || {});
  if (!responses.length) return '';
  const summary = responses.map(([key, response]) => {
    const user = users.find((entry) => entry.key === key);
    const label = user?.name || user?.email || key;
    return `${escapeHtml(label)}: ${escapeHtml(response)}`;
  }).join(' - ');
  return `<p class="request-responses">Responses: ${summary}</p>`;
}
function escapeHtml(value) {
  const node = document.createElement('span');
  node.textContent = String(value || '');
  return node.innerHTML;
}

function showHospitalPage() {
  hideProfileView();
  hospitalPage?.classList.add('open');
  hospitalPage?.removeAttribute('hidden');
  hospitalPage?.setAttribute('aria-hidden', 'false');
  if (hospitalPage) hospitalPage.scrollTop = 0;
  renderHospitalRequests();
}

function hideHospitalPage() {
  hospitalPage?.classList.remove('open');
  hospitalPage?.setAttribute('hidden', '');
  hospitalPage?.setAttribute('aria-hidden', 'true');
}

function closeWorkspaces() { hideHospitalPage(); [bloodBankPage, adminPage].forEach((page) => { page?.classList.remove('open'); page?.setAttribute('hidden', ''); page?.setAttribute('aria-hidden', 'true'); }); }
function openWorkspace(page) { closeWorkspaces(); page?.classList.add('open'); page?.removeAttribute('hidden'); page?.setAttribute('aria-hidden', 'false'); if (page) page.scrollTop = 0; if (page === adminPage) { const heading = page.querySelector('.hospital-hero h2'); if (heading) heading.textContent = 'Admin Dashboard'; } }
function renderInventory() { if (inventoryGrid) inventoryGrid.innerHTML = inventory.map((item) => `<article class="inventory-card ${item.units < 5 ? 'low-stock' : ''}"><strong>${item.group}</strong><b>${item.units} units</b><small>${item.location} - Exp: ${item.expiry}</small>${item.units < 5 ? '<em>Low stock</em>' : ''}</article>`).join(''); }
function renderAdmin() { const open = hospitalRequests.filter((r) => r.status !== 'Completed'); const low = inventory.filter((i) => i.units < 5); if (adminDonors) adminDonors.textContent = String(users.filter((user) => user.role === 'Donor').length); if (adminRequests) adminRequests.textContent = String(open.length); if (adminLowStock) adminLowStock.textContent = String(low.length); if (adminAlertList) adminAlertList.innerHTML = low.length ? low.map((i) => `<article class="hospital-request"><div><h4>${i.group} is low</h4><p>${i.units} units in ${i.location}; replenish stock.</p></div><span class="request-priority">Action</span></article>`).join('') : '<p class="hospital-empty">All groups are adequately stocked.</p>'; if (adminRequestList) adminRequestList.innerHTML = hospitalRequests.length ? hospitalRequests.slice(0, 6).map((r) => `<article class="hospital-request"><div><h4>${escapeHtml(r.patient)}</h4><p>${r.bloodGroup} - ${r.units} units - ${r.status}</p>${renderResponseSummary(r)}</div><span class="request-priority">${r.priority}</span></article>`).join('') : '<p class="hospital-empty">No emergency requests recorded.</p>'; }
function eligibleDonorsFor(bloodGroup) {
  const compatibleDonorGroups = {
    'O+': ['O+', 'O-'], 'O-': ['O-'], 'A+': ['A+', 'A-', 'O+', 'O-'], 'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'], 'B-': ['B-', 'O-'], 'AB+': ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'], 'AB-': ['AB-', 'A-', 'B-', 'O-']
  };
  return users.filter((user) => user.role === 'Donor' && !user.traveling && compatibleDonorGroups[bloodGroup]?.includes(user.bloodGroup));
}

function renderDonorAlerts() {
  const donor = currentSession?.user;
  if (!donorAlertList || donor?.role !== 'Donor') return;
  const requests = hospitalRequests.filter((request) => request.status !== 'Completed' && eligibleDonorsFor(request.bloodGroup).some((entry) => entry.key === donor.key));
  if (!requests.length) {
    donorAlertList.innerHTML = '<p class="hospital-empty">No compatible emergency requests are open right now.</p>';
    return;
  }
  donorAlertList.innerHTML = requests.slice(0, 6).map((request, index) => {
    const response = request.responses?.[donor.key] || '';
    const actions = response ? `<p><strong>Your response: ${escapeHtml(response)}</strong></p>` : `<div class="donor-alert-actions"><button class="btn primary" type="button" data-donor-response="Accepted" data-donor-request="${hospitalRequests.indexOf(request)}">Accept</button><button class="btn outline" type="button" data-donor-response="Declined" data-donor-request="${hospitalRequests.indexOf(request)}">Reject</button></div>`;
    return `<article class="donor-alert"><h4>${escapeHtml(request.patient)}</h4><p>${request.bloodGroup} - ${request.units} unit${request.units === 1 ? '' : 's'} - ${escapeHtml(request.priority)}</p>${actions}</article>`;
  }).join('');
}

function renderLiveRequest(request, donors = eligibleDonorsFor(request.bloodGroup)) {
  if (liveRequestTitle) liveRequestTitle.textContent = `${request.patient} - ${request.bloodGroup} blood`;
  if (liveRequestDetails) liveRequestDetails.textContent = `${request.units} unit${request.units === 1 ? '' : 's'} needed - ${request.priority} priority`;
  if (liveDonorList) {
    liveDonorList.innerHTML = donors.length ? donors.slice(0, 3).map((donor, index) => `<article class="person"><span class="initial">${escapeHtml((donor.name || 'D').charAt(0).toUpperCase())}</span><span class="who"><b>${escapeHtml(donor.name || 'Registered donor')}</b><small>${escapeHtml(donor.bloodGroup)} donor - Alert ready</small></span><span class="score"><b>${94 - index * 8}</b><small>Priority</small></span></article>`).join('') : '<p class="hospital-empty">No compatible registered donors are available right now.</p>';
  }
}

async function notifyDonorsForRequest(request) {
  const donors = eligibleDonorsFor(request.bloodGroup);
  renderLiveRequest(request, donors);
  if (!donors.length) {
    request.matches = 0;
    request.status = 'No compatible donors available';
    saveHospitalRequests();
    renderHospitalRequests();
    renderAdmin();
    if (liveAlertStatus) liveAlertStatus.textContent = 'No compatible registered donors are currently available.';
    return;
  }
  request.status = 'Sending emergency alerts';
  request.matches = donors.length;
  saveHospitalRequests();
  renderHospitalRequests();
  renderAdmin();
  if (liveAlertStatus) liveAlertStatus.textContent = `Sending details to ${donors.length} matched donor${donors.length === 1 ? '' : 's'}...`;
  try {
    const response = await fetch('/api/send-emergency-alerts', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request, recipients: donors.map(({ name, email, phone }) => ({ name, email, phone })) })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Alert delivery failed');
    request.status = `Alerts sent: ${result.emailSent} email, ${result.smsSent} SMS`;
    if (liveAlertStatus) liveAlertStatus.textContent = `Alert sent to ${donors.length} donor${donors.length === 1 ? '' : 's'} (${result.emailSent} email, ${result.smsSent} SMS).`;
    openNotifyPopup('Emergency request sent', `${request.patient}: ${request.bloodGroup}, ${request.units} unit${request.units === 1 ? '' : 's'}, ${request.priority}. Alerts sent to ${donors.length} matched donor${donors.length === 1 ? '' : 's'}.`);
    showToast('Emergency alert sent to matched donors.');
  } catch (error) {
    request.status = 'Alert delivery could not be completed';
    if (liveAlertStatus) liveAlertStatus.textContent = `Alert delivery failed: ${error.message}`;
    showToast(`Alert delivery failed: ${error.message}`);
  }
  saveHospitalRequests();
  renderHospitalRequests();
  renderAdmin();
  renderDonorAlerts();
}

function addHospitalRequest(patient, bloodGroup, units, priority) {
  const request = { patient, bloodGroup, units, priority, matches: 0, status: 'New emergency request', createdAt: 'Just now' };
  hospitalRequests.unshift(request);
  saveHospitalRequests();
  renderHospitalRequests();
  renderLiveRequest(request);
  renderDonorAlerts();
  return request;
}

function completeRegistration(user) {
  closeRegisterPopup();
  openAuthModal('login');
  showToast('Registration OTP verified. Please log in.');
}

function updateLiveCounter() {
  if (!liveCounter) return;
  const onlineDonors = 12480 + users.length;
  liveCounter.textContent = `${onlineDonors.toLocaleString('en-IN')} donors online`;
}

function startOtpTimer() {
  window.clearInterval(otpCountdownTimer);
  const tick = () => {
    const remaining = otpState.expiresAt - Date.now();
    if (remaining <= 0) {
      if (otpTimerEl) otpTimerEl.textContent = '00:00';
      window.clearInterval(otpCountdownTimer);
      return;
    }
    const minutes = String(Math.floor(remaining / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
    if (otpTimerEl) otpTimerEl.textContent = `${minutes}:${seconds}`;
  };
  tick();
  otpCountdownTimer = window.setInterval(tick, 1000);
}

function startAuthResendTimer() {
  window.clearInterval(resendCountdownTimer);
  const tick = () => {
    const remaining = Math.max(0, Math.ceil((otpState.resendAt - Date.now()) / 1000));
    if (resendOtpButton) {
      resendOtpButton.disabled = remaining > 0;
      resendOtpButton.textContent = remaining > 0 ? `Resend OTP (${remaining}s)` : 'Resend OTP';
    }
    if (remaining <= 0) window.clearInterval(resendCountdownTimer);
  };
  tick();
  resendCountdownTimer = window.setInterval(tick, 1000);
}

async function startAuthOtp(user, mode) {
  const target = user.email;
  const { otp, record } = await createOtpRecord(target, `${mode}-login`);
  Object.assign(otpState, record, { userKey: user.key, mode, target });
  setAuthStep('otp');
  const delivery = await sendOtpDelivery('email', target, otp, `${mode}-login`);
  if (!delivery.delivered) {
    if (otpMessageEl) otpMessageEl.textContent = `Could not send OTP: ${delivery.error}`;
    showToast(`Could not send OTP: ${delivery.error}`);
    return;
  }
  if (otpMessageEl) {
    otpMessageEl.textContent = 'OTP has been sent to your email.';
  }
  showToast('OTP has been sent to your email.');
  startOtpTimer();
  startAuthResendTimer();
}

async function startRegistrationOtp(user) {
  const target = `${user.email}:${user.phone}`;
  const { otp, record } = await createOtpRecord(target, 'register');
  Object.assign(otpState, record, { userKey: user.key, mode: 'register', target });
  setAuthStep('otp');
  const [emailDelivery, smsDelivery] = await Promise.all([
    sendOtpDelivery('email', user.email, otp, 'register'),
    sendOtpDelivery('sms', user.phone, otp, 'register')
  ]);
  if (!emailDelivery.delivered || !smsDelivery.delivered) {
    const failed = [!emailDelivery.delivered ? `Email: ${emailDelivery.error}` : '', !smsDelivery.delivered ? `SMS: ${smsDelivery.error}` : ''].filter(Boolean).join(' ');
    if (otpMessageEl) otpMessageEl.textContent = `OTP delivery is incomplete. ${failed} Use Resend OTP after correcting the delivery issue.`;
    showToast('OTP delivery is incomplete. Your registration details are saved.');
    startOtpTimer();
    startAuthResendTimer();
    return false;
  }
  if (otpMessageEl) {
    otpMessageEl.textContent = 'Same OTP has been sent to your email and mobile number.';
  }
  showToast('OTP has been sent to your email and mobile number.');
  startOtpTimer();
  startAuthResendTimer();
  return true;
}

const translationCache = new Map();
function captureTranslationSource() { document.querySelectorAll('[data-i18n]').forEach((node) => { if (!node.dataset.sourceHtml) node.dataset.sourceHtml = node.innerHTML; }); document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => { if (!node.dataset.sourcePlaceholder) node.dataset.sourcePlaceholder = node.getAttribute('placeholder') || ''; }); }
async function applyLanguage(language) {
  captureTranslationSource();
  const content = [...document.querySelectorAll('[data-i18n]')];
  const placeholders = [...document.querySelectorAll('[data-i18n-placeholder]')];
  if (language === 'en') { content.forEach((node) => { node.innerHTML = node.dataset.sourceHtml; }); placeholders.forEach((node) => node.setAttribute('placeholder', node.dataset.sourcePlaceholder)); currentLanguage = 'en'; document.documentElement.lang = 'en'; return; }
  const source = [...content.map((node) => node.dataset.sourceHtml.replace(/<[^>]*>/g, '').trim()), ...placeholders.map((node) => node.dataset.sourcePlaceholder)].filter(Boolean);
  let translated = translationCache.get(language);
  try { if (!translated) { const response = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ target: language, texts: source }) }); const payload = await response.json(); if (!response.ok) throw new Error(payload.error || 'Translation unavailable'); translated = payload.translations; translationCache.set(language, translated); } let index = 0; content.forEach((node) => { const text = node.dataset.sourceHtml.replace(/<[^>]*>/g, '').trim(); if (text) node.textContent = translated[index++]; }); placeholders.forEach((node) => { const text = node.dataset.sourcePlaceholder; if (text) node.setAttribute('placeholder', translated[index++]); }); currentLanguage = language; document.documentElement.lang = language; } catch (error) { languageSelect.value = 'en'; await applyLanguage('en'); showToast(`Translation unavailable: ${error.message}`); }
}

themeButton?.addEventListener('click', () => {
  const current = document.body.dataset.theme || 'light';
  const next = themeOrder[(themeOrder.indexOf(current) + 1) % themeOrder.length] || 'light';
  setTheme(next);
  showToast(`Theme: ${next}`);
});

languageSelect?.addEventListener('change', async (event) => {
  const language = event.target.value;
  const label = event.target.selectedOptions[0]?.textContent || 'English';
  await applyLanguage(language);
  if (currentLanguage === language) showToast(`Language set to ${label}.`);
});

registerButton?.addEventListener('click', () => openAuthModal('register'));
loginButton?.addEventListener('click', () => openAuthModal('login'));
forgotPasswordLink?.addEventListener('click', () => setAuthStep('forgot'));
sendForgotOtpButton?.addEventListener('click', () => requestVerificationOtp('forgot'));
closeAuthModalButton?.addEventListener('click', closeAuthModal);
authModal?.addEventListener('click', (event) => {
  if (event.target === authModal) closeAuthModal();
});

authModal?.querySelectorAll('[data-auth-tab]').forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.dataset.authTab || 'register';
    if (mode === 'register') resetRegistrationForm();
    authModal.querySelectorAll('[data-auth-tab]').forEach((item) => item.classList.toggle('active', item === button));
    setAuthStep(mode);
  });
});

registerPassword?.addEventListener('input', updatePasswordMatchMessage);
registerConfirmPassword?.addEventListener('input', updatePasswordMatchMessage);
document.querySelectorAll('input[inputmode="numeric"], input[type="tel"]').forEach((input) => {
  input.addEventListener('input', () => {
    input.value = normalizePhone(input.value).slice(0, input.maxLength > 0 ? input.maxLength : input.value.length);
  });
});
document.querySelectorAll('[data-toggle-password]').forEach((button) => {
  button.addEventListener('click', () => {
    const input = document.querySelector(`#${button.dataset.togglePassword}`);
    if (!input) return;
    const visible = input.type === 'text';
    input.type = visible ? 'password' : 'text';
    button.textContent = visible ? 'Show' : 'Hide';
    button.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
  });
});
lastDonationDate?.addEventListener('change', () => {
  if (isFutureDate(lastDonationDate.value)) {
    lastDonationDate.setCustomValidity('Last donation date cannot be in the future.');
  } else {
    lastDonationDate.setCustomValidity('');
  }
});

if (registerForm) {
  registerForm.addEventListener('change', () => {
    updateRegistrationRoleFields();
    const donatedEver = registerForm.querySelector('input[name="donatedEver"]:checked')?.value || '';
    if (lastDonationWrap) lastDonationWrap.hidden = donatedEver !== 'yes';
    if (donatedEver !== 'yes') {
      lastDonationDate.value = '';
      lastDonationDate.setCustomValidity('');
    }
  });
}

registerForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  setRegisterMessage('');
  updatePasswordMatchMessage();
  const name = registerName.value.trim();
  const age = Number(registerAge.value);
  const phone = normalizePhone(registerPhone.value);
  const email = registerEmail.value.trim().toLowerCase();
  const password = registerPassword.value;
  const confirmPassword = registerConfirmPassword.value;
  const role = selectedRegistrationRole();
  const bloodGroup = registerBloodGroup.value;
  const donatedEver = registerForm.querySelector('input[name="donatedEver"]:checked')?.value || '';
  const lastDonationValue = lastDonationDate.value;
  const hasLastDonation = donatedEver === 'yes';

  if (!role) return setRegisterMessage('Select an account role.');
  if (name.length < 3) return setRegisterMessage('Name must be at least 3 characters.');
  if (!Number.isInteger(age) || age < 1 || age > 120) return setRegisterMessage('Enter a valid age.');
  if (!/^[0-9]{10}$/.test(phone)) return setRegisterMessage('Enter a valid 10-digit phone number.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setRegisterMessage('Enter a valid email address.');
  if (password.length < 8) return setRegisterMessage('Password must be at least 8 characters.');
  if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) return setRegisterMessage('Password must include a letter and a number.');
  if (password !== confirmPassword) return setRegisterMessage('Passwords do not match.');
  if (role === 'Donor' && !bloodGroup) return setRegisterMessage('Select a blood group.');
  if (role === 'Donor' && !donatedEver) return setRegisterMessage('Select whether you have donated before.');
  if (role === 'Donor' && hasLastDonation && !lastDonationValue) return setRegisterMessage('Select your last donation date.');
  if (role === 'Donor' && isFutureDate(lastDonationValue)) return setRegisterMessage('Last donation date cannot be in the future.');
  if (!validateUniqueUser(email, phone, role)) return setRegisterMessage('This email or phone already exists for the selected role.');

  const passwordRecord = await createPasswordRecord(password);
  const userKey = `${role.toLowerCase().replace(/\s+/g, '-')}:${email}`;
  const user = {
    key: userKey,
    role,
    name,
    age,
    phone,
    email,
    ...passwordRecord,
    bloodGroup: role === 'Donor' ? bloodGroup : '',
    donatedEver: role === 'Donor' ? donatedEver : '',
    lastDonationDate: role === 'Donor' && hasLastDonation ? lastDonationValue : 'N/A',
    emailVerified: false,
    phoneVerified: false,
    traveling: false
  };

  users = users.filter((entry) => entry.key !== userKey).concat(user);
  saveUsers();
  updateLiveCounter();
  const otpSent = await startRegistrationOtp(user);
  if (!otpSent) {
    setRegisterMessage('OTP delivery is incomplete. Stay on the OTP screen and resend once delivery is available.');
  }
});

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value;
  const role = loginForm.querySelector('input[name="loginRole"]:checked')?.value || '';
  if (!role) return showToast('Select the account role.');
  const user = users.find((entry) => entry.email === email && entry.role === role);
  if (!user || !(await passwordMatches(user, password))) return showToast('Incorrect email, password, or role.');
  if (!user.emailVerified || !user.phoneVerified) return showToast('Complete registration OTP verification before logging in.');
  completeLogin(user);
});

otpForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!otpState.hash || Date.now() > otpState.expiresAt) return showToast('OTP expired. Please request a new OTP.');
  const otp = normalizePhone(otpInput.value).slice(0, 6);
  const purpose = otpState.mode === 'register' ? 'register' : `${otpState.mode}-login`;
  const hash = await hashOtp(otp, otpState.salt, otpState.target, purpose);
  if (hash !== otpState.hash) return showToast('Invalid OTP.');
  const user = users.find((entry) => entry.key === otpState.userKey);
  if (!user) return showToast(strings().toastNoAccount);
  if (otpState.mode === 'register') {
    user.emailVerified = true;
    user.phoneVerified = true;
    saveUsers();
    completeRegistration(user);
    return;
  }
  user.emailVerified = true;
  saveUsers();
  completeLogin(user);
  closeRegisterPopup();
  showToast(strings().verifySuccess);
});

resendOtpButton?.addEventListener('click', async () => {
  if (!otpState.userKey) return;
  if (Date.now() < otpState.resendAt) return;
  const user = users.find((entry) => entry.key === otpState.userKey);
  if (!user) return;
  if (otpState.mode === 'register') {
    await startRegistrationOtp(user);
  } else {
    await startAuthOtp(user, otpState.mode || 'login');
  }
  startOtpTimer();
  showToast(strings().toastOtpResent);
});

forgotForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const targetInfo = resolveForgotIdentifier(forgotIdentifier?.value);
  const role = forgotForm.querySelector('input[name="forgotRole"]:checked')?.value || '';
  if (!targetInfo) return setStatus(forgotMessage, 'Enter a valid email address or 10-digit mobile number.', 'error');
  const user = targetInfo.channel === 'email'
    ? users.find((entry) => entry.email === targetInfo.target && entry.role === role)
    : users.find((entry) => entry.phone === targetInfo.target && entry.role === role);
  if (!user) return setStatus(forgotMessage, strings().toastNoAccount, 'error');
  const needsVerification = !verificationState.forgot.verified || verificationState.forgot.target !== targetInfo.target || verificationState.forgot.role !== role;
  if (needsVerification) {
    if (!verificationState.forgot.hash) return setStatus(forgotMessage, 'Request a password reset OTP first.', 'error');
    if (Date.now() > verificationState.forgot.expiresAt) return setStatus(forgotMessage, 'OTP expired. Please request a new OTP.', 'error');
    const otp = normalizePhone(forgotOtpInput?.value).slice(0, 6);
    const hash = await hashOtp(otp, verificationState.forgot.salt, targetInfo.target, 'forgot-password');
    if (hash !== verificationState.forgot.hash) return setStatus(forgotMessage, 'Invalid password reset OTP.', 'error');
    verificationState.forgot.verified = true;
    verificationState.forgot.hash = '';
    verificationState.forgot.salt = '';
  }
  if (forgotPassword.value.length < 8) return setStatus(forgotMessage, 'Password must be at least 8 characters.', 'error');
  if (!/(?=.*[A-Za-z])(?=.*\d)/.test(forgotPassword.value)) return setStatus(forgotMessage, 'Password must include a letter and a number.', 'error');
  if (forgotPassword.value !== forgotConfirmPassword.value) return setStatus(forgotMessage, 'Passwords do not match.', 'error');
  Object.assign(user, await createPasswordRecord(forgotPassword.value));
  delete user.password;
  saveUsers();
  verificationState.forgot.verified = false;
  verificationState.forgot.target = '';
  verificationState.forgot.role = '';
  setStatus(forgotMessage, 'Password reset successful. Please login.', 'success');
  setAuthStep('login');
});

travelToggle?.addEventListener('click', () => {
  if (!currentSession?.user) return;
  const user = users.find((entry) => entry.key === currentSession.userKey);
  if (!user || user.role !== 'Donor') return;
  user.traveling = !user.traveling;
  currentSession.user = user;
  saveUsers();
  saveSession(currentSession);
  syncProfileView();
  showToast(user.traveling ? strings().toastTravelOn : strings().toastTravelOff);
});

profileButton?.addEventListener('click', () => {
  if (currentSession?.user) {
    syncProfileView();
  } else {
    openAuthModal('login');
  }
});

closeRegisterPopupButton?.addEventListener('click', closeRegisterPopup);

registerPopup?.addEventListener('click', (event) => {
  if (event.target === registerPopup) closeRegisterPopup();
});

donorAlertList?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-donor-response]');
  const donor = currentSession?.user;
  const request = hospitalRequests[Number(button?.dataset.donorRequest)];
  if (!button || !donor || !request) return;
  request.responses = { ...(request.responses || {}), [donor.key]: button.dataset.donorResponse };
  saveHospitalRequests();
  renderDonorAlerts();
  renderHospitalRequests();
  renderAdmin();
  showToast(`Emergency request ${button.dataset.donorResponse.toLowerCase()}.`);
});

profileBackButton?.addEventListener('click', hideProfileView);
hospitalNavLink?.addEventListener('click', (event) => {
  event.preventDefault();
  showHospitalPage();
  navLinks?.parentElement?.classList.remove('open');
});
hospitalBackButton?.addEventListener('click', hideHospitalPage);
bloodBankNavLink?.addEventListener('click', (event) => { event.preventDefault(); openWorkspace(bloodBankPage); renderInventory(); navLinks?.parentElement?.classList.remove('open'); });
adminNavLink?.addEventListener('click', (event) => { event.preventDefault(); openWorkspace(adminPage); renderAdmin(); navLinks?.parentElement?.classList.remove('open'); });
bloodBankBackButton?.addEventListener('click', () => closeWorkspaces());
adminBackButton?.addEventListener('click', () => closeWorkspaces());
bloodBankForm?.addEventListener('submit', (event) => { event.preventDefault(); const group = document.querySelector('#stockBloodGroup').value; const units = Number(document.querySelector('#stockUnits').value); const expiry = document.querySelector('#stockExpiry').value; const location = document.querySelector('#stockLocation').value.trim(); if (!Number.isInteger(units) || units < 0 || !expiry || !location) return; const current = inventory.find((item) => item.group === group); if (current) Object.assign(current, { units, expiry, location }); else inventory.push({ group, units, expiry, location }); saveInventory(); renderInventory(); renderAdmin(); showToast('Blood bank inventory updated.'); });
hospitalRequestList?.addEventListener('click', async (event) => { const button = event.target.closest('[data-request-action]'); if (!button) return; const request = hospitalRequests[Number(button.dataset.requestIndex)]; if (!request) return; if (button.dataset.requestAction === 'notify') return notifyDonorsForRequest(request); if (button.dataset.requestAction === 'complete') request.status = 'Completed'; if (button.dataset.requestAction === 'edit') { const patient = window.prompt('Patient / case reference', request.patient); if (patient?.trim()) request.patient = patient.trim(); const units = Number(window.prompt('Units needed', request.units)); if (Number.isInteger(units) && units > 0) request.units = units; renderLiveRequest(request); } saveHospitalRequests(); renderHospitalRequests(); renderAdmin(); renderDonorAlerts(); showToast(button.dataset.requestAction === 'complete' ? 'Request marked as completed.' : 'Request updated.'); });
hospitalNewRequest?.addEventListener('click', () => document.querySelector('#hospitalPatient')?.focus());
hospitalRequestForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const patient = document.querySelector('#hospitalPatient')?.value.trim();
  const bloodGroup = document.querySelector('#hospitalBloodGroup')?.value;
  const units = Number(document.querySelector('#hospitalUnits')?.value);
  const priority = document.querySelector('#hospitalPriority')?.value;
  if (!patient || !bloodGroup || !Number.isInteger(units) || units < 1) return;
  const request = addHospitalRequest(patient, bloodGroup, units, priority);
  hospitalRequestForm.reset();
  document.querySelector('#hospitalUnits').value = '1';
  await notifyDonorsForRequest(request);
});

logoutButton?.addEventListener('click', () => {
  window.localStorage.removeItem(sessionKey);
  currentSession = null;
  clearAuthInputs();
  hideProfileView();
  showToast(strings().logoutText);
});

document.querySelector('#notifyTop')?.addEventListener('click', async () => {
  const request = hospitalRequests[0];
  if (!request) return showToast('Create an emergency request first.');
  await notifyDonorsForRequest(request);
});

document.querySelector('#becomeDonor')?.addEventListener('click', () => {
  modalEl?.classList.add('open');
  modalEl?.setAttribute('aria-hidden', 'false');
});

document.querySelector('#closeModal')?.addEventListener('click', closeModal);
modalEl?.addEventListener('click', (event) => {
  if (event.target === modalEl) closeModal();
});

document.querySelector('#emergencyForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const request = addHospitalRequest(document.querySelector('#requestTitleInput')?.value.trim() || 'Emergency request', document.querySelector('#bloodGroup')?.value, Number(document.querySelector('#unitsNeeded')?.value) || 1, 'Critical');
  closeModal();
  await notifyDonorsForRequest(request);
});

document.querySelector('#mobile')?.addEventListener('click', () => {
  navLinks?.parentElement?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', (event) => {
    navLinks.parentElement?.classList.remove('open');
    if (link.getAttribute('href') === '#home') {
      event.preventDefault();
      hideProfileView();
      closeWorkspaces();
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});

document.querySelectorAll('[data-admin-tab]').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = adminPanels[button.dataset.adminTab];
    document.querySelectorAll('[data-admin-tab]').forEach((item) => item.classList.toggle('active', item === button));
    const title = document.querySelector('#adminPanelTitle');
    const text = document.querySelector('#adminPanelText');
    if (panel && title && text) {
      title.textContent = panel.title;
      text.textContent = panel.text;
    }
  });
});

document.querySelector('#closeNotifyPopup')?.addEventListener('click', closeNotifyPopup);
notifyPopupEl?.addEventListener('click', (event) => {
  if (event.target === notifyPopupEl) closeNotifyPopup();
});

setTheme(document.body.dataset.theme || 'light');
applyLanguage('en');
resetStoredUsersOnce();
loadUsers();
migrateLegacyPasswords();
updateLiveCounter();
loadHospitalRequests();
loadInventory();
renderHospitalRequests();
renderInventory();
if (hospitalRequests[0]) renderLiveRequest(hospitalRequests[0]);
if (lastDonationDate) lastDonationDate.max = todayValue();
loadSession();

window.addEventListener('storage', (event) => {
  if (![storedUsersKey, sessionKey, hospitalRequestsKey, inventoryKey].includes(event.key)) return;
  loadUsers();
  loadSession();
  loadHospitalRequests();
  loadInventory();
  updateLiveCounter();
  renderHospitalRequests();
  renderInventory();
  renderAdmin();
  if (currentSession?.user?.role === 'Donor') renderDonorAlerts();
  if (currentSession?.user?.role === 'Donor' && profilePage && profilePage.classList.contains('open')) syncProfileView();
});

const toastEl = document.querySelector('#toast');
const modalEl = document.querySelector('#modal');
const notifyPopupEl = document.querySelector('#notifyPopup');
const navLinks = document.querySelector('#navLinks');
const languageSelect = document.querySelector('#languageSelect');
const adminLoginButton = document.querySelector('#adminLogin');
const adminIntegration = document.querySelector('#adminIntegration');
let toastTimer;
let currentLanguage = 'en';

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
  heroPill: '<i class="dot"></i> AI-powered - Real-time',
  heroTitle: 'Every second counts. Every donor matters.',
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
  featuresTitle: 'Ten capabilities that turn a manual scramble into a coordinated response.',
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
  rolesTitle: 'Each user gets a focused experience for their part in the response chain.',
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
  legal2: '(c) 2026 BloodNet',
  modalTitle: 'Raise emergency request',
  modalDesc: 'This demo simulates the hospital-to-donor workflow.',
  fieldTitle: 'Patient / request title',
  fieldTitlePlaceholder: 'e.g. Trauma patient',
  fieldBloodGroup: 'Blood group',
  fieldUnits: 'Units needed',
  modalSubmit: 'Notify matched donors',
  notifyPopupKicker: 'Notification',
  notifyPopupTitle: 'Donors notified',
  notifyPopupDesc: 'The top matched donors have been notified for the current request.',
  toastNotify: 'Top three matched donors notified successfully.',
  toastRequest: 'Emergency request created. Matching donors are being notified.',
  toastAdminOn: 'Admin workspace enabled.',
  toastAdminOff: 'Admin workspace hidden.'
};

const translations = {
  en: baseStrings,
  hi: {
    navHome: 'होम', navFeatures: 'विशेषताएं', navRoles: 'भूमिकाएं', navFaq: 'FAQ', brandTag: 'स्मार्ट रक्तदाता नेटवर्क', langLabel: 'भाषा', headerRequest: 'अनुरोध भेजें', adminLogin: 'एडमिन लॉगिन', adminLogout: 'एडमिन लॉगआउट',
    heroPill: '<i class="dot"></i> AI संचालित - रियल टाइम', heroTitle: 'हर सेकंड महत्वपूर्ण है। हर रक्तदाता महत्वपूर्ण है।', heroDesc: 'एक AI-संचालित नेटवर्क जो रक्तदाता, अस्पताल और रक्त बैंक को जोड़ता है ताकि सही रक्तदाता जल्दी मिल सके।', ctaPrimary: 'आपात सूचना',
    statDonors: 'सक्रिय रक्तदाता', statHospitals: 'सहयोगी अस्पताल', statLives: 'प्रभावित जीवन', statResponse: 'औसत प्रतिक्रिया', criticalTag: '<i class="dot"></i> गंभीर अनुरोध - 2 मिनट पहले', liveTag: 'लाइव', notifyTop: 'शीर्ष रक्तदाताओं को सूचित करें',
    featuresEyebrow: 'आपात क्षणों के लिए बनाया गया', featuresTitle: 'एक ही प्रणाली में तेज अनुरोध, मिलान, सूचना और ट्रैकिंग।', feature1Title: 'आपात अलर्ट', feature1Desc: 'अनुरोध बनते ही उपयुक्त रक्तदाताओं तक सूचना पहुंचती है।', feature2Title: 'उपलब्धता अनुमान', feature2Desc: 'स्कोरिंग से पता चलता है कि अभी कौन जवाब दे सकता है।', feature3Title: 'प्राथमिकता क्रम', feature3Desc: 'दूरी, इतिहास और उपलब्धता के आधार पर क्रम बनाया जाता है।', feature4Title: 'इतिहास और बैज', feature4Desc: 'दान इतिहास, प्रमाणपत्र और नियमित रक्तदाताओं की पहचान।', feature5Title: 'मैप खोज', feature5Desc: 'पास के रक्तदाताओं को दूरी और प्रासंगिकता से खोजें।', feature6Title: 'एडमिन विश्लेषण', feature6Desc: 'मांग, पूर्ति गति और रक्तदाता प्रतिधारण देखें।',
    rolesEyebrow: 'एक प्लेटफॉर्म - चार भूमिकाएं', rolesTitle: 'हर उपयोगकर्ता को उसकी भूमिका के अनुसार अनुभव मिलता है।', role1Title: 'अलर्ट पाएं और प्रभाव देखें', role1Mark: 'रक्तदाता', role1Desc: 'मिले हुए अनुरोध देखें, जल्दी जवाब दें और इतिहास संभालें।', role2Title: 'तुरंत आपात अनुरोध भेजें', role2Mark: 'अस्पताल', role2Desc: 'अनुरोध बनाएं, रक्तदाताओं को मिलाएं और प्रतिक्रिया देखें।', role3Title: 'लाइव भंडार संभालें', role3Mark: 'रक्त बैंक', role3Desc: 'रक्त यूनिट, कमी और अस्पतालों के समन्वय को ट्रैक करें।', role4Title: 'पूरा नेटवर्क देखें', role4Mark: 'एडमिन', role4Desc: 'मीट्रिक और गतिविधि से नेटवर्क को सक्रिय रखें।',
    faqTitle: 'शीर्ष 5 FAQ', faq1Question: 'आपात स्थिति में BloodNet कैसे मदद करता है?', faq1Answer: 'BloodNet अस्पताल को अनुरोध बनाने, पास के उपयुक्त रक्तदाताओं को खोजने और तुरंत अलर्ट भेजने में मदद करता है। इससे फोन कॉल और मैनुअल सूची पर निर्भरता कम होती है।', faq2Question: 'इस प्लेटफॉर्म का उपयोग कौन कर सकता है?', faq2Answer: 'यह रक्तदाताओं, अस्पतालों, रक्त बैंकों और एडमिन के लिए है। हर भूमिका को अपने काम के अनुसार अलग दृश्य मिलता है।', faq3Question: 'अनुरोध के लिए रक्तदाता कैसे चुने जाते हैं?', faq3Answer: 'रक्त समूह, दूरी, हाल के दान इतिहास और संभावित उपलब्धता के आधार पर रक्तदाताओं को चुना जाता है।', faq4Question: 'कौन से रक्त समूह संगत हैं?', faq4Answer: 'संगतता मरीज के रक्त समूह पर निर्भर करती है। नीचे दी गई तालिका सामान्य लाल रक्त कोशिका प्राप्ति नियम दिखाती है।', faq5Question: 'आपात सूचनाएं कैसे भेजी जाती हैं?', faq5Answer: 'अनुरोध बनते ही शीर्ष मिलान वाले रक्तदाताओं को सूचना मिलती है। SMS या WhatsApp बैकअप चैनल हो सकते हैं।', compatNeed: 'मरीज को चाहिए', compatReceive: 'इनसे मिल सकता है',
    footerBrandDesc: 'स्मार्ट रक्तदाता नेटवर्क', footerTeam: 'परियोजना टीम', footerLinks: 'त्वरित लिंक', footerLink1: 'विशेषताएं', footerLink2: 'भूमिकाएं', modalTitle: 'आपात अनुरोध भेजें', modalDesc: 'यह डेमो अस्पताल से रक्तदाता तक की प्रक्रिया दिखाता है।', fieldTitle: 'मरीज / अनुरोध शीर्षक', fieldTitlePlaceholder: 'जैसे ट्रॉमा मरीज', fieldBloodGroup: 'रक्त समूह', fieldUnits: 'यूनिट चाहिए', modalSubmit: 'मिले रक्तदाताओं को सूचित करें', notifyPopupKicker: 'सूचना', notifyPopupTitle: 'रक्तदाताओं को सूचना भेजी गई', notifyPopupDesc: 'वर्तमान अनुरोध के लिए शीर्ष मिलान रक्तदाताओं को सूचित कर दिया गया है।', toastNotify: 'शीर्ष तीन रक्तदाताओं को सूचना भेजी गई।', toastRequest: 'आपात अनुरोध बनाया गया। रक्तदाताओं को सूचना भेजी जा रही है।', toastAdminOn: 'एडमिन कार्यक्षेत्र चालू हुआ।', toastAdminOff: 'एडमिन कार्यक्षेत्र छिपा दिया गया।'
  }
};

const generatedLanguages = {
  ta: ['முகப்பு', 'அம்சங்கள்', 'பங்குகள்', 'ஸ்மார்ட் இரத்ததானி வலைப்பின்னல்', 'அவசர அறிவிப்பு', 'முதல் 5 FAQ'],
  te: ['హోమ్', 'లక్షణాలు', 'పాత్రలు', 'స్మార్ట్ రక్తదాత నెట్‌వర్క్', 'అత్యవసర సమాచారం', 'టాప్ 5 FAQ'],
  kn: ['ಮುಖಪುಟ', 'ಅಂಶಗಳು', 'ಪಾತ್ರಗಳು', 'ಸ್ಮಾರ್ಟ್ ರಕ್ತದಾನಿ ಜಾಲ', 'ತುರ್ತು ಸೂಚನೆ', 'ಟಾಪ್ 5 FAQ'],
  ml: ['ഹോം', 'സവിശേഷതകൾ', 'പങ്കുകൾ', 'സ്മാർട്ട് രക്തദാതൃ നെറ്റ്‌വർക്ക്', 'അടിയന്തര അറിയിപ്പ്', 'ടോപ്പ് 5 FAQ'],
  or: ['ହୋମ୍', 'ବିଶେଷତା', 'ଭୂମିକା', 'ସ୍ମାର୍ଟ ରକ୍ତଦାତା ନେଟୱର୍କ', 'ଜରୁରୀ ସୂଚନା', 'ଟପ୍ 5 FAQ'],
  bn: ['হোম', 'বৈশিষ্ট্য', 'ভূমিকা', 'স্মার্ট রক্তদাতা নেটওয়ার্ক', 'জরুরি বিজ্ঞপ্তি', 'শীর্ষ ৫ FAQ'],
  mr: ['होम', 'वैशिष्ट्ये', 'भूमिका', 'स्मार्ट रक्तदाता नेटवर्क', 'आपत्कालीन सूचना', 'टॉप 5 FAQ'],
  gu: ['હોમ', 'વિશેષતાઓ', 'ભૂમિકાઓ', 'સ્માર્ટ રક્તદાતા નેટવર્ક', 'તાત્કાલિક સૂચના', 'ટોપ 5 FAQ'],
  pa: ['ਹੋਮ', 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ', 'ਭੂਮਿਕਾਵਾਂ', 'ਸਮਾਰਟ ਰਕਤਦਾਤਾ ਨੈੱਟਵਰਕ', 'ਐਮਰਜੈਂਸੀ ਸੂਚਨਾ', 'ਟਾਪ 5 FAQ'],
  ur: ['ہوم', 'خصوصیات', 'کردار', 'اسمارٹ خون عطیہ دہندہ نیٹ ورک', 'ہنگامی اطلاع', 'ٹاپ 5 FAQ']
};

Object.entries(generatedLanguages).forEach(([lang, labels]) => {
  translations[lang] = {
    ...baseStrings,
    navHome: labels[0], navFeatures: labels[1], navRoles: labels[2], navFaq: 'FAQ',
    brandTag: labels[3], ctaPrimary: labels[4], faqTitle: labels[5],
    headerRequest: labels[4], adminLogin: baseStrings.adminLogin, adminLogout: baseStrings.adminLogout,
    heroTitle: labels[4] + ' for every blood request',
    heroDesc: labels[3] + ' connects donors, hospitals, and blood banks in one place.',
    faq1Question: labels[4] + ' எப்படி உதவுகிறது? / How does it help?',
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
    heroTitle: 'ஒவ்வொரு நொடியும் முக்கியம். ஒவ்வொரு தானியரும் முக்கியம்.',
    faq1Question: 'அவசர நேரத்தில் BloodNet எப்படி உதவுகிறது?',
    faq1Answer: 'BloodNet மருத்துவமனைக்கு கோரிக்கை உருவாக்க, அருகிலுள்ள பொருத்தமான தானியர்களை கண்டறிய, உடனடியாக அறிவிப்பை அனுப்ப உதவுகிறது. இதனால் கைமுறை அழைப்புகள் குறைந்து பதில் வேகம் அதிகரிக்கும்.',
    faq2Question: 'இந்த தளத்தை யார் பயன்படுத்தலாம்?',
    faq2Answer: 'தானியர்கள், மருத்துவமனைகள், இரத்த வங்கிகள், நிர்வாகிகள் அனைவருக்கும் இந்த தளம் வடிவமைக்கப்பட்டுள்ளது.',
    faq3Question: 'கோரிக்கைக்கு தானியர்கள் எப்படி தேர்வு செய்யப்படுகிறார்கள்?',
    faq3Answer: 'இரத்தக்குழு பொருத்தம், தூரம், சமீபத்திய தான வரலாறு, கிடைக்கும் வாய்ப்பு ஆகியவற்றின் அடிப்படையில் தானியர்கள் தேர்வு செய்யப்படுகிறார்கள்.',
    faq4Question: 'எந்த இரத்தக்குழுக்கள் பொருந்தும்?',
    faq4Answer: 'பொருத்தம் நோயாளியின் இரத்தக்குழுவைப் பொறுத்தது. கீழே பொதுவான பெறும் விதிகள் கொடுக்கப்பட்டுள்ளன.',
    faq5Question: 'அவசர அறிவிப்புகள் எப்படி அனுப்பப்படும்?',
    faq5Answer: 'கோரிக்கை உருவானவுடன் முதன்மை பொருத்தமான தானியர்களுக்கு அறிவிப்பு அனுப்பப்படும். SMS அல்லது WhatsApp மாற்று வழியாக பயன்படுத்தலாம்.'
  },
  te: {
    heroTitle: 'ప్రతి సెకను ముఖ్యం. ప్రతి దాత ముఖ్యం.',
    faq1Question: 'అత్యవసర సమయంలో BloodNet ఎలా సహాయపడుతుంది?',
    faq1Answer: 'BloodNet ఆసుపత్రి అభ్యర్థనను సృష్టించి, దగ్గరలో ఉన్న సరైన దాతలను గుర్తించి, త్వరగా హెచ్చరికలు పంపడానికి సహాయపడుతుంది.',
    faq2Question: 'ఈ వేదికను ఎవరు ఉపయోగించగలరు?',
    faq2Answer: 'దాతలు, ఆసుపత్రులు, రక్త బ్యాంకులు మరియు నిర్వాహకుల కోసం ఈ వేదిక రూపొందించబడింది.',
    faq3Question: 'దాతలను ఎలా ఎంపిక చేస్తారు?',
    faq3Answer: 'రక్త గ్రూప్ సరిపోవడం, దూరం, ఇటీవలి దానం చరిత్ర మరియు అందుబాటు ఆధారంగా దాతలను ఎంపిక చేస్తారు.',
    faq4Question: 'ఏ రక్త గ్రూపులు అనుకూలం?',
    faq4Answer: 'అనుకూలత రోగి రక్త గ్రూపుపై ఆధారపడి ఉంటుంది. సాధారణ స్వీకరణ నియమాలు క్రింద ఉన్నాయి.',
    faq5Question: 'అత్యవసర నోటిఫికేషన్లు ఎలా పంపబడతాయి?',
    faq5Answer: 'అభ్యర్థన సృష్టించగానే సరిపోయే దాతలకు నోటిఫికేషన్ వెళ్తుంది. SMS లేదా WhatsApp బ్యాకప్‌గా ఉపయోగించవచ్చు.'
  },
  kn: {
    heroTitle: 'ಪ್ರತಿ ಕ್ಷಣ ಮುಖ್ಯ. ಪ್ರತಿ ದಾನಿಯೂ ಮುಖ್ಯ.',
    faq1Question: 'ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ BloodNet ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ?',
    faq1Answer: 'BloodNet ಆಸ್ಪತ್ರೆಗೆ ಮನವಿ ಸೃಷ್ಟಿಸಲು, ಹತ್ತಿರದ ಸೂಕ್ತ ದಾನಿಗಳನ್ನು ಹುಡುಕಲು ಮತ್ತು ತಕ್ಷಣ ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    faq2Question: 'ಈ ವೇದಿಕೆಯನ್ನು ಯಾರು ಬಳಸಬಹುದು?',
    faq2Answer: 'ದಾನಿಗಳು, ಆಸ್ಪತ್ರೆಗಳು, ರಕ್ತ ಬ್ಯಾಂಕುಗಳು ಮತ್ತು ನಿರ್ವಾಹಕರಿಗಾಗಿ ಈ ವೇದಿಕೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
    faq3Question: 'ದಾನಿಗಳನ್ನು ಹೇಗೆ ಆಯ್ಕೆ ಮಾಡಲಾಗುತ್ತದೆ?',
    faq3Answer: 'ರಕ್ತ ಗುಂಪಿನ ಹೊಂದಾಣಿಕೆ, ದೂರ, ಇತ್ತೀಚಿನ ದಾನ ಇತಿಹಾಸ ಮತ್ತು ಲಭ್ಯತೆ ಆಧಾರವಾಗಿ ದಾನಿಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗುತ್ತದೆ.',
    faq4Question: 'ಯಾವ ರಕ್ತ ಗುಂಪುಗಳು ಹೊಂದಿಕೊಳ್ಳುತ್ತವೆ?',
    faq4Answer: 'ಹೊಂದಾಣಿಕೆ ರೋಗಿಯ ರಕ್ತ ಗುಂಪಿನ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿದೆ. ಸಾಮಾನ್ಯ ಸ್ವೀಕರಿಸುವ ನಿಯಮಗಳು ಕೆಳಗೆ ಇವೆ.',
    faq5Question: 'ತುರ್ತು ಸೂಚನೆಗಳನ್ನು ಹೇಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ?',
    faq5Answer: 'ಮನವಿ ಸೃಷ್ಟಿಸಿದಾಗ ಉತ್ತಮ ಹೊಂದಾಣಿಕೆಯ ದಾನಿಗಳಿಗೆ ಸೂಚನೆ ಹೋಗುತ್ತದೆ. SMS ಅಥವಾ WhatsApp ಬ್ಯಾಕಪ್ ಆಗಿರಬಹುದು.'
  },
  ml: {
    heroTitle: 'ഓരോ നിമിഷവും പ്രധാനമാണ്. ഓരോ ദാതാവും പ്രധാനമാണ്.',
    faq1Question: 'അടിയന്തര സാഹചര്യത്തിൽ BloodNet എങ്ങനെ സഹായിക്കുന്നു?',
    faq1Answer: 'ആശുപത്രിക്ക് അഭ്യർത്ഥന സൃഷ്ടിച്ച് അടുത്തുള്ള അനുയോജ്യരായ ദാതാക്കളെ കണ്ടെത്തി ഉടൻ അറിയിപ്പ് അയയ്ക്കാൻ BloodNet സഹായിക്കുന്നു.',
    faq2Question: 'ഈ പ്ലാറ്റ്ഫോം ആരെല്ലാം ഉപയോഗിക്കാം?',
    faq2Answer: 'ദാതാക്കൾ, ആശുപത്രികൾ, രക്തബാങ്കുകൾ, അഡ്മിൻ എന്നിവർക്ക് വേണ്ടിയാണ് ഈ സംവിധാനം.',
    faq3Question: 'ദാതാക്കളെ എങ്ങനെ തിരഞ്ഞെടുക്കുന്നു?',
    faq3Answer: 'രക്തഗ്രൂപ്പ് പൊരുത്തം, ദൂരം, സമീപകാല ദാനചരിത്രം, ലഭ്യത എന്നിവയുടെ അടിസ്ഥാനത്തിലാണ് തിരഞ്ഞെടുപ്പ്.',
    faq4Question: 'ഏത് രക്തഗ്രൂപ്പുകൾ പൊരുത്തപ്പെടും?',
    faq4Answer: 'പൊരുത്തം രോഗിയുടെ രക്തഗ്രൂപ്പിനെ ആശ്രയിച്ചിരിക്കുന്നു. സാധാരണ സ്വീകരണ നിയമങ്ങൾ താഴെ കൊടുക്കുന്നു.',
    faq5Question: 'അടിയന്തര അറിയിപ്പുകൾ എങ്ങനെ അയക്കുന്നു?',
    faq5Answer: 'അഭ്യർത്ഥന സൃഷ്ടിക്കുമ്പോൾ മികച്ച പൊരുത്തമുള്ള ദാതാക്കൾക്ക് അറിയിപ്പ് പോകും. SMS അല്ലെങ്കിൽ WhatsApp ബാക്കപ്പായി ഉപയോഗിക്കാം.'
  },
  bn: {
    heroTitle: 'প্রতিটি সেকেন্ড গুরুত্বপূর্ণ। প্রতিটি দাতা গুরুত্বপূর্ণ।',
    faq1Question: 'জরুরি অবস্থায় BloodNet কীভাবে সাহায্য করে?',
    faq1Answer: 'BloodNet হাসপাতালকে অনুরোধ তৈরি করতে, কাছের উপযুক্ত দাতাদের খুঁজতে এবং দ্রুত সতর্কতা পাঠাতে সাহায্য করে।',
    faq2Question: 'এই প্ল্যাটফর্ম কে ব্যবহার করতে পারে?',
    faq2Answer: 'দাতা, হাসপাতাল, ব্লাড ব্যাংক এবং অ্যাডমিনদের জন্য এই প্ল্যাটফর্ম তৈরি।',
    faq3Question: 'দাতা কীভাবে নির্বাচন করা হয়?',
    faq3Answer: 'রক্তের গ্রুপ, দূরত্ব, সাম্প্রতিক দানের ইতিহাস এবং সম্ভাব্য উপস্থিতির ভিত্তিতে দাতা বাছাই করা হয়।',
    faq4Question: 'কোন রক্তের গ্রুপ মিলবে?',
    faq4Answer: 'মিল রোগীর রক্তের গ্রুপের উপর নির্ভর করে। নিচে সাধারণ গ্রহণের নিয়ম দেখানো হয়েছে।',
    faq5Question: 'জরুরি নোটিফিকেশন কীভাবে পাঠানো হয়?',
    faq5Answer: 'অনুরোধ তৈরি হলে সেরা মিল পাওয়া দাতাদের নোটিফিকেশন পাঠানো হয়। SMS বা WhatsApp ব্যাকআপ হতে পারে.'
  },
  mr: {
    heroTitle: 'प्रत्येक सेकंद महत्त्वाचा. प्रत्येक दाता महत्त्वाचा.',
    faq1Question: 'आपत्कालीन वेळी BloodNet कसे मदत करते?', faq1Answer: 'BloodNet रुग्णालयाला विनंती तयार करणे, जवळचे योग्य दाते शोधणे आणि त्वरित सूचना पाठवणे सोपे करते.',
    faq2Question: 'हे व्यासपीठ कोण वापरू शकते?', faq2Answer: 'दाते, रुग्णालये, रक्तपेढ्या आणि प्रशासक यांच्यासाठी हे व्यासपीठ आहे.',
    faq3Question: 'दाते कसे निवडले जातात?', faq3Answer: 'रक्तगट, अंतर, अलीकडील दान इतिहास आणि उपलब्धता यावर दाते निवडले जातात.',
    faq4Question: 'कोणते रक्तगट सुसंगत आहेत?', faq4Answer: 'सुसंगतता रुग्णाच्या रक्तगटावर अवलंबून असते. सामान्य नियम खाली दिले आहेत.',
    faq5Question: 'आपत्कालीन सूचना कशा पाठवल्या जातात?', faq5Answer: 'विनंती तयार झाल्यावर जुळणाऱ्या दात्यांना सूचना पाठवली जाते. SMS किंवा WhatsApp बॅकअप असू शकते.'
  },
  gu: {
    heroTitle: 'દરેક સેકન્ડ મહત્વની છે. દરેક દાતા મહત્વનો છે.',
    faq1Question: 'આપાતકાલીન સમયે BloodNet કેવી રીતે મદદ કરે છે?', faq1Answer: 'BloodNet હોસ્પિટલને વિનંતી બનાવવા, નજીકના યોગ્ય દાતાઓ શોધવા અને તરત સૂચના મોકલવામાં મદદ કરે છે.',
    faq2Question: 'આ પ્લેટફોર્મ કોણ વાપરી શકે?', faq2Answer: 'દાતા, હોસ્પિટલ, બ્લડ બેન્ક અને એડમિન માટે આ પ્લેટફોર્મ બનાવાયું છે.',
    faq3Question: 'દાતાઓ કેવી રીતે પસંદ થાય છે?', faq3Answer: 'રક્ત જૂથ, અંતર, તાજેતરનો દાન ઇતિહાસ અને ઉપલબ્ધતા આધારે દાતાઓ પસંદ થાય છે.',
    faq4Question: 'કયા રક્ત જૂથો સુસંગત છે?', faq4Answer: 'સુસંગતતા દર્દીના રક્ત જૂથ પર આધારિત છે. સામાન્ય નિયમો નીચે છે.',
    faq5Question: 'આપાતકાલીન સૂચનાઓ કેવી રીતે મોકલાય છે?', faq5Answer: 'વિનંતી બનાવ્યા પછી યોગ્ય દાતાઓને સૂચના મોકલાય છે. SMS અથવા WhatsApp બેકઅપ બની શકે છે.'
  },
  pa: {
    heroTitle: 'ਹਰ ਸਕਿੰਟ ਮਹੱਤਵਪੂਰਨ ਹੈ। ਹਰ ਦਾਤਾ ਮਹੱਤਵਪੂਰਨ ਹੈ।',
    faq1Question: 'ਐਮਰਜੈਂਸੀ ਵਿੱਚ BloodNet ਕਿਵੇਂ ਮਦਦ ਕਰਦਾ ਹੈ?', faq1Answer: 'BloodNet ਹਸਪਤਾਲ ਨੂੰ ਬੇਨਤੀ ਬਣਾਉਣ, ਨੇੜਲੇ ਢੁੱਕਵੇਂ ਦਾਤਿਆਂ ਨੂੰ ਲੱਭਣ ਅਤੇ ਜਲਦੀ ਸੂਚਨਾ ਭੇਜਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।',
    faq2Question: 'ਇਹ ਪਲੇਟਫਾਰਮ ਕੌਣ ਵਰਤ ਸਕਦਾ ਹੈ?', faq2Answer: 'ਦਾਤੇ, ਹਸਪਤਾਲ, ਬਲੱਡ ਬੈਂਕ ਅਤੇ ਐਡਮਿਨ ਇਸ ਪਲੇਟਫਾਰਮ ਨੂੰ ਵਰਤ ਸਕਦੇ ਹਨ।',
    faq3Question: 'ਦਾਤੇ ਕਿਵੇਂ ਚੁਣੇ ਜਾਂਦੇ ਹਨ?', faq3Answer: 'ਰਕਤ ਗਰੁੱਪ, ਦੂਰੀ, ਤਾਜ਼ਾ ਦਾਨ ਇਤਿਹਾਸ ਅਤੇ ਉਪਲਬਧਤਾ ਦੇ ਆਧਾਰ ਤੇ ਚੋਣ ਹੁੰਦੀ ਹੈ।',
    faq4Question: 'ਕਿਹੜੇ ਰਕਤ ਗਰੁੱਪ ਅਨੁਕੂਲ ਹਨ?', faq4Answer: 'ਅਨੁਕੂਲਤਾ ਮਰੀਜ਼ ਦੇ ਰਕਤ ਗਰੁੱਪ ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ। ਆਮ ਨਿਯਮ ਹੇਠਾਂ ਹਨ।',
    faq5Question: 'ਐਮਰਜੈਂਸੀ ਸੂਚਨਾਵਾਂ ਕਿਵੇਂ ਭੇਜੀਆਂ ਜਾਂਦੀਆਂ ਹਨ?', faq5Answer: 'ਬੇਨਤੀ ਬਣਦੇ ਹੀ ਮਿਲਦੇ ਦਾਤਿਆਂ ਨੂੰ ਸੂਚਨਾ ਭੇਜੀ ਜਾਂਦੀ ਹੈ। SMS ਜਾਂ WhatsApp ਬੈਕਅਪ ਹੋ ਸਕਦੇ ਹਨ।'
  },
  ur: {
    heroTitle: 'ہر سیکنڈ اہم ہے۔ ہر عطیہ دہندہ اہم ہے۔',
    faq1Question: 'ایمرجنسی میں BloodNet کیسے مدد کرتا ہے؟', faq1Answer: 'BloodNet اسپتال کو درخواست بنانے، قریبی مناسب عطیہ دہندگان تلاش کرنے اور فوری اطلاع بھیجنے میں مدد کرتا ہے۔',
    faq2Question: 'یہ پلیٹ فارم کون استعمال کر سکتا ہے؟', faq2Answer: 'یہ پلیٹ فارم عطیہ دہندگان، اسپتالوں، بلڈ بینکوں اور ایڈمن کے لیے بنایا گیا ہے۔',
    faq3Question: 'عطیہ دہندگان کیسے منتخب ہوتے ہیں؟', faq3Answer: 'خون کے گروپ، فاصلے، حالیہ عطیہ تاریخ اور دستیابی کی بنیاد پر انتخاب کیا جاتا ہے۔',
    faq4Question: 'کون سے خون کے گروپ مطابقت رکھتے ہیں؟', faq4Answer: 'مطابقت مریض کے خون کے گروپ پر منحصر ہے۔ عام اصول نیچے دیے گئے ہیں۔',
    faq5Question: 'ایمرجنسی اطلاعات کیسے بھیجی جاتی ہیں؟', faq5Answer: 'درخواست بنتے ہی بہترین مطابقت رکھنے والوں کو اطلاع بھیجی جاتی ہے۔ SMS یا WhatsApp بیک اپ ہو سکتے ہیں۔'
  },
  or: {
    heroTitle: 'ପ୍ରତ୍ୟେକ ସେକେଣ୍ଡ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। ପ୍ରତ୍ୟେକ ଦାତା ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ।',
    faq1Question: 'ଜରୁରୀ ସମୟରେ BloodNet କିପରି ସହାୟତା କରେ?', faq1Answer: 'BloodNet ହସ୍ପିଟାଲକୁ ଅନୁରୋଧ ତିଆରି, ନିକଟସ୍ଥ ଯୋଗ୍ୟ ଦାତା ଖୋଜିବା ଏବଂ ଶୀଘ୍ର ସୂଚନା ପଠାଇବାରେ ସହାୟତା କରେ।',
    faq2Question: 'ଏହି ପ୍ଲାଟଫର୍ମ କିଏ ବ୍ୟବହାର କରିପାରିବ?', faq2Answer: 'ଦାତା, ହସ୍ପିଟାଲ, ବ୍ଲଡ ବ୍ୟାଙ୍କ ଏବଂ ଏଡମିନ ପାଇଁ ଏହା ତିଆରି।',
    faq3Question: 'ଦାତାମାନେ କିପରି ଚୟନ ହୁଅନ୍ତି?', faq3Answer: 'ରକ୍ତ ଗୋଷ୍ଠୀ, ଦୂରତା, ସମ୍ପ୍ରତି ଦାନ ଇତିହାସ ଏବଂ ଉପଲବ୍ଧତା ଆଧାରରେ ଚୟନ ହୁଏ।',
    faq4Question: 'କେଉଁ ରକ୍ତ ଗୋଷ୍ଠୀ ସୁସଙ୍ଗତ?', faq4Answer: 'ସୁସଙ୍ଗତତା ରୋଗୀର ରକ୍ତ ଗୋଷ୍ଠୀ ଉପରେ ନିର୍ଭର କରେ। ସାଧାରଣ ନିୟମ ତଳେ ଅଛି।',
    faq5Question: 'ଜରୁରୀ ସୂଚନା କିପରି ପଠାଯାଏ?', faq5Answer: 'ଅନୁରୋଧ ତିଆରି ହେଲେ ମିଳୁଥିବା ଦାତାମାନଙ୍କୁ ସୂଚନା ପଠାଯାଏ। SMS କିମ୍ବା WhatsApp ବ୍ୟାକଅପ ହୋଇପାରେ।'
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
    text: 'Use Recharts dashboards for demand trends, donor retention, fulfilment speed, and regional activity.'
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

function applyLanguage(language) {
  currentLanguage = language;
  const activeStrings = strings();
  document.documentElement.lang = language;

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (activeStrings[key]) {
      node.innerHTML = activeStrings[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    const key = node.getAttribute('data-i18n-placeholder');
    if (activeStrings[key]) {
      node.setAttribute('placeholder', activeStrings[key]);
    }
  });

  if (adminLoginButton) {
    adminLoginButton.textContent = document.body.classList.contains('admin-authenticated')
      ? activeStrings.adminLogout
      : activeStrings.adminLogin;
  }
}

function closeModal() {
  modalEl?.classList.remove('open');
  modalEl?.setAttribute('aria-hidden', 'true');
}

function openNotifyPopup() {
  notifyPopupEl?.classList.add('open');
  notifyPopupEl?.setAttribute('aria-hidden', 'false');
}

function closeNotifyPopup() {
  notifyPopupEl?.classList.remove('open');
  notifyPopupEl?.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-theme-choice]').forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.themeChoice || 'light';
    document.body.dataset.theme = theme;
    document.querySelectorAll('[data-theme-choice]').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    showToast(`${button.textContent} theme applied.`);
  });
});

languageSelect?.addEventListener('change', (event) => {
  const language = event.target.value;
  const label = event.target.selectedOptions[0]?.textContent || 'English';
  applyLanguage(language);
  showToast(`Language set to ${label}.`);
});

document.querySelector('#notifyTop')?.addEventListener('click', () => {
  showToast(strings().toastNotify);
  openNotifyPopup();
});

document.querySelector('#becomeDonor')?.addEventListener('click', () => {
  modalEl?.classList.add('open');
  modalEl?.setAttribute('aria-hidden', 'false');
});

document.querySelector('#openRequest')?.addEventListener('click', () => {
  modalEl?.classList.add('open');
  modalEl?.setAttribute('aria-hidden', 'false');
});

document.querySelector('#closeModal')?.addEventListener('click', closeModal);

modalEl?.addEventListener('click', (event) => {
  if (event.target === modalEl) closeModal();
});

document.querySelector('#emergencyForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  closeModal();
  showToast(strings().toastRequest);
});

document.querySelector('#mobile')?.addEventListener('click', () => {
  navLinks?.parentElement?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.parentElement?.classList.remove('open');
  });
});

adminLoginButton?.addEventListener('click', () => {
  const isAdmin = document.body.classList.toggle('admin-authenticated');
  adminLoginButton.textContent = isAdmin ? strings().adminLogout : strings().adminLogin;
  adminIntegration?.setAttribute('aria-hidden', String(!isAdmin));
  showToast(isAdmin ? strings().toastAdminOn : strings().toastAdminOff);
});

document.querySelectorAll('[data-admin-tab]').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = adminPanels[button.dataset.adminTab];
    document.querySelectorAll('[data-admin-tab]').forEach((item) => {
      item.classList.toggle('active', item === button);
    });
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

applyLanguage('en');

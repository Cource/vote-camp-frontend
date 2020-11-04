import AsyncStorage from "@react-native-community/async-storage"

interface Data {
    [propsName: string]: {
        [propName: string]: string
    }
}
let currentLanguage = 'en'
AsyncStorage.getItem('lang')
    .then((res) => res ? currentLanguage = res : null)

const data: Data = {
    en: {
        'Campaign Progress': 'Campaign Progress',
        'Houses': 'Houses',
        'Houses Left': 'Houses Left',
        'Search': 'Search',
        'Name, House name': 'Name, House name',
        'Scan': 'Scan',
        'Invalid Voter ID': 'Invalid Voter ID',
        'Add a voter': 'Add a voter',
        'Details': 'Details',
        'Name': 'Name',
        'Guardian': 'Guardian',
        'Age': 'Age',
        'Voter ID': 'Voter ID',
        'House Name': 'House Name',
        'House Number': 'House Number',
        'Mobile Number': 'Mobile Number',
        'Email': 'Email',
        'Needs Support': 'Needs Support',
        'Add More Details': 'Add More Details',
        'Submit Details': 'Submit Details',
        'Create Voter': 'Create Voter',
        'Profile': 'Profile',
        'Phone number used to login to the app': 'Phone number used to login to the app',
        'The ward you are working in': 'The ward you are working in',
        'Language': 'Language',
        'Language used in the app': 'Language used in the app',
        'Terms and conditions': 'Terms and conditions',
        'Things that You need to know': 'Things that You need to know',
        'Support': 'Support',
        'Get help from us': 'Get help from us',
        'Logout': 'Logout',
        'Confirm': 'Confirm',
        'Sex / Age': 'Sex / Age',
        'Login': 'Login',
        'Phone Number': 'Phone Number',
        'Verification Code': 'Verification Code',
        'Enter the One Time Pin': 'Enter the One Time Pin',
        'Network Error': 'Network Error',
        'Request OTP': 'Request OTP',
        'Verify OTP': 'Verify OTP',
        'Complete the fields before you continue.': 'Complete the fields before you continue.',
        'A voter has to at least 18 years old.': 'A voter has to at least 18 years old.',
        'Enable GPS while using the app for live location services': 'Enable GPS while using the app for live location services',
        "Whatsapp Number": "Whatsapp Number",
        "Additional Remarks": "Additional Remarks",
        'Align the barcode of the votersID card within this box': 'Align the barcode of the votersID card within this box'
    },
    mal: {
        'Campaign Progress': 'പ്രചാരണ പുരോഗതി',
        'Houses': 'വീടുകൾ',
        'Houses Left': 'അവശേഷിക്കുന്ന വീടുകൾ',
        'Search': 'തിരയുക',
        'Name, House name': 'പേര്, വീട്ടുപേര്',
        'Scan': 'സ്‌കാൻ ചെയ്യുക',
        'Invalid Voter ID': 'വോട്ടർ ഐഡി അസാധു ആണ്',
        'Add a voter': 'വോട്ടറെ ചേർക്കുക',
        'Details': 'വിശദാംശങ്ങൾ',
        'Name': 'പേര്',
        'Guardian': 'രക്ഷിതാവ്',
        'Age': 'വയസ്സ്',
        'Voter ID': 'വോട്ടർ ഐഡി',
        'House Name': 'വീട്ടുപേര്',
        'House Number': 'വീട്ടുനമ്പർ',
        'Mobile Number': 'മൊബൈൽ നമ്പർ',
        'Email': 'ഇ-മെയിൽ',
        'Needs Support': 'സഹായം ആവശ്യമുണ്ടോ',
        'Add More Details': 'കൂടുതൽ വിശദാംശങ്ങൾ\nചേർക്കുക',
        'Submit Details': 'വിശദാംശങ്ങൾ\nസമർപ്പിക്കുക',
        'Create Voter': 'വോട്ടറെ ചേർക്കുക',
        'Profile': 'പ്രൊഫൈൽ',
        'Phone number used to login to the app': 'ലോഗിൻ ചെയ്ത ഫോൺനമ്പർ',
        'The ward you are working in': 'നിങ്ങൾ ജോലി ചെയ്യുന്ന വാർഡ്',
        'Language': 'ഭാഷ',
        'Language used in the app': 'ആപ്പിൽ ഉപയോഗിക്കുന്ന ഭാഷ',
        'Terms and conditions': 'ചട്ടങ്ങളും നിബന്ധനകളും',
        'Things that You need to know': 'നിങ്ങൾ അറിഞ്ഞിരിക്കേണ്ട കാര്യങ്ങൾ',
        'Support': 'സഹായം',
        'Get help from us': 'ഞങ്ങളിൽ നിന്നും സഹായം സ്വീകരിക്കു',
        'Logout': 'ലോഗൗട്ട്',
        'Confirm': 'സ്ഥിരീകരിക്കുക',
        'Sex / Age': 'ലിംഗഭേദം / വയസ്സ്',
        'Login': 'ലോഗിൻ',
        'Phone Number': 'ഫോൺനമ്പർ',
        'Verification Code': 'പരിശോധിച്ചുറപ്പിക്കൽ കോഡ്',
        'Enter the One Time Pin': 'OTP നൽകുക',
        'Network Error': 'നെറ്റ്‌വർക്ക് പിശക്',
        'Request OTP': 'OTP അഭ്യർത്ഥിക്കുക',
        'Verify OTP': 'OTP പരിശോധിക്കുക',
        'Complete the fields before you continue.': 'തുടരുന്നതിന് മുമ്പ് കളങ്ങൾ പൂർത്തിയാക്കുക.',
        'A voter has to at least 18 years old.': 'ഒരു വോട്ടർക്ക് കുറഞ്ഞത് 18 വയസ്സ് പ്രായമുണ്ടായിരിക്കണം.',
        'Enable GPS while using the app for live location services': 'തത്സമയ ലൊക്കേഷൻ സേവനങ്ങൾക്കായി അപ്ലിക്കേഷൻ ഉപയോഗിക്കുമ്പോൾ ജിപിഎസ് പ്രവർത്തനക്ഷമമാക്കുക',
        "Whatsapp Number": "വാട്ട്‌സ്ആപ്പ് നമ്പർ",
        "Additional Remarks": "അധിക പരാമർശങ്ങൾ",
        'Align the barcode of the votersID card within this box': 'ഈ ബോക്സിനുള്ളിൽ‌ വോട്ടർ‌ഐഡി കാർ‌ഡിന്റെ ബാർ‌കോഡ് വിന്യസിക്കുക'
    }
}

export function lwrap(textVar: string) {
    return data[currentLanguage][textVar] || data['en'][textVar]
}
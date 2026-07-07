export const PUNE_AREAS = [
  { id: "shivajinagar-deccan", nameEn: "Shivajinagar–Deccan", nameMr: "शिवाजीनगर–डेक्कन" },
  { id: "kothrud-karve-nagar", nameEn: "Kothrud–Karve Nagar", nameMr: "कोथरूड–कर्वे नगर" },
  { id: "aundh-baner", nameEn: "Aundh–Baner", nameMr: "औंध–बानेर" },
  { id: "hadapsar", nameEn: "Hadapsar", nameMr: "हडपसर" },
  { id: "kharadi-viman-nagar", nameEn: "Kharadi–Viman Nagar", nameMr: "खराडी–विमान नगर" },
  { id: "kondhwa-wanowrie", nameEn: "Kondhwa–Wanowrie", nameMr: "कोंढवा–वानोवरी" },
]

// Prototype operational zones — not official administrative boundaries.
const CIVIL_PLACES = {
  "shivajinagar-deccan": ["FC Road", "JM Road Junction", "Deccan Bus Depot", "Shivajinagar Chowk", "Fergusson College Road"],
  "kothrud-karve-nagar": ["Karve Road", "Paud Road Junction", "Kothrud Depot Area", "Karve Nagar", "DP Road"],
  "aundh-baner": ["Aundh Road", "Baner Road Junction", "Pashan Depot Area", "University Gate", "Bremen Chowk"],
  "hadapsar": ["Mundhwa Road", "Hadapsar Industrial Area", "Solapur Highway", "Magarpatta Junction", "Golibar Maidan"],
  "kharadi-viman-nagar": ["Kharadi Bypass", "Viman Nagar Square", "Nagar Road", "EON IT Park Gate", "Chandan Nagar"],
  "kondhwa-wanowrie": ["NIBM Road", "Kondhwa Khurd Junction", "Wanowrie Depot Area", "Salisbury Park", "Mohammadwadi Road"],
}

const MEDICAL_PLACES = {
  "shivajinagar-deccan": ["Sassoon Hospital", "Deccan PHC", "JM Road Dispensary", "Shivajinagar Health Post", "FC Road Clinic"],
  "kothrud-karve-nagar": ["Karve Nagar PHC", "Kothrud Urban Health Centre", "Paud Road Dispensary", "DP Road Clinic", "Karve Road Hospital Wing"],
  "aundh-baner": ["Aundh District Hospital", "Baner PHC", "Pashan Health Post", "University Medical Unit", "Bremen Chowk Clinic"],
  "hadapsar": ["Hadapsar Civil Hospital", "Magarpatta Health Centre", "Mundhwa Dispensary", "Solapur Road PHC", "Golibar Maidan Clinic"],
  "kharadi-viman-nagar": ["Kharadi Community Hospital", "Viman Nagar PHC", "Nagar Road Dispensary", "EON Health Post", "Chandan Nagar Clinic"],
  "kondhwa-wanowrie": ["Kondhwa PHC", "Wanowrie Health Centre", "NIBM Road Dispensary", "Salisbury Park Clinic", "Mohammadwadi PHC"],
}

const LOGISTICS_PLACES = {
  "shivajinagar-deccan": ["FC Road Route", "Deccan Hub", "JM Road Junction", "Shivajinagar Depot", "Fergusson College Lane"],
  "kothrud-karve-nagar": ["Karve Road Route", "Kothrud Hub", "Paud Road Junction", "Karve Nagar Depot", "DP Road Lane"],
  "aundh-baner": ["Aundh Road Route", "Baner Hub", "Pashan Junction", "University Gate Depot", "Bremen Chowk Lane"],
  "hadapsar": ["Mundhwa Road Route", "Hadapsar Hub", "Solapur Highway Junction", "Magarpatta Depot", "Golibar Maidan Lane"],
  "kharadi-viman-nagar": ["Kharadi Bypass Route", "Viman Nagar Hub", "Nagar Road Junction", "EON Depot", "Chandan Nagar Lane"],
  "kondhwa-wanowrie": ["NIBM Road Route", "Kondhwa Hub", "Wanowrie Junction", "Salisbury Park Depot", "Mohammadwadi Lane"],
}

const MECHANICAL_PLACES = {
  "shivajinagar-deccan": ["Deccan Workshop", "FC Road Fleet Yard", "JM Road Garage", "Shivajinagar Depot", "Fergusson College Pump Station"],
  "kothrud-karve-nagar": ["Kothrud Workshop", "Karve Road Fleet Yard", "Paud Road Garage", "Karve Nagar Depot", "DP Road Pump Station"],
  "aundh-baner": ["Aundh Workshop", "Baner Fleet Yard", "Pashan Garage", "University Gate Depot", "Bremen Chowk Pump Station"],
  "hadapsar": ["Hadapsar Workshop", "Mundhwa Fleet Yard", "Solapur Highway Garage", "Magarpatta Depot", "Golibar Maidan Pump Station"],
  "kharadi-viman-nagar": ["Kharadi Workshop", "Viman Nagar Fleet Yard", "Nagar Road Garage", "EON Depot", "Chandan Nagar Pump Station"],
  "kondhwa-wanowrie": ["Kondhwa Workshop", "Wanowrie Fleet Yard", "NIBM Road Garage", "Salisbury Park Depot", "Mohammadwadi Pump Station"],
}

function buildCivilAreaData(area) {
  const p = CIVIL_PLACES[area.id]
  return {
    items: [
      {
        id: 1, priority: "HIGH",
        titleEn: `Urgent Pothole Repair — ${p[0]}`,
        titleMr: `तातडीची खड्डे दुरुस्ती — ${p[0]}`,
        contextEn: `Deep potholes reported on ${p[0]}. Repair crew scheduled for morning dispatch.`,
        contextMr: `${p[0]} वर खोल खड्ड्यांच्या तक्रारी. दुरुस्ती पथक सकाळी रवाना होणार.`,
      },
      {
        id: 2, priority: "HIGH",
        titleEn: `Drainage Blockage — ${p[1]}`,
        titleMr: `ड्रेनेज ब्लॉकेज — ${p[1]}`,
        contextEn: `Storm drain blocked at ${p[1]}, causing local waterlogging. Clearance crew on standby.`,
        contextMr: `${p[1]} येथे गटार बंद, परिसरात पाणी साचले. स्वच्छता पथक तैनात.`,
      },
      {
        id: 3, priority: "MEDIUM",
        titleEn: `Damaged Road Surface — ${p[2]}`,
        titleMr: `रस्त्याची खराब अवस्था — ${p[2]}`,
        contextEn: `Surface damage and loose gravel on ${p[2]}. Temporary patching approval needed.`,
        contextMr: `${p[2]} वर रस्त्याची खराब अवस्था आणि खगोळ. तात्पुरती दुरुस्ती मंजुरी आवश्यक.`,
      },
      {
        id: 4, priority: "MEDIUM",
        titleEn: `Footpath Repair Request — ${p[3]}`,
        titleMr: `फुटपाथ दुरुस्ती विनंती — ${p[3]}`,
        contextEn: `Broken footpath tiles and missing kerb stones near ${p[3]}. Pedestrian safety concern.`,
        contextMr: `${p[3]} जवळ फुटपाथाचे फुटलेले फरशा आणि कडकरी गहाळ. पादचाऱ्यांच्या सुरक्षेची चिंता.`,
      },
      {
        id: 5, priority: "LOW",
        titleEn: `Contractor Work Inspection — ${p[4]}`,
        titleMr: `कंत्राटदार काम तपासणी — ${p[4]}`,
        contextEn: `Quality inspection due for resurfacing work on ${p[4]}. Payment release pending sign-off.`,
        contextMr: `${p[4]} वरील डांबरी कामाची गुणवत्ता तपासणी. पेमेंटसाठी अंतिम मंजुरी प्रलंबित.`,
      },
    ],
    anomalies: [
      {
        id: 1, severity: "HIGH",
        titleEn: `Pothole Reports Spike — ${p[3]}`,
        titleMr: `खड्ड्यांच्या तक्रारीत वाढ — ${p[3]}`,
        explanationEn: `Unusual increase in pothole complaints from ${p[3]} in the last 4 hours.`,
        explanationMr: `गेल्या ४ तासांत ${p[3]} मधून खड्ड्यांच्या तक्रारीत असामान्य वाढ.`,
        detectedAtEn: "08:14 AM", detectedAtMr: "सकाळी ०८:१४",
      },
      {
        id: 2, severity: "HIGH",
        titleEn: `Repeated Drainage Complaints — ${p[1]}`,
        titleMr: `ड्रेनेज तक्रारी वारंवार — ${p[1]}`,
        explanationEn: `12 repeated drainage overflow complaints logged for ${p[1]} since dawn.`,
        explanationMr: `पहाटेपासून ${p[1]} साठी १२ वारंवार ड्रेनेज तक्रारी नोंदवल्या.`,
        detectedAtEn: "08:27 AM", detectedAtMr: "सकाळी ०८:२७",
      },
      {
        id: 3, severity: "MEDIUM",
        titleEn: `Delayed Road Repairs — ${area.nameEn}`,
        titleMr: `रस्ता दुरुस्तीस विलंब — ${area.nameMr}`,
        explanationEn: `Scheduled resurfacing in ${area.nameEn} delayed by 5 hours due to equipment breakdown.`,
        explanationMr: `${area.nameMr} मधील नियोजित दुरुस्ती उपकरण बिघाडामुळे ५ तास विलंबित.`,
        detectedAtEn: "07:55 AM", detectedAtMr: "सकाळी ०७:५५",
      },
      {
        id: 4, severity: "MEDIUM",
        titleEn: `Contractor Progress Delay — ${p[4]}`,
        titleMr: `कंत्राटदार कामात विलंब — ${p[4]}`,
        explanationEn: `Road work on ${p[4]} running 48 hours behind schedule. Milestone at risk.`,
        explanationMr: `${p[4]} वरील काम ४८ तास मागे. पुढील टप्पा धोक्यात.`,
        detectedAtEn: "07:30 AM", detectedAtMr: "सकाळी ०७:३०",
      },
      {
        id: 5, severity: "LOW",
        titleEn: `Inspection Mismatch — ${p[0]}`,
        titleMr: `तपासणीत विसंगती — ${p[0]}`,
        explanationEn: `Material test results for ${p[0]} resurfacing differ from authority standards.`,
        explanationMr: `${p[0]} डांबरी कामाच्या साहित्याच्या चाचणीत प्रमाणांपेक्षा फरक.`,
        detectedAtEn: "07:02 AM", detectedAtMr: "सकाळी ०७:०२",
      },
    ],
  }
}

function buildMedicalAreaData(area) {
  const p = MEDICAL_PLACES[area.id]
  return {
    items: [
      {
        id: 1, priority: "HIGH",
        titleEn: `Medicine Shortage Alert — ${p[0]}`,
        titleMr: `औषध तुटवडा इशारा — ${p[0]}`,
        contextEn: `Critical cardiac and emergency medicines running low at ${p[0]}. Urgent replenishment needed.`,
        contextMr: `${p[0]} मध्ये हृदयविकार आणि आणीबाणी औषधांचा तुटवडा. तातडीचा पुरवठा आवश्यक.`,
      },
      {
        id: 2, priority: "HIGH",
        titleEn: `Cold-Chain Transport Alert — ${p[1]}`,
        titleMr: `कोल्ड-चेन वाहतूक इशारा — ${p[1]}`,
        contextEn: `Temperature deviation on vaccine shipment routed to ${p[1]}. Reroute to backup cold store.`,
        contextMr: `${p[1]} कडे जात असलेल्या लस वाहतुकीत तापमानात विचलन. पर्यायी कोल्ड स्टोअरकडे वळवा.`,
      },
      {
        id: 3, priority: "MEDIUM",
        titleEn: `Hospital Supply Dispatch — ${p[2]}`,
        titleMr: `रुग्णालय पुरवठा वितरण — ${p[2]}`,
        contextEn: `Bulk surgical supplies ready for ${p[2]}. Awaiting final dispatch clearance.`,
        contextMr: `${p[2]} साठी शस्त्रक्रिया साहित्य तयार. अंतिम वितरण मंजुरीची प्रतीक्षा.`,
      },
      {
        id: 4, priority: "MEDIUM",
        titleEn: `Emergency Stock Transfer — ${p[3]}`,
        titleMr: `आणीबाणी साठा वर्ग — ${p[3]}`,
        contextEn: `Transfer surplus insulin from central store to high-demand ${p[3]}.`,
        contextMr: `मध्यवर्ती साठ्यातून जास्त मागणी असलेल्या ${p[3]} कडे अतिरिक्त इन्सुलिन वर्ग करणे.`,
      },
      {
        id: 5, priority: "LOW",
        titleEn: `Delayed Medical Delivery — ${p[4]}`,
        titleMr: `वैद्यकीय वितरण विलंब — ${p[4]}`,
        contextEn: `Routine antibiotics delivery to ${p[4]} delayed 24 hours. Current stock sufficient.`,
        contextMr: `${p[4]} कडे नेहमीच्या अँटीबायोटिक्सचा पुरवठा २४ तास उशिराने. सध्या पुरेशा साठा.`,
      },
    ],
    anomalies: [
      {
        id: 1, severity: "HIGH",
        titleEn: `Cold Storage Alert — ${area.nameEn}`,
        titleMr: `कोल्ड स्टोरेज इशारा — ${area.nameMr}`,
        explanationEn: `Storage temperature exceeded 4°C limit at ${area.nameEn} medical depot.`,
        explanationMr: `${area.nameMr} वैद्यकीय साठ्यागारात तापमान ४°C मर्यादेपेक्षा जास्त.`,
        detectedAtEn: "08:14 AM", detectedAtMr: "सकाळी ०८:१४",
      },
      {
        id: 2, severity: "HIGH",
        titleEn: `Rapid Stock Depletion — ${p[0]}`,
        titleMr: `जलद औषध साठा घट — ${p[0]}`,
        explanationEn: `Emergency medicine stock at ${p[0]} dropped 35% in 30 minutes.`,
        explanationMr: `३० मिनिटांत ${p[0]} मधील आणीबाणी औषध साठा ३५% कमी.`,
        detectedAtEn: "08:27 AM", detectedAtMr: "सकाळी ०८:२७",
      },
      {
        id: 3, severity: "MEDIUM",
        titleEn: `Dispatch Backlog — ${p[2]}`,
        titleMr: `वैद्यकीय वितरण प्रलंबित — ${p[2]}`,
        explanationEn: `38 urgent medicine parcels pending dispatch to ${p[2]} area facilities.`,
        explanationMr: `${p[2]} क्षेत्रातील केंद्रांना ३८ तातडीची औषध पार्सल वितरणाची वाट.`,
        detectedAtEn: "07:55 AM", detectedAtMr: "सकाळी ०७:५५",
      },
      {
        id: 4, severity: "MEDIUM",
        titleEn: `Delivery Delay — ${p[4]}`,
        titleMr: `वैद्यकीय वितरण विलंब — ${p[4]}`,
        explanationEn: `Supply truck to ${p[4]} delayed 40 mins on congested route.`,
        explanationMr: `${p[4]} कडे जाणारा पुरवठा ट्रक वाहतूक कोंडीमुळे ४० मिनिटे उशिराने.`,
        detectedAtEn: "07:30 AM", detectedAtMr: "सकाळी ०७:३०",
      },
      {
        id: 5, severity: "LOW",
        titleEn: `Inventory Mismatch — ${p[3]}`,
        titleMr: `साठा तफावत — ${p[3]}`,
        explanationEn: `Physical count at ${p[3]} shows 4 boxes missing from system records.`,
        explanationMr: `${p[3]} येथे प्रत्यक्ष मोजणीत सिस्टम रेकॉर्डपेक्षा ४ बॉक्स कमी.`,
        detectedAtEn: "07:02 AM", detectedAtMr: "सकाळी ०७:०२",
      },
    ],
  }
}

function buildLogisticsAreaData(area) {
  const p = LOGISTICS_PLACES[area.id]
  return {
    items: [
      {
        id: 1, priority: "HIGH",
        titleEn: `Delivery Route Delay — ${p[0]}`,
        titleMr: `वितरण मार्ग विलंब — ${p[0]}`,
        contextEn: `Heavy traffic on ${p[0]}. Perishable cargo truck delayed over 2 hours.`,
        contextMr: `${p[0]} वर वाहतूक कोंडी. नाशवंत मालाचा ट्रक २ तासांपेक्षा जास्त अडकला.`,
      },
      {
        id: 2, priority: "HIGH",
        titleEn: `Vehicle Allocation — ${p[1]}`,
        titleMr: `वाहन वाटप — ${p[1]}`,
        contextEn: `Two backup trucks needed at ${p[1]} hub due to morning breakdowns.`,
        contextMr: `${p[1]} हबवर सकाळी बिघाडामुळे २ पर्यायी वाहने आवश्यक.`,
      },
      {
        id: 3, priority: "MEDIUM",
        titleEn: `Warehouse Dispatch Queue — ${p[2]}`,
        titleMr: `वेअरहाऊस वितरण रांग — ${p[2]}`,
        contextEn: `18 consignments waiting at ${p[2]} junction depot. Packing at capacity.`,
        contextMr: `${p[2]} जंक्शन डेपोवर १८ पार्सल वितरणाची वाट. पॅकिंग क्षमतेवर.`,
      },
      {
        id: 4, priority: "MEDIUM",
        titleEn: `Traffic Route Change — ${p[3]}`,
        titleMr: `वाहतूक मार्ग बदल — ${p[3]}`,
        contextEn: `Road closure near ${p[3]}. Diverted via alternate route, adding 35 mins.`,
        contextMr: `${p[3]} जवळ रस्ता बंद. पर्यायी मार्गाने ३५ मिनिटे अतिरिक्त वेळ.`,
      },
      {
        id: 5, priority: "LOW",
        titleEn: `Delayed Delivery — ${p[4]}`,
        titleMr: `विलंबित वितरण — ${p[4]}`,
        contextEn: `Scheduled weekly delivery to ${p[4]} delayed. Non-critical stock.`,
        contextMr: `${p[4]} कडे नियोजित साप्ताहिक वितरण विलंबित. गैर-तातडीचा साठा.`,
      },
    ],
    anomalies: [
      {
        id: 1, severity: "HIGH",
        titleEn: `Route Delay Spike — ${p[0]}`,
        titleMr: `मार्ग विलंब वाढ — ${p[0]}`,
        explanationEn: `Average transit time on ${p[0]} increased 70 mins due to congestion.`,
        explanationMr: `वाहतूक कोंडीमुळे ${p[0]} वर सरासरी प्रवास वेळ ७० मिनिटांनी वाढला.`,
        detectedAtEn: "08:14 AM", detectedAtMr: "सकाळी ०८:१४",
      },
      {
        id: 2, severity: "HIGH",
        titleEn: `Fuel Consumption Alert — ${p[1]}`,
        titleMr: `इंधन वापर इशारा — ${p[1]}`,
        explanationEn: `Fleet vehicle from ${p[1]} showing 22% higher fuel use over 40 km.`,
        explanationMr: `${p[1]} मधील वाहनाचा ४० किमीमध्ये इंधन वापर २२% जास्त.`,
        detectedAtEn: "08:27 AM", detectedAtMr: "सकाळी ०८:२७",
      },
      {
        id: 3, severity: "MEDIUM",
        titleEn: `Warehouse Backlog — ${p[2]}`,
        titleMr: `वेअरहाऊस बॅकलॉग — ${p[2]}`,
        explanationEn: `92 pallets pending dispatch from ${p[2]} area warehouse.`,
        explanationMr: `${p[2]} क्षेत्रातील वेअरहाऊसमधून ९२ पॅलेट वितरण प्रलंबित.`,
        detectedAtEn: "07:55 AM", detectedAtMr: "सकाळी ०७:५५",
      },
      {
        id: 4, severity: "MEDIUM",
        titleEn: `Vehicle Downtime — ${p[3]}`,
        titleMr: `वाहन बंद — ${p[3]}`,
        explanationEn: `Two delivery trucks at ${p[3]} depot inactive due to electrical faults.`,
        explanationMr: `${p[3]} डेपोवरील दोन वितरण ट्रक इलेक्ट्रिकल बिघाडामुळे बंद.`,
        detectedAtEn: "07:30 AM", detectedAtMr: "सकाळी ०७:३०",
      },
      {
        id: 5, severity: "LOW",
        titleEn: `Failed Deliveries Rise — ${area.nameEn}`,
        titleMr: `वितरण अपयश वाढ — ${area.nameMr}`,
        explanationEn: `Unsuccessful delivery attempts in ${area.nameEn} up 5% today.`,
        explanationMr: `${area.nameMr} मध्ये आज अपयशी वितरण ५% वाढले.`,
        detectedAtEn: "07:02 AM", detectedAtMr: "सकाळी ०७:०२",
      },
    ],
  }
}

function buildMechanicalAreaData(area) {
  const p = MECHANICAL_PLACES[area.id]
  return {
    items: [
      {
        id: 1, priority: "HIGH",
        titleEn: `Municipal Equipment Breakdown — ${p[0]}`,
        titleMr: `नगरपालिका उपकरण बिघाड — ${p[0]}`,
        contextEn: `Hydraulic system failure on road roller at ${p[0]}. Repairs blocking morning schedule.`,
        contextMr: `${p[0]} येथील रोड रोलरचे हायड्रॉलिक बिघाड. सकाळचे काम अडकले.`,
      },
      {
        id: 2, priority: "HIGH",
        titleEn: `Vehicle Maintenance Approval — ${p[1]}`,
        titleMr: `वाहन देखभाल मंजुरी — ${p[1]}`,
        contextEn: `Scheduled service for 3 municipal trucks at ${p[1]}. Approval needed to take off route.`,
        contextMr: `${p[1]} येथील ३ नगरपालिका ट्रकांची नियोजित देखभाल. मार्गावरून काढण्यासाठी मंजुरी.`,
      },
      {
        id: 3, priority: "MEDIUM",
        titleEn: `Machinery Inspection — ${p[2]}`,
        titleMr: `मशिनरी तपासणी — ${p[2]}`,
        contextEn: `Monthly safety inspection due at ${p[2]} garage. Inspector arriving at 11:00 AM.`,
        contextMr: `${p[2]} गॅरेजमध्ये मासिक सुरक्षा तपासणी. निरीक्षक सकाळी ११:०० वाजता.`,
      },
      {
        id: 4, priority: "MEDIUM",
        titleEn: `Spare-Parts Request — ${p[3]}`,
        titleMr: `स्पेअर पार्ट्स मागणी — ${p[3]}`,
        contextEn: `Urgent bearing and seal parts needed for excavator at ${p[3]} depot.`,
        contextMr: `${p[3]} डेपोवरील एक्सकव्हेटरसाठी तातडीचे बेअरिंग आणि सील भाग.`,
      },
      {
        id: 5, priority: "LOW",
        titleEn: `Technician Assignment — ${p[4]}`,
        titleMr: `तंत्रज्ञ नियुक्ती — ${p[4]}`,
        contextEn: `Assign technician for routine pump maintenance at ${p[4]} this afternoon.`,
        contextMr: `आज दुपारी ${p[4]} येथील पंपाच्या नियमित देखभालीसाठी तंत्रज्ञ नियुक्त करणे.`,
      },
    ],
    anomalies: [
      {
        id: 1, severity: "HIGH",
        titleEn: `Vibration Alert — ${p[0]}`,
        titleMr: `कंपन इशारा — ${p[0]}`,
        explanationEn: `Abnormal vibration on compressor at ${p[0]}. Shutdown recommended.`,
        explanationMr: `${p[0]} येथील कॉम्प्रेसरवर असामान्य कंपन. बंद करण्याची शिफारस.`,
        detectedAtEn: "08:14 AM", detectedAtMr: "सकाळी ०८:१४",
      },
      {
        id: 2, severity: "HIGH",
        titleEn: `Overheating Alert — ${p[1]}`,
        titleMr: `ओव्हरहीटिंग इशारा — ${p[1]}`,
        explanationEn: `Fleet truck engine at ${p[1]} reached 91°C. Threshold is 95°C.`,
        explanationMr: `${p[1]} येथील ट्रक इंजिन ९१°C वर. मर्यादा ९५°C.`,
        detectedAtEn: "08:27 AM", detectedAtMr: "सकाळी ०८:२७",
      },
      {
        id: 3, severity: "MEDIUM",
        titleEn: `Equipment Stoppages — ${p[2]}`,
        titleMr: `उपकरण वारंवार बंद — ${p[2]}`,
        explanationEn: `Conveyor at ${p[2]} tripped 5 times in one hour. Sensor issue suspected.`,
        explanationMr: `${p[2]} येथील कन्व्हेयर एका तासात ५ वेळा बंद. सेन्सर समस्या.`,
        detectedAtEn: "07:55 AM", detectedAtMr: "सकाळी ०७:५५",
      },
      {
        id: 4, severity: "MEDIUM",
        titleEn: `Maintenance Overdue — ${p[3]}`,
        titleMr: `देखभाल थकीत — ${p[3]}`,
        explanationEn: `Crane inspection at ${p[3]} overdue by 10 days. License expires soon.`,
        explanationMr: `${p[3]} येथील क्रेन तपासणी १० दिवस थकीत. परवाना लवकरच संपणार.`,
        detectedAtEn: "07:30 AM", detectedAtMr: "सकाळी ०७:३०",
      },
      {
        id: 5, severity: "LOW",
        titleEn: `Low Spare Stock — ${p[4]}`,
        titleMr: `स्पेअर पार्ट्स तुटवडा — ${p[4]}`,
        explanationEn: `Hydraulic seal stock at ${p[4]} below minimum reorder level.`,
        explanationMr: `${p[4]} येथील हायड्रॉलिक सील साठा किमान पातळीपेक्षा कमी.`,
        detectedAtEn: "07:02 AM", detectedAtMr: "सकाळी ०७:०२",
      },
    ],
  }
}

function buildAllAreas(buildFn) {
  return Object.fromEntries(PUNE_AREAS.map((area) => [area.id, buildFn(area)]))
}

export const DEPARTMENTS = [
  {
    id: "medical",
    nameEn: "Medical",
    nameMr: "वैद्यकीय",
    titleEn: "Medical Operations",
    titleMr: "वैद्यकीय ऑपरेशन्स",
    subtitleEn: "Pune hospital & health-centre supply, cold-chain transport & emergency deliveries",
    subtitleMr: "पुण्यातील रुग्णालय व आरोग्य केंद्र पुरवठा, कोल्ड-चेन वाहतूक आणि आणीबाणी वितरण",
    countdown: {
      headingEn: "NEXT DISPATCH REVIEW",
      headingMr: "पुढील डिस्पॅच आढावा",
    },
    contacts: [
      {
        roleEn: "Supply Operations Lead",
        roleMr: "पुरवठा ऑपरेशन्स प्रमुख",
        descEn: "For urgent medicine supply needs",
        descMr: "औषध पुरवठ्याच्या तातडीच्या गरजांसाठी",
        ext: "Ext. 201",
        statusType: "available",
      },
      {
        roleEn: "Cold-Chain Support",
        roleMr: "कोल्ड-चेन मदत कक्ष",
        descEn: "System and temperature alerts",
        descMr: "तापमान आणि साठवणूक समस्यांसाठी",
        ext: "Ext. 114",
        statusType: "available",
      },
      {
        roleEn: "Quality & Compliance Desk",
        roleMr: "गुणवत्ता आणि अनुपालन डेस्क",
        descEn: "Policy and approval exceptions",
        descMr: "धोरण आणि मंजुरी अपवादांसाठी",
        ext: "Ext. 305",
        statusType: "onCall",
      },
    ],
    areas: buildAllAreas(buildMedicalAreaData),
  },
  {
    id: "logistics",
    nameEn: "Logistics",
    nameMr: "लॉजिस्टिक",
    titleEn: "Logistics Operations",
    titleMr: "लॉजिस्टिक ऑपरेशन्स",
    subtitleEn: "Pune delivery routes, fleet dispatch, warehouse queues & traffic delays",
    subtitleMr: "पुण्यातील वितरण मार्ग, वाहन ताफा, वेअरहाऊस रांग आणि वाहतूक विलंब",
    countdown: {
      headingEn: "NEXT ROUTE REVIEW",
      headingMr: "पुढील मार्ग आढावा",
    },
    contacts: [
      {
        roleEn: "Dispatch Lead",
        roleMr: "वितरण प्रमुख",
        descEn: "For urgent delivery updates",
        descMr: "तातडीच्या वितरण अपडेटसाठी",
        ext: "Ext. 201",
        statusType: "available",
      },
      {
        roleEn: "Fleet Support",
        roleMr: "वाहन ताफा मदत कक्ष",
        descEn: "Vehicle and fuel tracking issues",
        descMr: "वाहन आणि इंधन ट्रॅकिंग समस्या",
        ext: "Ext. 114",
        statusType: "available",
      },
      {
        roleEn: "Warehouse Coordinator",
        roleMr: "वेअरहाऊस समन्वयक",
        descEn: "Dispatch queue clearance",
        descMr: "वितरण रांग क्लिअरन्स",
        ext: "Ext. 305",
        statusType: "onCall",
      },
    ],
    areas: buildAllAreas(buildLogisticsAreaData),
  },
  {
    id: "mechanical",
    nameEn: "Mechanical",
    nameMr: "यांत्रिक",
    titleEn: "Mechanical Operations",
    titleMr: "यांत्रिक ऑपरेशन्स",
    subtitleEn: "Pune municipal equipment, vehicle maintenance, inspections & spare parts",
    subtitleMr: "पुण्यातील नगरपालिका उपकरण, वाहन देखभाल, तपासणी आणि स्पेअर पार्ट्स",
    countdown: {
      headingEn: "NEXT MAINTENANCE REVIEW",
      headingMr: "पुढील देखभाल आढावा",
    },
    contacts: [
      {
        roleEn: "Maintenance Lead",
        roleMr: "देखभाल प्रमुख",
        descEn: "For machine failure reports",
        descMr: "मशीन बिघाड अहवालासाठी",
        ext: "Ext. 201",
        statusType: "available",
      },
      {
        roleEn: "Technical Support",
        roleMr: "तांत्रिक मदत कक्ष",
        descEn: "Spare parts access issues",
        descMr: "स्पेअर पार्ट्स मिळवण्याच्या समस्या",
        ext: "Ext. 114",
        statusType: "available",
      },
      {
        roleEn: "Safety Inspection Desk",
        roleMr: "सुरक्षा तपासणी डेस्क",
        descEn: "Safety clearance checks",
        descMr: "सुरक्षा मंजुरी तपासणीसाठी",
        ext: "Ext. 305",
        statusType: "onCall",
      },
    ],
    areas: buildAllAreas(buildMechanicalAreaData),
  },
  {
    id: "civil",
    nameEn: "Civil Services",
    nameMr: "नागरी सेवा",
    titleEn: "Civil Services Operations",
    titleMr: "नागरी सेवा ऑपरेशन्स",
    subtitleEn: "Pune road repair, drainage, footpaths, construction progress & contractor inspection",
    subtitleMr: "पुण्यातील रस्ते दुरुस्ती, ड्रेनेज, फुटपाथ, बांधकाम प्रगती आणि कंत्राटदार तपासणी",
    countdown: {
      headingEn: "NEXT FIELD REVIEW",
      headingMr: "पुढील क्षेत्र आढावा",
    },
    contacts: [
      {
        roleEn: "Ward Operations Lead",
        roleMr: "वॉर्ड ऑपरेशन्स प्रमुख",
        descEn: "For ward repair issues",
        descMr: "वॉर्ड दुरुस्ती कामांच्या समस्यांसाठी",
        ext: "Ext. 201",
        statusType: "available",
      },
      {
        roleEn: "Field Engineering Desk",
        roleMr: "क्षेत्रीय अभियांत्रिकी डेस्क",
        descEn: "Site quality inspections",
        descMr: "गुणवत्ता आणि साइट तपासणीसाठी",
        ext: "Ext. 114",
        statusType: "available",
      },
      {
        roleEn: "Contractor Coordination Desk",
        roleMr: "कंत्राटदार समन्वय डेस्क",
        descEn: "Contractor work clearances",
        descMr: "कंत्राटदाराच्या काम मंजुरीसाठी",
        ext: "Ext. 305",
        statusType: "onCall",
      },
    ],
    areas: buildAllAreas(buildCivilAreaData),
  },
]

export function getAreaById(areaId) {
  return PUNE_AREAS.find((a) => a.id === areaId)
}

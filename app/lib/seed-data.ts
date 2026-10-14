export interface UserData {
  id: string;
  email: string;
  name: string;
  studentId: string;
  university: string;
  department: string;
  isVerifiedStudent: boolean;
  role: 'STUDENT' | 'MODERATOR' | 'ADMIN';
  avatarUrl: string;
  trustRating: number;
}

export interface ListingData {
  id: string;
  title: string;
  description: string;
  category: 'HARDWARE_KIT' | 'SENSOR' | 'TEST_EQUIPMENT' | 'REFERENCE_BOOK' | 'OTHER';
  condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'FUNCTIONAL';
  listingType: 'FOR_SALE' | 'FOR_RENT' | 'FOR_LEND';
  price: number;
  depositAmount: number;
  status: 'AVAILABLE' | 'RESERVED' | 'PENDING_APPROVAL' | 'COMPLETED' | 'REJECTED';
  ownerId: string;
  ownerName: string;
  ownerStudentId: string;
  isOwnerVerified: boolean;
  specs: Record<string, string>;
  accessories: string[];
  images: string[];
  location: string;
  createdAt: string;
}

export interface ReservationData {
  id: string;
  listingId: string;
  listingTitle: string;
  renterId: string;
  renterName: string;
  status: 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'RETURNED' | 'DISPUTED';
  verificationToken: string;
  startDate: string;
  returnDeadline: string;
  totalCost: number;
  depositHeld: number;
  createdAt: string;
}

export interface ForumThreadData {
  id: string;
  title: string;
  content: string;
  category: 'HARDWARE_DEBUG' | 'SENSOR_HELP' | 'CODE_SHARE' | 'BOOK_RECOMMENDATION' | 'GENERAL';
  authorId: string;
  authorName: string;
  authorVerified: boolean;
  isPinned: boolean;
  isSolved: boolean;
  upvotes: number;
  viewCount: number;
  tags: string[];
  createdAt: string;
  replies: ForumReplyData[];
}

export interface ForumReplyData {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorVerified: boolean;
  content: string;
  isSolution: boolean;
  upvotes: number;
  createdAt: string;
}

export interface DisputeReportData {
  id: string;
  reason: string;
  details: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'DISMISSED';
  reporterId: string;
  reporterName: string;
  listingId?: string;
  listingTitle?: string;
  reservationId?: string;
  moderatorNotes?: string;
  createdAt: string;
}

export const initialUsers: UserData[] = [
  {
    id: 'usr-admin',
    name: 'Alex Rivera',
    email: 'admin@campus.edu',
    studentId: 'ENG-2023-8841',
    university: 'Institute of Engineering & Tech',
    department: 'Electronics & Computer Science',
    isVerifiedStudent: true,
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    trustRating: 4.9,
  },
  {
    id: 'usr-sarah',
    name: 'Sarah Chen',
    email: 'sarah.c@campus.edu',
    studentId: 'ENG-2024-1029',
    university: 'Institute of Engineering & Tech',
    department: 'Electrical Engineering',
    isVerifiedStudent: true,
    role: 'MODERATOR',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    trustRating: 5.0,
  },
  {
    id: 'usr-marcus',
    name: 'Marcus Vance',
    email: 'marcus.v@campus.edu',
    studentId: 'ENG-2023-4512',
    university: 'Institute of Engineering & Tech',
    department: 'Robotics & Automation',
    isVerifiedStudent: true,
    role: 'STUDENT',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    trustRating: 4.7,
  },
  {
    id: 'usr-aisha',
    name: 'Aisha Al-Mansoor',
    email: 'aisha.m@campus.edu',
    studentId: 'ENG-2025-0914',
    university: 'Institute of Engineering & Tech',
    department: 'Computer Engineering',
    isVerifiedStudent: true,
    role: 'STUDENT',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    trustRating: 4.8,
  },
];

export const initialListings: ListingData[] = [
  {
    id: 'list-ard-01',
    title: 'Arduino Uno R4 WiFi + Starter Component Pack',
    description: 'Original Renesas RA4M1 (Arm Cortex-M4) microcontroller with onboard ESP32-S3 for WiFi/BLE. Includes 12x8 LED matrix, 5V relay module, breadboard, and assortment of jumper wires.',
    category: 'HARDWARE_KIT',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 3.5, // $3.50/day
    depositAmount: 25.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Alex Rivera',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Microcontroller': 'Renesas RA4M1 (Arm Cortex-M4 @ 48 MHz)',
      'Wireless Connectivity': 'ESP32-S3-MINI-1-N8 (WiFi 802.11 b/g/n + BLE 5)',
      'Operating Voltage': '5V (USB-C or 6-24V VIN)',
      'Digital I/O Pins': '14 pins (6 PWM capable)',
      'Analog Input': '6 channels (14-bit ADC)',
    },
    accessories: ['USB-C to A High-speed Cable', '830-Point Solderless Breadboard', '65x Male-to-Male Jumpers', 'Ultrasonic HC-SR04 Sensor'],
    images: ['https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800'],
    location: 'Lab Room 204, Locker #12',
    createdAt: '2026-10-10T09:00:00Z',
  },
  {
    id: 'list-esp-02',
    title: 'NodeMCU ESP8266 + IoT Sensor Bundle (IoT Lab ready)',
    description: 'Pre-flashed CP2102 NodeMCU V3 with DHT22 temperature/humidity sensor, 0.96 inch I2C OLED display, and soil moisture capacitive sensor. Verified for EE302 IoT semester project.',
    category: 'HARDWARE_KIT',
    condition: 'GOOD',
    listingType: 'FOR_RENT',
    price: 2.0,
    depositAmount: 15.0,
    status: 'AVAILABLE',
    ownerId: 'usr-sarah',
    ownerName: 'Sarah Chen',
    ownerStudentId: 'ENG-2024-1029',
    isOwnerVerified: true,
    specs: {
      'Chipset': 'ESP8266EX @ 80/160 MHz',
      'Flash Memory': '4MB SPI Flash',
      'WiFi Standard': '802.11 b/g/n (Integrated TCP/IP stack)',
      'OLED': '0.96" SSD1306 128x64 Blue/Yellow',
    },
    accessories: ['Micro-USB Cable', 'DHT22 Sensor module', 'I2C OLED Display', '10x Female-Female jumpers'],
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'],
    location: 'Electrical Sciences Dept, 3rd Floor Hub',
    createdAt: '2026-10-11T14:30:00Z',
  },
  {
    id: 'list-dmm-03',
    title: 'Aneng AN8008 True-RMS 9999-Counts Digital Multimeter',
    description: 'Auto-ranging precision student multimeter. Measures DC/AC voltage, DC/AC current, resistance, capacitance, frequency, duty cycle, temperature, and diode check with backlit LCD.',
    category: 'TEST_EQUIPMENT',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 4.0,
    depositAmount: 30.0,
    status: 'AVAILABLE',
    ownerId: 'usr-marcus',
    ownerName: 'Marcus Vance',
    ownerStudentId: 'ENG-2023-4512',
    isOwnerVerified: true,
    specs: {
      'Display Count': '9999 Counts True-RMS',
      'DC Voltage Range': '9.999mV to 999.9V (±0.5%)',
      'AC Voltage Range': '9.999mV to 750.0V (±1.0%)',
      'Continuity Test': 'Audible beeper (< 50Ω)',
    },
    accessories: ['Silicone Gold-Plated Test Leads', 'Thermocouple Probe', 'Hard Shell Protective Pouch'],
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'],
    location: 'Robotics Workshop Bench 7',
    createdAt: '2026-10-12T11:15:00Z',
  },
  {
    id: 'list-book-04',
    title: 'Microelectronic Circuits (8th International Edition) - Sedra & Smith',
    description: 'Essential textbook for Analog Electronics (EE201 / EE202). Crisp pages with clean highlighting on BJT/MOSFET frequency response sections. CD and formula supplement included.',
    category: 'REFERENCE_BOOK',
    condition: 'GOOD',
    listingType: 'FOR_RENT',
    price: 1.5,
    depositAmount: 40.0,
    status: 'AVAILABLE',
    ownerId: 'usr-aisha',
    ownerName: 'Aisha Al-Mansoor',
    ownerStudentId: 'ENG-2025-0914',
    isOwnerVerified: true,
    specs: {
      'Authors': 'Adel S. Sedra, Kenneth C. Smith, Tony Chan Carusone, Vincent Gaudet',
      'ISBN': '978-0190853464',
      'Edition': '8th International Edition (Oxford University Press)',
      'Page Count': '1472 Pages',
    },
    accessories: ['Formulas Cheat Sheet Foldout', 'Book Protective Sleeve'],
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'],
    location: 'Campus Main Library Ground Floor Study Zone',
    createdAt: '2026-10-12T16:45:00Z',
  },
  {
    id: 'list-sens-05',
    title: 'MPU-6050 6-DOF Gyroscope + Accelerometer Breakout (Pair)',
    description: 'Two calibrated I2C 3-axis gyroscope + 3-axis accelerometer modules with Digital Motion Processing (DMP) capability. Header pins already cleanly soldered.',
    category: 'SENSOR',
    condition: 'NEW',
    listingType: 'FOR_SALE',
    price: 6.0,
    depositAmount: 0.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Alex Rivera',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Sensor IC': 'InvenSense MPU-6050',
      'Full Scale Range': '±250, ±500, ±1000, ±2000 °/sec',
      'Interface': 'I2C Standard 400kHz',
      'Voltage': '3.3V - 5V (Onboard LDO regulator)',
    },
    accessories: ['Pre-soldered Straight Pin Headers', 'Anti-static Bag'],
    images: ['https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800'],
    location: 'Lab Room 204, Locker #12',
    createdAt: '2026-10-13T10:00:00Z',
  },
  {
    id: 'list-book-06',
    title: 'Introduction to Algorithms (4th Edition - CLRS)',
    description: 'Standard reference for Data Structures & Algorithms. Perfect companion for CS301. Excellent condition, spine intact, no markings on proofs.',
    category: 'REFERENCE_BOOK',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 2.0,
    depositAmount: 50.0,
    status: 'AVAILABLE',
    ownerId: 'usr-sarah',
    ownerName: 'Sarah Chen',
    ownerStudentId: 'ENG-2024-1029',
    isOwnerVerified: true,
    specs: {
      'Authors': 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
      'ISBN': '978-0262046305',
      'Publisher': 'MIT Press',
      'Edition': '4th Edition',
    },
    accessories: ['Reference bookmark ribbons', 'Index tabs'],
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'],
    location: 'Computer Science Building 2nd Floor Study Room',
    createdAt: '2026-10-13T12:00:00Z',
  },
];

export const initialReservations: ReservationData[] = [
  {
    id: 'res-7091',
    listingId: 'list-ard-01',
    listingTitle: 'Arduino Uno R4 WiFi + Starter Component Pack',
    renterId: 'usr-marcus',
    renterName: 'Marcus Vance',
    status: 'ACTIVE',
    verificationToken: 'SEC-ARD-9921-XF',
    startDate: '2026-10-12T10:00:00Z',
    returnDeadline: '2026-10-19T17:00:00Z',
    totalCost: 14.0,
    depositHeld: 25.0,
    createdAt: '2026-10-12T09:45:00Z',
  },
];

export const initialForumThreads: ForumThreadData[] = [
  {
    id: 'th-101',
    title: 'How to bypass 3.3V logic level shift when interfacing ESP8266 with 5V Relay?',
    content: 'Hey everyone, I am building my home automation lab module using the NodeMCU ESP8266. The relay board coil triggers at 5V, but GPIO4 output is only 3.3V. Should I use a 2N2222 NPN transistor buffer or an optocoupler module? Has anyone on campus tried this for the EE302 lab?',
    category: 'HARDWARE_DEBUG',
    authorId: 'usr-aisha',
    authorName: 'Aisha Al-Mansoor',
    authorVerified: true,
    isPinned: true,
    isSolved: true,
    upvotes: 18,
    viewCount: 142,
    tags: ['ESP8266', 'Logic-Level', 'Relay', 'EE302'],
    createdAt: '2026-10-12T11:00:00Z',
    replies: [
      {
        id: 'rep-201',
        threadId: 'th-101',
        authorId: 'usr-admin',
        authorName: 'Alex Rivera',
        authorVerified: true,
        content: 'Use an optocoupler module with an active-low trigger! Most Amazon/Robu relay breakout boards already have an onboard PC817 optocoupler and a transistor driver. Just connect VCC to 5V (from USB), IN to ESP8266 GPIO, and GND. If your board requires 5V logic high, a 2N2222 with a 1k base resistor works reliably at 3.3V.',
        isSolution: true,
        upvotes: 14,
        createdAt: '2026-10-12T11:42:00Z',
      },
      {
        id: 'rep-202',
        threadId: 'th-101',
        authorId: 'usr-sarah',
        authorName: 'Sarah Chen',
        authorVerified: true,
        content: 'I have spare bidirectional 4-channel I2C logic level converters in the component drawer if you need one today. Check the marketplace listing or ping me!',
        isSolution: false,
        upvotes: 6,
        createdAt: '2026-10-12T12:10:00Z',
      },
    ],
  },
  {
    id: 'th-102',
    title: 'MPU6050 raw DMP readings drifting on yaw axis after 10 minutes - calibration tips?',
    content: 'Running the Jeff Rowberg I2Cdevlib on Arduino Uno R4. Pitch and roll stay rock solid with gravity vector compensation, but yaw drifts by ~15 degrees after 10 minutes of running. Does anyone have an offset calibration sketch they recommend?',
    category: 'SENSOR_HELP',
    authorId: 'usr-marcus',
    authorName: 'Marcus Vance',
    authorVerified: true,
    isPinned: false,
    isSolved: false,
    upvotes: 11,
    viewCount: 98,
    tags: ['MPU6050', 'IMU', 'Gyro-Drift', 'Arduino-R4'],
    createdAt: '2026-10-13T08:20:00Z',
    replies: [
      {
        id: 'rep-203',
        threadId: 'th-102',
        authorId: 'usr-admin',
        authorName: 'Alex Rivera',
        authorVerified: true,
        content: 'Remember that MPU-6050 is a 6-axis IMU without an internal magnetometer (compass)! Yaw drift is physically inevitable without magnetic north reference (like on an MPU-9250 or BNO055). If you only need relative delta during movements, run the auto-calibration loop for 30 seconds at room temperature before reading.',
        isSolution: false,
        upvotes: 9,
        createdAt: '2026-10-13T09:05:00Z',
      },
    ],
  },
  {
    id: 'th-103',
    title: 'Sedra & Smith vs Razavi for Analog Integrated Circuit Design fundamentals?',
    content: 'Taking the advanced analog elective next term. Sedra & Smith 8th ed is available on our marketplace, but the professor mentioned Behzad Razavi in syllabus footnotes. Which one helped more for midterm problem sets?',
    category: 'BOOK_RECOMMENDATION',
    authorId: 'usr-sarah',
    authorName: 'Sarah Chen',
    authorVerified: true,
    isPinned: false,
    isSolved: true,
    upvotes: 24,
    viewCount: 215,
    tags: ['Sedra-Smith', 'Razavi', 'Analog-Circuits', 'EE-Elective'],
    createdAt: '2026-10-13T14:00:00Z',
    replies: [
      {
        id: 'rep-204',
        threadId: 'th-103',
        authorId: 'usr-aisha',
        authorName: 'Aisha Al-Mansoor',
        authorVerified: true,
        content: 'Sedra & Smith is better for device physics, op-amp internal stages, and multi-stage frequency response. Razavi is superior for intuitive CMOS small-signal analysis and transistor level design. I rented Sedra & Smith from here last semester and it saved my grade on the feedback stability project.',
        isSolution: true,
        upvotes: 19,
        createdAt: '2026-10-13T15:12:00Z',
      },
    ],
  },
];

export const initialDisputes: DisputeReportData[] = [
  {
    id: 'disp-001',
    reason: 'Missing USB-C programming cable on return',
    details: 'Hardware kit was returned on time, but the high-speed data sync cable was replaced with a charge-only wire that does not enumerate COM ports.',
    status: 'UNDER_REVIEW',
    reporterId: 'usr-admin',
    reporterName: 'Alex Rivera',
    listingId: 'list-ard-01',
    listingTitle: 'Arduino Uno R4 WiFi + Starter Component Pack',
    reservationId: 'res-7091',
    moderatorNotes: 'Contacted borrower to provide original data cable or deduct $3 from deposit.',
    createdAt: '2026-10-13T17:00:00Z',
  },
];

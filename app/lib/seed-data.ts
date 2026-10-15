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
    name: 'Dhruv',
    email: 'admin@campus.edu',
    studentId: 'ENG-2023-8841',
    university: 'Institute of Engineering & Tech',
    department: 'Electronics & Computer Science',
    isVerifiedStudent: true,
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    trustRating: 5.0,
  },
];

export const initialListings: ListingData[] = [
  // ==========================================
  // HARDWARE KITS & MICROCONTROLLER BOARDS
  // ==========================================
  {
    id: 'list-ard-01',
    title: 'Arduino Uno R4 WiFi + Starter Component Pack',
    description: 'Original Renesas RA4M1 (Arm Cortex-M4) microcontroller with onboard ESP32-S3 for WiFi/BLE. Includes 12x8 LED matrix, 5V relay module, breadboard, and assortment of jumper wires.',
    category: 'HARDWARE_KIT',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 120.0, // ₹120/day
    depositAmount: 800.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
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
    price: 75.0,
    depositAmount: 500.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
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
    id: 'list-rpi-07',
    title: 'Raspberry Pi 4 Model B (4GB RAM) + Power Supply & Case',
    description: 'Quad-core Cortex-A72 64-bit SoC @ 1.5GHz, 4GB LPDDR4 SDRAM, dual micro-HDMI 4K displays, Gigabit Ethernet, dual-band WiFi, and USB 3.0. Includes official 15W USB-C PSU and 32GB Sandisk Extreme MicroSD.',
    category: 'HARDWARE_KIT',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 250.0,
    depositAmount: 2500.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Processor': 'Broadcom BCM2711, Quad-core Cortex-A72 64-bit @ 1.5GHz',
      'Memory': '4GB LPDDR4-3200 SDRAM',
      'Video Output': '2x micro-HDMI ports (up to 4kp60)',
      'Connectivity': '2.4 GHz and 5.0 GHz IEEE 802.11ac, Bluetooth 5.0, BLE',
    },
    accessories: ['Official 5.1V 3.0A USB-C Power Adapter', 'Argon ONE V2 Aluminum Case', 'Micro-HDMI to HDMI Cable', '32GB SanDisk MicroSD Card'],
    images: ['https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800'],
    location: 'Embedded Systems Lab B-14',
    createdAt: '2026-10-11T16:00:00Z',
  },
  {
    id: 'list-stm-08',
    title: 'STM32 Nucleo-F401RE Development Board + ST-LINK/V2',
    description: 'ARM Cortex-M4 MCU with FPU, 512 KB Flash, 84 MHz CPU, Arduino Uno V3 connectivity support and ST morpho headers. Integrated on-board ST-LINK/V2-1 debugger and programmer.',
    category: 'HARDWARE_KIT',
    condition: 'NEW',
    listingType: 'FOR_RENT',
    price: 110.0,
    depositAmount: 900.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Core': 'ARM 32-bit Cortex-M4 CPU with FPU @ 84MHz',
      'Flash Memory': '512 KB Flash memory, 96 KB SRAM',
      'Debugger': 'On-board ST-LINK/V2-1 debugger/programmer',
      'Expansion': 'Arduino Uno V3 connectivity + ST morpho extension pin headers',
    },
    accessories: ['Mini-USB Programming Cable', 'Nucleo Quick Reference Guide', 'Anti-static Shield Box'],
    images: ['https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800'],
    location: 'Robotics Workshop Bench 4',
    createdAt: '2026-10-12T09:30:00Z',
  },
  {
    id: 'list-pico-09',
    title: 'Raspberry Pi Pico 2 W (RP2350 Dual-Core) + Breadboard Bundle',
    description: 'Next-gen RP2350 microcontroller board featuring dual Arm Cortex-M33 / dual Hazard3 RISC-V cores @ 150MHz with onboard 2.4GHz 802.11n WiFi & Bluetooth 5.2. Pre-soldered male header pins.',
    category: 'HARDWARE_KIT',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 60.0,
    depositAmount: 400.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Processor': 'Dual Arm Cortex-M33 or Dual Hazard3 RISC-V @ 150MHz',
      'Internal SRAM': '520KB on-chip SRAM',
      'Wireless Module': 'Infineon CYW43439 2.4GHz WiFi 4 & BLE 5.2',
      'GPIO': '26 multi-function GPIO pins',
    },
    accessories: ['400-Point Half-size Breadboard', 'Micro-USB High-Speed Cable', 'Pack of 30 M-M Jumper Wires'],
    images: ['https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800'],
    location: 'Lab Room 204, Locker #12',
    createdAt: '2026-10-12T13:00:00Z',
  },
  {
    id: 'list-esp32-cam',
    title: 'ESP32-CAM AI-Thinker Module with OV2640 2MP Camera + USB Adapter',
    description: 'Low-power 32-bit CPU with built-in 520 KB SRAM and external 4MB PSRAM. Includes OV2640 camera module, microSD card slot, and FTDI USB-to-TTL programmer shield for easy firmware uploads.',
    category: 'HARDWARE_KIT',
    condition: 'GOOD',
    listingType: 'FOR_RENT',
    price: 85.0,
    depositAmount: 600.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'SoC': 'ESP32-D0WDQ6 Dual Core 240MHz',
      'Camera': 'OV2640 2 Megapixel UXGA',
      'Memory': '520KB SRAM + 4MB PSRAM',
      'Card Slot': 'MicroSD up to 4GB',
    },
    accessories: ['FTDI FT232RL USB Programmer Breakout', 'OV2640 Camera Ribbon', 'Jumper Wires'],
    images: ['https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800'],
    location: 'Computer Vision Lab, 2nd Floor',
    createdAt: '2026-10-12T18:00:00Z',
  },

  // ==========================================
  // SENSORS & ACTUATOR BREAKOUTS
  // ==========================================
  {
    id: 'list-sens-05',
    title: 'MPU-6050 6-DOF Gyroscope + Accelerometer Breakout (Pair)',
    description: 'Two calibrated I2C 3-axis gyroscope + 3-axis accelerometer modules with Digital Motion Processing (DMP) capability. Header pins already cleanly soldered.',
    category: 'SENSOR',
    condition: 'NEW',
    listingType: 'FOR_SALE',
    price: 180.0,
    depositAmount: 0.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
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
    id: 'list-sens-10',
    title: 'Ultrasonic Distance Ranging Pack (3x HC-SR04 + Mounting Brackets)',
    description: 'Precision ultrasonic distance measurement modules (2cm to 400cm range, accuracy down to 3mm). Comes with 3 acrylic mounting brackets and header cables for robotic obstacle avoidance.',
    category: 'SENSOR',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 45.0,
    depositAmount: 250.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Working Frequency': '40 kHz',
      'Detection Range': '2cm - 400cm',
      'Measuring Angle': '15 degrees',
      'Input Trigger': '10us TTL pulse',
    },
    accessories: ['3x HC-SR04 Sensors', '3x Clear Acrylic Robot Mounts with Screws', '12x Dupont Female Jumpers'],
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800'],
    location: 'Robotics Workshop Bench 7',
    createdAt: '2026-10-13T11:20:00Z',
  },
  {
    id: 'list-sens-11',
    title: 'Bosch BME280 Digital Barometric Pressure, Temp & Humidity Sensor',
    description: 'High precision environmental sensor breakout supporting both I2C and SPI interfaces. Measures temperature (±0.5°C), relative humidity (±3%), and atmospheric pressure (±1 hPa) for weather or altitude sensing.',
    category: 'SENSOR',
    condition: 'NEW',
    listingType: 'FOR_RENT',
    price: 70.0,
    depositAmount: 450.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Pressure Range': '300 to 1100 hPa (equiv. +9000m to -500m)',
      'Temperature': '-40 to +85 °C',
      'Interface': 'I2C (up to 3.4MHz) & SPI (up to 10MHz)',
      'Operating Voltage': '1.8V - 3.6V (onboard 3.3V regulator)',
    },
    accessories: ['Pre-soldered 6-pin Gold Header', 'Protective Anti-static Case'],
    images: ['https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800'],
    location: 'ECE Lab 204, Component Bin #4',
    createdAt: '2026-10-13T13:40:00Z',
  },
  {
    id: 'list-sens-12',
    title: '4-Channel 5V Relay Isolation Module with Optocoupler',
    description: 'Independent 4-channel relay board with optocoupler isolation for microcontrollers (Arduino, STM32, PIC, Raspberry Pi). Can control high-power 250VAC/10A or 30VDC/10A appliances safely.',
    category: 'SENSOR',
    condition: 'GOOD',
    listingType: 'FOR_RENT',
    price: 50.0,
    depositAmount: 300.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Relay Max Load': 'AC 250V/10A, DC 30V/10A',
      'Trigger Current': '5mA per channel',
      'Trigger Type': 'Selectable High/Low level trigger via jumper',
      'Isolation': 'PC817 Optocouplers on all channels',
    },
    accessories: ['Screw Terminal Blocks Pre-installed', 'Safety Isolation Acrylic Baseplate'],
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800'],
    location: 'Electrical Sciences Dept, 3rd Floor Hub',
    createdAt: '2026-10-13T14:15:00Z',
  },
  {
    id: 'list-sens-13',
    title: 'RC522 RFID Reader/Writer Kit (13.56MHz SPI) + Cards & Keyfobs',
    description: 'NXP MFRC522 contactless read/write communication chip module. Operating at 13.56MHz frequency. Includes 2 Mifare S50 white IC cards and 2 blue keychain fobs for student access control projects.',
    category: 'SENSOR',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 65.0,
    depositAmount: 350.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Operating Frequency': '13.56MHz',
      'Data Transfer Rate': '10Mbit/s max SPI',
      'Supported Cards': 'Mifare1 S50, Mifare1 S70, Mifare UltraLight',
      'Read Range': 'Approx 30-50mm',
    },
    accessories: ['RC522 Module with Curved Header', '2x RFID Blank Cards', '2x RFID Key Fobs', 'Pin Headers'],
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'],
    location: 'IoT Lab, Room 102',
    createdAt: '2026-10-13T15:00:00Z',
  },
  {
    id: 'list-sens-mq',
    title: 'MQ-2 & MQ-135 Gas & Air Quality Sensor Duo (Calibrated)',
    description: 'Analog gas detection breakouts. MQ-2 detects LPG, Smoke, and Methane; MQ-135 monitors hazardous air pollutants (NH3, NOx, Alcohol, Benzene, CO2). Dual analog and digital comparator outputs with onboard pot.',
    category: 'SENSOR',
    condition: 'GOOD',
    listingType: 'FOR_RENT',
    price: 55.0,
    depositAmount: 350.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Target Gases': 'LPG, Propane, Hydrogen, Smoke, CO2, Ammonia',
      'Output': 'Analog (0-5V) and Digital TTL (LM393 comparator)',
      'Pre-heat Time': '24 hours burn-in completed',
    },
    accessories: ['8x Female-Female DuPont wires', 'Calibration Reference Curves Sheet'],
    images: ['https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800'],
    location: 'Environmental Lab Bench 2',
    createdAt: '2026-10-13T16:10:00Z',
  },

  // ==========================================
  // TEST EQUIPMENT & MEASUREMENT TOOLS
  // ==========================================
  {
    id: 'list-dmm-03',
    title: 'Aneng AN8008 True-RMS 9999-Counts Digital Multimeter',
    description: 'Auto-ranging precision student multimeter. Measures DC/AC voltage, DC/AC current, resistance, capacitance, frequency, duty cycle, temperature, and diode check with backlit LCD.',
    category: 'TEST_EQUIPMENT',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 150.0,
    depositAmount: 1200.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
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
    id: 'list-test-14',
    title: 'USB 8-Channel 24MHz Logic Analyzer (Saleae Logic Compatible)',
    description: 'Capture and inspect digital waveforms, I2C packets, SPI transactions, UART frames, and 1-Wire communications on your PC. Sampling rate up to 24MHz across 8 synchronous digital channels.',
    category: 'TEST_EQUIPMENT',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 95.0,
    depositAmount: 750.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Channels': '8 synchronous channels',
      'Max Sampling Rate': '24 MS/s',
      'Logic Voltage Threshold': '1.2V - 5.5V TTL/CMOS',
      'Software Support': 'Compatible with PulseView / Sigrok & Saleae Logic v2',
    },
    accessories: ['Mini-USB Host Cable', '10-lead Rainbow Test Cable', '4x Micro IC Grabber Test Hooks'],
    images: ['https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800'],
    location: 'Lab Room 204, Locker #12',
    createdAt: '2026-10-12T14:45:00Z',
  },
  {
    id: 'list-test-15',
    title: '100MHz Oscilloscope Passive Probes Pair (1X / 10X Switchable)',
    description: 'Matched pair of high-impedance 100MHz bandwidth oscilloscope probes with standard BNC termination and gold-plated center pins. Ground lead with crocodile clip and IC test clips included.',
    category: 'TEST_EQUIPMENT',
    condition: 'NEW',
    listingType: 'FOR_RENT',
    price: 75.0,
    depositAmount: 600.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Bandwidth': 'DC to 100MHz (10X mode) / 6MHz (1X mode)',
      'Input Impedance': '10MΩ // 14-18pF (10X)',
      'Max Input Voltage': '600V DC + peak AC',
      'Connector': 'Standard BNC with insulated sleeve',
    },
    accessories: ['2x 100MHz Probes', '2x Detachable Ground Leads', '4x Color Identifier Rings', 'Trimmer Tool for Compensation Capacitor'],
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'],
    location: 'Analog Electronics Lab, Cabinet 3',
    createdAt: '2026-10-12T15:30:00Z',
  },
  {
    id: 'list-test-16',
    title: 'Adjustable 30V 5A DC Bench Power Supply with 4-Digit LED Display',
    description: 'Constant Voltage (CV) and Constant Current (CC) regulated DC bench power supply with coarse and fine adjustment knobs. Low ripple noise and automatic short-circuit cutoff.',
    category: 'TEST_EQUIPMENT',
    condition: 'GOOD',
    listingType: 'FOR_RENT',
    price: 200.0,
    depositAmount: 2000.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Output Voltage': '0 - 30.00V Continuous Adjustable',
      'Output Current': '0 - 5.000A Continuous Adjustable',
      'Display Resolution': '0.01V / 0.001A',
      'Ripple & Noise': '≤ 30mVrms',
    },
    accessories: ['AC Mains Power Cord', 'Heavy-Duty Banana-to-Alligator Test Leads'],
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'],
    location: 'Power Electronics Lab 108',
    createdAt: '2026-10-12T16:00:00Z',
  },
  {
    id: 'list-test-17',
    title: 'Pinecil / TS100 Smart Digital Soldering Iron 65W (USB-C PD & QC3.0)',
    description: 'Portable RISC-V microprocessor-controlled temperature regulated soldering pen. Heats from room temp to 300°C in just 12 seconds via 65W USB-PD. Includes precision conical B2 tip and silicone stand.',
    category: 'TEST_EQUIPMENT',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 130.0,
    depositAmount: 1100.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Temperature Range': '100°C to 420°C (±2% stability)',
      'Power Supply': 'USB-C PD 65W or DC5525 12V-24V',
      'Display': '0.69" Monochrome OLED',
      'Firmware': 'IronOS Open Source Firmware with auto-sleep',
    },
    accessories: ['B2 Conical Solder Tip', 'Silicone Heat-resistant Anti-tangle USB-C Cable', 'Mini Aluminum Stand + Brass Wire Tip Cleaner', 'Lead-free 63/37 Solder Wire Tube'],
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800'],
    location: 'Robotics Workshop Bench 4',
    createdAt: '2026-10-12T17:30:00Z',
  },

  // ==========================================
  // ACADEMIC REFERENCE BOOKS
  // ==========================================
  {
    id: 'list-book-04',
    title: 'Microelectronic Circuits (8th International Edition) - Sedra & Smith',
    description: 'Essential textbook for Analog Electronics (EE201 / EE202). Crisp pages with clean highlighting on BJT/MOSFET frequency response sections. CD and formula supplement included.',
    category: 'REFERENCE_BOOK',
    condition: 'GOOD',
    listingType: 'FOR_RENT',
    price: 50.0,
    depositAmount: 500.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
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
    id: 'list-book-06',
    title: 'Introduction to Algorithms (4th Edition - CLRS)',
    description: 'Standard reference for Data Structures & Algorithms. Perfect companion for CS301. Excellent condition, spine intact, no markings on proofs.',
    category: 'REFERENCE_BOOK',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 60.0,
    depositAmount: 600.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
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
  {
    id: 'list-book-18',
    title: 'Design of Analog CMOS Integrated Circuits (2nd Edition) - Behzad Razavi',
    description: 'Definitive guide on modern CMOS analog circuit design. Thorough coverage of single-stage amplifiers, differential pairs, current mirrors, frequency response, feedback stability, and bandgap references.',
    category: 'REFERENCE_BOOK',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 55.0,
    depositAmount: 550.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Authors': 'Behzad Razavi',
      'ISBN': '978-0072524932',
      'Publisher': 'McGraw-Hill Education',
      'Page Count': '800 Pages',
    },
    accessories: ['Plastic dust cover', 'Handwritten Chapter Summary Notes'],
    images: ['https://images.unsplash.com/photo-1532012164546-f432f2e3777a?w=800'],
    location: 'VLSI Design Lab, Room 310',
    createdAt: '2026-10-13T13:00:00Z',
  },
  {
    id: 'list-book-19',
    title: 'Signals and Systems (2nd Edition) - Alan V. Oppenheim & Alan S. Willsky',
    description: 'Classic MIT textbook for Signals & Systems. Covers continuous-time and discrete-time Fourier series/transforms, Laplace transform, z-transform, sampling theorem, and linear time-invariant systems.',
    category: 'REFERENCE_BOOK',
    condition: 'GOOD',
    listingType: 'FOR_RENT',
    price: 45.0,
    depositAmount: 450.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Authors': 'Alan V. Oppenheim, Alan S. Willsky, S. Hamid Nawab',
      'ISBN': '978-0138147570',
      'Publisher': 'Pearson Higher Education',
      'Page Count': '957 Pages',
    },
    accessories: ['Fourier Transform Table Bookmark', 'Matlab Practice Scripts Guide'],
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'],
    location: 'Signals Lab B-12',
    createdAt: '2026-10-13T14:30:00Z',
  },
  {
    id: 'list-book-20',
    title: 'Digital Design with an Introduction to the Verilog HDL - M. Morris Mano',
    description: 'Standard introductory text for digital logic fundamentals, Karnaugh maps, combinational logic, synchronous sequential state machines, registers, counters, and hardware description language (Verilog).',
    category: 'REFERENCE_BOOK',
    condition: 'LIKE_NEW',
    listingType: 'FOR_RENT',
    price: 40.0,
    depositAmount: 400.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Authors': 'M. Morris Mano, Michael D. Ciletti',
      'ISBN': '978-0131989245',
      'Publisher': 'Pearson',
      'Page Count': '592 Pages',
    },
    accessories: ['Verilog Syntax Reference Card'],
    images: ['https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800'],
    location: 'ECE Department Library',
    createdAt: '2026-10-13T15:15:00Z',
  },
  {
    id: 'list-book-21',
    title: 'Computer Networks (5th Edition) - Andrew S. Tanenbaum & David J. Wetherall',
    description: 'Industry-standard textbook on networking protocols. Covers physical, data link, medium access sublayer, network routing (BGP, OSPF), transport (TCP/UDP congestion control), and application layers.',
    category: 'REFERENCE_BOOK',
    condition: 'GOOD',
    listingType: 'FOR_RENT',
    price: 50.0,
    depositAmount: 500.0,
    status: 'AVAILABLE',
    ownerId: 'usr-admin',
    ownerName: 'Dhruv',
    ownerStudentId: 'ENG-2023-8841',
    isOwnerVerified: true,
    specs: {
      'Authors': 'Andrew S. Tanenbaum, David J. Wetherall',
      'ISBN': '978-0132126953',
      'Publisher': 'Pearson Prentice Hall',
      'Page Count': '960 Pages',
    },
    accessories: ['OSI Model 7-Layer Quick Reference Poster'],
    images: ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800'],
    location: 'CS Networks Lab Hub',
    createdAt: '2026-10-13T16:00:00Z',
  },
];

export const initialReservations: ReservationData[] = [
  {
    id: 'res-7091',
    listingId: 'list-ard-01',
    listingTitle: 'Arduino Uno R4 WiFi + Starter Component Pack',
    renterId: 'usr-admin',
    renterName: 'Dhruv',
    status: 'ACTIVE',
    verificationToken: 'SEC-ARD-9921-XF',
    startDate: '2026-10-12T10:00:00Z',
    returnDeadline: '2026-10-19T17:00:00Z',
    totalCost: 840.0,
    depositHeld: 800.0,
    createdAt: '2026-10-12T09:45:00Z',
  },
];

export const initialForumThreads: ForumThreadData[] = [
  {
    id: 'th-101',
    title: 'How to bypass 3.3V logic level shift when interfacing ESP8266 with 5V Relay?',
    content: 'Hey everyone, I am building my home automation lab module using the NodeMCU ESP8266. The relay board coil triggers at 5V, but GPIO4 output is only 3.3V. Should I use a 2N2222 NPN transistor buffer or an optocoupler module? Has anyone on campus tried this for the EE302 lab?',
    category: 'HARDWARE_DEBUG',
    authorId: 'usr-admin',
    authorName: 'Dhruv',
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
        authorName: 'Dhruv',
        authorVerified: true,
        content: 'Use an optocoupler module with an active-low trigger! Most Amazon/Robu relay breakout boards already have an onboard PC817 optocoupler and a transistor driver. Just connect VCC to 5V (from USB), IN to ESP8266 GPIO, and GND. If your board requires 5V logic high, a 2N2222 with a 1k base resistor works reliably at 3.3V.',
        isSolution: true,
        upvotes: 14,
        createdAt: '2026-10-12T11:42:00Z',
      },
    ],
  },
  {
    id: 'th-102',
    title: 'MPU6050 raw DMP readings drifting on yaw axis after 10 minutes - calibration tips?',
    content: 'Running the Jeff Rowberg I2Cdevlib on Arduino Uno R4. Pitch and roll stay rock solid with gravity vector compensation, but yaw drifts by ~15 degrees after 10 minutes of running. Does anyone have an offset calibration sketch they recommend?',
    category: 'SENSOR_HELP',
    authorId: 'usr-admin',
    authorName: 'Dhruv',
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
        authorName: 'Dhruv',
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
    authorId: 'usr-admin',
    authorName: 'Dhruv',
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
        authorId: 'usr-admin',
        authorName: 'Dhruv',
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
    reporterName: 'Dhruv',
    listingId: 'list-ard-01',
    listingTitle: 'Arduino Uno R4 WiFi + Starter Component Pack',
    reservationId: 'res-7091',
    moderatorNotes: 'Contacted borrower to provide original data cable or deduct ₹250 from deposit.',
    createdAt: '2026-10-13T17:00:00Z',
  },
];

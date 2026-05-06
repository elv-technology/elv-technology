import { Shield, Radio, Server, Home, Video, Mic2, Network, Lock, Bell, Users, Accessibility, Music, Monitor, MonitorPlay, Wifi, Phone, Cpu, Lamp } from "lucide-react";

export const solutionsData = {
    hero: {
        title: "Our Solutions",
        subtitle: "Comprehensive Technology & Security Services",
        description: "ELV Technology Solutions provides end-to-end integrated systems for security, audio-visual, networking, and automation needs across the UAE.",
    },
    securityAndSurveillance: {
        title: "Security and Surveillance",
        id: "security-surveillance",
        description: "Modern security is no longer about passive monitoring—it’s about intelligent systems that think, analyse, and act in real time.",
        image: "/images/solutions/security-surveillance/hero1.png",
        image2: "/images/solutions/security-surveillance/security-survillience1.png",
        items: [
            {
                title: "Security and Surveillance",
                id: "security-surveillance-system",
                icon: Shield,
                image: "/images/solutions/security-surveillance/security-survillience.png",
                image2: "/images/solutions/security-surveillance/security-survillience1.png",
                content: {
                    heading: "AI-Powered Security & Surveillance Solutions in UAE",
                    description: [
                        "Modern security is no longer about passive monitoring—it’s about intelligent systems that think, analyse, and act in real time. ETS delivers next-generation, AI-driven Security & Surveillance Solutions that protect your people, assets, and operations while providing actionable business insights.",
                        "ETS provide best security and surveillance system in Abu Dhabi, UAE, covering system design, supply, installation, AI configuration, analytics setup, integration, and long-term maintenance. Our solutions are scalable, future-ready, and seamlessly integrated into your operational ecosystem."
                    ],
                    keyFeatures: {
                        title: "Key Features & Capabilities",
                        subtitle: "AI-Based Video Surveillance & Analytics",
                        description: "Advanced video analytics driven by artificial intelligence for real-time threat detection and operational insights, including:",
                        points: [
                            "Intrusion and perimeter detection",
                            "Facial recognition & people identification",
                            "People counting, crowd density",
                            "Behaviour analysis",
                            "Object detection (left/removed objects, fire, smoke, vehicles)"
                        ]
                    },
                    applications: {
                        title: "Applications",
                        description: "Our AI-enabled security solutions are designed for:",
                        points: [
                            "Corporate offices & commercial buildings",
                            "Retail & shopping centres",
                            "Hotels & hospitality environments",
                            "Industrial facilities & factories",
                            "Healthcare institutions",
                            "Educational campuses & mixed-use developments"
                        ]
                    },
                    closing: "ETS doesn’t just install security systems. We deliver intelligent security platforms that protect, predict, and perform.",
                    extraSection: {
                        title: "Why CCTV Camera is Important?",
                        content: "In today’s rapidly growing urban environment, ensuring safety has become a top priority for homes and businesses alike. As a leading security and surveillance services provider in Abu Dhabi, we offer professional security system installation services tailored to residential, commercial, and industrial needs all over UAE. As a trusted CCTV company and a certified MCC Approved company in Abu Dhabi, we specialize in CCTV Installation for homes, offices, retail stores, warehouses, and public areas. Our advanced CCTV for home solutions feature AI-powered video analytics, motion detection, people counting, vehicle tracking, and remote monitoring for enhanced protection. By using the latest smart surveillance technologies, our CCTV security systems help reduce crime, improve operational efficiency, and provide 24/7 real-time monitoring with mobile accessibility. Whether you need a complete video surveillance system, access control system, intercom setup, or biometric security solution, we deliver reliable, cost-effective, and high-performance security solutions across Abu Dhabi."
                    }
                }
            },
            {
                title: "Access Control & Time Attendance",
                id: "access-control",
                icon: Lock,
                image: "/images/solutions/security-surveillance/Access Control&Time Attendance.jpeg",
                image2: "/images/solutions/security-surveillance/Access Control&Time Attendance1.png",
                content: {
                    heading: "Access Control & Time Attendance System in UAE",
                    description: [
                        "ELV Technology Solutions provides secure and scalable access control and time attendance systems in Abu Dhabi, Dubai, and across the UAE, helping organizations manage entry permissions, workforce attendance, and site security effectively.",
                        "We design and install electronic access control systems using card readers, biometric devices, PIN keypads, and mobile credentials. Our solutions support doors, turnstiles, barriers, and restricted areas, with centralized monitoring and reporting.",
                        "For workforce management, we deliver time attendance systems that accurately track employee working hours, shifts, overtime, and absenteeism. These systems integrate with HR and payroll software, reducing manual errors and administrative overhead.",
                        "As an experienced ELV system integrator in the UAE, ELV Technology Solutions ensures secure installation, proper system configuration, and compliance with organizational security policies. Our access control and attendance installations in Abu Dhabi and Dubai are scalable and suitable for offices, commercial buildings, industrial facilities, schools, and healthcare environments.",
                    "For businesses seeking reliable access control and time attendance installation in the UAE, ELV Technology Solutions delivers systems focused on security, accuracy, and long-term reliability."
                    ],
                    keyFeatures: {
                        points: [
                            "Card & Biometric Access Control",
                            "Time & Attendance Tracking",
                            "Scalable Security Management"
                        ]
                    }
                }
            },
            {
                title: "Gate Barrier",
                id: "gate-barrier",
                icon: Shield,
                image: "/images/solutions/security-surveillance/Gate Barrier.png",
                image2: "/images/solutions/security-surveillance/Gate Barrier1.png",
                content: {
                    heading: "Gate Barrier in UAE",
                    description: [
                        "ELV Technology Solutions provides reliable gate barrier systems in Abu Dhabi, Dubai, and across the UAE, designed to control vehicle access, improve site security, and manage traffic flow efficiently.",
                        "We design and install automatic gate barrier systems suitable for residential compounds, commercial buildings, parking areas, industrial facilities, and government premises. Our solutions support RFID cards, access cards, ANPR (number plate recognition), remote controls, biometric access, and integration with access control systems.",
                        "Each gate barrier installation in Abu Dhabi and Dubai is engineered based on traffic volume, site layout, security requirements, and operating conditions. We supply durable barrier arms, high-duty motors, safety sensors, and control panels designed for continuous operation in UAE climate conditions.",
                        "As an experienced ELV system integrator in the UAE, ELV Technology Solutions ensures seamless integration of gate barrier systems with CCTV, access control, parking management, and building management systems (BMS).",
                    "For organizations seeking dependable gate barrier system installation in the UAE, ELV Technology Solutions delivers solutions focused on security, reliability, and long-term operational performance."
                    ],
                    keyFeatures: {
                        points: [
                            "Automatic Vehicle Access Control",
                            "RFID & ANPR Integration",
                            "Durable Weatherproof Barriers"
                        ]
                    }
                }
            },
            {
                title: "Nurse Call System",
                id: "nurse-call",
                icon: Bell,
                image: "/images/solutions/security-surveillance/Nurse Call System.png",
                image2: "/images/solutions/security-surveillance/Nurse Call System1.png",
                content: {
                    heading: "Nurse Call System in UAE",
                    description: [
                        "ELV Technology Solutions provides reliable nurse call systems in Abu Dhabi, Dubai, and across the UAE, supporting fast and efficient communication between patients and nursing staff in healthcare environments.",
                        "We design and install nurse call systems that enable patients to alert nurses using bedside call buttons, pull cords, or wall-mounted units. Alerts are displayed visually and audibly at nurse stations, corridor displays, and staff mobile devices, ensuring rapid response and improved patient safety.",
                        "Our nurse call system installations in Abu Dhabi and Dubai are suitable for hospitals, clinics, medical centre’s, rehabilitation facilities, and care homes. Systems support features such as room identification, call prioritization, emergency alerts, staff presence indication, and event reporting.",
                        "As an experienced ELV system integrator in the UAE, ELV Technology Solutions ensures proper system design, compliant installation, testing, and commissioning. Our nurse call solutions are scalable, reliable, and compatible with hospital workflows and future expansion.",
                    "For healthcare facilities seeking dependable nurse call system installation in the UAE, ELV Technology Solutions delivers communication systems focused on safety, clarity, and operational efficiency."
                    ],
                    keyFeatures: {
                        points: [
                            "Real-time Patient Alert Systems",
                            "Emergency Call Monitoring",
                            "Staff Presence & Coordination"
                        ]
                    }
                }
            },
            {
                title: "Queue Management System",
                id: "queue-management",
                icon: Users,
                image: "/images/solutions/security-surveillance/Queue Management System.png",
                image2: "/images/solutions/security-surveillance/Queue Management System1.png",
                content: {
                    heading: "Queue Management System in UAE",
                    description: [
                        "ELV Technology Solutions supplies and installs compliant Disabled Toilet Alarm Systems in Abu Dhabi, Dubai, and across the UAE, ensuring emergency assistance for people with disabilities in public and commercial buildings.",
                        "A disabled toilet alarm system allows users to activate an emergency call using a pull cord or button, sending an audible and visual alert to designated staff locations. These systems are critical for accessibility compliance and occupant safety in accordance with local regulations and international standards.",
                        "We provide complete disabled toilet alarm system design and installation, including pull cords, reset buttons, indicator panels, sounders, and power supplies. Our installations ensure clear signalling, fast response, and reliable operation during emergencies.",
                        "As an experienced ELV system integrator in the UAE, ELV Technology Solutions ensures proper placement, labelling, testing, and commissioning of disabled toilet alarm systems in Abu Dhabi and Dubai. Our solutions are suitable for malls, offices, hospitals, schools, hotels, and public facilities.",
                        "For organizations seeking dependable disabled toilet alarm system installation in the UAE, ELV Technology Solutions delivers safety-focused solutions that meet accessibility requirements and operational needs."
                    ]
                    // Note: The user text for Queue Management System seems to be a copy-paste error in the source request (it repeats Disabled Toilet Alarm text).
                    // However, per instructions "do not remove any contents in it", I am keeping it as is, or I can try to infer if I should fix it.
                    // Given "do not remove any contents", I will paste the text they gave for Queue Management System.
                }
            },
            {
                title: "Disabled Toilet Alarm System",
                id: "disabled-alarm",
                icon: Accessibility,
                image: "/images/solutions/security-surveillance/Disabled Toilet Alarm System.png",
                image2: "/images/solutions/security-surveillance/Disabled Toilet Alarm System1.png",
                content: {
                    heading: "Disabled Toilet Alaram System in UAE",
                    description: [
                        "ELV Technology Solutions supplies and installs compliant Disabled Toilet Alarm Systems in Abu Dhabi, Dubai, and across the UAE, ensuring emergency assistance for people with disabilities in public and commercial buildings.",
                        "A disabled toilet alarm system allows users to activate an emergency call using a pull cord or button, sending an audible and visual alert to designated staff locations. These systems are critical for accessibility compliance and occupant safety in accordance with local regulations and international standards.",
                        "We provide complete disabled toilet alarm system design and installation, including pull cords, reset buttons, indicator panels, sounders, and power supplies. Our installations ensure clear signalling, fast response, and reliable operation during emergencies.",
                        "As an experienced ELV system integrator in the UAE, ELV Technology Solutions ensures proper placement, labelling, testing, and commissioning of disabled toilet alarm systems in Abu Dhabi and Dubai. Our solutions are suitable for malls, offices, hospitals, schools, hotels, and public facilities.",
                        "For organizations seeking dependable disabled toilet alarm system installation in the UAE, ELV Technology Solutions delivers safety-focused solutions that meet accessibility requirements and operational needs."
                    ]
                }
            }
        ]
    },
    audioVisual: {
        title: "Audio Visual Solutions",
        id: "audio-visual",
        description: "Advancements in audio-visual technology are reshaping how organizations collaborate, train, and communicate.",
        image: "/images/solutions/audio-visual/hero.png",
        image2: "/images/solutions/audio-visual/hero1.png",
        items: [
            {
                title: "Music Systems and BGM Solutions",
                id: "music-bgm",
                icon: Music,
                image: "/images/solutions/audio-visual/Music Systems and BGM Solutions1.png",
                image2: "/images/solutions/audio-visual/Music Systems and BGM Solutions.jpg",
                content: {
                    heading: "Music Systems and BGM Solutions for Hospitality in UAE",
                    description: [
                        "Music plays a critical role in shaping guest experience in hotels, restaurants, lounges, and hospitality venues. A well-designed music system and background music (BGM) solution enhances ambience, supports brand identity, and delivers consistent sound quality across all areas without overpowering conversations or disturbing guests.",
                        "ELV Technology Solutions provides professional Music Systems and BGM Solutions in Abu Dhabi, Dubai, and across the UAE, designed specifically for hospitality environments where audio quality, zoning, and control is essential."
                    ],
                    subsections: [
                        {
                            title: "We design and install music and BGM systems for:",
                            points: [
                                "Hotels and resorts",
                                "Restaurants, cafés, and food courts",
                                "Bars, lounges, and night venues",
                                "Serviced apartments and hospitality towers"
                            ]
                        },
                        {
                            title: "Our solutions deliver:",
                            points: [
                                "Sound distribution with no dead zones",
                                "Independent volume and source control for each area",
                                "High-quality background music for lobbies, dining areas, and lounges",
                                "Discreet speakers integrated into interior design",
                                "Reliable operation for long daily usage"
                            ]
                        },
                        {
                            title: "Zoned Music & Background Audio Control",
                            description: "ELV Technology Solutions specializes in multi-zone music and BGM systems, allowing different music sources, playlists, and volume levels in separate areas such as lobbies, restaurants, bars, outdoor terraces, and back-of-house zones.",
                            points: [
                                "Centralized and zone-based control",
                                "Integration with streaming services, media players, and automation systems",
                                "Simple staff operation with secure access levels",
                                "Expansion for future areas or layout changes"
                            ]
                        },
                        {
                            title: "Integrated Music, BGM & Announcement Capability",
                            description: "Where required, music systems and BGM solutions can be seamlessly integrated with public address and emergency announcement systems, ensuring:",
                            points: [
                                "Automatic music attenuation during announcements",
                                "Clear paging for staff coordination",
                                "Emergency messaging compliance without compromising daily ambience",
                                "This integration is optional and applied only where operationally necessary."
                            ]
                        },
                        {
                            title: "Professional Installation & Long-Term Reliability",
                            description: "We provide complete music system and BGM installation in Abu Dhabi and Dubai, including system design, equipment selection, cabling, testing, and commissioning. Every system is engineered for stable performance, ease of use, and future scalability. Whether you need Music Systems and BGM Solutions in the UAE for a single restaurant or a multi-property hospitality group, ELV Technology Solutions delivers audio environments that support guest comfort, brand consistency, and operational control."
                        }
                    ]
                }
            },
            {
                title: "Indoor Video Wall",
                id: "video-wall",
                icon: MonitorPlay,
                image: "/images/solutions/audio-visual/Indoor Video Wall1.png",
                image2: "/images/solutions/audio-visual/Indoor Video Wall.jpg",
                content: {
                    heading: "Indoor Video Wall in UAE",
                    description: [
                        "ELV Technology Solutions provides professional Indoor video wall solutions in Abu Dhabi, Dubai, and across the UAE, delivering high-resolution visual systems for corporate, education, and mission-critical environments.",
                        "Our indoor LED video wall solutions are designed for clear visibility, consistent colour performance, and seamless system integration. From design and engineering to installation and commissioning, ETS delivers complete AV and ELV system integration tailored to the operational needs of each project.",
                        "We specialize in indoor video wall installation in Abu Dhabi and Dubai for boardrooms, control rooms, classrooms, auditoriums, experience centres, and corporate lobbies. Using fine pixel-pitch LED panels, professional calibration, and industry-proven hardware, we ensure reliable performance and long-term usability.",
                    "For organizations seeking dependable indoor LED wall solutions in the UAE, ELV Technology Solutions delivers scalable systems built on technical precision, not generic marketing claims."
                    ],
                    keyFeatures: {
                        points: [
                            "High-Resolution LED Displays",
                            "Seamless Multi-Screen Playback",
                            "Professional Calibration & Setup"
                        ]
                    }
                }
            },
            {
                title: "Conference Room",
                id: "conference-room",
                icon: Users,
                image: "/images/solutions/audio-visual/Conference Room1.png",
                image2: "/images/solutions/audio-visual/Conference Room.jpg",
                content: {
                    heading: "Conference Room in UAE",
                    description: [
                        "ELV Technology Solutions delivers professional conference room AV solutions in Abu Dhabi, Dubai, and across the UAE, designed to support clear communication, seamless collaboration, and efficient meetings.",
                        "We provide complete conference room audio-visual system design, installation, and integration, tailored to your room size, usage requirements, and IT infrastructure. Our solutions include video conferencing systems, interactive displays, presentation screens, microphones, speakers, wireless sharing, and centralized AV control.",
                        "From small meeting rooms to executive boardrooms, ELV Technology Solutions ensures reliable performance, clean installation, and intuitive operation. We integrate leading AV hardware with platforms such as Microsoft Teams, Zoom, and Google Meet, enabling smooth hybrid and remote meetings.",
                        "As an experienced AV and ELV system integrator in the UAE, we focus on functionality—not overcomplicated setups. Our conference room installations in Abu Dhabi and Dubai are built for long-term use, easy maintenance, and future scalability.",
                        "For businesses looking for dependable conference room AV installation in the UAE, ELV Technology Solutions delivers practical, high-quality solutions that simply work."
                    ]
                }
            },
            {
                title: "Meeting and Boardroom",
                id: "meeting-boardroom",
                icon: Users,
                image: "/images/solutions/audio-visual/Meeting and Boardroom1.png",
                image2: "/images/solutions/audio-visual/Meeting and Boardroom.jpg",
                content: {
                    heading: "Meeting Room & Boardroom AV Solutions in UAE",
                    description: [
                        "ELV Technology Solutions provides professional meeting room and boardroom AV solutions in the UAE, serving businesses across Abu Dhabi, Dubai, and other Emirates. We help organizations run efficient, distraction-free meetings with reliable audio-visual systems designed for everyday business use.",
                        "We specialize in meeting room AV system design and installation for huddle rooms, conference rooms, and executive boardrooms. Our solutions support presentations, video conferencing, and wireless content sharing, using high-quality displays, projectors, microphones, speakers, cameras, and user-friendly AV control systems—configured to match real workplace requirements.",
                        "Our meeting room AV installations in Abu Dhabi and Dubai focus on clarity, ease of operation, and system stability, ensuring fast startup, minimal training, and consistent performance. For executive spaces, our boardroom AV solutions in the UAE include large-format displays or video walls, ceiling microphones, high-fidelity audio systems, secure video conferencing, and centralized control for professional and confidential meetings.",
                        "As an experienced AV and ELV system integrator in the UAE, ELV Technology Solutions ensures seamless integration with leading platforms such as Microsoft Teams and Zoom, along with clean cabling, professional installation, and scalable system design for future expansion.",
                    "For businesses seeking dependable meeting room and boardroom AV installation in the UAE, ELV Technology Solutions delivers practical, future-ready solutions engineered for long-term performance—supporting collaboration, decision-making, and leadership environments."
                    ],
                    keyFeatures: {
                        points: [
                            "HD Video Conferencing Setup",
                            "Wireless Content Sharing",
                            "Integrated Audio & Speaker Systems"
                        ]
                    }
                }
            },
            {
                title: "Digital Signage",
                id: "digital-signage",
                icon: Monitor,
                image: "/images/solutions/audio-visual/Digital Signage1.png",
                image2: "/images/solutions/audio-visual/Digital Signage.jpg",
                content: {
                    heading: "Digital Signage in UAE",
                    description: [
                        "ELV Technology Solutions provides professional digital signage solutions in Abu Dhabi, Dubai, and across the UAE, helping businesses communicate effectively through dynamic visual content.",
                        "We deliver complete digital signage system design, installation, and integration, including commercial displays, LED screens, media players, content management systems, and centralized control. Our digital signage solutions are tailored for retail stores, corporate offices, hotels, malls, hospitals, educational institutions, and public spaces.",
                        "From single display units to large-scale digital signage networks, ELV Technology Solutions ensures reliable performance, high visibility, and easy content updates. Our digital signage installations in Abu Dhabi and Dubai support real-time information, advertising, promotions, wayfinding, and corporate messaging.",
                        "As a trusted AV and ELV system integrator in the UAE, we focus on system stability, clean installation, and long-term usability. All digital signage systems are designed for continuous operation, remote management, and future expansion.",
                    "For businesses seeking dependable digital signage installation in the UAE, ELV Technology Solutions delivers scalable solutions that combine visual impact with operational efficiency."
                    ],
                    keyFeatures: {
                        points: [
                            "Dynamic Content Management",
                            "Centralized Advertising Display",
                            "Remote Monitoring & Updates"
                        ]
                    }
                }
            },
            {
                title: "LED Screen",
                id: "led-screen",
                icon: MonitorPlay,
                image: "/images/solutions/audio-visual/LED Screen1.png",
                image2: "/images/solutions/audio-visual/LED Screen.jpg",
                content: {
                    heading: "LED Screen in UAE",
                    description: [
                        "ELV Technology Solutions provides professional LED screen solutions in Abu Dhabi, Dubai, and across the UAE, delivering high-impact visual displays for indoor and outdoor applications.",
                        "We offer complete LED screen design, supply, installation, and commissioning, including indoor LED screens, outdoor LED displays, video walls, and large-format digital screens. Each system is engineered based on viewing distance, brightness requirements, resolution, and environmental conditions.",
                        "From corporate offices and control rooms to retail spaces, malls, events, and public areas, ELV Technology Solutions delivers reliable LED screen installation in Abu Dhabi and Dubai using fine pixel-pitch panels, professional calibration, and robust mounting systems.",
                        "As an experienced AV and ELV system integrator in the UAE, we ensure seamless integration with digital signage platforms, media servers, conferencing systems, and centralized control. Our LED screen solutions are designed for continuous operation, easy maintenance, and long-term performance.",
                        "For businesses seeking dependable LED screen installation in the UAE, ELV Technology Solutions delivers scalable display solutions built on technical accuracy, not marketing claims."
                    ]
                }
            },
            {
                title: "Control Systems",
                id: "control-systems",
                icon: Server,
                image: "/images/solutions/audio-visual/Control Systems1.png",
                image2: "/images/solutions/audio-visual/Control Systems.jpg",
                content: {
                    heading: "Control Systems in UAE",
                    description: [
                        "We design and implement AV control systems that allow users to operate displays, LED screens, audio systems, video conferencing, lighting, and room functions from a single interface. Our solutions include touch panels, wall-mounted controllers, mobile device control, and automation platforms customized to each environment.",
                        "From meeting rooms and boardrooms to classrooms, auditoriums, and control rooms, ELV Technology Solutions delivers intuitive control system installations in Abu Dhabi and Dubai that reduce complexity and user error. Every interface is designed for speed, clarity, and consistent performance.",
                        "As an experienced AV and ELV system integrator in the UAE, we integrate control systems using industry-proven platforms, ensuring system stability, security, and scalability. Our control solutions support integration with building management systems (BMS) and future technology upgrades.",
                        "For organizations seeking dependable AV control system installation in the UAE, ELV Technology Solutions delivers solutions focused on usability, reliability, and long-term operational efficiency."
                    ]
                }
            }
        ]
    },
    networkAndCommunications: {
        title: "Network & Communications",
        id: "network-communications",
        description: "ELV Technology Solutions provides professional networking services in Abu Dhabi and across the UAE, specializing in structured cabling, wired networks, and enterprise-grade wireless (Wi-Fi) solutions.",
        image: "/images/solutions/network-communications/hero.png",
        image2: "/images/solutions/network-communications/hero.png",
        intro: [
            "We design and implement standards-compliant network infrastructures using proven technologies from Cisco, Aruba Networks, and Ruckus, ensuring secure connectivity, high performance, and long-term scalability. Our solutions are tailored for corporate offices, commercial buildings, healthcare facilities, and educational institutions, delivering reliable network systems built for continuous operation.",
            "A network is a structured system of interconnected devices that communicate through wired or wireless paths to securely transmit data, voice, and video across an organization. Modern enterprise networks support sub-networks, remote access, centralized monitoring, and policy-based security, allowing IT teams to manage users and applications efficiently.",
            "ELV Technology Solutions engineers networks based on proper architecture design, traffic management, redundancy, and security best practices. By deploying Cisco switching and routing, Aruba enterprise Wi-Fi, and Ruckus high-density wireless solutions, we ensure consistent performance even in high-user environments such as offices, campuses, hospitals, and public spaces.",
            "Network performance and reliability depend on hardware selection, RF design, security configuration, cabling quality, and compliance with international networking standards. Our team follows disciplined design, implementation, testing, and documentation processes to deliver networks that are stable, secure, and ready for future expansion."
        ],
        items: [
            {
                title: "Structured Cabling Solutions",
                id: "structured-cabling",
                icon: Network,
                image: "/images/solutions/network-communications/Structured Cabling Solutions.png",
                image2: "/images/solutions/network-communications/Structured Cabling Solutions1.jpeg",
                content: {
                    heading: "Structured Cabling Solutions in UAE",
                    description: [
                        "ELV Technology Solutions provides comprehensive structured cabling solutions in Abu Dhabi and across the UAE, delivering high-performance copper and fibre cabling systems for commercial buildings, offices, and data centre environments.",
                        "We offer end-to-end structured cabling services, from design and implementation to testing and commissioning, ensuring reliable and standards-compliant network infrastructure."
                    ],
                    subsections: [
                        {
                            title: "Our Structured Cabling Services Include",
                            subitems: [
                                {
                                    title: "Copper & Data Cabling",
                                    points: ["Cat 6, Cat 6A, Cat 5e cabling and accessories", "Voice and data cabling installations (fire-code compliant)", "Single-mode and multimode data cabling", "Patch panel installation and termination", "RJ45 jack installation (surface, flush, and modular)"]
                                },
                                {
                                    title: "Fiber Optic Solutions",
                                    points: ["Fiber optic backbone cabling (indoor & outdoor)", "Splicing of all types of fibre optic cables", "Fiber optic termination and testing", "Data centre fibre connectivity solutions"]
                                },
                                {
                                    title: "Data Centre & Telecom Rooms",
                                    points: ["Complete data centre cabling and build-out", "MDF / IDF communication room installation", "Equipment racks, cabinets, ladder racks, and cable managers", "Network switch installation and equipment racking", "Cable management and wire organization"]
                                },
                                {
                                    title: "Installation, Testing & Maintenance",
                                    points: ["Testing, labelling, documentation, and commissioning", "Cable tracing, re-labelling, and remediation", "Re-termination of existing cabling systems", "Cabling repairs and troubleshooting", "Add / Change / Move (MAC) services", "Maintenance of existing structured cabling systems"]
                                }
                            ]
                        },
                        {
                            title: "Why ELV Technology Solutions",
                            description: "We have successfully implemented structured cabling systems for data centres, corporate offices, and commercial buildings across the UAE. All installations are carried out by trained technicians following international standards and best practices. Our commissioning process ensures reliability, performance, and long-term stability. ELV Technology Solutions also delivers Fiber and copper cabling solutions for industrial, outdoor, and specialized environments, including high-density and intelligent managed cabling systems. For organizations seeking dependable structured cabling installation in the UAE, ELV Technology Solutions delivers infrastructure built for performance, scalability, and compliance."
                        }
                    ]
                }
            },
            {
                title: "Wireless Network Solutions",
                id: "wireless-network",
                icon: Wifi,
                image: "/images/solutions/network-communications/Wireless Network Solutions.jpg",
                image2: "/images/solutions/network-communications/Wireless Network Solutions1.png",
                content: {
                    heading: "Wireless Network Solutions in UAE",
                    description: [
                        "A reliable wireless network is critical to business operations, user experience, and application performance. Poor Wi-Fi design leads to dropped connections, slow speeds, and security risks.",
                        "ELV Technology Solutions delivers professional wireless network solutions in Abu Dhabi and across the UAE, ensuring stable, secure, and high-performance Wi-Fi environments for business-critical applications."
                    ],
                    subsections: [
                        {
                            title: "Enterprise-Grade Wi-Fi Solutions",
                            description: "We specialize in the design, installation, configuration, and management of wireless networks that support high user density, mobility, and secure connectivity. Our wireless solutions are built using industry-proven infrastructure to ensure uninterrupted performance.",
                            subPointsTitle: "All Wi-Fi systems are designed based on:",
                            points: [
                                "Site surveys and RF planning",
                                "Coverage, capacity, and interference analysis",
                                "Secure authentication and access control",
                                "Scalable architecture for future growth"
                            ]
                        },
                        {
                            title: "Wireless Network Applications We Support",
                            description: "ELV Technology Solutions delivers wireless network solutions for:",
                            points: [
                                "Hotels and hospitality environments",
                                "Commercial buildings and corporate offices",
                                "Restaurants, cafés, and retail spaces",
                                "Residential buildings and compounds",
                                "Staff and back-of-house operations",
                                "Event and attendee Wi-Fi",
                                "Brand activation and customer engagement",
                                "Custom business applications",
                                "IP-based control systems for audio, video, lighting, and automation"
                            ]
                        }
                    ]
                }
            },
            {
                title: "Audio Video Intercom",
                id: "intercom",
                icon: Mic2,
                image: "/images/solutions/network-communications/Audio Video Intercom.jpg",
                image2: "/images/solutions/network-communications/Audio Video Intercom1.png",
                content: {
                    heading: "Audio Video Intercom in UAE",
                    description: [
                        "An audio and video intercom system allows occupants to identify visitors, communicate clearly, and control access before granting entry. It is a critical security and convenience solution for residential, commercial, and mixed-use buildings.",
                        "ELV Technology Solutions provides professional audio and video intercom systems in Abu Dhabi and across the UAE, delivering reliable communication and secure access control for a wide range of properties."
                    ],
                    subsections: [
                        {
                            title: "Integrated Intercom Solutions",
                            description: "We design and install audio intercom, video intercom, and IP-based intercom systems with features such as:",
                            points: [
                                "Indoor and outdoor intercom stations",
                                "Video monitoring and two-way communication",
                                "Door lock and access control integration",
                                "Mobile phone and indoor monitor connectivity",
                                "Security and visitor management features"
                            ],
                            closing: "Our solutions are suitable for villas, apartments, office buildings, towers, townhouses, and gated communities."
                        }
                    ]
                }
            },
            {
                title: "Two Way Radio Solutions",
                id: "radio",
                icon: Radio,
                image: "/images/solutions/network-communications/Two Way Radio Solutions.jpg",
                image2: "/images/solutions/network-communications/Two Way Radio Solutions1.png",
                content: {
                    heading: "Two Way Radio Solutions in UAE",
                    description: [
                        "Two-way radio systems provide instant, reliable communication for organizations that require clear coordination across teams, sites, and operations. Unlike mobile networks, two-way radios ensure uninterrupted communication without dependence on public networks.",
                        "ELV Technology Solutions delivers professional two-way radio solutions in Abu Dhabi and across the UAE, supporting mission-critical communication for industrial, commercial, and operational environments."
                    ],
                    subsections: [
                        {
                            title: "Reliable Communication for Daily Operations",
                            description: "Many industries rely on two-way radios to manage daily operations, coordinate staff, and maintain safety. Our solutions enable real-time communication for supervisors, security personnel, maintenance teams, and field staff.",
                            subPointsTitle: "We supply and configure:",
                            points: [
                                "Handheld and mobile two-way radios",
                                "On-site and wide-area radio communication systems",
                                "Licensed and license-free radio solutions",
                                "Customized communication coverage based on site condition"
                            ]
                        }
                    ]
                }
            },
            {
                title: "IP Phones",
                id: "ip-phones",
                icon: Phone,
                image: "/images/solutions/network-communications/IP Phones.jpg",
                image2: "/images/solutions/network-communications/IP Phones1.png",
                content: {
                    heading: "IP Phone Systems in UAE",
                    description: [
                        "Reliable voice communication is essential for hotels, offices, commercial buildings, and multi-site organizations. Modern IP phone systems deliver high-quality voice, advanced call features, and seamless integration with IT networks — far beyond the limitations of traditional analogue telephony.",
                        "ELV Technology Solutions provides professional IP phone system installation in Abu Dhabi, Dubai, and across the UAE, delivering scalable, secure, and feature-rich communication platforms for hospitality, corporate, and residential environments."
                    ],
                    subsections: [
                        {
                            title: "What an IP Phone System Delivers",
                            description: "IP phone systems use your data network to transmit voice calls, allowing:",
                            points: [
                                "High-definition voice quality",
                                "Centralized call management",
                                "Reduced cabling and infrastructure requirements",
                                "Easy expansion and multi-branch connectivity",
                                "Integration with Wi-Fi phones, Softphones, and mobile devices"
                            ],
                            closing: "We design systems that operate reliably across LAN, WAN, and cloud environments."
                        },
                        {
                            title: "Brands & Technologies We Work With",
                            description: "We integrate IP phone systems from reputable vendors to ensure stability and long-term support:",
                            points: [
                                "Cisco – Enterprise IP phones, call control, VoIP, collaboration",
                                "Avaya – IP PBX systems, desk phones, hospitality telephony",
                                "Panasonic – IP phones and hybrid IP-PBX systems",
                                "NEC – Enterprise IP telephony and unified communications",
                                "HP (Poly / Polycom) – IP desk phones and conference phones",
                                "Linksys – SIP-based IP phones (traditionally SMB-focused)"
                            ]
                        }
                    ]
                }
            },
            {
                title: "IPTV / SMATV",
                id: "iptv-smatv",
                icon: Monitor,
                image: "/images/solutions/network-communications/IPTV  SMATV.jpg",
                image2: "/images/solutions/network-communications/IPTV  SMATV1.png",
                content: {
                    heading: "IPTV & SMATV Solutions in UAE",
                    description: [
                        "ELV Technology Solutions provides professional IPTV and SMATV solutions in Abu Dhabi and across the UAE, delivering centralized television and content distribution systems for hotels, residential developments, campuses, and commercial buildings.",
                        "Our IPTV and SMATV systems are designed to distribute international satellite channels, local broadcasts, and customized content through a unified, high-quality network infrastructure using IF, RF, and IP technologies."
                    ],
                    subsections: [
                        {
                            title: "What is SMATV?",
                            description: "SMATV (Satellite Master Antenna Television) combines multiple satellite and terrestrial TV signals into a single integrated cable feed for distribution throughout a building. This approach eliminates the need for individual satellite dishes, simplifies maintenance, and ensures consistent signal quality across all rooms and common areas.",
                            subPointsTitle: "SMATV systems are ideal for:",
                            points: ["Hotels and resorts", "Residential towers and compounds", "Campuses and educational institutions", "Corporate and commercial buildings"]
                        },
                        {
                            title: "Hotel IPTV & Hospitality TV Solutions",
                            description: "ELV Technology Solutions specializes in hotel IPTV and SMATV systems designed to enhance the guest experience while providing centralized control for hotel operations.",
                            subPointsTitle: "Our hotel TV solutions support:",
                            points: [
                                "Live TV, local channels, and international satellite programming",
                                "Branded welcome screens and guest information",
                                "Video on Demand (VOD)",
                                "Integration with PMS and hotel billing systems",
                                "In-room services, advertising, and promotions",
                                "Centralized monitoring and content management"
                            ]
                        },
                        {
                            title: "IF & RF TV Distribution Systems",
                            description: "We install satellite dishes and TV antennas to receive programming from selected satellite providers and local broadcasters. These signals are processed through professional IF/RF headend equipment, which tunes and combines channels into a single, stable cable feed.",
                            subPointsTitle: "Our systems can also include custom internal channels, such as:",
                            points: ["Hotel information and promotional channels", "Campus or building TV stations", "Event broadcasting and announcement screens"]
                        },
                        {
                            title: "Our IPTV & SMATV Services",
                            points: [
                                "IPTV & SMATV system integration",
                                "IPTV system design in Abu Dhabi & UAE",
                                "Deployment of IF, RF, IP, and hybrid TV systems",
                                "Satellite dish and antenna installation",
                                "Headend configuration and commissioning",
                                "Testing, documentation, and system handover"
                            ]
                        }
                    ]
                }
            },
            {
                title: "IT Equipment",
                id: "it-equipment",
                icon: Cpu,
                image: "/images/solutions/network-communications/IT Equipment.jpg",
                image2: "/images/solutions/network-communications/IT Equipment1.png",
                content: {
                    heading: "IT Equipment Supply & Installation in UAE",
                    description: [
                        "ELV Technology Solutions provides reliable IT equipment supply and installation services in the UAE, supporting businesses across Abu Dhabi, Dubai, and all Emirates with high-quality technology solutions for modern workplaces.",
                        "We supply and deploy a wide range of IT equipment for offices, meeting rooms, and enterprise environments, including desktops, laptops, servers, networking devices, racks, UPS systems, printers, monitors, and essential peripherals. All IT equipment solutions are selected to ensure performance, compatibility, and long-term reliability.",
                        "Our IT equipment installation services in Abu Dhabi and Dubai are designed to support smooth operations, secure connectivity, and scalable infrastructure. From small offices to corporate environments, we ensure proper configuration, structured cabling integration, and compliance with industry best practices.",
                        "As a trusted IT and ELV solutions provider in the UAE, ELV Technology Solutions delivers end-to-end support—from equipment selection and supply to installation, testing, and handover. We work closely with businesses to provide cost-effective, future-ready IT infrastructure that supports daily operations and business growth.",
                        "For organizations seeking dependable IT equipment suppliers in the UAE, ELV Technology Solutions delivers practical solutions built for performance, stability, and long-term use."
                    ]
                }
            }
        ]
    },
    homeAutomation: {
        title: "Home Automation & Lighting Control System",
        id: "home-automation",
        description: "ELV Technology Solutions provides advanced home automation and lighting control systems in Abu Dhabi, Dubai, and across the UAE, delivering smart, energy-efficient, and user-friendly solutions.",
        image: "/images/solutions/home-automation/hero.png",
        image2: "/images/solutions/home-automation/hero1.png",
        items: [
            {
                title: "Home Automation",
                id: "automation",
                icon: Home,
                image: "/images/solutions/home-automation/Home Automation.jpg",
                image2: "/images/solutions/home-automation/Home Automation1.png",
                content: {
                    heading: "Home Automation & Lighting Control Systems in UAE",
                    description: [
                        "ELV Technology Solutions provides advanced home automation and lighting control systems in Abu Dhabi, Dubai, and across the UAE, delivering smart, energy-efficient, and user-friendly solutions for villas, apartments, and residential developments. Our systems enhance comfort, convenience, and security while giving homeowners complete control over their living spaces."
                    ],
                    subsections: [
                        {
                            title: "Smart Home Automation Solutions",
                            description: "We design and install fully integrated smart home systems that allow you to control and automate essential functions through mobile apps, touch panels, voice assistants, and centralized control platforms.",
                            subPointsTitle: "Our home automation solutions include:",
                            points: [
                                "Smart lighting and dimming control",
                                "Home entertainment and multi-room audio",
                                "Security system and CCTV integration",
                                "Smart door locks and access control",
                                "Energy monitoring and automation scenes"
                            ],
                            closing: "Each system is customized to your lifestyle, interior design, and technology preferences."
                        }
                    ]
                }
            },
            {
                title: "Lighting Control Systems",
                id: "lighting-control",
                icon: Lamp,
                image: "/images/solutions/home-automation/Lighting Control Systems.jpg",
                image2: "/images/solutions/home-automation/hero1.png",
                content: {
                    heading: "Lighting Control Systems for Modern Homes",
                    description: [
                        "We provide lighting control systems in Abu Dhabi and Dubai that offer aesthetic flexibility and energy efficiency. Automated lighting creates the perfect ambience for any room while reducing energy consumption."
                    ],
                    subsections: [
                        {
                            title: "Our lighting control solutions support:",
                            points: [
                                "Dimming and lighting scene creation",
                                "Motion-based and scheduled lighting",
                                "Daylight sensing",
                                "Architectural and decorative lighting control",
                                "Mobile, tablet, and voice-activated control"
                            ]
                        },
                        {
                            title: "Why Choose ELV Technology Solutions?",
                            points: [
                                "Tailored home automation solutions for villas & luxury residences",
                                "Professional installation and system programming",
                                "Scalable smart home platforms for future upgrades",
                                "Reliable after-sales service and maintenance"
                            ],
                            closing: "For homeowners seeking home automation in Abu Dhabi, smart lighting systems in Dubai, or complete home automation solutions in the UAE, ELV Technology Solutions delivers modern living made simple."
                        }
                    ]
                }
            }
        ]
    }
};

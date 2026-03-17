/**
 * WikiChain Puzzle Data
 *
 * Each puzzle is a graph of articles. Every article has:
 * - blurb: short description shown to the player
 * - links: object where keys are article names, values are true (real) or false (trap/dead-end)
 *
 * Real links connect to other articles in the graph.
 * Trap links (false) trigger a dead-end animation and +1 click penalty.
 */

const puzzles = [
  {
    id: 1,
    start: "Pizza",
    target: "Moon Landing",
    par: 4,
    articles: {
      "Pizza": {
        blurb: "A savory dish of Italian origin, consisting of a flat round base of dough topped with tomatoes, cheese, and various toppings, baked at high temperature.",
        links: {
          "Italy": true,
          "Tomato": false,
          "Fast Food": false,
          "Cheese": false,
          "Naples": false,
          "Bread": false,
        },
      },
      "Italy": {
        blurb: "A country in southern Europe known for its rich history in art, architecture, and science. Italy's space agency ASI has been a key partner in international space programs.",
        links: {
          "Rome": false,
          "Renaissance": false,
          "Space Exploration": true,
          "European Union": false,
          "Mediterranean Sea": false,
          "Galileo Galilei": true,
        },
      },
      "Galileo Galilei": {
        blurb: "An Italian astronomer and physicist, often called the father of modern observational astronomy. His telescope observations revolutionized our understanding of the cosmos.",
        links: {
          "Telescope": true,
          "Catholic Church": false,
          "Physics": false,
          "Jupiter": false,
          "Mathematics": false,
          "Pisa": false,
        },
      },
      "Telescope": {
        blurb: "An optical instrument designed to make distant objects appear closer. Telescopes have been crucial in space observation, from Galileo's first observations to the Hubble Space Telescope used by NASA.",
        links: {
          "NASA": true,
          "Hubble": false,
          "Light": false,
          "Observatory": false,
          "Stars": false,
          "Lens": false,
        },
      },
      "Space Exploration": {
        blurb: "The use of astronomy and space technology to explore outer space. The Space Race between the US and USSR culminated in humanity's greatest achievement in 1969.",
        links: {
          "NASA": true,
          "International Space Station": false,
          "Rocket": false,
          "Mars Rover": false,
          "Satellite": false,
          "Cosmonaut": false,
        },
      },
      "NASA": {
        blurb: "The National Aeronautics and Space Administration, America's space agency. NASA led the Apollo program that achieved the first crewed lunar landing.",
        links: {
          "Moon Landing": true,
          "Space Shuttle": false,
          "Kennedy Space Center": false,
          "Astronaut": false,
          "Mars": false,
          "Voyager": false,
        },
      },
      "Moon Landing": {
        blurb: "On July 20, 1969, Apollo 11 astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, watched by an estimated 600 million people worldwide.",
        links: {},
      },
    },
  },
  {
    id: 2,
    start: "Soccer",
    target: "Shakespeare",
    par: 4,
    articles: {
      "Soccer": {
        blurb: "The world's most popular sport, known as football outside North America. The modern game was codified in England in 1863 with the formation of the Football Association.",
        links: {
          "England": true,
          "FIFA": false,
          "World Cup": false,
          "Goal": false,
          "Stadium": false,
          "Brazil": false,
        },
      },
      "England": {
        blurb: "A country in the United Kingdom with a deep cultural heritage spanning centuries. Known for its contributions to literature, sport, and the performing arts.",
        links: {
          "London": true,
          "British Empire": false,
          "Queen Elizabeth": false,
          "Industrial Revolution": false,
          "Tea": false,
          "Elizabethan Era": true,
        },
      },
      "London": {
        blurb: "The capital of England, a global center of arts, finance, and culture. Home to iconic theaters including the reconstructed Globe Theatre on the South Bank of the Thames.",
        links: {
          "Globe Theatre": true,
          "Big Ben": false,
          "Thames River": false,
          "Buckingham Palace": false,
          "Tower of London": false,
          "Underground": false,
        },
      },
      "Elizabethan Era": {
        blurb: "The period of English history during the reign of Queen Elizabeth I (1558–1603), often considered a golden age of English culture, exploration, and dramatic arts.",
        links: {
          "Globe Theatre": true,
          "Sir Francis Drake": false,
          "Tudor Dynasty": false,
          "Spanish Armada": false,
          "Colonialism": false,
          "Poetry": false,
        },
      },
      "Globe Theatre": {
        blurb: "A theatre in London associated with William Shakespeare. Many of his greatest plays were first performed here, including Hamlet, Othello, and King Lear.",
        links: {
          "Shakespeare": true,
          "Theater": false,
          "Acting": false,
          "Playwriting": false,
          "Audience": false,
          "Stage": false,
        },
      },
      "Shakespeare": {
        blurb: "William Shakespeare (1564–1616) was an English playwright and poet, widely regarded as the greatest writer in the English language. Author of 37 plays and 154 sonnets.",
        links: {},
      },
    },
  },
  {
    id: 3,
    start: "Dinosaurs",
    target: "Smartphone",
    par: 5,
    articles: {
      "Dinosaurs": {
        blurb: "A group of reptiles that dominated Earth for over 160 million years. Their extinction approximately 66 million years ago was caused by a massive asteroid impact.",
        links: {
          "Fossil": true,
          "Tyrannosaurus Rex": false,
          "Jurassic Period": false,
          "Asteroid": false,
          "Reptile": false,
          "Evolution": false,
        },
      },
      "Fossil": {
        blurb: "Preserved remains of ancient organisms found in sedimentary rock. The study of fossils, paleontology, relies heavily on geological dating methods and modern scientific instruments.",
        links: {
          "Geology": false,
          "Museum": false,
          "Science": true,
          "Amber": false,
          "Carbon Dating": false,
          "Sedimentary Rock": false,
        },
      },
      "Science": {
        blurb: "The systematic study of the natural world through observation and experiment. Scientific advancement has driven every major technological revolution in human history.",
        links: {
          "Electricity": true,
          "Physics": false,
          "Scientific Method": false,
          "Chemistry": false,
          "Biology": false,
          "Mathematics": false,
        },
      },
      "Electricity": {
        blurb: "A form of energy resulting from charged particles. The harnessing of electricity in the 19th century led to transformative inventions including the telegraph, light bulb, and eventually the transistor.",
        links: {
          "Transistor": true,
          "Lightning": false,
          "Power Grid": false,
          "Thomas Edison": false,
          "Battery": false,
          "Copper Wire": false,
        },
      },
      "Transistor": {
        blurb: "A semiconductor device that amplifies or switches electronic signals. Invented in 1947 at Bell Labs, the transistor is the fundamental building block of all modern electronic devices.",
        links: {
          "Smartphone": true,
          "Silicon": false,
          "Computer Chip": false,
          "Bell Labs": false,
          "Semiconductor": false,
          "Circuit Board": false,
        },
      },
      "Smartphone": {
        blurb: "A handheld personal computer with a touchscreen interface, combining a mobile phone with computing capabilities. Over 6 billion people worldwide now use smartphones.",
        links: {},
      },
    },
  },
  {
    id: 4,
    start: "Chocolate",
    target: "Mount Everest",
    par: 4,
    articles: {
      "Chocolate": {
        blurb: "A food made from roasted cacao beans, originally cultivated by the ancient Aztec and Maya civilizations of Mesoamerica, who considered it a divine gift.",
        links: {
          "Mesoamerica": true,
          "Cacao": false,
          "Sugar": false,
          "Switzerland": false,
          "Dessert": false,
          "Candy": false,
        },
      },
      "Mesoamerica": {
        blurb: "A historical region stretching from central Mexico to Central America, home to advanced civilizations. These cultures developed sophisticated knowledge of astronomy, mathematics, and geography.",
        links: {
          "Geography": true,
          "Aztec Empire": false,
          "Maya Civilization": false,
          "Pyramid": false,
          "Corn": false,
          "Calendar": false,
        },
      },
      "Geography": {
        blurb: "The study of Earth's landscapes, environments, and the relationships between people and their environments. Physical geography examines natural features including the world's great mountain ranges.",
        links: {
          "Himalayas": true,
          "Continent": false,
          "Climate": false,
          "Ocean": false,
          "Map": false,
          "River": false,
        },
      },
      "Himalayas": {
        blurb: "The highest mountain range in the world, stretching across five countries in Asia. It contains all 14 peaks exceeding 8,000 meters, including the tallest mountain on Earth.",
        links: {
          "Mount Everest": true,
          "Nepal": false,
          "Tibet": false,
          "Glacier": false,
          "K2": false,
          "Tectonic Plates": false,
        },
      },
      "Mount Everest": {
        blurb: "At 8,849 meters, the highest point on Earth. First summited by Edmund Hillary and Tenzing Norgay in 1953. Located on the border of Nepal and Tibet.",
        links: {},
      },
    },
  },
  {
    id: 5,
    start: "Jazz",
    target: "Internet",
    par: 4,
    articles: {
      "Jazz": {
        blurb: "A music genre that originated in the African American communities of New Orleans in the late 19th century. Jazz is characterized by improvisation, syncopation, and swing.",
        links: {
          "New Orleans": false,
          "Music": true,
          "Saxophone": false,
          "Blues": false,
          "Louis Armstrong": false,
          "Improvisation": false,
        },
      },
      "Music": {
        blurb: "An art form combining vocal or instrumental sounds for expression. The music industry has been repeatedly transformed by technology, from vinyl records to radio to digital formats.",
        links: {
          "Radio": true,
          "Piano": false,
          "Orchestra": false,
          "Rhythm": false,
          "Concert": false,
          "Vinyl Record": false,
        },
      },
      "Radio": {
        blurb: "Technology for transmitting signals using electromagnetic waves. First demonstrated in the 1890s, radio revolutionized communication and became the foundation for modern telecommunications.",
        links: {
          "Telecommunications": true,
          "FM Frequency": false,
          "Antenna": false,
          "Broadcast": false,
          "Guglielmo Marconi": false,
          "Podcast": false,
        },
      },
      "Telecommunications": {
        blurb: "The transmission of information over distances using electronic means. From telegraph to telephone to fiber optics, each advance built toward the global network that connects billions of devices.",
        links: {
          "Internet": true,
          "Telephone": false,
          "Fiber Optics": false,
          "Satellite": false,
          "5G": false,
          "Telegraph": false,
        },
      },
      "Internet": {
        blurb: "A global network of interconnected computers. Originally developed as ARPANET by the US Department of Defense in the 1960s, it now connects over 5 billion users worldwide.",
        links: {},
      },
    },
  },
  {
    id: 6,
    start: "Penguin",
    target: "Hollywood",
    par: 4,
    articles: {
      "Penguin": {
        blurb: "Flightless seabirds found almost exclusively in the Southern Hemisphere. Penguins are highly adapted to aquatic life and have been featured prominently in popular documentaries.",
        links: {
          "Documentary": true,
          "Antarctica": false,
          "Bird": false,
          "Ocean": false,
          "Ice": false,
          "Emperor Penguin": false,
        },
      },
      "Documentary": {
        blurb: "A non-fiction film genre that documents reality for educational or historical purposes. Nature documentaries like March of the Penguins and Planet Earth became box-office and streaming hits.",
        links: {
          "Film Industry": true,
          "Camera": false,
          "Television": false,
          "Journalism": false,
          "David Attenborough": false,
          "Netflix": false,
        },
      },
      "Film Industry": {
        blurb: "The global commercial sector of filmmaking, from production to distribution. The American film industry, centered in Southern California, has dominated global cinema since the early 1900s.",
        links: {
          "Hollywood": true,
          "Box Office": false,
          "Director": false,
          "Animation": false,
          "Oscars": false,
          "Screenplay": false,
        },
      },
      "Hollywood": {
        blurb: "A neighborhood in Los Angeles, California, synonymous with the American entertainment industry. Home to major film studios, the Hollywood Sign, and the Walk of Fame.",
        links: {},
      },
    },
  },
  {
    id: 7,
    start: "Coffee",
    target: "Mars",
    par: 4,
    articles: {
      "Coffee": {
        blurb: "A brewed drink prepared from roasted coffee beans, originally discovered in Ethiopia. Coffee contains caffeine, a natural stimulant that has been studied extensively by scientists.",
        links: {
          "Ethiopia": false,
          "Caffeine": false,
          "Scientific Research": true,
          "Bean": false,
          "Espresso": false,
          "Morning Routine": false,
        },
      },
      "Scientific Research": {
        blurb: "The systematic investigation of phenomena to establish facts and reach new conclusions. Government-funded research institutions like NASA conduct research spanning from biology to planetary science.",
        links: {
          "NASA": true,
          "Laboratory": false,
          "University": false,
          "Hypothesis": false,
          "Peer Review": false,
          "Grant Funding": false,
        },
      },
      "NASA": {
        blurb: "America's space agency, responsible for the civilian space program and aerospace research. NASA's Mars exploration program has sent multiple rovers and orbiters to study the Red Planet.",
        links: {
          "Mars": true,
          "Astronaut": false,
          "Space Shuttle": false,
          "Satellite": false,
          "Kennedy Space Center": false,
          "Apollo Program": false,
        },
      },
      "Mars": {
        blurb: "The fourth planet from the Sun, often called the Red Planet due to iron oxide on its surface. NASA's Perseverance rover is currently exploring Jezero Crater searching for signs of ancient life.",
        links: {},
      },
    },
  },
  {
    id: 8,
    start: "Samurai",
    target: "Bitcoin",
    par: 5,
    articles: {
      "Samurai": {
        blurb: "The warrior nobility of medieval and early-modern Japan. Samurai followed bushido, a strict code of honor, and were central to Japanese feudal society until the Meiji Restoration modernized the country.",
        links: {
          "Japan": true,
          "Katana": false,
          "Bushido": false,
          "Shogun": false,
          "Feudalism": false,
          "Martial Arts": false,
        },
      },
      "Japan": {
        blurb: "An island nation in East Asia known for blending ancient traditions with cutting-edge technology. Post-WWII Japan became a global leader in electronics, automotive, and computing innovation.",
        links: {
          "Technology": true,
          "Tokyo": false,
          "Sushi": false,
          "Anime": false,
          "Mount Fuji": false,
          "Emperor": false,
        },
      },
      "Technology": {
        blurb: "The application of scientific knowledge for practical purposes. The digital revolution of the late 20th century gave rise to personal computers, the internet, and entirely new forms of currency.",
        links: {
          "Cryptography": true,
          "Computer": false,
          "Innovation": false,
          "Artificial Intelligence": false,
          "Robot": false,
          "Silicon Valley": false,
        },
      },
      "Cryptography": {
        blurb: "The practice of secure communication using codes and ciphers. Modern cryptography underpins internet security, digital signatures, and decentralized digital currencies.",
        links: {
          "Blockchain": true,
          "Encryption": false,
          "Alan Turing": false,
          "Password": false,
          "Cipher": false,
          "RSA Algorithm": false,
        },
      },
      "Blockchain": {
        blurb: "A distributed digital ledger that records transactions across many computers. First conceptualized in 2008 by the pseudonymous Satoshi Nakamoto as the technology underlying a new digital currency.",
        links: {
          "Bitcoin": true,
          "Ethereum": false,
          "Decentralization": false,
          "Mining": false,
          "Smart Contract": false,
          "Ledger": false,
        },
      },
      "Bitcoin": {
        blurb: "The first decentralized cryptocurrency, created in 2009. Bitcoin enables peer-to-peer transactions without intermediaries, using blockchain technology to maintain a public ledger of all transactions.",
        links: {},
      },
    },
  },
  {
    id: 9,
    start: "Honey Bee",
    target: "Eiffel Tower",
    par: 4,
    articles: {
      "Honey Bee": {
        blurb: "A flying insect known for pollination and honey production. Bees are vital to agriculture, pollinating roughly one-third of the food crops humans consume worldwide.",
        links: {
          "Agriculture": true,
          "Honey": false,
          "Pollination": false,
          "Hive": false,
          "Queen Bee": false,
          "Beekeeper": false,
        },
      },
      "Agriculture": {
        blurb: "The practice of cultivating plants and raising animals for food. France has been Europe's largest agricultural producer for centuries, with its diverse climate and fertile plains.",
        links: {
          "France": true,
          "Farming": false,
          "Wheat": false,
          "Irrigation": false,
          "Tractor": false,
          "Soil": false,
        },
      },
      "France": {
        blurb: "A country in Western Europe known for its cuisine, wine, fashion, and iconic landmarks. France is the world's most visited country, attracting over 90 million tourists annually to see its architectural marvels.",
        links: {
          "Paris": true,
          "Wine": false,
          "French Revolution": false,
          "Napoleon": false,
          "Louvre": false,
          "Baguette": false,
        },
      },
      "Paris": {
        blurb: "The capital of France, known as the City of Light. Paris is home to world-famous landmarks including Notre-Dame, the Arc de Triomphe, and its most iconic iron lattice structure built for the 1889 World's Fair.",
        links: {
          "Eiffel Tower": true,
          "Seine River": false,
          "Croissant": false,
          "Metro": false,
          "Champs-Élysées": false,
          "Montmartre": false,
        },
      },
      "Eiffel Tower": {
        blurb: "A wrought-iron lattice tower built in 1889 by Gustave Eiffel for the World's Fair. At 330 meters tall, it is the most visited paid monument in the world, attracting nearly 7 million visitors annually.",
        links: {},
      },
    },
  },
  {
    id: 10,
    start: "Volcano",
    target: "DNA",
    par: 4,
    articles: {
      "Volcano": {
        blurb: "A rupture in Earth's crust that allows hot lava, volcanic ash, and gases to escape. Volcanic activity has shaped Earth's surface and atmosphere over billions of years.",
        links: {
          "Earth": true,
          "Lava": false,
          "Pompeii": false,
          "Ring of Fire": false,
          "Magma": false,
          "Eruption": false,
        },
      },
      "Earth": {
        blurb: "The third planet from the Sun and the only known planet to harbor life. The origin of life on Earth is one of the great questions studied across biology, chemistry, and molecular science.",
        links: {
          "Life": true,
          "Atmosphere": false,
          "Continent": false,
          "Moon": false,
          "Ocean": false,
          "Gravity": false,
        },
      },
      "Life": {
        blurb: "The condition that distinguishes organisms from inorganic matter, characterized by growth, reproduction, and adaptation. All known life forms share a common molecular blueprint encoded in a double-helix molecule.",
        links: {
          "Cell": true,
          "Evolution": false,
          "Bacteria": false,
          "Ecosystem": false,
          "Photosynthesis": false,
          "Protein": false,
        },
      },
      "Cell": {
        blurb: "The basic structural and functional unit of all living organisms. Each cell contains a nucleus housing the organism's complete genetic information in a molecule first described by Watson and Crick in 1953.",
        links: {
          "DNA": true,
          "Nucleus": false,
          "Mitochondria": false,
          "Membrane": false,
          "Stem Cell": false,
          "Red Blood Cell": false,
        },
      },
      "DNA": {
        blurb: "Deoxyribonucleic acid, a molecule that carries the genetic instructions for the development, functioning, and reproduction of all known living organisms. Its double-helix structure was discovered in 1953.",
        links: {},
      },
    },
  },
  {
    id: 11,
    start: "Pirate",
    target: "Satellite",
    par: 5,
    articles: {
      "Pirate": {
        blurb: "Seafaring criminals who attacked ships for plunder. The Golden Age of Piracy (1650s–1730s) saw pirates roaming the Caribbean and Atlantic, navigating by the stars.",
        links: {
          "Navigation": true,
          "Caribbean": false,
          "Treasure": false,
          "Ship": false,
          "Blackbeard": false,
          "Skull and Crossbones": false,
        },
      },
      "Navigation": {
        blurb: "The process of determining position and planning routes. From celestial navigation using stars to magnetic compasses, navigation technology evolved dramatically with the launch of GPS systems.",
        links: {
          "GPS": true,
          "Compass": false,
          "Map": false,
          "Sextant": false,
          "North Star": false,
          "Longitude": false,
        },
      },
      "GPS": {
        blurb: "The Global Positioning System, a satellite-based radionavigation system providing location and time information. Operated by the US Space Force, it relies on a constellation of at least 24 orbiting spacecraft.",
        links: {
          "Orbit": true,
          "US Military": false,
          "Location": false,
          "Signal": false,
          "Receiver": false,
          "Coordinates": false,
        },
      },
      "Orbit": {
        blurb: "The curved path of an object around a star, planet, or moon due to gravity. Earth orbit is home to thousands of artificial objects launched since Sputnik in 1957.",
        links: {
          "Satellite": true,
          "Gravity": false,
          "Space Station": false,
          "Asteroid": false,
          "Kepler": false,
          "Trajectory": false,
        },
      },
      "Satellite": {
        blurb: "An artificial object placed into orbit around Earth or another body. There are currently over 7,000 active satellites providing communication, weather monitoring, navigation, and scientific observation.",
        links: {},
      },
    },
  },
  {
    id: 12,
    start: "Sushi",
    target: "Taj Mahal",
    par: 4,
    articles: {
      "Sushi": {
        blurb: "A Japanese dish featuring vinegared rice combined with seafood, vegetables, and sometimes tropical fruits. Sushi originated as a method of preserving fish in fermented rice across East and Southeast Asia.",
        links: {
          "Asia": true,
          "Rice": false,
          "Fish": false,
          "Wasabi": false,
          "Chef": false,
          "Seaweed": false,
        },
      },
      "Asia": {
        blurb: "The largest and most populous continent, home to diverse civilizations spanning thousands of years. The Indian subcontinent, in South Asia, produced some of the world's most remarkable architectural achievements.",
        links: {
          "India": true,
          "China": false,
          "Silk Road": false,
          "Buddhism": false,
          "Monsoon": false,
          "Tiger": false,
        },
      },
      "India": {
        blurb: "A country in South Asia with over 1.4 billion people. India's rich history includes the Mughal Empire, whose rulers commissioned breathtaking monuments as expressions of love and power.",
        links: {
          "Mughal Empire": true,
          "Hinduism": false,
          "Bollywood": false,
          "Ganges River": false,
          "Cricket": false,
          "Spice Trade": false,
        },
      },
      "Mughal Empire": {
        blurb: "An empire that ruled much of the Indian subcontinent from 1526 to 1857. Emperor Shah Jahan commissioned the most famous monument of Mughal architecture as a mausoleum for his beloved wife Mumtaz Mahal.",
        links: {
          "Taj Mahal": true,
          "Delhi": false,
          "Mogul Painting": false,
          "Persian Influence": false,
          "Fort": false,
          "Dynasty": false,
        },
      },
      "Taj Mahal": {
        blurb: "An ivory-white marble mausoleum in Agra, India, completed in 1653 by Emperor Shah Jahan. Widely considered the finest example of Mughal architecture and one of the New Seven Wonders of the World.",
        links: {},
      },
    },
  },
  {
    id: 13,
    start: "Lightning",
    target: "Video Games",
    par: 4,
    articles: {
      "Lightning": {
        blurb: "A natural electrical discharge between clouds or between a cloud and the ground. Benjamin Franklin's famous kite experiment in 1752 proved lightning was electrical in nature.",
        links: {
          "Electricity": true,
          "Thunder": false,
          "Storm": false,
          "Benjamin Franklin": false,
          "Weather": false,
          "Cloud": false,
        },
      },
      "Electricity": {
        blurb: "Energy resulting from the movement of charged particles. The ability to generate and control electricity enabled every electronic device, from light bulbs to the silicon chips powering modern entertainment.",
        links: {
          "Electronics": true,
          "Power Plant": false,
          "Voltage": false,
          "Thomas Edison": false,
          "Battery": false,
          "Generator": false,
        },
      },
      "Electronics": {
        blurb: "The branch of physics dealing with circuits and devices using electron flow. Consumer electronics evolved from radios and televisions to personal computers and dedicated gaming hardware.",
        links: {
          "Computer": true,
          "Circuit Board": false,
          "Diode": false,
          "Television": false,
          "Smartphone": false,
          "Radio": false,
        },
      },
      "Computer": {
        blurb: "A programmable electronic device that processes data. From room-sized mainframes in the 1950s to today's powerful personal machines, computers became the platform for an entirely new form of interactive entertainment.",
        links: {
          "Video Games": true,
          "Algorithm": false,
          "Hard Drive": false,
          "Internet": false,
          "Keyboard": false,
          "Operating System": false,
        },
      },
      "Video Games": {
        blurb: "An electronic game played on a screen using a controller or other input device. The global video game industry generates over $180 billion annually, surpassing film and music combined.",
        links: {},
      },
    },
  },
  {
    id: 14,
    start: "Violin",
    target: "Olympics",
    par: 4,
    articles: {
      "Violin": {
        blurb: "A wooden string instrument and the smallest member of the string family. The violin emerged in 16th-century Italy and became central to Western classical music and cultural performance.",
        links: {
          "Classical Music": false,
          "Italy": true,
          "Orchestra": false,
          "Stradivarius": false,
          "Bow": false,
          "String Quartet": false,
        },
      },
      "Italy": {
        blurb: "A southern European country shaped like a boot, renowned for art, music, and culture. Italy also has a proud sporting tradition and has hosted major international sporting events.",
        links: {
          "Ancient Rome": true,
          "Venice": false,
          "Pasta": false,
          "Fashion": false,
          "Renaissance": false,
          "Soccer": false,
        },
      },
      "Ancient Rome": {
        blurb: "One of the most powerful civilizations in history, centered in the city of Rome. Romans built the Colosseum, where gladiatorial games entertained audiences — a precursor to organized competitive sports.",
        links: {
          "Ancient Greece": true,
          "Colosseum": false,
          "Roman Empire": false,
          "Julius Caesar": false,
          "Aqueduct": false,
          "Latin": false,
        },
      },
      "Ancient Greece": {
        blurb: "A civilization that flourished from roughly 800 BC to 31 BC, making foundational contributions to philosophy, democracy, theater, and athletics. The Greeks established the original competitive games at Olympia in 776 BC.",
        links: {
          "Olympics": true,
          "Democracy": false,
          "Philosophy": false,
          "Athens": false,
          "Sparta": false,
          "Mythology": false,
        },
      },
      "Olympics": {
        blurb: "The world's foremost international multi-sport event, held every four years. Inspired by the ancient Greek games at Olympia, the modern Olympics were revived in Athens in 1896.",
        links: {},
      },
    },
  },
  {
    id: 15,
    start: "Pyramids",
    target: "Electric Car",
    par: 5,
    articles: {
      "Pyramids": {
        blurb: "Monumental structures built as tombs for Egyptian pharaohs. The Great Pyramid of Giza, built around 2560 BC, is the oldest of the Seven Wonders of the Ancient World.",
        links: {
          "Ancient Egypt": true,
          "Pharaoh": false,
          "Sphinx": false,
          "Tomb": false,
          "Sand": false,
          "Archaeology": false,
        },
      },
      "Ancient Egypt": {
        blurb: "A civilization along the Nile River lasting over 3,000 years. Egyptians made remarkable advances in mathematics, medicine, and engineering that influenced all subsequent Mediterranean civilizations.",
        links: {
          "Engineering": true,
          "Nile River": false,
          "Hieroglyphics": false,
          "Mummy": false,
          "Cleopatra": false,
          "Papyrus": false,
        },
      },
      "Engineering": {
        blurb: "The application of science and mathematics to design and build structures, machines, and systems. Modern engineering disciplines include civil, mechanical, electrical, and automotive engineering.",
        links: {
          "Automotive Industry": true,
          "Bridge": false,
          "Blueprint": false,
          "Mechanical": false,
          "Civil Engineering": false,
          "Patent": false,
        },
      },
      "Automotive Industry": {
        blurb: "The sector involved in designing, manufacturing, and selling motor vehicles. Founded on the internal combustion engine, the industry is now undergoing its biggest transformation with the shift to electric powertrains.",
        links: {
          "Electric Car": true,
          "Henry Ford": false,
          "Assembly Line": false,
          "Gasoline": false,
          "Highway": false,
          "Car Dealership": false,
        },
      },
      "Electric Car": {
        blurb: "An automobile powered by one or more electric motors using energy stored in rechargeable batteries. Electric vehicles are projected to make up the majority of new car sales by 2035.",
        links: {},
      },
    },
  },
];

export default puzzles;

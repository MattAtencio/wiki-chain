/**
 * WikiChain Puzzle Data — Full Graph Navigation
 *
 * Each puzzle is a connected graph. Every article has:
 * - blurb: short description
 * - links: array of article names (all must exist in this puzzle's articles)
 *
 * Every link navigates to a real page. No dead ends.
 * Par = length of the shortest path from start to target.
 */

const puzzles = [
  {
    id: 1,
    start: "Pizza",
    target: "Moon Landing",
    par: 4,
    articles: {
      "Pizza": {
        blurb: "A savory dish of Italian origin, consisting of a flat round base of dough topped with tomatoes, cheese, and various toppings.",
        links: ["Italy", "Tomato", "Cheese", "Fast Food"],
      },
      "Italy": {
        blurb: "A country in southern Europe known for its rich history in art, architecture, and science, with a space agency partnering in international programs.",
        links: ["Space Exploration", "Galileo", "France", "Rome"],
      },
      "Tomato": {
        blurb: "A red fruit native to the Americas, introduced to Europe by Spanish explorers and now a staple in cuisines worldwide.",
        links: ["Agriculture", "Italy", "Mexico"],
      },
      "Cheese": {
        blurb: "A dairy product produced in wide ranges of flavors and forms, with France producing over 1,000 distinct varieties.",
        links: ["France", "Agriculture", "Pizza"],
      },
      "Fast Food": {
        blurb: "Mass-produced food designed for quick commercial service, with the industry originating in America in the early 20th century.",
        links: ["America", "Cheese", "Pizza"],
      },
      "Rome": {
        blurb: "The capital of Italy and former seat of the Roman Empire, whose engineering achievements influenced civilizations for millennia.",
        links: ["Italy", "Galileo", "France"],
      },
      "Galileo": {
        blurb: "An Italian astronomer who revolutionized our understanding of the cosmos with his telescope observations of planets and stars.",
        links: ["Telescope", "Science", "Italy"],
      },
      "Telescope": {
        blurb: "An optical instrument for observing distant objects, crucial to astronomy from Galileo's era to the Hubble Space Telescope.",
        links: ["NASA", "Science", "Galileo"],
      },
      "Space Exploration": {
        blurb: "The investigation of outer space using astronomy and spacecraft technology, culminating in humanity's greatest achievements beyond Earth.",
        links: ["NASA", "Science", "Telescope"],
      },
      "NASA": {
        blurb: "America's space agency, which led the Apollo program and continues to explore the solar system with rovers and telescopes.",
        links: ["Moon Landing", "Space Exploration", "America"],
      },
      "Agriculture": {
        blurb: "The practice of cultivating crops and raising animals, forming the foundation of human civilization and food systems worldwide.",
        links: ["Science", "France", "Mexico"],
      },
      "France": {
        blurb: "A Western European country renowned for its cuisine, wine, and cultural landmarks, and Europe's largest agricultural producer.",
        links: ["Italy", "Cheese", "Agriculture"],
      },
      "Science": {
        blurb: "The systematic study of the natural world through observation and experiment, driving every major technological revolution.",
        links: ["Space Exploration", "Telescope", "Agriculture"],
      },
      "America": {
        blurb: "A country spanning a vast continent, home to NASA and the world's largest economy, shaped by innovation and exploration.",
        links: ["NASA", "Space Exploration", "Fast Food"],
      },
      "Mexico": {
        blurb: "A country in North America with ancient civilizations, the origin point of tomatoes, chocolate, and many other crops.",
        links: ["America", "Agriculture", "Tomato"],
      },
      "Moon Landing": {
        blurb: "On July 20, 1969, Apollo 11 astronauts became the first humans to walk on the Moon, watched by 600 million people.",
        links: ["NASA", "Space Exploration", "America"],
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
        blurb: "The world's most popular sport, codified in England in 1863, now played by over 250 million people across the globe.",
        links: ["England", "Brazil", "World Cup", "Athletics"],
      },
      "England": {
        blurb: "A country in the United Kingdom with deep cultural heritage spanning literature, sport, theater, and centuries of global influence.",
        links: ["London", "Elizabethan Era", "British Empire", "Soccer"],
      },
      "Brazil": {
        blurb: "The largest country in South America, famous for its passionate football culture, Carnival, and the Amazon rainforest.",
        links: ["World Cup", "Soccer", "Amazon"],
      },
      "World Cup": {
        blurb: "FIFA's flagship tournament held every four years, the most-watched sporting event on Earth with billions of viewers.",
        links: ["Soccer", "Brazil", "Athletics"],
      },
      "Athletics": {
        blurb: "Competitive sports involving running, jumping, and throwing, tracing roots to ancient Greek competitions at Olympia.",
        links: ["Ancient Greece", "World Cup", "England"],
      },
      "London": {
        blurb: "The capital of England, a global center of arts and culture, home to iconic theaters including the reconstructed Globe Theatre.",
        links: ["Globe Theatre", "British Empire", "England", "Theater"],
      },
      "Elizabethan Era": {
        blurb: "The reign of Queen Elizabeth I (1558–1603), considered a golden age of English culture, exploration, and dramatic arts.",
        links: ["Globe Theatre", "Poetry", "England", "Theater"],
      },
      "British Empire": {
        blurb: "The largest empire in history at its peak, spreading English language, law, and culture across every continent.",
        links: ["England", "London", "Ancient Greece"],
      },
      "Globe Theatre": {
        blurb: "A theater in London where many of history's greatest plays were first performed, including Hamlet, Othello, and King Lear.",
        links: ["Shakespeare", "Theater", "London", "Elizabethan Era"],
      },
      "Theater": {
        blurb: "A performing art form with roots in ancient ritual, evolving from Greek amphitheaters to modern stages worldwide.",
        links: ["Globe Theatre", "Ancient Greece", "Poetry", "London"],
      },
      "Poetry": {
        blurb: "A literary form using aesthetic and rhythmic qualities of language, from ancient epics to Renaissance sonnets.",
        links: ["Shakespeare", "Ancient Greece", "Elizabethan Era"],
      },
      "Ancient Greece": {
        blurb: "A civilization that made foundational contributions to philosophy, democracy, theater, and athletics between 800 BC and 31 BC.",
        links: ["Theater", "Athletics", "Poetry"],
      },
      "Amazon": {
        blurb: "The world's largest tropical rainforest, spanning nine South American countries, home to incredible biodiversity.",
        links: ["Brazil", "Science", "Nature"],
      },
      "Science": {
        blurb: "The systematic study of the natural world, from ancient Greek philosophy to modern research driving technology and culture.",
        links: ["Ancient Greece", "Nature", "London"],
      },
      "Nature": {
        blurb: "The phenomena of the physical world collectively, including plants, animals, and the landscape, inspiring art and poetry for millennia.",
        links: ["Poetry", "Amazon", "Science"],
      },
      "Shakespeare": {
        blurb: "William Shakespeare (1564–1616), widely regarded as the greatest writer in the English language, author of 37 plays and 154 sonnets.",
        links: ["Globe Theatre", "Poetry", "Elizabethan Era"],
      },
    },
  },
  {
    id: 3,
    start: "Dinosaurs",
    target: "Smartphone",
    par: 4,
    articles: {
      "Dinosaurs": {
        blurb: "Reptiles that dominated Earth for 160 million years before a massive asteroid impact caused their extinction 66 million years ago.",
        links: ["Fossil", "Evolution", "Asteroid", "Museum"],
      },
      "Fossil": {
        blurb: "Preserved remains of ancient organisms found in rock, studied through paleontology using geological dating and modern instruments.",
        links: ["Science", "Museum", "Evolution", "Dinosaurs"],
      },
      "Evolution": {
        blurb: "The process by which species change over generations through natural selection, first described by Charles Darwin.",
        links: ["Science", "Biology", "Fossil", "Dinosaurs"],
      },
      "Asteroid": {
        blurb: "Rocky bodies orbiting the Sun, one of which struck Earth 66 million years ago creating the Chicxulub crater.",
        links: ["Space", "Science", "Dinosaurs"],
      },
      "Museum": {
        blurb: "Institutions that collect and display objects of scientific, artistic, or historical importance for public education.",
        links: ["Fossil", "Science", "Technology"],
      },
      "Science": {
        blurb: "The systematic study of the natural world through observation and experiment, driving every major technological revolution.",
        links: ["Electricity", "Biology", "Space", "Technology"],
      },
      "Biology": {
        blurb: "The study of living organisms and their interactions, from microscopic cells to entire ecosystems and evolutionary history.",
        links: ["Evolution", "Science", "Chemistry"],
      },
      "Space": {
        blurb: "The vast expanse beyond Earth's atmosphere, explored through telescopes, satellites, and spacecraft carrying advanced electronics.",
        links: ["Asteroid", "Technology", "Satellite"],
      },
      "Electricity": {
        blurb: "Energy from charged particles, harnessed in the 19th century to create transformative inventions from light bulbs to transistors.",
        links: ["Transistor", "Technology", "Science"],
      },
      "Technology": {
        blurb: "The application of scientific knowledge for practical purposes, from stone tools to the digital devices that define modern life.",
        links: ["Smartphone", "Computer", "Electricity", "Satellite"],
      },
      "Transistor": {
        blurb: "A semiconductor device invented in 1947 at Bell Labs, the fundamental building block of all modern electronic devices.",
        links: ["Computer", "Smartphone", "Electricity"],
      },
      "Computer": {
        blurb: "A programmable electronic device that processes data, evolving from room-sized mainframes to powerful handheld devices.",
        links: ["Smartphone", "Transistor", "Technology"],
      },
      "Chemistry": {
        blurb: "The study of matter and its properties, reactions, and transformations, essential to materials science and electronics.",
        links: ["Science", "Electricity", "Biology"],
      },
      "Satellite": {
        blurb: "An artificial object in orbit, enabling communication, GPS, and weather monitoring using advanced electronic systems.",
        links: ["Space", "Technology", "Computer"],
      },
      "Smartphone": {
        blurb: "A handheld personal computer with a touchscreen interface, combining a phone with computing power used by over 6 billion people.",
        links: ["Computer", "Technology", "Transistor"],
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
        blurb: "A food made from roasted cacao beans, originally cultivated by the Aztec and Maya civilizations of Mesoamerica.",
        links: ["Mesoamerica", "Switzerland", "Sugar", "Trade"],
      },
      "Mesoamerica": {
        blurb: "A historical region from central Mexico to Central America, home to advanced civilizations with knowledge of astronomy and geography.",
        links: ["Geography", "Aztec Empire", "Trade", "Chocolate"],
      },
      "Switzerland": {
        blurb: "A mountainous Central European country famous for chocolate, watches, banking, and its stunning Alpine peaks.",
        links: ["Alps", "Europe", "Chocolate", "Geography"],
      },
      "Sugar": {
        blurb: "A sweet crystalline substance extracted from sugarcane or beet, central to global trade routes for centuries.",
        links: ["Trade", "Agriculture", "Chocolate"],
      },
      "Trade": {
        blurb: "The exchange of goods and services, which historically connected distant civilizations via sea routes and overland paths.",
        links: ["Asia", "Europe", "Sugar", "Mesoamerica"],
      },
      "Aztec Empire": {
        blurb: "A civilization in central Mexico (1300–1521) known for monumental architecture, astronomy, and advanced agriculture.",
        links: ["Mesoamerica", "Agriculture", "Geography"],
      },
      "Geography": {
        blurb: "The study of Earth's landscapes and environments, examining natural features from ocean trenches to the world's tallest peaks.",
        links: ["Himalayas", "Asia", "Alps", "Mesoamerica"],
      },
      "Alps": {
        blurb: "Europe's highest mountain range, stretching across eight countries, a training ground for mountaineers worldwide.",
        links: ["Mountain Climbing", "Switzerland", "Europe"],
      },
      "Europe": {
        blurb: "A continent with diverse cultures and landscapes, connected to Asia by land and to the world through centuries of exploration.",
        links: ["Asia", "Switzerland", "Alps", "Trade"],
      },
      "Asia": {
        blurb: "The largest continent, home to the Himalayas and diverse civilizations spanning thousands of years of history.",
        links: ["Himalayas", "Nepal", "Geography", "Trade"],
      },
      "Agriculture": {
        blurb: "The cultivation of crops and raising of animals, enabling civilizations from Mesoamerica to the Himalayan foothills.",
        links: ["Nepal", "Mesoamerica", "Sugar"],
      },
      "Himalayas": {
        blurb: "The highest mountain range in the world, containing all 14 peaks over 8,000 meters, stretching across five Asian countries.",
        links: ["Mount Everest", "Nepal", "Mountain Climbing", "Asia"],
      },
      "Nepal": {
        blurb: "A landlocked country between China and India, home to eight of the world's ten tallest mountains including the highest.",
        links: ["Mount Everest", "Himalayas", "Asia", "Agriculture"],
      },
      "Mountain Climbing": {
        blurb: "The sport of ascending mountains, with the ultimate prize being the summit of the world's tallest peak.",
        links: ["Mount Everest", "Himalayas", "Alps", "Nepal"],
      },
      "Mount Everest": {
        blurb: "At 8,849 meters, the highest point on Earth, first summited by Edmund Hillary and Tenzing Norgay in 1953.",
        links: ["Himalayas", "Nepal", "Mountain Climbing"],
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
        blurb: "A music genre originating in African American communities of New Orleans, characterized by improvisation and swing.",
        links: ["Music", "New Orleans", "Blues", "Culture"],
      },
      "Music": {
        blurb: "An art form combining sounds for expression, repeatedly transformed by technology from vinyl records to streaming.",
        links: ["Radio", "Vinyl Record", "Culture", "Jazz"],
      },
      "New Orleans": {
        blurb: "A Louisiana city known as the birthplace of jazz, with a vibrant culture shaped by French, African, and American influences.",
        links: ["Jazz", "Culture", "America"],
      },
      "Blues": {
        blurb: "An African American music genre from the Deep South, influencing jazz, rock, and virtually all modern popular music.",
        links: ["Jazz", "Music", "Culture"],
      },
      "Culture": {
        blurb: "The social behavior, norms, and knowledge of human societies, transmitted through art, language, and communication technology.",
        links: ["Music", "Television", "Radio", "New Orleans"],
      },
      "Radio": {
        blurb: "Technology for transmitting signals via electromagnetic waves, revolutionizing communication and becoming the foundation of telecommunications.",
        links: ["Telecommunications", "Television", "Music", "Signal"],
      },
      "Vinyl Record": {
        blurb: "An analog sound storage medium that dominated music distribution for decades before being supplanted by digital formats.",
        links: ["Music", "Technology", "Radio"],
      },
      "Television": {
        blurb: "A system for transmitting visual images and sound, evolving from broadcast signals to internet-based streaming platforms.",
        links: ["Radio", "Technology", "Signal", "Culture"],
      },
      "Telecommunications": {
        blurb: "The transmission of information over distances, from telegraph to telephone to the global network connecting billions of devices.",
        links: ["Internet", "Radio", "Signal", "Technology"],
      },
      "Signal": {
        blurb: "An electromagnetic or electrical impulse used to convey information, the fundamental unit of all communication systems.",
        links: ["Telecommunications", "Radio", "Technology"],
      },
      "Technology": {
        blurb: "The application of scientific knowledge for practical purposes, powering the digital revolution and global connectivity.",
        links: ["Internet", "Telecommunications", "Computer"],
      },
      "America": {
        blurb: "A country shaped by innovation, from the birth of jazz in New Orleans to Silicon Valley's creation of the digital age.",
        links: ["New Orleans", "Computer", "Technology"],
      },
      "Computer": {
        blurb: "A programmable electronic device, from 1950s mainframes to today's machines that form the backbone of global networks.",
        links: ["Internet", "Technology", "America"],
      },
      "Internet": {
        blurb: "A global network of interconnected computers, originally ARPANET, now connecting over 5 billion users worldwide.",
        links: ["Telecommunications", "Computer", "Technology"],
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
        blurb: "Flightless seabirds of the Southern Hemisphere, highly adapted to aquatic life and stars of popular nature documentaries.",
        links: ["Antarctica", "Documentary", "Ocean", "Wildlife"],
      },
      "Antarctica": {
        blurb: "Earth's southernmost continent, a frozen wilderness that has been the subject of countless expeditions and films.",
        links: ["Penguin", "Ocean", "Documentary", "Exploration"],
      },
      "Ocean": {
        blurb: "The vast bodies of saltwater covering 71% of Earth's surface, home to incredible marine life featured in film.",
        links: ["Antarctica", "Wildlife", "Documentary"],
      },
      "Wildlife": {
        blurb: "Animals in their natural habitats, the subject of a booming documentary industry that generates billions in revenue.",
        links: ["Documentary", "Penguin", "Ocean", "Nature"],
      },
      "Documentary": {
        blurb: "Non-fiction films documenting reality for education or entertainment, with nature docs like Planet Earth becoming global hits.",
        links: ["Film Industry", "Television", "Wildlife", "Camera"],
      },
      "Nature": {
        blurb: "The physical world and its phenomena, an endless source of inspiration for filmmakers, artists, and storytellers.",
        links: ["Wildlife", "Documentary", "California"],
      },
      "Exploration": {
        blurb: "The act of traveling to unfamiliar places to learn, from Antarctic expeditions to the exploration of storytelling frontiers.",
        links: ["Antarctica", "Film Industry", "Camera"],
      },
      "Film Industry": {
        blurb: "The global commercial sector of filmmaking, with the American industry centered in Southern California dominating global cinema.",
        links: ["Hollywood", "Camera", "Television", "Documentary"],
      },
      "Camera": {
        blurb: "A device for capturing images, essential to both documentary filmmaking and the motion picture industry.",
        links: ["Film Industry", "Documentary", "Television"],
      },
      "Television": {
        blurb: "A medium for broadcasting visual content, evolving from antennas to streaming, with studios clustered near film production hubs.",
        links: ["Film Industry", "Documentary", "Entertainment", "Camera"],
      },
      "Entertainment": {
        blurb: "Activities providing amusement, with the modern entertainment capital of the world being a neighborhood in Los Angeles.",
        links: ["Hollywood", "Film Industry", "Television", "California"],
      },
      "California": {
        blurb: "A US state on the Pacific coast, home to Silicon Valley, stunning natural parks, and the center of American filmmaking.",
        links: ["Hollywood", "Entertainment", "Nature"],
      },
      "Hollywood": {
        blurb: "A neighborhood in Los Angeles synonymous with the American entertainment industry, home to major studios and the Walk of Fame.",
        links: ["Film Industry", "Entertainment", "California"],
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
        blurb: "A brewed drink from roasted beans discovered in Ethiopia, containing caffeine that has been extensively studied by scientists.",
        links: ["Ethiopia", "Caffeine", "Trade", "Agriculture"],
      },
      "Ethiopia": {
        blurb: "An East African country with ancient history, the origin of coffee and one of the cradles of human civilization.",
        links: ["Africa", "Coffee", "Agriculture"],
      },
      "Caffeine": {
        blurb: "A natural stimulant found in coffee and tea, one of the most studied compounds in pharmacology and biology.",
        links: ["Science", "Coffee", "Biology"],
      },
      "Trade": {
        blurb: "The exchange of goods across regions, from the ancient coffee trade routes to modern global supply chains.",
        links: ["Agriculture", "Technology", "Ethiopia"],
      },
      "Agriculture": {
        blurb: "The cultivation of crops, from coffee plantations in Ethiopia to experimental farming research funded by government agencies.",
        links: ["Science", "Ethiopia", "Trade"],
      },
      "Africa": {
        blurb: "The second-largest continent, with a rich geological history and clear skies that make it a target for astronomical observatories.",
        links: ["Ethiopia", "Astronomy", "Science"],
      },
      "Science": {
        blurb: "The systematic investigation of the natural world, with government institutions conducting research from biology to planetary exploration.",
        links: ["NASA", "Biology", "Astronomy", "Technology"],
      },
      "Biology": {
        blurb: "The study of living organisms, from the chemistry of caffeine to astrobiology investigating the possibility of life beyond Earth.",
        links: ["Science", "Caffeine", "Astrobiology"],
      },
      "Astronomy": {
        blurb: "The study of celestial objects and phenomena, from ancient stargazing to modern spacecraft visiting other planets.",
        links: ["NASA", "Space", "Science", "Africa"],
      },
      "Technology": {
        blurb: "Applied scientific knowledge powering everything from agricultural tools to the rockets that carry rovers to other worlds.",
        links: ["NASA", "Science", "Spacecraft"],
      },
      "NASA": {
        blurb: "America's space agency, running the Mars exploration program with multiple rovers and orbiters studying the Red Planet.",
        links: ["Mars", "Space", "Spacecraft", "Astrobiology"],
      },
      "Space": {
        blurb: "The vast expanse beyond Earth's atmosphere, explored by telescopes and spacecraft seeking to understand our solar system.",
        links: ["Mars", "NASA", "Astronomy"],
      },
      "Spacecraft": {
        blurb: "Vehicles designed for travel beyond Earth's atmosphere, from Apollo capsules to the Perseverance rover currently on Mars.",
        links: ["Mars", "NASA", "Space"],
      },
      "Astrobiology": {
        blurb: "The study of life's origins and the search for life beyond Earth, with Mars being the prime candidate in our solar system.",
        links: ["Mars", "Biology", "NASA"],
      },
      "Mars": {
        blurb: "The fourth planet from the Sun, called the Red Planet, where NASA's Perseverance rover searches for signs of ancient life.",
        links: ["NASA", "Space", "Astrobiology"],
      },
    },
  },
  {
    id: 8,
    start: "Samurai",
    target: "Bitcoin",
    par: 4,
    articles: {
      "Samurai": {
        blurb: "The warrior nobility of medieval Japan who followed bushido, central to feudal society until the Meiji Restoration modernized the country.",
        links: ["Japan", "Martial Arts", "Feudalism", "Katana"],
      },
      "Japan": {
        blurb: "An island nation blending ancient traditions with cutting-edge technology, a global leader in electronics and computing innovation.",
        links: ["Technology", "Tokyo", "Samurai", "Electronics"],
      },
      "Martial Arts": {
        blurb: "Combat practices developed across Asia for self-defense, military training, and spiritual development over thousands of years.",
        links: ["Japan", "Samurai", "Discipline"],
      },
      "Feudalism": {
        blurb: "A medieval social system of lords and vassals, eventually replaced by centralized governments and modern economic systems.",
        links: ["Samurai", "Economics", "Japan"],
      },
      "Katana": {
        blurb: "A curved Japanese sword crafted with extraordinary metallurgy, requiring mastery of materials science and forging techniques.",
        links: ["Samurai", "Japan", "Engineering"],
      },
      "Tokyo": {
        blurb: "Japan's capital and the world's largest metropolitan area, a global hub for technology, finance, and innovation.",
        links: ["Japan", "Technology", "Economics"],
      },
      "Technology": {
        blurb: "Applied scientific knowledge driving the digital revolution, from transistors to the internet and decentralized digital systems.",
        links: ["Cryptography", "Electronics", "Internet", "Japan"],
      },
      "Electronics": {
        blurb: "The branch of physics dealing with circuits and devices, with Japan pioneering consumer electronics from radios to gaming systems.",
        links: ["Technology", "Computer", "Japan", "Engineering"],
      },
      "Discipline": {
        blurb: "The practice of training to follow a code of behavior, valued in martial arts, military strategy, and mathematical problem-solving.",
        links: ["Martial Arts", "Mathematics", "Samurai"],
      },
      "Economics": {
        blurb: "The study of production, distribution, and consumption of goods, evolving to include digital currencies and decentralized finance.",
        links: ["Blockchain", "Tokyo", "Feudalism"],
      },
      "Engineering": {
        blurb: "The application of science to design and build systems, from ancient sword-forging to modern computer architecture.",
        links: ["Technology", "Electronics", "Computer"],
      },
      "Internet": {
        blurb: "A global network connecting billions of devices, the infrastructure layer enabling digital communication and cryptocurrency transactions.",
        links: ["Cryptography", "Computer", "Technology"],
      },
      "Cryptography": {
        blurb: "The practice of secure communication using codes and ciphers, underpinning internet security and decentralized digital currencies.",
        links: ["Blockchain", "Mathematics", "Internet"],
      },
      "Mathematics": {
        blurb: "The abstract science of number, quantity, and space, providing the theoretical foundation for encryption and consensus algorithms.",
        links: ["Cryptography", "Computer", "Discipline"],
      },
      "Computer": {
        blurb: "A programmable device that processes data, the hardware backbone of the internet and cryptocurrency mining operations.",
        links: ["Internet", "Blockchain", "Technology"],
      },
      "Blockchain": {
        blurb: "A distributed digital ledger recording transactions across many computers, conceptualized in 2008 by the pseudonymous Satoshi Nakamoto.",
        links: ["Bitcoin", "Cryptography", "Economics"],
      },
      "Bitcoin": {
        blurb: "The first decentralized cryptocurrency, enabling peer-to-peer transactions via blockchain without intermediaries since 2009.",
        links: ["Blockchain", "Cryptography", "Economics"],
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
        blurb: "A flying insect vital to agriculture, pollinating roughly one-third of food crops and producing honey consumed worldwide.",
        links: ["Agriculture", "Pollination", "Honey", "Nature"],
      },
      "Agriculture": {
        blurb: "The cultivation of crops and livestock, with France being Europe's largest agricultural producer for centuries.",
        links: ["France", "Nature", "Pollination", "Honey Bee"],
      },
      "Pollination": {
        blurb: "The transfer of pollen enabling plant reproduction, essential to both wild ecosystems and cultivated gardens worldwide.",
        links: ["Nature", "Agriculture", "Garden", "Honey Bee"],
      },
      "Honey": {
        blurb: "A sweet substance produced by bees, used in food and medicine for millennia across European and Asian cultures.",
        links: ["Honey Bee", "Agriculture", "Trade"],
      },
      "Nature": {
        blurb: "The physical world and its phenomena, inspiring art, architecture, and engineering achievements across human civilization.",
        links: ["Architecture", "Garden", "Agriculture", "Pollination"],
      },
      "France": {
        blurb: "A Western European country known for cuisine, wine, and iconic landmarks, the most visited country in the world.",
        links: ["Paris", "Wine", "Architecture", "Agriculture"],
      },
      "Trade": {
        blurb: "The exchange of goods between regions, with France historically at the center of European commerce and world fairs.",
        links: ["France", "World Fair", "Honey"],
      },
      "Wine": {
        blurb: "An alcoholic beverage from fermented grapes, with France renowned for producing the world's most celebrated varieties.",
        links: ["France", "Agriculture", "Paris"],
      },
      "Garden": {
        blurb: "A cultivated space for growing plants, with the formal French garden tradition influencing park design around the world.",
        links: ["Paris", "Nature", "Pollination", "Architecture"],
      },
      "Architecture": {
        blurb: "The art and science of designing buildings and structures, from ancient temples to revolutionary iron constructions.",
        links: ["Eiffel Tower", "Iron", "Paris", "Nature"],
      },
      "Paris": {
        blurb: "The capital of France, the City of Light, home to Notre-Dame, the Louvre, and an iconic iron tower built for the 1889 World's Fair.",
        links: ["Eiffel Tower", "France", "Architecture", "World Fair"],
      },
      "Iron": {
        blurb: "A metallic element essential to construction, used to build bridges, railways, and a famous lattice tower standing 330 meters tall.",
        links: ["Eiffel Tower", "Architecture", "Engineering"],
      },
      "Engineering": {
        blurb: "The application of science to design structures and systems, exemplified by Gustave Eiffel's revolutionary construction techniques.",
        links: ["Eiffel Tower", "Iron", "Architecture"],
      },
      "World Fair": {
        blurb: "International exhibitions showcasing cultural and industrial achievements, with the 1889 Paris expo commissioning an iconic tower.",
        links: ["Eiffel Tower", "Paris", "Trade"],
      },
      "Eiffel Tower": {
        blurb: "A wrought-iron lattice tower built in 1889 by Gustave Eiffel for the World's Fair, the most visited paid monument in the world.",
        links: ["Paris", "Architecture", "Iron"],
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
        blurb: "A rupture in Earth's crust allowing lava and gases to escape, shaping the planet's surface over billions of years.",
        links: ["Earth", "Geology", "Lava", "Pompeii"],
      },
      "Earth": {
        blurb: "The third planet from the Sun and the only known world to harbor life, a great mystery studied across many sciences.",
        links: ["Life", "Geology", "Ocean", "Atmosphere"],
      },
      "Geology": {
        blurb: "The study of Earth's physical structure, from volcanic rock layers to the fossil record revealing ancient organisms.",
        links: ["Earth", "Fossil", "Volcano", "Chemistry"],
      },
      "Lava": {
        blurb: "Molten rock that reaches Earth's surface during eruptions, its chemical composition studied by geologists and chemists.",
        links: ["Volcano", "Chemistry", "Geology"],
      },
      "Pompeii": {
        blurb: "An ancient Roman city buried by volcanic eruption in 79 AD, preserving a snapshot of life studied by historians and scientists.",
        links: ["Volcano", "Archaeology", "Earth"],
      },
      "Ocean": {
        blurb: "Vast saltwater bodies covering most of Earth, home to diverse life forms from microscopic organisms to massive whales.",
        links: ["Life", "Earth", "Chemistry"],
      },
      "Atmosphere": {
        blurb: "The layer of gases surrounding Earth, shaped by volcanic emissions and essential to the conditions that support life.",
        links: ["Earth", "Chemistry", "Life"],
      },
      "Fossil": {
        blurb: "Preserved remains of ancient organisms in rock, providing evidence of evolution and the molecular basis of living things.",
        links: ["Evolution", "Geology", "Archaeology"],
      },
      "Archaeology": {
        blurb: "The study of human history through excavation, increasingly using molecular analysis and genetic techniques.",
        links: ["Fossil", "Pompeii", "Genetics"],
      },
      "Life": {
        blurb: "The condition distinguishing organisms from inorganic matter, characterized by growth, reproduction, and a shared molecular blueprint.",
        links: ["Cell", "Evolution", "Biology", "Earth"],
      },
      "Chemistry": {
        blurb: "The study of matter and its transformations, from volcanic minerals to the molecular structures within living cells.",
        links: ["Molecule", "Biology", "Geology"],
      },
      "Evolution": {
        blurb: "The process of species changing through natural selection, with all life sharing common ancestry encoded in genetic material.",
        links: ["Genetics", "Life", "Biology", "Fossil"],
      },
      "Biology": {
        blurb: "The study of living organisms, from cells and molecules to ecosystems, unified by the central role of genetic information.",
        links: ["Cell", "Genetics", "Evolution", "Chemistry"],
      },
      "Cell": {
        blurb: "The basic unit of all living organisms, each containing a nucleus housing the complete genetic blueprint in a double-helix molecule.",
        links: ["DNA", "Biology", "Molecule", "Life"],
      },
      "Molecule": {
        blurb: "A group of atoms bonded together, from simple water to the complex double-helix that carries the code of life.",
        links: ["DNA", "Chemistry", "Cell"],
      },
      "Genetics": {
        blurb: "The study of heredity and variation, centered on the molecule that encodes instructions for all living organisms.",
        links: ["DNA", "Evolution", "Biology"],
      },
      "DNA": {
        blurb: "Deoxyribonucleic acid, the molecule carrying genetic instructions for development and reproduction of all known living organisms.",
        links: ["Genetics", "Cell", "Molecule"],
      },
    },
  },
  {
    id: 11,
    start: "Pirate",
    target: "Satellite",
    par: 4,
    articles: {
      "Pirate": {
        blurb: "Seafaring criminals who attacked ships for plunder during the Golden Age of Piracy, navigating vast oceans by the stars.",
        links: ["Navigation", "Ocean", "Caribbean", "Ship"],
      },
      "Navigation": {
        blurb: "The process of determining position and planning routes, evolving from celestial observation to satellite-based GPS systems.",
        links: ["GPS", "Stars", "Ocean", "Ship"],
      },
      "Ocean": {
        blurb: "The vast bodies of saltwater covering most of Earth, crossed by pirates and now monitored by satellites from orbit.",
        links: ["Navigation", "Pirate", "Ship", "Weather"],
      },
      "Caribbean": {
        blurb: "A region of tropical islands in the Americas, infamous for piracy and now monitored by weather satellites for hurricanes.",
        links: ["Pirate", "Ocean", "Weather"],
      },
      "Ship": {
        blurb: "A large vessel for sea transport, from wooden pirate galleons to modern ships using satellite navigation systems.",
        links: ["Navigation", "Ocean", "Pirate", "Technology"],
      },
      "Stars": {
        blurb: "Luminous celestial objects used for navigation for millennia, now studied with space telescopes and orbiting observatories.",
        links: ["Navigation", "Space", "Astronomy"],
      },
      "GPS": {
        blurb: "The Global Positioning System, providing location data using a constellation of at least 24 orbiting spacecraft.",
        links: ["Satellite", "Orbit", "Navigation", "Technology"],
      },
      "Weather": {
        blurb: "Atmospheric conditions at a given time, now predicted using data from orbiting observation platforms and computer models.",
        links: ["Satellite", "Ocean", "Atmosphere"],
      },
      "Atmosphere": {
        blurb: "The layer of gases surrounding Earth, studied by instruments on the ground and from orbiting platforms above.",
        links: ["Weather", "Space", "Orbit"],
      },
      "Space": {
        blurb: "The expanse beyond Earth's atmosphere, home to thousands of artificial objects launched since Sputnik in 1957.",
        links: ["Orbit", "Satellite", "Stars", "Astronomy"],
      },
      "Astronomy": {
        blurb: "The study of celestial objects, now aided by instruments placed in Earth orbit far above atmospheric interference.",
        links: ["Stars", "Space", "Telescope"],
      },
      "Telescope": {
        blurb: "An instrument for observing distant objects, with the most powerful ones orbiting Earth to avoid atmospheric distortion.",
        links: ["Satellite", "Astronomy", "Space"],
      },
      "Technology": {
        blurb: "Applied scientific knowledge, from compass navigation to the rockets that place communication platforms in orbit.",
        links: ["GPS", "Satellite", "Ship"],
      },
      "Orbit": {
        blurb: "The curved path of an object around a body due to gravity, where thousands of artificial objects circle Earth.",
        links: ["Satellite", "Space", "GPS"],
      },
      "Satellite": {
        blurb: "An artificial object in orbit providing communication, weather monitoring, navigation, and scientific observation for over 7,000 active units.",
        links: ["Orbit", "GPS", "Space"],
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
        blurb: "A Japanese dish of vinegared rice with seafood, originating as a preservation method across East and Southeast Asia.",
        links: ["Japan", "Asia", "Seafood", "Rice"],
      },
      "Japan": {
        blurb: "An island nation known for blending tradition with innovation, its cuisine and culture influencing the world.",
        links: ["Asia", "Sushi", "Buddhism", "Trade"],
      },
      "Asia": {
        blurb: "The largest continent, home to diverse civilizations and some of the world's most remarkable architectural achievements.",
        links: ["India", "Japan", "Silk Road", "Buddhism"],
      },
      "Seafood": {
        blurb: "Marine animals used as food, traded across ocean routes connecting Japan, Southeast Asia, and the Indian subcontinent.",
        links: ["Trade", "Japan", "Ocean"],
      },
      "Rice": {
        blurb: "A cereal grain and staple food for over half the world's population, cultivated across Asia for thousands of years.",
        links: ["Agriculture", "Asia", "India"],
      },
      "Buddhism": {
        blurb: "A religion founded in India that spread across Asia, influencing art, architecture, and culture from Japan to Sri Lanka.",
        links: ["India", "Asia", "Japan", "Temple"],
      },
      "Trade": {
        blurb: "The exchange of goods between civilizations, with the Silk Road connecting East Asia to India and beyond.",
        links: ["Silk Road", "Seafood", "Japan"],
      },
      "Silk Road": {
        blurb: "Ancient trade routes connecting East Asia to the Mediterranean, passing through India and facilitating cultural exchange.",
        links: ["India", "Asia", "Trade", "Mughal Empire"],
      },
      "India": {
        blurb: "A South Asian country with over 1.4 billion people and a rich history including the Mughal Empire's breathtaking monuments.",
        links: ["Mughal Empire", "Architecture", "Buddhism", "Agriculture"],
      },
      "Agriculture": {
        blurb: "The cultivation of crops, essential to civilizations from rice paddies in Asia to the fertile plains of the Indian subcontinent.",
        links: ["India", "Rice", "Asia"],
      },
      "Ocean": {
        blurb: "Vast saltwater bodies connecting continents, enabling trade routes that linked Japan to India and the wider world.",
        links: ["Trade", "Seafood", "Asia"],
      },
      "Temple": {
        blurb: "A structure devoted to worship or meditation, with Hindu and Muslim architecture producing some of humanity's finest buildings.",
        links: ["Architecture", "India", "Buddhism", "Mughal Empire"],
      },
      "Mughal Empire": {
        blurb: "A dynasty ruling India from 1526 to 1857, whose Emperor Shah Jahan built the most famous mausoleum in the world.",
        links: ["Taj Mahal", "India", "Architecture", "Marble"],
      },
      "Architecture": {
        blurb: "The art and science of designing buildings, with Mughal architecture producing some of humanity's most stunning structures.",
        links: ["Taj Mahal", "Mughal Empire", "Temple", "Marble"],
      },
      "Marble": {
        blurb: "A metamorphic rock prized for sculpture and construction, used in the world's most famous ivory-white mausoleum.",
        links: ["Taj Mahal", "Architecture", "India"],
      },
      "Taj Mahal": {
        blurb: "An ivory-white marble mausoleum in Agra, completed in 1653, widely considered the finest example of Mughal architecture.",
        links: ["Mughal Empire", "Architecture", "India"],
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
        blurb: "A natural electrical discharge, proven to be electrical by Benjamin Franklin's 1752 kite experiment.",
        links: ["Electricity", "Weather", "Energy", "Storm"],
      },
      "Electricity": {
        blurb: "Energy from charged particles, harnessed to power inventions from light bulbs to the silicon chips in modern devices.",
        links: ["Electronics", "Energy", "Transistor", "Lightning"],
      },
      "Weather": {
        blurb: "Atmospheric conditions including storms and lightning, now simulated by powerful computers and displayed on screens.",
        links: ["Lightning", "Storm", "Computer"],
      },
      "Storm": {
        blurb: "A disturbance of the atmosphere producing lightning, rain, or wind, dramatically depicted in movies and games alike.",
        links: ["Lightning", "Weather", "Entertainment"],
      },
      "Energy": {
        blurb: "The capacity to do work, from lightning bolts to the electrical current powering billions of electronic devices worldwide.",
        links: ["Electricity", "Physics", "Lightning"],
      },
      "Electronics": {
        blurb: "The branch of physics dealing with circuits and devices, evolving from radios to personal computers and gaming hardware.",
        links: ["Computer", "Transistor", "Television", "Electricity"],
      },
      "Physics": {
        blurb: "The study of matter and energy, providing the theoretical foundation for electronics, computing, and interactive simulations.",
        links: ["Energy", "Electronics", "Computer"],
      },
      "Transistor": {
        blurb: "A semiconductor device invented in 1947, the building block enabling computers, graphics processors, and modern gaming.",
        links: ["Computer", "Electronics", "Graphics"],
      },
      "Television": {
        blurb: "A medium for visual content, with gaming consoles connecting to TV screens becoming a dominant entertainment platform.",
        links: ["Entertainment", "Electronics", "Console"],
      },
      "Computer": {
        blurb: "A programmable device processing data, evolving from mainframes to the powerful machines running today's interactive entertainment.",
        links: ["Video Games", "Graphics", "Software", "Electronics"],
      },
      "Graphics": {
        blurb: "Visual images created by computer processing, with GPUs enabling increasingly realistic real-time rendering in interactive media.",
        links: ["Video Games", "Computer", "Transistor"],
      },
      "Software": {
        blurb: "Programs and operating data used by computers, including the creative medium of interactive digital entertainment.",
        links: ["Video Games", "Computer", "Console"],
      },
      "Console": {
        blurb: "A dedicated device for playing video games, from early Atari systems to modern PlayStation and Xbox hardware.",
        links: ["Video Games", "Television", "Software"],
      },
      "Entertainment": {
        blurb: "Activities providing amusement, with interactive digital media becoming the largest entertainment sector by revenue.",
        links: ["Video Games", "Television", "Console"],
      },
      "Video Games": {
        blurb: "Interactive electronic entertainment played on screens, a $180+ billion industry surpassing film and music combined.",
        links: ["Computer", "Console", "Graphics"],
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
        blurb: "A wooden string instrument emerging in 16th-century Italy, central to Western classical music and cultural performance.",
        links: ["Italy", "Music", "Orchestra", "Performance"],
      },
      "Italy": {
        blurb: "A southern European country renowned for art, music, and a proud sporting tradition hosting major international events.",
        links: ["Ancient Rome", "Music", "Europe", "Violin"],
      },
      "Music": {
        blurb: "An art form combining sounds for expression, performed at ceremonies and events from concerts to sporting competitions.",
        links: ["Performance", "Orchestra", "Culture", "Violin"],
      },
      "Orchestra": {
        blurb: "A large ensemble of musicians, regularly performing at cultural and sporting ceremonies including Olympic opening events.",
        links: ["Music", "Performance", "Violin", "Culture"],
      },
      "Performance": {
        blurb: "The act of presenting art or skill before an audience, connecting musicians, actors, and athletes through spectacle.",
        links: ["Athletics", "Music", "Culture"],
      },
      "Europe": {
        blurb: "A continent with rich cultural heritage, from Italian music to Greek philosophy, and host to many Olympic Games.",
        links: ["Italy", "Ancient Greece", "Culture", "Athletics"],
      },
      "Ancient Rome": {
        blurb: "One of history's most powerful civilizations, whose Colosseum hosted gladiatorial games as a precursor to organized sport.",
        links: ["Ancient Greece", "Italy", "Colosseum"],
      },
      "Colosseum": {
        blurb: "An ancient Roman amphitheater hosting spectacular games and competitions, seating 50,000 spectators in a prototype for modern stadiums.",
        links: ["Ancient Rome", "Athletics", "Stadium"],
      },
      "Culture": {
        blurb: "The arts, customs, and social institutions of a society, with athletic competition and music deeply woven into civilization.",
        links: ["Performance", "Ancient Greece", "Europe", "Music"],
      },
      "Ancient Greece": {
        blurb: "A civilization making foundational contributions to philosophy, democracy, theater, and athletics, establishing games at Olympia in 776 BC.",
        links: ["Olympics", "Athletics", "Europe", "Ancient Rome"],
      },
      "Athletics": {
        blurb: "Competitive physical sports including running, jumping, and throwing, with roots in ancient Greek competitions at Olympia.",
        links: ["Olympics", "Ancient Greece", "Stadium", "Performance"],
      },
      "Stadium": {
        blurb: "A venue for sports and events, from the ancient Greek stadion at Olympia to modern arenas hosting the world's athletes.",
        links: ["Olympics", "Athletics", "Colosseum"],
      },
      "Olympics": {
        blurb: "The world's foremost multi-sport event held every four years, inspired by the ancient Greek games, revived in Athens in 1896.",
        links: ["Athletics", "Ancient Greece", "Stadium"],
      },
    },
  },
  {
    id: 15,
    start: "Pyramids",
    target: "Electric Car",
    par: 4,
    articles: {
      "Pyramids": {
        blurb: "Monumental structures built as tombs for Egyptian pharaohs, the Great Pyramid being the oldest of the Seven Wonders.",
        links: ["Ancient Egypt", "Architecture", "Desert", "Stone"],
      },
      "Ancient Egypt": {
        blurb: "A Nile River civilization lasting 3,000 years, making remarkable advances in mathematics, medicine, and engineering.",
        links: ["Engineering", "Architecture", "Pyramids", "Science"],
      },
      "Architecture": {
        blurb: "The art of designing structures, from ancient pyramids to modern factories manufacturing the vehicles of the future.",
        links: ["Engineering", "Ancient Egypt", "Design"],
      },
      "Desert": {
        blurb: "Arid regions receiving little rainfall, now among the best locations for solar energy farms powering clean technology.",
        links: ["Solar Energy", "Ancient Egypt", "Pyramids"],
      },
      "Stone": {
        blurb: "Natural solid mineral material used in construction for millennia, from pyramids to the mining of lithium-bearing ores today.",
        links: ["Mining", "Pyramids", "Ancient Egypt"],
      },
      "Engineering": {
        blurb: "The application of science to design and build, from ancient monument construction to modern electrical and automotive systems.",
        links: ["Automotive Industry", "Science", "Architecture", "Electricity"],
      },
      "Science": {
        blurb: "Systematic study of the natural world, from ancient Egyptian mathematics to the chemistry powering clean energy systems.",
        links: ["Engineering", "Electricity", "Solar Energy"],
      },
      "Design": {
        blurb: "The process of creating plans for objects and systems, from architectural blueprints to sleek modern vehicle styling.",
        links: ["Automotive Industry", "Architecture", "Engineering"],
      },
      "Solar Energy": {
        blurb: "Energy harnessed from sunlight using photovoltaic cells, increasingly used to charge the batteries in electric vehicles.",
        links: ["Battery", "Electricity", "Desert"],
      },
      "Mining": {
        blurb: "The extraction of minerals from the earth, including lithium essential for the rechargeable batteries in modern vehicles.",
        links: ["Battery", "Stone", "Science"],
      },
      "Electricity": {
        blurb: "Energy from charged particles, powering everything from ancient-inspired lighting to the motors in battery-powered vehicles.",
        links: ["Battery", "Engineering", "Motor"],
      },
      "Automotive Industry": {
        blurb: "The sector designing and manufacturing vehicles, undergoing its biggest transformation with the shift to electric powertrains.",
        links: ["Electric Car", "Motor", "Engineering", "Design"],
      },
      "Battery": {
        blurb: "A device storing electrical energy chemically, with lithium-ion technology enabling the range needed for practical electric vehicles.",
        links: ["Electric Car", "Electricity", "Solar Energy"],
      },
      "Motor": {
        blurb: "A machine converting energy into mechanical motion, with electric motors now rivaling combustion engines in performance.",
        links: ["Electric Car", "Automotive Industry", "Electricity"],
      },
      "Electric Car": {
        blurb: "An automobile powered by electric motors and rechargeable batteries, projected to dominate new car sales by 2035.",
        links: ["Automotive Industry", "Battery", "Motor"],
      },
    },
  },
];

export default puzzles;

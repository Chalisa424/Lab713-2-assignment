import express, { Request, Response } from 'express';

const app = express();
const port = 3000;
app.set("json spaces", 2);


// เพิ่มการประกาศ interface Book
interface Book {
  title: string;
  author_name: string;
  description: string;
  groups: string[];
}

// เพิ่มการประกาศ interface Event
interface Event {
  name: string;
  category: string;
  description: string;
}


// สร้างตัวแปร books เพื่อเก็บข้อมูล list ของหนังสือ
const books: Book[] = [
    {
      title: "Fullmetal Alchemist",
      author_name: "Hiromu Arakawa",
      description: "Edward and Alphonse Elric break alchemy's ultimate taboo—human transmutation—to revive their mother, but their attempt fails disastrously. Edward loses a leg, Alphonse his body, and Edward sacrifices an arm to bind his brother's soul to armor. Seeking to restore themselves, they pursue the Philosopher's Stone, uncovering sinister truths along the way.",
      groups: ["Group1", "Group2"]
    },
  
    {
      title: "Attack on Titan",
      author_name: "Hajime Isayama",
      description: "In a world where humanity resides within enormous walled cities to escape the monstrous Titans, young Eren Yeager vows to eliminate them after witnessing the destruction of his home. As he joins the military, he uncovers deep conspiracies about the Titans' true origins.",
      groups: ["Group2", "Group3"]
    },
  
    {
      title: "Death Note",
      author_name: "Tsugumi Ohba",
      description: "A high school student, Light Yagami, discovers a mysterious notebook that allows him to kill anyone whose name he writes in it. With his newfound power, he sets out to cleanse the world of criminals, but soon finds himself in a cat-and-mouse game with the genius detective L.",
      groups: ["Group1", "Group3"]
    },
  
    {
      title: "One Piece",
      author_name: "Eiichiro Oda",
      description: "Monkey D. Luffy, a young pirate with the ability to stretch his body like rubber, sets out on a grand adventure to find the legendary One Piece and become the King of the Pirates. Along the way, he gathers a diverse crew and faces formidable foes.",
      groups: ["Group1", "Group2"]
    },
  
    {
      title: "Naruto",
      author_name: "Masashi Kishimoto",
      description: "Naruto Uzumaki, an orphaned ninja, dreams of becoming the strongest ninja and earning the title of Hokage. With the power of the Nine-Tailed Fox sealed within him, he faces many trials, makes loyal friends, and battles powerful enemies to achieve his goal.",
      groups: ["Group2", "Group3"]
    },
  
    {
      title: "Dragon Ball",
      author_name: "Akira Toriyama",
      description: "The adventures of Goku, a powerful martial artist with a pure heart, as he trains, fights powerful enemies, and seeks the mystical Dragon Balls that grant any wish. Along the way, he forms friendships and battles legendary warriors.",
      groups: ["Group1", "Group3"]
    }
  ];

// สร้างตัวแปร events เพื่อเก็บข้อมูล list ของ events
const events: Event[] = [
  {
    name: "Football Match",
    category: "Sports",
    description: "A football match between two local teams."
  },
  {
    name: "Music Concert",
    category: "Music",
    description: "A live music concert featuring popular bands."
  },
  {
    name: "Art Exhibition",
    category: "Art",
    description: "An exhibition showcasing modern art."
  },
  {
    name: "Basketball Game",
    category: "Sports",
    description: "A basketball game between two rival teams."
  }
];

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// เพิ่ม endpoint /books เพื่อคืนค่าหนังสือทั้งหมด
app.get('/books', (req: Request, res: Response) => {
  res.json(books);
});

// เพิ่ม endpoint /events เพื่อกรองข้อมูลตาม category
app.get("/events", (req: Request, res: Response) => {
  const category = req.query.category as string;
  const filteredEvents = events.filter((event) => event.category === category);
  res.json(filteredEvents);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
//http://localhost:3000/events?category=Sports
//event category
// [
//   {
//     "name": "Football Match",
//     "category": "Sports",
//     "description": "A football match between two local teams."
//   },
//   {
//     "name": "Basketball Game",
//     "category": "Sports",
//     "description": "A basketball game between two rival teams."
//   }
// ]
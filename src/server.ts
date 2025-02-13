//Task 11 การสร้าง endpoint เพื่อเพิ่มข้อมูล
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;
app.set("json spaces", 2);

// ใช้ middleware เพื่อรองรับ JSON request body
app.use(express.json());


// เพิ่มการประกาศ interface Book
interface Book {
  id: number;
  title: string;
  author_name: string;
  description: string;
  groups: string[];
  
}

// เพิ่มการประกาศ interface Event
interface Event {
  id: number;
  name: string;
  category: string;
  description: string;
}

// สร้างตัวแปร books เพื่อเก็บข้อมูล list ของหนังสือ
const books: Book[] = [
    {
      id: 1,
      title: "Fullmetal Alchemist",
      author_name: "Hiromu Arakawa",
      description: "Edward and Alphonse Elric break alchemy's ultimate taboo—human transmutation—to revive their mother, but their attempt fails disastrously. Edward loses a leg, Alphonse his body, and Edward sacrifices an arm to bind his brother's soul to armor. Seeking to restore themselves, they pursue the Philosopher's Stone, uncovering sinister truths along the way.",
      groups: ["Group1", "Group2"]
    },
  
    {
      id: 2,
      title: "Attack on Titan",
      author_name: "Hajime Isayama",
      description: "In a world where humanity resides within enormous walled cities to escape the monstrous Titans, young Eren Yeager vows to eliminate them after witnessing the destruction of his home. As he joins the military, he uncovers deep conspiracies about the Titans' true origins.",
      groups: ["Group2", "Group3"]
    },
  
    {
      id: 3,
      title: "Death Note",
      author_name: "Tsugumi Ohba",
      description: "A high school student, Light Yagami, discovers a mysterious notebook that allows him to kill anyone whose name he writes in it. With his newfound power, he sets out to cleanse the world of criminals, but soon finds himself in a cat-and-mouse game with the genius detective L.",
      groups: ["Group1", "Group3"]
    },
  
    {
      id: 4,
      title: "One Piece",
      author_name: "Eiichiro Oda",
      description: "Monkey D. Luffy, a young pirate with the ability to stretch his body like rubber, sets out on a grand adventure to find the legendary One Piece and become the King of the Pirates. Along the way, he gathers a diverse crew and faces formidable foes.",
      groups: ["Group1", "Group2"]
    },
  
    {
      id: 5,
      title: "Naruto",
      author_name: "Masashi Kishimoto",
      description: "Naruto Uzumaki, an orphaned ninja, dreams of becoming the strongest ninja and earning the title of Hokage. With the power of the Nine-Tailed Fox sealed within him, he faces many trials, makes loyal friends, and battles powerful enemies to achieve his goal.",
      groups: ["Group2", "Group3"]
    },
  
    {
      id: 6,
      title: "Dragon Ball",
      author_name: "Akira Toriyama",
      description: "The adventures of Goku, a powerful martial artist with a pure heart, as he trains, fights powerful enemies, and seeks the mystical Dragon Balls that grant any wish. Along the way, he forms friendships and battles legendary warriors.",
      groups: ["Group1", "Group3"]
    }
  ];

// สร้างตัวแปร events เพื่อเก็บข้อมูล list ของ events
const events: Event[] = [
  {
    id: 1,
    name: "Football Match",
    category: "Sports",
    description: "A football match between two local teams."
  },
  {
    id: 2,
    name: "Music Concert",
    category: "Music",
    description: "A live music concert featuring popular bands."
  },
  {
    id: 3,
    name: "Art Exhibition",
    category: "Art",
    description: "An exhibition showcasing modern art."
  },
  {
    id: 4,
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
app.get("/events", (req, res) => {
  if (req.query.category) {
  const category = req.query.category;
  const filteredEvents = events.filter((event) => event.category === category);
  res.json(filteredEvents);
  } else {
  res.json(events);
  }
});

// เพิ่ม endpoint /events/:id เพื่อดึงข้อมูลของ event ตาม id
app.get("/events/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const event = events.find((event) => event.id === id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).send("Event not found");
  }
});

// เพิ่ม endpoint /search-books เพื่อค้นหาหนังสือที่มีชื่อขึ้นต้นด้วยคำที่ระบุเป็น query parameter
app.get('/search-books', (req: Request, res: Response) => {
  const titleQuery = req.query.title as string;
  if (titleQuery) {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().startsWith(titleQuery.toLowerCase())
    );
    res.json(filteredBooks);
  } else {
    res.json([]);
  }
});


// เพิ่ม endpoint /books/:id เพื่อดึงข้อมูลของหนังสือตาม id
app.get("/books/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id); // แปลง id จาก string เป็น number
  const book = books[id - 1]; // หา book โดยใช้ index (id เริ่มที่ 1 แต่ array index เริ่มที่ 0)

  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

app.post("/events", (req, res) => {
  const newEvent: Event = req.body;
  newEvent.id = events.length + 1;
  events.push(newEvent);
  res.json(newEvent);
});

//สร้าง post methods เพื่อเพิ่มข้อมูล
app.post("/books", (req: Request, res: Response) => {
  const newBook: Book = req.body;

  // เช็คว่า id ของหนังสือที่ส่งมามีอยู่ในระบบหรือไม่
  const existingBookIndex = books.findIndex((book) => book.id === newBook.id);
  
  if (existingBookIndex !== -1) {
    // ถ้า id มีอยู่แล้วให้ทำการอัปเดตข้อมูล
    books[existingBookIndex] = newBook;
    res.json({ message: 'Book updated successfully', book: newBook });
  } else {
    // ถ้า id ไม่มีอยู่ในระบบให้เพิ่มข้อมูลใหม่
    books.push(newBook);
    res.json({ message: 'Book added successfully', book: newBook });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
}); 
///เนื่องจาก Task12.1-12.3 มีการใส่ app.use(express.json());ไว้อยู่แล้ว จึง post ข้อมูลได้เลย
/// Task12.4-12.5 POST request ไปที่ http://localhost:3000/books แก้ไขข้อมูลที่ id3 และอัปเดตข้อมูลของหนังสือที่ id: 3 เป็นข้อมูลใหม่ที่ส่งมาใน request และ response


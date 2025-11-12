// This file simulates an API endpoint that would be detected by the system.
// The actual data is used from a file within the app's src directory for bundling.

const BIBLE_VERSES = [
  { book: "John", chapter: 3, verse: 16, text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life." },
  { book: "Romans", chapter: 8, verse: 28, text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose." },
  { book: "Jeremiah", chapter: 29, verse: 11, text: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope." },
  { book: "Philippians", chapter: 4, verse: 13, text: "I can do all things through him who strengthens me." },
  { book: "Proverbs", chapter: 3, verse: 5, text: "Trust in the LORD with all your heart, and do not lean on your own understanding." },
  { book: "Joshua", chapter: 1, verse: 9, text: "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go." },
  { book: "Isaiah", chapter: 41, verse: 10, text: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand." },
  { book: "Matthew", chapter: 6, verse: 33, text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you." },
  { book: "Psalm", chapter: 23, verse: 1, text: "The LORD is my shepherd; I shall not want." },
  { book: "Galatians", chapter: 5, verse: 22, text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness," },
  { book: "Hebrews", chapter: 11, verse: 1, text: "Now faith is the assurance of things hoped for, the conviction of things not seen." },
  { book: "2 Timothy", chapter: 3, verse: 16, text: "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness," },
  { book: "Ephesians", chapter: 2, verse: 8, text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God," },
  { book: "1 Corinthians", chapter: 10, verse: 13, text: "No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape, that you may be able to endure it." },
  { book: "Romans", chapter: 12, verse: 2, text: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect." },
  { book: "Psalm", chapter: 119, verse: 105, text: "Your word is a lamp to my feet and a light to my path." },
  { book: "Isaiah", chapter: 40, verse: 31, text: "but they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint." },
  { book: "Matthew", chapter: 11, verse: 28, text: "Come to me, all who labor and are heavy laden, and I will give you rest." },
  { book: "John", chapter: 14, verse: 6, text: "Jesus said to him, 'I am the way, and the truth, and the life. No one comes to the Father except through me.'" },
  { book: "Proverbs", chapter: 22, verse: 6, text: "Train up a child in the way he should go; even when he is old he will not depart from it." },
  { book: "Romans", chapter: 3, verse: 23, text: "for all have sinned and fall short of the glory of God," },
  { book: "Romans", chapter: 6, verse: 23, text: "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord." },
  { book: "John", chapter: 1, verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
  { book: "Genesis", chapter: 1, verse: 1, text: "In the beginning, God created the heavens and the earth." },
  { book: "Psalm", chapter: 46, verse: 1, text: "God is our refuge and strength, a very present help in trouble." },
  { book: "Psalm", chapter: 1, verse: 1, text: "Blessed is the man who walks not in the counsel of the wicked, nor stands in the way of sinners, nor sits in the seat of scoffers;" },
  { book: "Proverbs", chapter: 1, verse: 7, text: "The fear of the LORD is the beginning of knowledge; fools despise wisdom and instruction." },
  { book: "Ecclesiastes", chapter: 3, verse: 1, text: "For everything there is a season, and a time for every matter under heaven:" },
  { book: "Isaiah", chapter: 53, verse: 5, text: "But he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed." },
  { book: "Matthew", chapter: 28, verse: 19, text: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit," },
  { book: "Acts", chapter: 1, verse: 8, text: "But you will receive power when the Holy Spirit has come upon you, and you will be my witnesses in Jerusalem and in all Judea and Samaria, and to the end of the earth." }
];

/**
 * @param {object} params
 * @param {string} [params.book] - The book to get a verse from.
 * @returns {object} A random bible verse.
 */
function getRandomBibleVerse(params) {
  let verses = BIBLE_VERSES;
  if (params && params.book) {
    const filteredVerses = BIBLE_VERSES.filter(v => v.book.toLowerCase() === params.book.toLowerCase());
    if (filteredVerses.length > 0) {
      verses = filteredVerses;
    }
  }
  const randomIndex = Math.floor(Math.random() * verses.length);
  return verses[randomIndex];
}

module.exports = {
    BIBLE_VERSES,
    getRandomBibleVerse
};

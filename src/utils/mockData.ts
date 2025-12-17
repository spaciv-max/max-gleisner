import { Observable, of } from "rxjs";

export type Engineer = {
  name: string;
  age: number;
  knownLanguages: string[]
}

export type Game = {
  name: string;
  description: string;
  numPlayers: number;
  developer: Engineer;
}

export const mockGames$: Observable<Game[]> = of([
  {
    name: "Pixel Quest",
    description: "A retro-style platformer with challenging levels.",
    numPlayers: 1,
    developer: {
      name: "Alice Johnson",
      age: 29,
      knownLanguages: ["TypeScript", "C#", "Lua"]
    }
  },
  {
    name: "Galactic Arena",
    description: "Fast-paced multiplayer space combat.",
    numPlayers: 8,
    developer: {
      name: "Brian Lee",
      age: 34,
      knownLanguages: ["C++", "Rust", "Python"]
    }
  },
  {
    name: "Dungeon Tactician",
    description: "Turn-based strategy game set in a dark fantasy world.",
    numPlayers: 2,
    developer: {
      name: "Carla Mendes",
      age: 31,
      knownLanguages: ["Java", "Kotlin", "TypeScript"]
    }
  },
  {
    name: "City Architect",
    description: "Design and manage your own futuristic city.",
    numPlayers: 1,
    developer: {
      name: "Daniel Schmidt",
      age: 42,
      knownLanguages: ["C#", "F#", "SQL"]
    }
  },
  {
    name: "Neon Racers",
    description: "Arcade racing with cyberpunk aesthetics.",
    numPlayers: 4,
    developer: {
      name: "Emily Chen",
      age: 27,
      knownLanguages: ["JavaScript", "TypeScript", "GLSL"]
    }
  },
  {
    name: "Mystic Isles",
    description: "Explore magical islands and uncover ancient secrets.",
    numPlayers: 1,
    developer: {
      name: "Felix Novak",
      age: 36,
      knownLanguages: ["C++", "Python", "Lua"]
    }
  },
  {
    name: "Battle Breach",
    description: "Team-based shooter with destructible environments.",
    numPlayers: 10,
    developer: {
      name: "Grace O'Neill",
      age: 33,
      knownLanguages: ["C#", "TypeScript", "HLSL"]
    }
  },
  {
    name: "Farm & Forge",
    description: "Crafting and farming simulation with RPG elements.",
    numPlayers: 2,
    developer: {
      name: "Hiro Tanaka",
      age: 38,
      knownLanguages: ["Java", "Scala", "Python"]
    }
  },
  {
    name: "Sky Kingdoms",
    description: "Build and defend floating kingdoms in the clouds.",
    numPlayers: 6,
    developer: {
      name: "Isabella Rossi",
      age: 28,
      knownLanguages: ["TypeScript", "C++", "Lua"]
    }
  },
  {
    name: "Shadow Protocol",
    description: "Stealth-action game focused on hacking and espionage.",
    numPlayers: 1,
    developer: {
      name: "Jack Wilson",
      age: 41,
      knownLanguages: ["Rust", "C", "Assembly"]
    }
  },

  // --- 40 more games (shortened descriptions for readability) ---
  ...Array.from({ length: 40 }, (_, i) => ({
    name: `Game ${i + 11}`,
    description: `Example game description number ${i + 11}.`,
    numPlayers: (i % 8) + 1,
    developer: {
      name: `Engineer ${i + 11}`,
      age: 25 + (i % 20),
      knownLanguages: [
        ["TypeScript", "JavaScript"],
        ["C++", "Rust"],
        ["Python", "Go"],
        ["C#", "F#"],
        ["Java", "Kotlin"]
      ][i % 5]
    }
  }))
])

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
  developers: number[];
}

export const mockDevelopers$: Observable<Engineer[]> = of(
  Array.from({ length: 40 }, (_, i) => ({
    name: `Developer ${i + 11}`,
    age: i %20 + 20,
    knownLanguages: [
      ["TypeScript", "JavaScript"],
      ["C++", "Rust"],
      ["Python", "Go"],
      ["C#", "F#"],
      ["Java", "Kotlin"]
    ][i % 5]
    }
  ))
)

export const mockGames$: Observable<Game[]> = of([
  {
    name: "Pixel Quest",
    description: "A retro-style platformer with challenging levels.",
    numPlayers: 1,
    developers: [10, 11, 12]
  },
  {
    name: "Galactic Arena",
    description: "Fast-paced multiplayer space combat.",
    numPlayers: 8,
    developers: [14, 21, 32]
  },
  {
    name: "Dungeon Tactician",
    description: "Turn-based strategy game set in a dark fantasy world.",
    numPlayers: 2,
    developers: [5, 8, 6]
  },
  {
    name: "City Architect",
    description: "Design and manage your own futuristic city.",
    numPlayers: 1,
    developers: [0, 9, 39]
  },
  {
    name: "Neon Racers",
    description: "Arcade racing with cyberpunk aesthetics.",
    numPlayers: 4,
    developers: [15, 16, 36]
  },
  {
    name: "Mystic Isles",
    description: "Explore magical islands and uncover ancient secrets.",
    numPlayers: 1,
    developers: [17, 3, 4]
  },
  {
    name: "Battle Breach",
    description: "Team-based shooter with destructible environments.",
    numPlayers: 10,
    developers: [18, 22, 33]
  },
  {
    name: "Farm & Forge",
    description: "Crafting and farming simulation with RPG elements.",
    numPlayers: 2,
    developers: [19, 1, 25]
  },
  {
    name: "Sky Kingdoms",
    description: "Build and defend floating kingdoms in the clouds.",
    numPlayers: 6,
    developers: [6, 8, 18]
  },
  {
    name: "Shadow Protocol",
    description: "Stealth-action game focused on hacking and espionage.",
    numPlayers: 1,
    developers: [23, 32, 30]
  },

  // --- 40 more games (shortened descriptions for readability) ---
  ...Array.from({ length: 40 }, (_, i) => ({
    name: `Game ${i + 11}`,
    description: `Example game description number ${i + 11}.`,
    numPlayers: (i % 8) + 1,
    developers: Array.from({length : Math.floor(Math.random() * 4) + 1}, (_, i) =>Math.floor(Math.random() * 40))
  }
  ))
])

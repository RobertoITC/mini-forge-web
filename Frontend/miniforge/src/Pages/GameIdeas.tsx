import React, { useState } from 'react';
import { BookOpen, Globe, MessageCircle } from 'lucide-react';

interface GameIdea {
    id: number;
    name: string;
    category: 'Miniature Wargame' | 'Board Game';
    description: string;
    printableIdeas: string[];
    image: string; // URL or placeholder
    links: {
        website?: string;
        discord?: string;
    };
}

const ideas: GameIdea[] = [
    {
        id: 1,
        name: 'Warhammer 40,000',
        category: 'Miniature Wargame',
        description:
            'Grimdark sci-fi battles between the Imperium and countless alien hordes.',
        printableIdeas: [
            'Custom chapter shoulder pads',
            'Alternative scenic bases',
            'Servo-skull objective markers',
        ],
        image: 'https://cdn.wccftech.com/wp-content/uploads/2023/05/WCCFwarhammer40kspacemarine2.jpg',
        links: {
            website: 'https://warhammer40000.com',
            discord: 'https://discord.gg/warhammer40k',
        },
    },
    {
        id: 2,
        name: 'Trench Crusade',
        category: 'Miniature Wargame',
        description: 'Dieselpunk holy war fought in endless mud-filled trenches.',
        printableIdeas: [
            'Trench barricades & sandbags',
            'Crusader heraldry bits',
            'Demonic enemy props',
        ],
        image: 'https://images.squarespace-cdn.com/content/v1/637c0a5adafeb04f70309b99/1f333032-50e0-4a34-8007-ce7da7c445e5/Trench+Shrine+keeper.png',
        links: {
            website: 'https://trenchcrusade.com',
        },
    },
    {
        id: 3,
        name: 'Root',
        category: 'Board Game',
        description:
            'Asymmetric woodland warfare starring adorable animal factions.',
        printableIdeas: [
            'Custom faction meeples',
            '3D burrow tokens',
            'Clearings terrain set',
        ],
        image: 'https://cf.geekdo-images.com/JUAUWaVUzeBgzirhZNmHHw__opengraph/img/lnl-mnvbEge_7gtTD-sCxoI5NhY=/0x170:2048x1245/fit-in/1200x630/filters:strip_icc()/pic4254509.jpg',
        links: {
            website: 'https://ledergames.com/products/root',
            discord: 'https://discord.gg/rootgame',
        },
    },
    {
        id: 4,
        name: 'Hegemony',
        category: 'Board Game',
        description:
            'Socio-economic tug-of-war where classes vie for dominance.',
        printableIdeas: [
            'Dual-layer player boards',
            'Economy tracker clips',
            'Influence coin set',
        ],
        image: 'https://i.ytimg.com/vi/Hf2L6uQ50e8/maxresdefault.jpg',
        links: {
            website: 'https://hegemonyrules.com',
        },
    },
    {
        id: 5,
        name: 'Catan',
        category: 'Board Game',
        description:
            'Classic resource-trading and settlement building on modular hexes.',
        printableIdeas: [
            '3D resource tiles',
            'Custom settlements & cities',
            'Sea frame with wave motifs',
        ],
        image: 'https://assets.nintendo.com/image/upload/q_auto/f_auto/ncom/software/switch/70010000068417/f75365bce6cbfbf0e1678f1ce87fe8631234b505149e22a93464120bd8f9b98a',
        links: {
            website: 'https://www.catan.com',
        },
    },
    // ─── Add to the ideas array ──────────────────────────────────────────────

// Miniature Wargames
    {
        id: 6,
        name: 'Infinity',
        category: 'Miniature Wargame',
        description:
            'High-tech, anime-inspired skirmishes where positioning and reaction timing are everything.',
        printableIdeas: [
            'Scatter terrain: futuristic crates & vending machines',
            'Silhouette templates / measuring tools',
            'Custom faction order tokens',
        ],
        image: 'https://assets.corvusbelli.net/infinity-universe/home/pano_2025_.webp',
        links: {
            website: 'https://infinitytheuniverse.com',
            discord: 'https://discord.gg/infinitythegame',
        },
    },
    {
        id: 7,
        name: 'Star Wars: Legion',
        category: 'Miniature Wargame',
        description:
            'Command iconic Star Wars troops and heroes in platoon-level ground battles.',
        printableIdeas: [
            'Desert moisture evaporators & cargo boxes',
            'Alternative lightsaber poses',
            'Objective markers (holodisks, supply crates)',
        ],
        image: 'https://assetsio.gnwcdn.com/star-wars-legion-miniatures-mandalorian-grogu.png?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp',
        links: {
            website: 'https://www.atomicmassgames.com/star-wars-legion',
            discord: 'https://discord.gg/swlegion',
        },
    },
    {
        id: 8,
        name: 'Battletech',
        category: 'Miniature Wargame',
        description:
            'Mech-on-mech warfare across a war-torn galaxy; giant robots, big guns.',
        printableIdeas: [
            'Hex-based rocky outcrops & forest tiles',
            'Custom mech name plates',
            'Heat sink tracker dials',
        ],
        image: 'https://sm.ign.com/ign_ap/review/b/battletech/battletech-review_mdtu.jpg',
        links: {
            website: 'https://bg.battletech.com',
            discord: 'https://discord.gg/battletech',
        },
    },

// Board Games
    {
        id: 9,
        name: 'Gloomhaven',
        category: 'Board Game',
        description:
            'Massive cooperative dungeon-crawl legacy with tactical card-driven combat.',
        printableIdeas: [
            '3D treasure chests & traps',
            'Class-specific initiative trackers',
            'Scenario terrain overlays',
        ],
        image: 'https://cf.geekdo-images.com/sZYp_3BTDGjh2unaZfZmuA__opengraph/img/dCW_XJo_64ZlKvVflRgT-W2ZK8c=/0x0:3500x1838/fit-in/1200x630/filters:strip_icc()/pic2437871.jpg',
        links: {
            website: 'https://cephalofair.com/pages/gloomhaven',
            discord: 'https://discord.gg/gloomhaven',
        },
    },
    {
        id: 10,
        name: 'Scythe',
        category: 'Board Game',
        description:
            'Dieselpunk 1920s engine-builder with mechs and resource management.',
        printableIdeas: [
            'Faction-themed coin sets',
            '3D encounter tokens',
            'Modular river & lake tiles',
        ],
        image: 'https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__opengraph/img/10P2KjknnofwYAqlJkBUXpz0I40=/0x0:4259x2236/fit-in/1200x630/filters:strip_icc()/pic3163924.jpg',
        links: {
            website: 'https://stonemaiergames.com/games/scythe',
            discord: 'https://discord.gg/scythe',
        },
    },
    {
        id: 11,
        name: 'Spirit Island',
        category: 'Board Game',
        description:
            'Asymmetric co-op where island spirits defend their home from colonizers.',
        printableIdeas: [
            'Spirit presence tokens shaped like element symbols',
            '3D invader buildings & blight markers',
            'Energy tracker dials',
        ],
        image: 'https://cf.geekdo-images.com/kjCm4ZvPjIZxS-mYgSPy1g__opengraph/img/QryNeb0O2AHNe521HAsddL3E8Wg=/0x0:1680x882/fit-in/1200x630/filters:strip_icc()/pic7013651.jpg',
        links: {
            website: 'https://greaterthangames.com/spirit-island',
            discord: 'https://discord.gg/spiritisland',
        },
    },
];

const GamesIdeas: React.FC = () => {
    const [filter, setFilter] = useState<'All' | 'Miniature Wargame' | 'Board Game'>('All');

    const filtered = filter === 'All' ? ideas : ideas.filter(i => i.category === filter);

    return (
        <div className="min-h-screen bg-[#F7E9E9] py-12 px-6">
            <div className="container mx-auto space-y-10">
                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-[#561412] flex justify-center gap-2 items-center">
                        <BookOpen className="w-8 h-8" />
                        MiniForge Inspiration Library
                    </h1>
                    <p className="text-[#561412] max-w-2xl mx-auto">
                        Discover popular miniature wargames and board games, plus ideas for 3D-printable upgrades you can commission through MiniForge.
                    </p>
                </header>

                {/* Filter */}
                <div className="flex justify-center gap-4">
                    {(['All', 'Miniature Wargame', 'Board Game'] as const).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full border transition ${
                                filter === cat
                                    ? 'bg-[#AB2724] text-white border-[#AB2724]'
                                    : 'border-[#AB2724] text-[#AB2724] hover:bg-[#AB2724]/10'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Cards grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(game => (
                        <div key={game.id} className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
                            {/* Image */}
                            {game.image ? (
                                <img
                                    src={game.image}
                                    alt={game.name}
                                    className="w-full h-40 object-cover"
                                />
                            ) : (
                                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-xl font-semibold text-[#561412] mb-2">{game.name}</h2>
                                <p className="text-sm text-gray-700 flex-1 mb-4">{game.description}</p>

                                <h3 className="font-semibold text-[#AB2724] mb-2 text-sm">3D-Printable Ideas</h3>
                                <ul className="list-disc list-inside text-sm text-[#561412] space-y-1 mb-4">
                                    {game.printableIdeas.map(i => (
                                        <li key={i}>{i}</li>
                                    ))}
                                </ul>

                                {/* Links */}
                                <div className="flex gap-4 mb-4">
                                    {game.links.website && (
                                        <a
                                            href={game.links.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-[#AB2724] hover:underline text-sm"
                                        >
                                            <Globe className="w-4 h-4" /> Website
                                        </a>
                                    )}
                                    {game.links.discord && (
                                        <a
                                            href={game.links.discord}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-[#AB2724] hover:underline text-sm"
                                        >
                                            <MessageCircle className="w-4 h-4" /> Discord
                                        </a>
                                    )}
                                </div>

                                <button className="mt-auto inline-block bg-[#AB2724] text-white text-sm px-4 py-2 rounded hover:bg-[#781B19] transition">
                                    Start a Request
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default GamesIdeas;
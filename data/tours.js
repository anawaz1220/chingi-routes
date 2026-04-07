/**
 * Chingi Tours – Route Data Configuration
 * ----------------------------------------
 * To add a new tour: add an entry to the relevant group's `tours` array.
 * To add a new country/region: add a new group object to TOUR_GROUPS.
 * Coordinates format: [latitude, longitude]
 * Note: locations marked (*) use approximate coordinates.
 */

const TOUR_GROUPS = [
  {
    id: "mauritania",
    name: "Mauritania",
    flag: "🇲🇷",
    tours: [

      // ─── Tour 1 ───────────────────────────────────────────────────────────
      {
        id: "adrar-short",
        name: "Adrar Tour Short",
        duration: "4 Days",
        color: "#27ae60",
        days: [
          {
            day: 1,
            title: "Day 1 – Nouakchott",
            description: "Departure from Nouakchott, the capital city of Mauritania.",
            stops: [
              { name: "Nouakchott", coords: [18.0858, -15.9785] }
            ]
          },
          {
            day: 2,
            title: "Day 2 – Desert & Oasis",
            description: "Drive to Terjit Oasis and Mhaireth Oasis, overnight in Chinguetti.",
            stops: [
              { name: "Terjit Oasis", coords: [20.2500, -13.1000] },
              { name: "Mhaireth Oasis", coords: [20.2772, -13.0041] },
              { name: "Chinguetti", coords: [20.4580, -12.3667] }
            ]
          },
          {
            day: 3,
            title: "Day 3 – Iron Ore Train",
            description: "Drive via Atar to Choum, board the legendary Iron Ore Train to Nouadhibou.",
            stops: [
              { name: "Atar", coords: [20.5200, -13.0508] },
              { name: "Choum", coords: [21.2975, -13.0668] },
              { name: "Nouadhibou", coords: [20.9310, -17.0347] }
            ]
          },
          {
            day: 4,
            title: "Day 4 – Return",
            description: "Transfer from Nouadhibou back to Nouakchott.",
            stops: [
              { name: "Nouakchott", coords: [18.0858, -15.9785] }
            ]
          }
        ]
      },

      // ─── Tour 2 ───────────────────────────────────────────────────────────
      {
        id: "adrar-standard",
        name: "Adrar Tour Standard",
        duration: "7 Days",
        color: "#e74c3c",
        days: [
          {
            day: 1,
            title: "Day 1 – Nouakchott",
            description: "Departure from Nouakchott, the capital city of Mauritania.",
            stops: [
              { name: "Nouakchott", coords: [18.0858, -15.9785] }
            ]
          },
          {
            day: 2,
            title: "Day 2 – Azoueiga Dunes",
            description: "Drive northeast to the spectacular Azoueiga sand dunes.",
            stops: [
              { name: "Azoueiga Dunes", coords: [19.8689, -13.5055] }
            ]
          },
          {
            day: 3,
            title: "Day 3 – Oases & Ouadane",
            description: "Visit Terjit Oasis and Mhaireth Oasis, then continue to Ouadane.",
            stops: [
              { name: "Terjit Oasis", coords: [20.2500, -13.1000] },
              { name: "Mhaireth Oasis", coords: [20.2772, -13.0041] },
              { name: "Ouadane", coords: [20.9332, -11.6173] }
            ]
          },
          {
            day: 4,
            title: "Day 4 – Eye of the Sahara",
            description: "Visit Guilb er Richat, Tanouchert Oasis, and overnight in Chinguetti.",
            stops: [
              { name: "Eye of the Sahara", coords: [21.1216, -11.4022] },
              { name: "Ouadane", coords: [20.9332, -11.6173] },
              { name: "Tanouchert Oasis", coords: [20.7188, -11.8824] },
              { name: "Chinguetti", coords: [20.4580, -12.3667] }
            ]
          },
          {
            day: 5,
            title: "Day 5 – Ben Amera",
            description: "Drive via Fort Saganne, Agrour, and Atar to the monolith Ben Amera and Ben Aicha.",
            stops: [
              { name: "Fort Saganne", coords: [20.5426, -12.8006] },
              { name: "Agrour", coords: [20.5397, -12.7749] },
              { name: "Atar", coords: [20.5200, -13.0508] },
              { name: "Ben Amera", coords: [21.2292, -13.6594] },
              { name: "Ben Aicha", coords: [21.2940, -13.6957] }
            ]
          },
          {
            day: 6,
            title: "Day 6 – Iron Ore Train",
            description: "Drive to Choum Tunnel and Choum, board the Iron Ore Train to Nouadhibou.",
            stops: [
              { name: "Choum Tunnel", coords: [21.3285, -13.0019] },
              { name: "Choum", coords: [21.2975, -13.0668] },
              { name: "Nouadhibou", coords: [20.9310, -17.0347] }
            ]
          },
          {
            day: 7,
            title: "Day 7 – Return",
            description: "Arrival in Nouadhibou, then transfer to Nouakchott.",
            stops: [
              { name: "Nouakchott", coords: [18.0858, -15.9785] }
            ]
          }
        ]
      },

      // ─── Tour 3 ───────────────────────────────────────────────────────────
      {
        id: "adrar-extended",
        name: "Adrar Tour Extended",
        duration: "13 Days",
        color: "#2980b9",
        days: [
          {
            day: 1,
            title: "Day 1 – Nouakchott",
            description: "City tour: camel market, Port de Pêche, Marché Capitale, tea at the beach.",
            stops: [
              { name: "Nouakchott", coords: [18.0858, -15.9785] }
            ]
          },
          {
            day: 2,
            title: "Day 2 – Banc d'Arguin",
            description: "Drive north along the Atlantic coast to Banc d'Arguin National Park.",
            stops: [
              { name: "Banc d'Arguin National Park", coords: [19.8993, -16.2980] }
            ]
          },
          {
            day: 3,
            title: "Day 3 – Azoueiga Dunes",
            description: "Journey east to the magnificent Azoueiga sand dunes.",
            stops: [
              { name: "Azoueiga Dunes", coords: [19.8665, -13.5485] }
            ]
          },
          {
            day: 4,
            title: "Day 4 – Terjit & Atar",
            description: "Visit Terjit Oasis, Mhaireth Oasis, then overnight in the historic town of Atar.",
            stops: [
              { name: "Terjit Oasis", coords: [20.2500, -13.1000] },
              { name: "Mhaireth Oasis", coords: [20.2779, -13.0023] },
              { name: "Atar", coords: [20.5200, -13.0508] }
            ]
          },
          {
            day: 5,
            title: "Day 5 – Desert Crossing",
            description: "Cross via Jraif, Sebkha Chemchane salt flat, and El Beyyed.",
            stops: [
              { name: "Jraif", coords: [20.8519, -12.4510] },
              { name: "Sebkha Chemchane", coords: [21.0658, -12.1828] },
              { name: "El Beyyed", coords: [21.5296, -11.3383] }
            ]
          },
          {
            day: 6,
            title: "Day 6 – Northern Adrar",
            description: "Explore Bir Ziri, El Ghallaouiya, and the ancient caravan route Trig Sbil.",
            stops: [
              { name: "Bir Ziri", coords: [21.5524, -10.7835] },
              { name: "El Ghallaouiya", coords: [21.5872, -10.5996] },
              { name: "Trig Sbil", coords: [21.5406, -10.5855] }
            ]
          },
          {
            day: 7,
            title: "Day 7 – Eye of the Sahara & Ouadane",
            description: "Visit Guilb er Richat (Eye of the Sahara) and the UNESCO city of Ouadane.",
            stops: [
              { name: "Eye of the Sahara", coords: [21.1216, -11.4022] },
              { name: "Ouadane", coords: [20.9332, -11.6173] }
            ]
          },
          {
            day: 8,
            title: "Day 8 – Chinguetti",
            description: "Drive via Tanouchert Oasis to the holy city of Chinguetti.",
            stops: [
              { name: "Tanouchert Oasis", coords: [20.7188, -11.8824] },
              { name: "Chinguetti", coords: [20.4580, -12.3667] }
            ]
          },
          {
            day: 9,
            title: "Day 9 – Entkemkemt Oasis",
            description: "Explore Chinguetti and discover the hidden Entkemkemt Oasis.",
            stops: [
              { name: "Entkemkemt Oasis", coords: [20.4890, -12.3275] }
            ]
          },
          {
            day: 10,
            title: "Day 10 – Fort Saganne & Agrour",
            description: "Visit Fort Saganne and Agrour ruins.",
            stops: [
              { name: "Fort Saganne", coords: [20.5426, -12.8006] },
              { name: "Agrour", coords: [20.5397, -12.7749] }
            ]
          },
          {
            day: 11,
            title: "Day 11 – Ben Amira",
            description: "Visit Ben Amira, one of the largest monoliths in the world.",
            stops: [
              { name: "Ben Amira", coords: [21.2292, -13.6594] }
            ]
          },
          {
            day: 12,
            title: "Day 12 – Iron Ore Train",
            description: "Drive to Choum Tunnel and Choum, begin the legendary Iron Ore Train journey.",
            stops: [
              { name: "Choum Tunnel", coords: [21.3285, -13.0019] },
              { name: "Choum", coords: [21.2975, -13.0668] },
              { name: "Nouadhibou", coords: [20.9310, -17.0347] }
            ]
          },
          {
            day: 13,
            title: "Day 13 – Return",
            description: "Arrival in Nouadhibou, city tour, then fly to Nouakchott.",
            stops: [
              { name: "Nouakchott", coords: [18.0858, -15.9785] }
            ]
          }
        ]
      },

      // ─── Tour 4 ───────────────────────────────────────────────────────────
      {
        id: "adrar-tagant-aoukar",
        name: "Adrar Tagant Aoukar Tour",
        duration: "15 Days",
        color: "#e67e22",
        days: [
          {
            day: 1,
            title: "Day 1 – Nouakchott",
            description: "Departure from Nouakchott.",
            stops: [
              { name: "Nouakchott", coords: [18.0858, -15.9785] }
            ]
          },
          {
            day: 2,
            title: "Day 2 – Banc d'Arguin",
            description: "Drive north to Banc d'Arguin National Park, a UNESCO World Heritage Site.",
            stops: [
              { name: "Banc d'Arguin National Park", coords: [19.8843, -16.2954] }
            ]
          },
          {
            day: 3,
            title: "Day 3 – Diawling National Park",
            description: "Journey south to Diawling National Park near the Senegal River delta.",
            stops: [
              { name: "Diawling National Park", coords: [16.5134, -16.2903] }
            ]
          },
          {
            day: 4,
            title: "Day 4 – Bogue",
            description: "Drive east along the Senegal River to the town of Bogue.",
            stops: [
              { name: "Bogue", coords: [16.5872, -14.2723] }
            ]
          },
          {
            day: 5,
            title: "Day 5 – Tagant Region",
            description: "Explore Aleg, Kamour, Kiffa, and the Guelta Metraucha water source.",
            stops: [
              { name: "Aleg", coords: [17.0578, -13.9218] },
              { name: "Kamour", coords: [17.0739, -12.0370] },
              { name: "Kiffa", coords: [16.6227, -11.4046] },
              { name: "Guelta Metraucha", coords: [16.5352, -10.7873] }
            ]
          },
          {
            day: 6,
            title: "Day 6 – Néma",
            description: "Drive east through Ayoun el Atrous to Néma in eastern Mauritania.",
            stops: [
              { name: "Ayoun el Atrous", coords: [16.6630, -9.6029] },
              { name: "Néma", coords: [16.6208, -7.2590] }
            ]
          },
          {
            day: 7,
            title: "Day 7 – Oualata",
            description: "Visit Oualata, a UNESCO World Heritage ancient caravan city.",
            stops: [
              { name: "Oualata", coords: [17.2994, -7.0197] }
            ]
          },
          {
            day: 8,
            title: "Day 8 – Rock Formations",
            description: "Explore the Elephant Rock and Finger Rock at Es Sba.",
            stops: [
              { name: "Elephant Rock / Finger Rock (Es Sba)", coords: [18.4012, -8.5741] }
            ]
          },
          {
            day: 9,
            title: "Day 9 – Tichitt",
            description: "Drive west via Akreijit to the cliff town of Tichitt.",
            stops: [
              { name: "Akreijit", coords: [18.4022, -9.2537] },
              { name: "Tichitt", coords: [18.4531, -9.5167] }
            ]
          },
          {
            day: 10,
            title: "Day 10 – Tidjikja",
            description: "Drive west to Tidjikja, capital of the Tagant region.",
            stops: [
              { name: "Tidjikja", coords: [18.5545, -11.4235] }
            ]
          },
          {
            day: 11,
            title: "Day 11 – Adrar Oases",
            description: "Cross Wadi Timinit then visit Terjit Oasis and Mhaireth Oasis.",
            stops: [
              { name: "Wadi Timinit", coords: [19.9143, -12.8918] },
              { name: "Terjit Oasis", coords: [20.2500, -13.1000] },
              { name: "Mhaireth Oasis", coords: [20.2772, -13.0041] }
            ]
          },
          {
            day: 12,
            title: "Day 12 – Eye of the Sahara",
            description: "Visit Ouadane and the spectacular Guilb er Richat (Eye of the Sahara).",
            stops: [
              { name: "Ouadane", coords: [20.9332, -11.6173] },
              { name: "Eye of the Sahara", coords: [21.1216, -11.4022] }
            ]
          },
          {
            day: 13,
            title: "Day 13 – Chinguetti",
            description: "Explore Tanouchert Oasis and the holy city of Chinguetti.",
            stops: [
              { name: "Tanouchert Oasis", coords: [20.7188, -11.8824] },
              { name: "Chinguetti", coords: [20.4580, -12.3667] }
            ]
          },
          {
            day: 14,
            title: "Day 14 – Iron Ore Train",
            description: "Drive via Atar to Choum Tunnel, board the Iron Ore Train to Nouadhibou.",
            stops: [
              { name: "Atar", coords: [20.5200, -13.0508] },
              { name: "Choum Tunnel", coords: [21.3285, -13.0019] },
              { name: "Choum", coords: [21.2977, -13.0651] },
              { name: "Nouadhibou", coords: [20.9310, -17.0347] }
            ]
          },
          {
            day: 15,
            title: "Day 15 – Airport Transfer",
            description: "Nouadhibou to Nouakchott. Airport transfer.",
            stops: [
              { name: "Nouakchott", coords: [18.0858, -15.9785] }
            ]
          }
        ]
      },

      // ─── Tour 5 ───────────────────────────────────────────────────────────
      {
        id: "camel-tour",
        name: "Camel Tour Adrar",
        duration: "10 Days",
        color: "#8e44ad",
        days: [
          {
            day: 1,
            title: "Day 1 – Departure",
            description: "Depart from Nouakchott.",
            stops: [
              { name: "Nouakchott", coords: [18.088513, -15.960831] }
            ]
          },
          {
            day: 2,
            title: "Day 2 – Drive to Azoueiga",
            description: "Drive through Akjoujt to the Azoueiga sand dunes.",
            stops: [
              { name: "Akjoujt", coords: [19.744944, -14.379532] },
              { name: "Azoueiga Dunes", coords: [19.867443, -13.539698] }
            ]
          },
          {
            day: 3,
            title: "Day 3 – Tivoujar & Singing Dune",
            description: "Trek through Tivoujar Pass and camp near the resonant Singing Dune.",
            stops: [
              { name: "Tivoujar Pass", coords: [20.098206, -13.20124] },
              { name: "Singing Dune", coords: [20.1521, -13.224641] }
            ]
          },
          {
            day: 4,
            title: "Day 4 – Zweigiya",
            description: "Camel trek through the remote landscapes of Zweigiya.",
            stops: [
              { name: "Zweigiya", coords: [20.268966, -13.134207] }
            ]
          },
          {
            day: 5,
            title: "Day 5 – Terjit Oasis",
            description: "Visit the lush Terjit Oasis, then cross Pass Tourvine by camel.",
            stops: [
              { name: "Terjit Oasis", coords: [20.253067, -13.08793] },
              { name: "Pass Tourvine", coords: [20.259317, -13.104356] }
            ]
          },
          {
            day: 6,
            title: "Day 6 – Ichiv",
            description: "Camel trek to Ichiv camp.",
            stops: [
              { name: "Ichiv", coords: [20.243755, -13.050993] }
            ]
          },
          {
            day: 7,
            title: "Day 7 – Ichiv Rest Day",
            description: "Rest day at Ichiv camp, enjoying the desert silence.",
            stops: [
              { name: "Ichiv", coords: [20.243755, -13.050993] }
            ]
          },
          {
            day: 8,
            title: "Day 8 – Mhaireth & Zarga Desert",
            description: "Trek to Mhaireth Oasis and explore the Zarga Desert.",
            stops: [
              { name: "Mhaireth Oasis", coords: [20.2772, -13.0041] },
              { name: "Zarga Desert", coords: [20.40, -12.60] }
            ]
          },
          {
            day: 9,
            title: "Day 9 – Chinguetti & Tanouchert",
            description: "Arrive in Chinguetti, visit Tanouchert Oasis.",
            stops: [
              { name: "Chinguetti", coords: [20.4580, -12.3667] },
              { name: "Tanouchert Oasis", coords: [20.7188, -11.8824] }
            ]
          },
          {
            day: 10,
            title: "Day 10 – Ouadane, Eye of the Sahara & Return",
            description: "Visit Ouadane, Eye of the Sahara, Fort Saganne, drive through Seguellil back to Nouakchott.",
            stops: [
              { name: "Ouadane", coords: [20.9332, -11.6173] },
              { name: "Eye of the Sahara", coords: [21.1216, -11.4022] },
              { name: "Fort Saganne", coords: [20.5426, -12.8006] },
              { name: "Atar", coords: [20.5175, -13.0474] },
              { name: "Seguellil", coords: [20.244868, -13.397906] },
              { name: "Nouakchott", coords: [18.088513, -15.960831] }
            ]
          }
        ]
      }

    ] // end tours
  },
  // ── Coming Soon ──────────────────────────────────────────────────────────
  {
    id: "senegal",
    name: "Senegal",
    flag: "🇸🇳",
    comingSoon: true,
    tours: []
  },
  {
    id: "gambia",
    name: "Gambia",
    flag: "🇬🇲",
    comingSoon: true,
    tours: []
  }
];

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
            description: "Drive via Atar and Choum Tunnel to Choum, board the legendary Iron Ore Train overnight.",
            stops: [
              { name: "Atar", coords: [20.5200, -13.0508] },
              { name: "Choum Tunnel", coords: [21.3285, -13.0019] },
              { name: "Choum", coords: [21.2975, -13.0668] }
            ]
          },
          {
            day: 4,
            title: "Day 4 – Arrival Nouadhibou & Return",
            description: "Arrive in Nouadhibou after the overnight train, then transfer back to Nouakchott.",
            stops: [
              { name: "Nouadhibou", coords: [21.0408, -17.0319] },
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
            description: "Drive to Choum Tunnel and Choum, board the Iron Ore Train overnight.",
            stops: [
              { name: "Choum Tunnel", coords: [21.3285, -13.0019] },
              { name: "Choum", coords: [21.2975, -13.0668] }
            ]
          },
          {
            day: 7,
            title: "Day 7 – Arrival Nouadhibou & Return",
            description: "Arrive in Nouadhibou after the overnight train, then transfer to Nouakchott.",
            stops: [
              { name: "Nouadhibou", coords: [20.9310, -17.0347] },
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
            title: "Day 11 – Ben Amira & Ben Aicha",
            description: "Visit Ben Amira and Ben Aicha, two of the largest monoliths in the world.",
            stops: [
              { name: "Ben Amira", coords: [21.2292, -13.6594] },
              { name: "Ben Aicha", coords: [21.2943, -13.6957] }
            ]
          },
          {
            day: 12,
            title: "Day 12 – Iron Ore Train",
            description: "Drive to Choum Tunnel and Choum, begin the legendary Iron Ore Train journey overnight.",
            stops: [
              { name: "Choum Tunnel", coords: [21.3285, -13.0019] },
              { name: "Choum", coords: [21.2975, -13.0668] }
            ]
          },
          {
            day: 13,
            title: "Day 13 – Arrival Nouadhibou & Return",
            description: "Arrive in Nouadhibou after the overnight train, city tour, then fly to Nouakchott.",
            stops: [
              { name: "Nouadhibou", coords: [20.9054, -17.0555] },
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
            description: "Drive via Atar to Choum Tunnel, board the Iron Ore Train overnight.",
            stops: [
              { name: "Atar", coords: [20.5200, -13.0508] },
              { name: "Choum Tunnel", coords: [21.3285, -13.0019] },
              { name: "Choum", coords: [21.2977, -13.0651] }
            ]
          },
          {
            day: 15,
            title: "Day 15 – Arrival Nouadhibou & Airport Transfer",
            description: "Arrive in Nouadhibou after the overnight train, then transfer to Nouakchott.",
            stops: [
              { name: "Nouadhibou", coords: [20.9834, -17.0322] },
              { name: "Nouakchott", coords: [18.0858, -15.9785] }
            ]
          }
        ]
      },

      // ─── Tour 5 ───────────────────────────────────────────────────────────
      {
        id: "camel-tour",
        name: "Camel Tour Adrar",
        duration: "11 Days",
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
            title: "Day 10 – Ouadane & Eye of the Sahara",
            description: "Visit Ouadane, Eye of the Sahara, Fort Saganne, and Atar.",
            stops: [
              { name: "Ouadane", coords: [20.9332, -11.6173] },
              { name: "Eye of the Sahara", coords: [21.1216, -11.4022] },
              { name: "Fort Saganne", coords: [20.5426, -12.8006] },
              { name: "Atar", coords: [20.5175, -13.0474] }
            ]
          },
          {
            day: 11,
            title: "Day 11 – Seguellil & Return",
            description: "Drive through Seguellil back to Nouakchott.",
            stops: [
              { name: "Seguellil", coords: [20.244868, -13.397906] },
              { name: "Nouakchott", coords: [18.088513, -15.960831] }
            ]
          }
        ]
      }

    ] // end tours
  },
  // ── Senegal ──────────────────────────────────────────────────────────────
  {
    id: "senegal",
    name: "Senegal",
    flag: "🇸🇳",
    tours: [

      // ─── Tour 1 ───────────────────────────────────────────────────────────
      {
        id: "boat-tour",
        name: "Senegal River Boat Tour",
        duration: "7 Days",
        color: "#1abc9c",
        days: [
          {
            day: 1,
            title: "Day 1 – Departure from Dakar",
            description: "Departure from Dakar, the vibrant gateway to West Africa.",
            stops: [
              { name: "Dakar", coords: [14.7286, -17.4573] }
            ]
          },
          {
            day: 2,
            title: "Day 2 – Kayar & Lompoul Desert",
            description: "Drive north via the fishing village of Kayar to the magical Lompoul Desert.",
            stops: [
              { name: "Kayar", coords: [14.9197, -17.1173] },
              { name: "Lompoul Desert", coords: [15.4668, -16.6860] }
            ]
          },
          {
            day: 3,
            title: "Day 3 – Podor",
            description: "Journey to the historic river town of Podor on the Senegal River.",
            stops: [
              { name: "Podor", coords: [16.6523, -14.9540] }
            ]
          },
          {
            day: 4,
            title: "Day 4 – Dagana",
            description: "Continue along the Senegal River to the town of Dagana.",
            stops: [
              { name: "Dagana", coords: [16.5199, -15.5050] }
            ]
          },
          {
            day: 5,
            title: "Day 5 – Richard Toll & Rosso",
            description: "Visit the sugar town of Richard Toll and cross to Rosso at the Mauritanian border.",
            stops: [
              { name: "Richard Toll", coords: [16.4693, -15.6878] },
              { name: "Rosso", coords: [16.5034, -15.8098] }
            ]
          },
          {
            day: 6,
            title: "Day 6 – Djoudj National Park & Saint-Louis",
            description: "Explore Djoudj Bird Sanctuary then visit the colonial UNESCO city of Saint-Louis.",
            stops: [
              { name: "Djoudj National Park", coords: [16.4221, -16.3051] },
              { name: "Saint-Louis", coords: [16.0267, -16.4964] }
            ]
          },
          {
            day: 7,
            title: "Day 7 – Langue de Barbarie & Return",
            description: "Visit Langue de Barbarie National Park and return south to Dakar.",
            stops: [
              { name: "Langue de Barbarie", coords: [15.8294, -16.5159] },
              { name: "Dakar", coords: [14.7286, -17.4573] }
            ]
          }
        ]
      },

      // ─── Tour 2 ───────────────────────────────────────────────────────────
      {
        id: "senegal-national-parks",
        name: "Senegal National Parks Tour",
        duration: "7 Days",
        color: "#f39c12",
        days: [
          {
            day: 1,
            title: "Day 1 – Dakar",
            description: "Arrival in Dakar, the vibrant capital of Senegal.",
            stops: [
              { name: "Dakar", coords: [14.7406, -17.4381] }
            ]
          },
          {
            day: 2,
            title: "Day 2 – Kayar & Lompoul Desert",
            description: "Drive north to the fishing village of Kayar then into the golden Lompoul Desert.",
            stops: [
              { name: "Kayar", coords: [14.9179, -17.1222] },
              { name: "Lompoul Desert", coords: [15.4643, -16.6878] }
            ]
          },
          {
            day: 3,
            title: "Day 3 – Thiès & Keur Moussa Abbey",
            description: "Visit the city of Thiès and the famous Benedictine Monastery of Keur Moussa.",
            stops: [
              { name: "Thiès", coords: [14.8034, -16.9224] },
              { name: "Keur Moussa Abbey", coords: [14.7776, -17.1245] }
            ]
          },
          {
            day: 4,
            title: "Day 4 – Bandia Wildlife Reserve, Popenguine & Mbour",
            description: "Explore Bandia Wildlife Reserve, visit Popenguine, and overnight in Mbour.",
            stops: [
              { name: "Bandia Wildlife Reserve", coords: [14.5768, -17.0049] },
              { name: "Popenguine", coords: [14.5558, -17.0858] },
              { name: "Mbour", coords: [14.4208, -16.9718] }
            ]
          },
          {
            day: 5,
            title: "Day 5 – Joal-Fadiouth & Fadial",
            description: "Visit the shell-island of Joal-Fadiouth and the baobab groves of Fadial.",
            stops: [
              { name: "Joal-Fadiouth", coords: [14.1526, -16.8230] },
              { name: "Fadial", coords: [14.1626, -16.7667] }
            ]
          },
          {
            day: 6,
            title: "Day 6 – Delta du Saloum & Toubacouta",
            description: "Explore the UNESCO Delta du Saloum and overnight in Toubacouta.",
            stops: [
              { name: "Delta du Saloum", coords: [13.8319, -16.5082] },
              { name: "Toubacouta", coords: [13.7845, -16.4697] }
            ]
          },
          {
            day: 7,
            title: "Day 7 – Mbour & Return to Dakar",
            description: "Drive north via Mbour and return to Dakar.",
            stops: [
              { name: "Mbour", coords: [14.4208, -16.9715] },
              { name: "Dakar", coords: [14.7406, -17.4381] }
            ]
          }
        ]
      },

      // ─── Tour 3 ───────────────────────────────────────────────────────────
      {
        id: "dindefelo-tour",
        name: "Dindefelo Tour",
        duration: "12 Days",
        color: "#9b59b6",
        days: [
          {
            day: 1,
            title: "Day 1 – Departure from Dakar",
            description: "Departure from Dakar heading south towards Senegambia.",
            stops: [
              { name: "Dakar", coords: [14.7255, -17.4405] }
            ]
          },
          {
            day: 2,
            title: "Day 2 – Bandia Wildlife Reserve & Saly",
            description: "Visit Bandia Wildlife Reserve then relax at the beach resort of Saly Portudal.",
            stops: [
              { name: "Bandia Wildlife Reserve", coords: [14.5972, -16.9694] },
              { name: "Saly Portudal", coords: [14.4474, -17.0066] }
            ]
          },
          {
            day: 3,
            title: "Day 3 – Kaolack & Niokolo-Koba",
            description: "Drive through Kaolack and enter the vast Niokolo-Koba National Park.",
            stops: [
              { name: "Kaolack", coords: [14.1391, -16.0716] },
              { name: "Niokolo-Koba National Park", coords: [13.7782, -13.6553] }
            ]
          },
          {
            day: 4,
            title: "Day 4 – Kédougou & Leontine",
            description: "Arrive in Kédougou in the Fouta Djallon foothills and visit Leontine village.",
            stops: [
              { name: "Kédougou", coords: [12.5584, -12.1917] },
              { name: "Leontine", coords: [12.4124, -12.2833] }
            ]
          },
          {
            day: 5,
            title: "Day 5 – Dindefelo Highlands & Bassari Land",
            description: "Hike to the spectacular Dindefelo waterfall and explore Bassari Land.",
            stops: [
              { name: "Dindefelo", coords: [12.3835, -12.3251] },
              { name: "Bassari Land", coords: [12.5951, -12.7758] }
            ]
          },
          {
            day: 6,
            title: "Day 6 – Niokolo-Koba & Mako",
            description: "Return through Niokolo-Koba National Park and overnight in Mako.",
            stops: [
              { name: "Niokolo-Koba National Park", coords: [13.0021, -13.0401] },
              { name: "Mako", coords: [12.9361, -13.0184] }
            ]
          },
          {
            day: 7,
            title: "Day 7 – Basse Santa Su",
            description: "Cross into The Gambia and reach Basse Santa Su on the upper Gambia River.",
            stops: [
              { name: "Basse Santa Su", coords: [13.3043, -14.1951] }
            ]
          },
          {
            day: 8,
            title: "Day 8 – Janjanbureh, River Gambia NP & Kuntaur",
            description: "Visit the historic island of Janjanbureh, River Gambia National Park, and Kuntaur.",
            stops: [
              { name: "Janjanbureh", coords: [13.5252, -14.7141] },
              { name: "River Gambia National Park", coords: [13.6851, -14.9342] },
              { name: "Kuntaur", coords: [13.6572, -14.8919] }
            ]
          },
          {
            day: 9,
            title: "Day 9 – Soma, Juffure & Banjul",
            description: "Drive via Soma to Juffure, the ancestral home of Kunta Kinte, then Banjul.",
            stops: [
              { name: "Soma", coords: [13.4443, -15.5375] },
              { name: "Juffure", coords: [13.3939, -16.3560] },
              { name: "Fort James Island", coords: [13.3175, -16.3615] },
              { name: "Banjul", coords: [13.4563, -16.5878] }
            ]
          },
          {
            day: 10,
            title: "Day 10 – Kachikally, Delta du Saloum & Toubakouta",
            description: "Visit Kachikally Crocodile Pool then cross into Senegal via Delta du Saloum.",
            stops: [
              { name: "Kachikally", coords: [13.4767, -16.6726] },
              { name: "Delta du Saloum", coords: [13.7551, -16.4704] },
              { name: "Toubakouta", coords: [13.7836, -16.4736] }
            ]
          },
          {
            day: 11,
            title: "Day 11 – Joal-Fadiouth & Mbour",
            description: "Visit the shell-island of Joal-Fadiouth and the beach town of Mbour.",
            stops: [
              { name: "Joal-Fadiouth", coords: [14.1631, -16.8429] },
              { name: "Mbour", coords: [14.4379, -16.9984] }
            ]
          },
          {
            day: 12,
            title: "Day 12 – Return to Dakar",
            description: "Drive north along the coast and return to Dakar.",
            stops: [
              { name: "Dakar", coords: [14.7255, -17.4405] }
            ]
          }
        ]
      }

    ] // end senegal tours
  },
  // ── Gambia ───────────────────────────────────────────────────────────────
  {
    id: "gambia",
    name: "Gambia",
    flag: "🇬🇲",
    tours: [

      // ─── Tour 1 ───────────────────────────────────────────────────────────
      {
        id: "discover-gambia",
        name: "Discover The Gambia Tour",
        duration: "7 Days",
        color: "#e91e63",
        days: [
          {
            day: 1,
            title: "Day 1 – Arrival in Banjul",
            description: "Arrival in Banjul, the compact capital of The Gambia.",
            stops: [
              { name: "Banjul", coords: [13.4533, -16.5748] }
            ]
          },
          {
            day: 2,
            title: "Day 2 – Kachikally, Bijilo & Abuko",
            description: "Visit Kachikally Crocodile Pool, Bijilo Monkey Park, and Abuko Nature Reserve.",
            stops: [
              { name: "Kachikally Crocodile Pool", coords: [13.4762, -16.6714] },
              { name: "Bijilo Monkey Park", coords: [13.4313, -16.7287] },
              { name: "Abuko Nature Reserve", coords: [13.4198, -16.6347] }
            ]
          },
          {
            day: 3,
            title: "Day 3 – Jambanjelly, Brikama, Gunjur & Kartong",
            description: "Explore the south coast villages from Jambanjelly down to the Gambian border at Kartong.",
            stops: [
              { name: "Jambanjelly", coords: [13.2788, -16.7277] },
              { name: "Brikama", coords: [13.2712, -16.6485] },
              { name: "Gunjur", coords: [13.1707, -16.7593] },
              { name: "Kartong", coords: [13.0948, -16.7618] }
            ]
          },
          {
            day: 4,
            title: "Day 4 – Kiang West NP, Soma & Bansang",
            description: "Drive upcountry via Kiang West National Park and Soma to Bansang.",
            stops: [
              { name: "Kiang West National Park", coords: [13.3708, -16.0218] },
              { name: "Soma", coords: [13.4438, -15.5358] },
              { name: "Bansang", coords: [13.4439, -14.6644] }
            ]
          },
          {
            day: 5,
            title: "Day 5 – Janjanbureh, River Gambia NP & Wassu",
            description: "Visit the island of Janjanbureh, River Gambia National Park, and the Wassu Stone Circles.",
            stops: [
              { name: "Janjanbureh", coords: [13.5352, -14.7636] },
              { name: "River Gambia National Park", coords: [13.6971, -14.9434] },
              { name: "Wassu", coords: [13.6910, -14.8773] }
            ]
          },
          {
            day: 6,
            title: "Day 6 – Bao Bolong Wetland Reserve",
            description: "Explore the tranquil Bao Bolong Wetland Reserve.",
            stops: [
              { name: "Bao Bolong Wetland Reserve", coords: [13.4844, -15.9037] }
            ]
          },
          {
            day: 7,
            title: "Day 7 – Juffure & Return to Banjul",
            description: "Visit Juffure, home of Kunta Kinte, and return to Banjul.",
            stops: [
              { name: "Juffure", coords: [13.3372, -16.3839] },
              { name: "Banjul", coords: [13.4533, -16.5748] }
            ]
          }
        ]
      }

    ] // end gambia tours
  },
];

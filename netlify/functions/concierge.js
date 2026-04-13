bash

cat /home/claude/tothelakes/netlify/functions/concierge.js
Output

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { season, occasion, group, vibe } = JSON.parse(event.body);

  const prompt = `You are the insider concierge for ToTheLakes.com — a curated guide to the Brainerd Lakes Area of Minnesota, covering the Gull Chain, the Whitefish Chain, and Pelican Lake. You have deep local knowledge and a warm, refined voice. You recommend thoughtfully and specifically, like a trusted local friend who knows every hidden gem.

A visitor has told you:
- Season: ${season}
- Occasion: ${occasion}
- Group: ${group}
- Vibe: ${vibe}

Use ONLY the following curated local knowledge base to make recommendations. Do not invent places or pull from general web knowledge. Every recommendation must come from this list:

--- LODGING ---
- Madden's on Gull Lake (Gull Chain): One of the premier resorts in the Midwest. Hotels, cabins, cottages. Excellent restaurants, great spa. Best for couples, golf groups, anyone wanting a true upscale resort experience.
- Grand View Lodge (Nisswa/Gull Chain): Minnesota's most awarded resort. Multiple lodging options including the boutique North Hotel, Roy Lake villas, and Pines suites. Multiple dining options on site. Best for families, couples, wedding groups, golf.
- Quarterdeck Resort (Gull Chain): Recently remodeled. New lodging, nice pool, great dock and beach. A little under the radar right now — won't be for long. Dock 77 restaurant on site. Best for families, groups, summer lake lovers.
- Cragun's Resort (Gull Chain): Mile-long sandy beach, golf packages, 20+ lodging types from beachfront cabins to hotel rooms. Great for families and golf groups. Year-round including winter snowmobile trails and ice skating.
- Ruttger's Bay Lake Lodge (Bay Lake): Classic Minnesota resort, 120+ year tradition. Championship golf, multiple restaurants. Friendly, relaxed — like coming home. Best for families, classic resort lovers.
- Breezy Point Resort (Pelican Lake area): 4-season resort, great for winter groups. Known for annual Ice Fest.

--- RESTAURANTS (Gull Chain / Nisswa) ---
- Bar Harbor Supper Club (Gull Chain): Classic upscale steakhouse and seafood supper club right on the Gull Lake channel. Park your boat on the patio and watch surf boats cruise by. One of the best spots for a proper dinner on the lake.
- Ernie's on Gull Lake (Gull Chain): A must-visit. Great boat parking, beach volleyball, jungle gym for kids. The place to be on Gull in the summer. Try a Greenie — it's the signature drink.
- Zorbaz on Gull (Gull Chain/Nisswa): Pizza, Mexican, burgers in a wild lakeside environment right on the channel. Park your boat, let the kids run. The best late-night spot for bachelor/bachelorette parties.
- Char Craft Steaks at Grand View Lodge (Nisswa): Under the radar — really good steakhouse inside Grandview. One of the best fine dining options in the area.
- CRU Restaurant & Wine Bar at Grand View Lodge (Nisswa): French-American fine dining inside Grandview. Great for romantic dinners or celebrating something special.
- On The Rocks at Grand View Lodge (Nisswa): Casual dining overlooking the Grandview grounds. Good for a relaxed meal without the formality of Char or CRU.
- Cantina at Grand View Lodge (Nisswa): Fun Mexican restaurant right on the Grandview beach.
- The Chocolate Ox (Grand View Lodge + Nisswa Main Street): Heaven for kids. Best ice cream in the area, candy shop right out of Willy Wonka.
- Ganley's in Nisswa: Hidden gem. Throwback diner, excellent breakfast and lunch. A locals' staple visitors rarely find.
- The Sidetrack (near Brainerd International Raceway): Hidden gem next to BIR. Laid back, really good food — the kind of place you'd never find without a tip.

--- RESTAURANTS (Whitefish Chain / Crosslake) ---
- The Wharf (Crosslake, Rush Lake/Whitefish Chain): Best view on the Whitefish Chain. Boat-up dining, 25 slips. Worth the price for the setting. Shrimp Bang Bang and Ahi Tuna are standouts. Go early or late in summer to avoid waits.
- Moonlite Bay (Crosslake, Whitefish Chain): Whitefish Chain institution since 1933. 70 boat slips. Lively and fun for groups. Upstairs Pub '33 is a step up — "Moonlite Bay slightly elevated." Open Thu–Sun. Best late-night spot on the chain.
- Manhattan's (Trout Lake/Whitefish Chain): Upscale dining on the Whitefish Chain for decades. Brunch through dinner. A hidden gem on the chain.

--- GOLF ---
- Deacon's Lodge: Arguably the best course in the area. Beautiful setting, golf at its finest. For the serious golfer.
- The Classic at Madden's: Equally top-tier — immaculate conditions, first-class service. Tough and championship caliber.
- Cragun's Legacy Courses: Three 9s (Red, White, Blue) + Lehman 18 + par 3. All about fun and volume of golf. Great for groups of all skill levels.
- The Pines at Grand View Lodge: Classic resort golf (The Woods, The Lakes, The Marsh). Scenic, can be slow on weekends.
- The Gravel Pit: Where golf is just fun. Very social, not the traditional crowd.
- The Preserve: Classic MN golf, nice views, fun course.
- Whitebirch Golf Course: Middle of the road, often full of lively groups.

--- ACTIVITIES ---
- Love Lake Marina (Gull Chain, north of Ernie's): Boat rentals and gas dock in a quiet, wind-free spot in the middle of Gull Lake.
- Gull Lake Cruises: Brunch, lunch, dinner, and sunset cruises on Gull Lake. Perfect for romantic getaways, wedding groups, or relaxed time on the water.
- Grand View Lodge Spa: Full-service spa. Great add-on for couples or groups wanting a wellness day.
- Mount Ski Gull (Winter): Ski, snowboard, or tube. Can rent the whole tubing hill for a private group.
- Paul Bunyan Trail: 120 miles of paved trail for biking (summer) or snowmobiling (winter).
- Brainerd Jaycees Ice Fishing Extravaganza (January): World's largest charitable ice fishing contest. A true Brainerd bucket list experience.
- Gull Lake Frozen Fore (January/February): Snowmobile or shuttle between 10 resorts and restaurants around Gull Lake. Only-in-Minnesota fun.
- Brainerd International Raceway (Summer): Largest racetrack in the Upper Midwest. Drag racing, Superbike events.
- Safari North Wildlife Park (Brainerd): Walkthrough wildlife park, great for families with kids.

--- RULES ---
- ONLY recommend places from the list above. Never add places not on this list.
- Match tightly to the visitor's season, occasion, group, and vibe.
- Winter visits: lean on Cragun's, Breezy Point, Mount Ski Gull, ice fishing events, Frozen Fore, snowmobile trails.
- Golf groups: Deacon's Lodge and The Classic are the prestige picks; Cragun's Legacy is the fun pick.
- Families with kids: Ernie's, Zorbaz, Chocolate Ox, Cragun's beach, Safari North, Mount Ski Gull (winter).
- Romantic getaways: Madden's or Grand View, Char or CRU for dinner, Gull Lake Cruises, spa.
- Bachelor/bachelorette: Zorbaz and Moonlite Bay are the nightlife anchors.
- Tone: warm, specific, confident. Like a local friend texting recommendations. Not a brochure. Not TripAdvisor.
- Format with ### headers for: Where to Stay, Where to Eat, What to Do, and one Insider Tip.
- Keep each recommendation to 2-3 sentences. Punchy, not exhaustive.
- This is a higher-end guide. Skip anything generic or budget.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.content.map(i => i.text || '').join('');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result: text })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong. Please try again.' })
    };
  }
};

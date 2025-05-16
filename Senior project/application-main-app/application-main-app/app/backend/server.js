const express = require('express'); 
require('dotenv').config();
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');


const app = express();
const port = 3001;
// Insert Key
const open_weather_api_key = "";


// Initialize Supabase client
const supabaseUrl = 'https://kdquvyagnjpljmwmpuwt.supabase.co';
const supabaseKey = "";
const supabase = createClient(supabaseUrl, supabaseKey);


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.get('/api/location/city/:city/country/:country/state/:state', (req, res) => {
    const city = req.params.city;
    const country = req.params.country;
    const state = req.params.state;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${open_weather_api_key}`
    
    fetch(url, requestOptions)
    .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
      });
});


app.get('/api/weather/lat/:lat/lon/:lon', (req, res) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  const { tripStart, tripEnd } = req.query;

  if (!tripStart || !tripEnd) {
    return res.status(400).json({ error: "Missing tripStart or tripEnd in query params" });
  }

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${open_weather_api_key}&units=imperial`;

  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(result => {
      const dailyTemps = {};

      result.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]; // Get YYYY-MM-DD part
        const tempMin = item.main.temp_min;
        const tempMax = item.main.temp_max;

        if (!dailyTemps[date]) {
          dailyTemps[date] = {
            date,
            temp_min: tempMin,
            temp_max: tempMax
          };
        } else {
          dailyTemps[date].temp_min = Math.min(dailyTemps[date].temp_min, tempMin);
          dailyTemps[date].temp_max = Math.max(dailyTemps[date].temp_max, tempMax);
        }
      });

      const simplifiedForecast = Object.values(dailyTemps);

      const MyForecast = [];

      let index = 0;
      let currentDate = new Date(tripStart + "T12:00:00");
      const endDate = new Date(tripEnd + "T12:00:00");

      while (currentDate <= endDate) {
        const forecast = simplifiedForecast[index % simplifiedForecast.length]; // Cycle through available days

        MyForecast.push({
          date: currentDate.toISOString().split('T')[0],
          temp_min: forecast.temp_min,
          temp_max: forecast.temp_max
        });

        currentDate.setDate(currentDate.getDate() + 1);
        index++;
      }

      res.json({ forecast: MyForecast });
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    });
});




app.get("/api/hotel/lat/:lat/lon/:lon", async (req, res) => {
  const lat = parseFloat(req.params.lat);
  const lon = parseFloat(req.params.lon);
  const { checkInDate, checkOutDate } = req.query;
// add Google API key
  const amadeusClientId = "Gf97LFit4tKCVwHKXSrQB7PQjMk00GqB";
  const amadeusClientSecret = "0EMGNEulL44cyhJp";
  const googleApiKey = "";

  if (!lat || !lon || !checkInDate || !checkOutDate) {
    return res.status(400).json({ error: "Missing lat, lon, or date params" });
  }

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const getToken = async () => {
    try {
      const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: amadeusClientId,
          client_secret: amadeusClientSecret,
        }),
      });
      const data = await res.json();
      return data.access_token;
    } catch (err) {
      console.error("Amadeus token error:", err);
      return null;
    }
  };

  const token = await getToken();
  if (!token) return res.status(500).json({ error: "Could not get Amadeus token" });

  // Step 1: Get nearby hotels
  let hotelBasicInfo = [];
  try {
    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lon}&radius=2`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    hotelBasicInfo = data.data.map(h => ({
      hotelId: h.hotelId,
      name: h.name,
      geoCode: h.geoCode,
    }));
  } catch (err) {
    console.error("Error fetching Amadeus hotels:", err);
    return res.status(500).json({ error: "Failed to fetch hotel list" });
  }

  // Step 2: Chunked price fetching
  const hotelPrices = {};
  const hotelIdChunks = chunkArray(hotelBasicInfo.map(h => h.hotelId), 10);

  for (const chunk of hotelIdChunks) {
    const chunkIds = chunk.join(",");
    const url = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${chunkIds}&adults=1&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data?.data) {
        data.data.forEach(entry => {
          const hotelId = entry.hotel.hotelId;
          const price = entry.offers?.[0]?.price?.total ?? null;
          hotelPrices[hotelId] = price;
        });
      }
    } catch (err) {
      console.error("Error fetching hotel prices:", err);
    }
  }

  
  const getPhotoInfo = async (hotel) => {
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${lat},${lon}&query=${encodeURIComponent(
      hotel.name
    )}&radius=10000&key=${googleApiKey}`;
    try {
      const res = await fetch(searchUrl);
      const data = await res.json();
      const place = data.results[0];
      const photoRef = place?.photos?.[0]?.photo_reference;
      const photoUrl = photoRef
        ? `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoRef}&key=${googleApiKey}&maxheight=800&maxwidth=400`
        : null;
      return { photoReference: photoRef, photoUrl };
    } catch (err) {
      console.error(`Image search failed for: ${hotel.name}`);
      return { photoReference: null, photoUrl: null };
    }
  };

  const hotelsWithAllData = await Promise.all(
    hotelBasicInfo.map(async (hotel) => {
      const price = hotelPrices[hotel.hotelId] ?? null;
      const { photoReference, photoUrl } = await getPhotoInfo(hotel);
      return {
        ...hotel,
        price,
        photoReference,
        photoUrl,
      };
    })
  );

  
  hotelsWithAllData.sort((a, b) => {
    if (a.price && !b.price) return -1;
    if (!a.price && b.price) return 1;
    return 0;
  });

  res.json({ hotels: hotelsWithAllData });

});

app.post('/api/fetch', async (req, res) => {
  const {column, equals, table} = req.body
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(column, equals);

      if (error) {
        console.error(`Error fetching from ${table}`, error);
        return res.status(500).json({ success: false, message: `Failed to fetch from ${table}.`, error });
      } else {
        return res.status(200).json({ success: true, message: `Successfully fetched from ${table}`, data });
      }
  
});

app.post('/api/insert', async (req, res) => {
  const {table, row} = req.body;

  const { data, error } = await supabase
      .from(table)
      .insert([row]);
  
    if (error) {
      console.error(`Error inserting into ${table}:`, error);
      return res.status(500).json({ success: false, message: `Failed to insert into ${table}.`, error });
    } else {
      return res.status(200).json({ success: true, message: `Inserted succcesfully into ${table}`, data });
    }
});

app.post('/api/delete', async (req, res) => {
  const {column, equals, table} = req.body

  const { data, error } = await supabase
      .from(table)
      .delete()
      .eq(column, equals);

    if (error) {
      console.error(`Error deleting from ${table}`, error);
      return res.status(500).json({ success: false, message: `Failed to delete from ${table}`, error });
    } else {
      return res.status(200).json({ success: true, message: `Deleted successfully from ${table}`, data });
    }
});

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(200).json({
    success: true,
    message: "Account created. Please check your email for verification.",
    data,
  });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ success: false, message: error.message });
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    session: data.session,
    user: data.user,
  });
});



app.get('/api/check-session', async (req, res) => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error) {
    return res.status(500).json({ success: false, message: "Failed to check session", error });
  }

  if (session) {
    return res.status(200).json({ success: true, message: "User is logged in", session });
  } else {
    return res.status(200).json({ success: false, message: "No active session" });
  }
});

app.post('/api/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut(req.body.access_token);
    if (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ success: false, message: error.message });
    } else {
      return res.status(200).json({ success: true, message: "Logged out successfully" });
    }
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

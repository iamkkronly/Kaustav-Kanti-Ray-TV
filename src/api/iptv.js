const API_BASE = 'https://iptv-org.github.io/api';

export const fetchChannels = async () => {
  console.log("Fetching data from API...");
  try {
    // Only fetch channels and streams initially to speed up and reduce error surface
    const [channelsRes, streamsRes] = await Promise.all([
      fetch(`${API_BASE}/channels.json`),
      fetch(`${API_BASE}/streams.json`),
    ]);

    if (!channelsRes.ok || !streamsRes.ok) {
        throw new Error(`API response not ok: ${channelsRes.status} ${streamsRes.status}`);
    }

    const channels = await channelsRes.json();
    const streams = await streamsRes.json();

    // Attempt categories and languages, but don't fail if they do
    let categories = [];
    let languages = [];
    try {
        const [catRes, langRes] = await Promise.all([
            fetch(`${API_BASE}/categories.json`),
            fetch(`${API_BASE}/languages.json`),
        ]);
        if (catRes.ok) categories = await catRes.json();
        if (langRes.ok) languages = await langRes.json();
    } catch (e) {
        console.warn("Could not fetch categories or languages", e);
    }

    const categoriesMap = categories.reduce((acc, cat) => {
      acc[cat.id] = cat.name;
      return acc;
    }, {});

    const languagesMap = languages.reduce((acc, lang) => {
      acc[lang.code] = lang.name;
      return acc;
    }, {});

    const streamsMap = streams.reduce((acc, stream) => {
      if (stream.channel) {
        if (!acc[stream.channel] || (stream.quality && stream.quality.includes('1080p'))) {
           acc[stream.channel] = stream;
        }
      }
      return acc;
    }, {});

    const processedChannels = channels
      .filter(channel => streamsMap[channel.id])
      .map(channel => ({
        id: channel.id,
        name: channel.name,
        logo: channel.logo,
        categories: (channel.categories || []).map(cat => categoriesMap[cat] || cat),
        languages: (channel.languages || []).map(lang => languagesMap[lang] || lang),
        streamUrl: streamsMap[channel.id].url,
      }));

    return {
      channels: processedChannels,
      categories: Object.values(categoriesMap).sort(),
      languages: Object.values(languagesMap).sort(),
    };
  } catch (error) {
    console.error("fetchChannels error:", error);
    throw error;
  }
};

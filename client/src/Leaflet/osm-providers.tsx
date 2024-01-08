export default {
  maptiler: {
    url: `https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=${
      import.meta.env.VITE_MAPTILER_KEY
    }`,
    attribution:
      "<a href='https://www.maptiler.com/copyright/' target='_blank' style='position:absolute;left:10px;bottom:10px;z-index:999;'>&copy; MapTiler</a><a href='https://www.openstreetmap.org/copyright' target='_blank'>&copy; OpenStreetMap contributors</a>",
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_URL: "http://umbriel.univ-lemans.fr"
    }
}
require("next-transpile-modules")([
    "@fullcalendar/common",
    "@babel/preset-react",
    "@fullcalendar/common",
    "@fullcalendar/daygrid",
    "@fullcalendar/interaction",
    "@fullcalendar/react",
    "@fullcalendar/timegrid",
]);
module.exports = nextConfig

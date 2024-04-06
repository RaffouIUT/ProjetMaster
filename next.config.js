/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_URL: "http://localhost:3000"
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

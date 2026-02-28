
import { AppItem, NavLink } from './types';

export const APP_VERSION = "v5.0.0";

export const PORTAL_APPS: AppItem[] = [ 
  // Slide 1
  { id: '1', name: 'Timesquare', href: 'https://timesquarev3.vercel.app/', img: 'https://github.com/VTQIT/metal-gear-map/blob/main/logo.png?raw=true' },
  { id: '2', name: 'Musify', href: 'https://musify-decentralized-music-streaming-685872424840.us-west1.run.app', img: 'https://github.com/nasmusic-ai/RAW/blob/main/musify.png?raw=true' },
  { id: '3', name: 'Meet d Mayor', href: 'https://hon-philip-a-pichay-profile-928835257611.us-west1.run.app', img: 'https://github.com/nasmusic-ai/RAW/blob/main/cantilan.png?raw=true' },
  { id: '4', name: 'Reeltalk', href: 'https://reeltalk-decentralized-mesh-video-685872424840.us-west1.run.app', img: 'https://github.com/nasmusic-ai/RAW/blob/main/reeltalk.png?raw=true' },
  { id: '5', name: 'Karaoke', href: 'https://singverse-685872424840.us-west1.run.app', img: 'https://github.com/nasmusic-ai/RAW/blob/main/singverse.png?raw=true' },
  { id: '6', name: 'Musify', href: 'https://smcci-saint-michael-college-cantilan-incorporated-685872424840.us-west1.run.app', img: 'https://github.com/nasmusic-ai/RAW/blob/main/smcci.png?raw=true' },
  // Slide 2
  { id: '7', name: 'MuniServe', href: 'https://muniserve-philippine-municipal-services-portal-685872424840.us-west1.run.app', img: 'https://github.com/nasmusic-ai/RAW/blob/main/Municipal.png?raw=true' },
  { id: '8', name: 'Freedom Fm', href: 'https://freedom-gradio-hub-928835257611.us-west1.run.app', img: 'https://github.com/nasmusic-ai/RAW/blob/main/freedom.png?raw=true' },
  { id: '9', name:  'Smile Village', href: 'https://village-herald-medieval-survival-685872424840.us-west1.run.app', img: 'https://github.com/nasmusic-ai/RAW/blob/main/Smile-village.png?raw=true' },
  { id: '10', name: 'Inspire', href: 'https://inspirescroll-676037922826.us-west1.run.app', img: 'https://github.com/nasmusic-ai/RAW/blob/main/motivational.png?raw=true' }, 
  { id: '11', name: 'Sports Hub', href: 'https://sportstube-928835257611.us-west1.run.app', img: 'https://github.com/nasmusic-ai/RAW/blob/main/sports-hub.png?raw=true' },
  { id: '12', name: 'Smile Shop', href: 'https://shoppe-luxe-676037922826.us-west1.run.app', img: 'https://github.com/nasmusic-ai/RAW/blob/main/e-commerce.jpg?raw=true' },
  // Slide 3
  { id: '13', name: 'Tesha', href: '#', img: 'https://github.com/nasmusic-ai/RAW/blob/main/Tesha.png?raw=true' },
  { id: '14', name: 'Wikipedia', href: 'https://en.wikipedia.org/', img: 'https://1000logos.net/wp-content/uploads/2017/05/Wikipedia-logos.jpg', external: true },
  { id: '15', name: 'Grokipedia', href: '#', img: 'https://www.vcsolutions.com/wp-content/uploads/2025/10/dbc5d9b7-d931-4d86-9a95-417e955531ae.jpg' },
  { id: '16', name: 'Smile Ai', href: '#', img: 'https://www.shutterstock.com/image-vector/chatgpt-logo-vector-illustration-chat-600nw-2659160215.jpg' },
  { id: '17', name: 'World News', href: 'https://www.wionews.com/', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSFu2IRkcatJm_VOOyYX_YJM4mpo8Ks4RU4w&s' },
  { id: '18', name: 'Cryptocurrency', href: '#', img: 'https://github.com/nasmusic-ai/RAW/blob/main/cryptocurrency.png?raw=true' },
  // Slide 4
  { id: '19', name: 'Movies', href: '#', img: 'https://picsum.photos/id/28/200/200' },
  { id: '20', name: 'News', href: '#', img: 'https://picsum.photos/id/29/200/200' },
  { id: '21', name: 'YouTube', href: 'https://youtube.com', img: 'https://picsum.photos/id/30/200/200', external: true },
  { id: '22', name: 'Netflix', href: 'https://netflix.com', img: 'https://picsum.photos/id/31/200/200', external: true },
  { id: '23', name: 'Twitter', href: 'https://x.com', img: 'https://picsum.photos/id/32/200/200', external: true },
  { id: '24', name: 'Instagram', href: 'https://instagram.com', img: 'https://picsum.photos/id/33/200/200', external: true },
];

export const NAV_LINKS: NavLink[] = [
  { label: 'CMS', href: '#', icon: '🚨' },
  { label: 'Games', href: '#', icon: '🎮' },
  { label: 'Tools', href: '', icon: '🔧' },
  { label: 'Weather', href: '#', icon: '☁️' },
  { label: 'About', href: '#', icon: 'ℹ️' },
  { label: 'Download App', href: '#', icon: '📥', isExternal: true },
  { label: 'Admin Panel', href: '#', icon: '⚙️' },
];

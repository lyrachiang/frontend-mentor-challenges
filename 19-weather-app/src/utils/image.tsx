import DrizzleIcon from '@/assets/images/icons/icon-drizzle.webp';
import FogIcon from '@/assets/images/icons/icon-fog.webp';
import OvercastIcon from '@/assets/images/icons/icon-overcast.webp';
import PartlyCloudyIcon from '@/assets/images/icons/icon-partly-cloudy.webp';
import RainIcon from '@/assets/images/icons/icon-rain.webp';
import SnowIcon from '@/assets/images/icons/icon-snow.webp';
import StormIcon from '@/assets/images/icons/icon-storm.webp';
import SunnyIcon from '@/assets/images/icons/icon-sunny.webp';

export const getWeatherIcon = (code: number | null) => {
  if (code === null) {
    return null;
  }

  switch (code) {
    case 2:
      return {
        icon: PartlyCloudyIcon,
        alt: 'partly-cloudy'
      };
    case 3:
      return {
        icon: OvercastIcon,
        alt: 'overcast'
      };
    case 45:
    case 48:
      return {
        icon: FogIcon,
        alt: 'fog'
      };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return {
        icon: DrizzleIcon,
        alt: 'drizzle'
      };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return {
        icon: RainIcon,
        alt: 'rain'
      };
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return {
        icon: SnowIcon,
        alt: 'snow'
      };
    case 95:
    case 96:
    case 99:
      return {
        icon: StormIcon,
        alt: 'storm'
      };
    default:
      return {
        icon: SunnyIcon,
        alt: 'sunny'
      };
  }
};

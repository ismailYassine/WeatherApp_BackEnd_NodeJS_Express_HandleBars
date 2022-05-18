// eslint-disable-next-line @typescript-eslint/no-var-requires
import { WeatherProvider } from '../interfaces';
import { injectable } from 'inversify';
import fetch from 'node-fetch';


@injectable()
/*
* Cette classe fait la communication avec l'API de wttr
*/
export class wttrWeatherService implements WeatherProvider {
    constructor() {
        //empty
    }

    async readWeather(location: string): Promise<JSON[]> {

        //TODO Extraire le JSON à l'aide du service wttr

        // Manipulation de user input
        const villes = location.split(',');
        const obj: JSON[] = [];
        for (const ville of villes) {
            const url: string = 'http://wttr.in/' + ville + '?format=j1';
            const response = await fetch(url);
            const data = await response.json();
            obj.push(data);
        }
        return obj;
    }
}

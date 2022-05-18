//import bodyParser = require('body-parser');
import { Router, Request, Response} from 'express';
import { inject, injectable } from 'inversify';
import { WeatherProvider } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export class AstronomyController{
    public constructor(@inject(TYPES.WeatherService) private _weatherService: WeatherProvider, private _defaultLocation = 'Montreal'){}

    public get router() : Router {
    
        //Router pour les routes /astronomy*.
        //Logique pour la reassignation de la ville pour que 
        //astronomy affiche astronomie pour la ville recherche
        //a programmer aussi mais je n'ai pas eu le tps mais elle est la meme
        //que celle des autres route.
        //recupere la valeur avec req.body et un if pour checker
        const router: Router = Router();
        router.use(async (req:Request, res: Response) => {
            const json: JSON[] = await this._weatherService.readWeather(this._defaultLocation);
            res.render('astronomy',{villes:json}); 
        });
        return router;
    }
}
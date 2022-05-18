//import bodyParser = require('body-parser');
import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { WeatherProvider } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export class WeatherController {
    public constructor(@inject(TYPES.WeatherService) private _weatherService: WeatherProvider, private _defaultLocation = 'montreal') { }

    public get router(): Router {
        /*
        * Un Router est un regroupement isolé de middlewares.
        * Ce Router est associé à la route /weather.
        * https://expressjs.com/en/4x/api.html#router
        */
        const router: Router = Router();

        //Router pour route weather/*
        router.get('/', async (req: Request, res: Response) => {
            //Reassignation/Reset _default location a montreal
            //apres click sur conditions actuelle ou logo
            this._defaultLocation = 'montreal';
            const ville = req.query.ville;
            if (typeof ville === 'string') {
                //Reassignation de _defaultLocation 
                //Pour afficher les infos prochains hrs et jours pour la/les villes rechercher
                this._defaultLocation = ville;
                const json: JSON[] = await this._weatherService.readWeather(ville);
                res.render('index',{villes:json});            
            }
            const json: JSON[] = await this._weatherService.readWeather(this._defaultLocation);
            res.render('index',{villes:json});
        });

        //Router pour route weather/prochainesheures
        router.get('/prochainesheures', async (req: Request, res: Response) => {
            const json: JSON[] = await this._weatherService.readWeather(this._defaultLocation);
            res.render('prochainesHeures',{villes:json});
        });

        //Router pour route weather/prochainjour
        router.get('/prochainjour', async (req: Request, res: Response) => {
            const json: JSON[] = await this._weatherService.readWeather(this._defaultLocation);
            res.render('prochainJour',{villes:json});
        });

        return router;
    }


}
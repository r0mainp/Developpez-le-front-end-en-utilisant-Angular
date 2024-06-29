import { Injectable } from "@angular/core";
import { Country } from "../models/Country";
import { PieData } from "../models/PieData";
import { LineData } from "../models/LineData";
import { Participation } from "../models/Participation";


@Injectable({
    providedIn: 'root',
})

export class ChartsService {

    
    getPieData(countries: Country[]): PieData[]{
        return countries.map( data => {
            const totalMedal = data.participations.reduce((total, participation) => total + participation.medalsCount, 0)
            return {
                name: data.country,
                value: totalMedal,
                extra: {
                    id: data.id,
                }
            }
        })
    }

    getLineData(participations: Participation[]): LineData[]{
        const series = participations.map(participation => {
            return {
                value: participation.medalsCount,
                name: `${participation.city} - ${participation.year}`
            }
        })
      
        const data = [{
            name: 'Medals',
            series: series
        }]
        return data
    }
}